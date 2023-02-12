package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.*;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceService {
    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final ReviewRepo reviewRepo;
    private final ReviewTagRepo reviewTagRepo;
    private final TagRepo tagRepo;
    private final S3Service s3Service;

    @Transactional
    public List<PlaceDto.Response> getAll() {

        return placeRepo.findAll()
                .stream()
                .map(place -> new PlaceDto.Response(
                        place,
                        imageRepo.findByPlace(place).stream().collect(Collectors.toList()),
                        reviewRepo.findByPlace(place).stream().collect(Collectors.toList()),
                        getTop3TagsByPlace(place)
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public PlaceDto.Response getDetail(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));

        List<Image> images = imageRepo.findByPlace(place)
                .stream().collect(Collectors.toList());

        List<Review> reviews = reviewRepo.findByPlace(place)
                .stream().collect(Collectors.toList());

        List<Tag> tags = getTop3TagsByPlace(place);

        return new PlaceDto.Response(place, images, reviews, tags);
    }

    @Transactional
    public void add(PlaceDto.Request dto) {
        Place place = dto.toEntity();
        placeRepo.save(place);
    }

    @Transactional
    public void addAll(List<PlaceDto.Request> dto) {
        List<Place> places = dto.stream().map(placeDto -> placeDto.toEntity()).collect(Collectors.toList());
        placeRepo.saveAll(places);
    }

    @Transactional
    public void update(Long placeId, PlaceDto.Request dto) {
        Place existingPlace = placeRepo.findById(placeId).orElseThrow();
        BeanUtils.copyProperties(dto, existingPlace);
        placeRepo.save(existingPlace);
    }

    @Transactional
    public void delete(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();

        List<Image> existingImages = imageRepo.findByPlace(place);

        placeRepo.delete(place);

        for (Image existingImage : existingImages) {
            s3Service.deleteObject(existingImage.getUrl());
        }
    }

    @Transactional
    public List<PlaceDto.Response> search(List<String> keywords) {
        if (keywords.stream().anyMatch(String::isBlank)) {
            throw new CustomRuntimeException("검색어를 입력해주시기 바랍니다", "장소 검색 실패");
        }
        if (keywords.size() > 2) {
            throw new CustomRuntimeException("검색어는 최대 두 개까지 검색 가능합니다", "장소 검색 실패");
        }
        List<Place> places = placeRepo.findAll();
        List<Place> matchingPlaces = new ArrayList<>();
        List<String> keywordsList = new ArrayList<>();

        String keyword1 = keywords.get(0).toLowerCase();
        keywordsList.add(keyword1);

        String keyword2 = "";
        if (keywords.size() > 1) {
            keyword2 = keywords.get(1).toLowerCase();
            keywordsList.add(keyword2);
        }

        List<Tag> tags = new ArrayList<>();
        Tag tag1 = tagRepo.findByName(keyword1);
        if (tag1 != null) {
            tags.add(tag1);
            keywordsList.remove(keyword1);
        }

        Tag tag2 = null;
        if (!keyword2.isBlank()) {
            tag2 = tagRepo.findByName(keyword2);
            if (tag2 != null) {
                tags.add(tag2);
                keywordsList.remove(keyword2);
            }
        }

        if (tags.size() == 2) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tag1) && placeTagSet.contains(tag2)) {
                    matchingPlaces.add(place);
                }
            }
        } else if (tags.size() == 1 && keywordsList.size() == 0) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tags.get(0))) {
                    matchingPlaces.add(place);
                }
            }
        } else if (tags.size() == 0 && keywordsList.size() == 2 && keywordsList.contains("학생 할인")) {
            keywordsList.remove("학생 할인");
            for (Place place : places) {
                if (place.getCategory().name().equals(keywordsList.get(0)) && place.getDiscountAvailability()) {
                    matchingPlaces.add(place);
                }
            }
        } else if (tags.size() == 1 && keywordsList.size() == 1 && keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tags.get(0)) && place.getDiscountAvailability()) {
                    matchingPlaces.add(place);
                }
            }
        } else if (tags.size() == 1 && keywordsList.size() == 1 && !keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tags.get(0)) && place.getCategory().name().equals(keywordsList.get(0))) {
                    matchingPlaces.add(place);
                }
            }
        } else if (tags.size() == 0 && keywordsList.size() == 1 && keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                if (place.getDiscountAvailability()) {
                    matchingPlaces.add(place);
                }
            }
        } else if (tags.size() == 0 && keywordsList.size() == 1 && !keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                if (
                        place.getCategory().name().toLowerCase().contains(keyword1)
                                || (place.getDetailCategory() != null && place.getDetailCategory().toLowerCase().contains(keyword1)
                                || (place.getGate() != null && place.getGate().name().toLowerCase().contains(keyword1))
                                || place.getName().toLowerCase().contains(keyword1))) {
                    matchingPlaces.add(place);
                }
            }
        }

        return matchingPlaces
                .stream()
                .map(place -> new PlaceDto.Response(
                        place,
                        imageRepo.findByPlace(place).stream().collect(Collectors.toList()),
                        reviewRepo.findByPlace(place).stream().collect(Collectors.toList()),
                        getTop3TagsByPlace(place)
                ))
                .collect(Collectors.toList());
    }

    public void insertData(String path) throws IOException, ParseException {
        if (placeRepo.count() < 1) { //db가 비어있을 때만 실행
           String[] campusNames = {"명륜", "율전"};

           for (String campusName : campusNames) {
               FileInputStream ins = new FileInputStream(path + "place_" + campusName + ".json");
               JSONParser parser = new JSONParser();
               JSONObject jsonObject = (JSONObject)parser.parse(
                       new InputStreamReader(ins, "UTF-8")
               );
               JSONArray jsonArray = (JSONArray) jsonObject.get("place");
               Gson gson = new Gson();

               for (int i = 0; i < jsonArray.size(); i++) {
                   JSONObject temp = (JSONObject) jsonArray.get(i);
                   PlaceDto.Request dto = gson.fromJson(temp.toString(), PlaceDto.Request.class);
                   placeRepo.save(dto.toEntity());
               }
           }
        }
    }

    private List<Tag> getTop3TagsByPlace(Place place) {
        List<Review> reviews = reviewRepo.findByPlace(place);
        Map<Tag, Long> tagsCount = new HashMap<>();

        for (Review review : reviews) {
            List<ReviewTag> reviewTags = reviewTagRepo.findByReview(review);
            for (ReviewTag reviewTag : reviewTags) {
                Tag tag = reviewTag.getTag();
                tagsCount.put(tag, tagsCount.getOrDefault(tag, 0L) + 1);
            }
        }

        return tagsCount.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .limit(3)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}
