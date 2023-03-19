package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.BeanUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.dto.PlaceDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.*;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceService {
    private static final String CATEGORY = "place";
    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final ReviewRepo reviewRepo;
    private final ReviewTagRepo reviewTagRepo;
    private final TagRepo tagRepo;
    private final S3Service s3Service;

    @Transactional
    @Cacheable(value = "placeAll")
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
    @Cacheable(value = "placeDetail", key = "#placeId")
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
    @Caching(evict = {
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void add(PlaceDto.PostRequest dto) {
        List<Image> placeImages = new ArrayList<>();

        Place place = dto.toEntity();
        placeRepo.save(place);

        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, place.getCampus().name(), place.getName());
                Image placeImage = Image.builder().place(place).url(url).build();
                placeImages.add(placeImage);
            }
        }
        if (placeImages.size() > 0) {
            imageRepo.saveAll(placeImages);
        }
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void addAll(List<PlaceDto.PostRequest> dto) {
        List<Place> places = dto.stream().map(placeDto -> placeDto.toEntity()).collect(Collectors.toList());
        placeRepo.saveAll(places);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "placeDetail", key = "#placeId"),
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void update(Long placeId, PlaceDto.PutRequest dto) {
        List<Image> newImages = new ArrayList<>();

        Place existingPlace = placeRepo.findById(placeId).orElseThrow();
        BeanUtils.copyProperties(dto, existingPlace);
        placeRepo.save(existingPlace);

        List<Image> existingImages = imageRepo.findByPlace(existingPlace);

        // s3에 업로드 후 newImages 배열에 url 정보 저장
        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, existingPlace.getCampus().name(), existingPlace.getName());
                Image newImage = Image.builder().place(existingPlace).url(url).build();
                newImages.add(newImage);
            }
        }

        if (newImages.size() > 0) {
            imageRepo.saveAll(newImages);
        }

        // 기존 image url 중 없어진 url 삭제
        for (Image existingImage : existingImages) {
            if (!dto.getUrls().contains(existingImage.getUrl())) {
                s3Service.deleteObject(existingImage.getUrl());
                imageRepo.delete(existingImage);
            }
        }
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "placeDetail", key = "#placeId"),
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void delete(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();

        List<Image> existingImages = imageRepo.findByPlace(place);

        placeRepo.delete(place);

        for (Image existingImage : existingImages) {
            s3Service.deleteObject(existingImage.getUrl());
        }
    }

    @Transactional
    @Cacheable(value = "placeSearch", key = "#keywords.toString()")
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

        // 태그 두 개
        if (tags.size() == 2) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tag1) && placeTagSet.contains(tag2)) {
                    matchingPlaces.add(place);
                }
            }
            // 태그 한 개
        } else if (tags.size() == 1 && keywordsList.size() == 0) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tags.get(0))) {
                    matchingPlaces.add(place);
                }
            }
            // 학생할인 + 카테고리
        } else if (tags.size() == 0 && keywordsList.size() == 2 && keywordsList.contains("학생 할인")) {
            keywordsList.remove("학생 할인");
            for (Place place : places) {
                if (place.getCategory().name().equals(keywordsList.get(0)) && place.getDiscountAvailability()) {
                    matchingPlaces.add(place);
                }
            }
            // 태그 + 학생할인
        } else if (tags.size() == 1 && keywordsList.size() == 1 && keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tags.get(0)) && place.getDiscountAvailability()) {
                    matchingPlaces.add(place);
                }
            }
            // 태그 + 카테고리
        } else if (tags.size() == 1 && keywordsList.size() == 1 && !keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                List<Tag> placeTags = getTop3TagsByPlace(place);
                Set<Tag> placeTagSet = new HashSet<>(placeTags);
                if (placeTagSet.contains(tags.get(0)) && place.getCategory().name().equals(keywordsList.get(0))) {
                    matchingPlaces.add(place);
                }
            }
            // 학생할인
        } else if (tags.size() == 0 && keywordsList.size() == 1 && keywordsList.contains("학생 할인")) {
            for (Place place : places) {
                if (place.getDiscountAvailability()) {
                    matchingPlaces.add(place);
                }
            }
            // 검색어
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

    @Transactional
    @Cacheable(value = "placeSearchDiscount")
    public List<PlaceDto.Response> searchDiscount() {
        List<Place> places = placeRepo.findAll();
        List<Place> matchingPlaces = new ArrayList<>();

        for (Place place : places) {
            if (place.getDiscountAvailability()) {
                matchingPlaces.add(place);
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

    @Transactional
    @Cacheable(value = "placeSearchCategory", key = "#category")
    public List<PlaceDto.Response> searchCategory(String category) {
        List<Place> places = placeRepo.findAll();
        List<Place> matchingPlaces = new ArrayList<>();

        for (Place place : places) {
            if (place.getCategory().name().equals(category)) {
                matchingPlaces.add(place);
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

    @Transactional
    @Cacheable(value = "placeSearchTag", key = "#tag")
    public List<PlaceDto.Response> searchTag(String tag) {
        List<Place> places = placeRepo.findAll();
        List<Place> matchingPlaces = new ArrayList<>();
        Tag realTag = tagRepo.findByName(tag);

        for (Place place : places) {
            List<Tag> placeTags = getTop3TagsByPlace(place);
            Set<Tag> placeTagSet = new HashSet<>(placeTags);

            if (placeTagSet.contains(realTag)) {
                matchingPlaces.add(place);
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

    @Transactional
    @Cacheable(value = "placeSearchKeyword", key = "#keyword")
    public List<PlaceDto.Response> searchKeyword(String keyword) {
        List<Place> places = placeRepo.findAll();
        List<Place> matchingPlaces = new ArrayList<>();

        for (Place place : places) {
            if (
                place.getCategory().name().contains(keyword)
                        || (place.getDetailCategory() != null && place.getDetailCategory().contains(keyword)
                        || (place.getGate() != null && place.getGate().name().contains(keyword))
                        || place.getName().toLowerCase().contains(keyword.toLowerCase()))) {
                matchingPlaces.add(place);
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

    public List<PlaceDto.AdminResponse> getNoReview() {
        List<Place> places = placeRepo.findNoReviewPlaces();
        return places
                .stream()
                .map(PlaceDto.AdminResponse::new)
                .collect(Collectors.toList());
    }

    public List<PlaceDto.AdminResponse> getNoImage() {
        List<Place> places = placeRepo.findNoImagePlaces();
        return places
                .stream()
                .map(PlaceDto.AdminResponse::new)
                .collect(Collectors.toList());
    }

    public List<PlaceDto.AdminResponse> getNoMenu() {
        List<Place> places = placeRepo.findNoMenuPlaces();
        return places
                .stream()
                .map(PlaceDto.AdminResponse::new)
                .collect(Collectors.toList());
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

    public void insertData(String path) throws IOException, ParseException {
        if (placeRepo.count() < 1) { //db가 비어있을 때만 실행
            String[] campusNames = {"명륜", "율전"};

            for (String campusName : campusNames) {
                FileInputStream ins = new FileInputStream(path + "place_" + campusName + ".json");
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject)parser.parse(
                        new InputStreamReader(ins, StandardCharsets.UTF_8)
                );
                JSONArray jsonArray = (JSONArray) jsonObject.get("place");
                Gson gson = new Gson();

                for (Object o : jsonArray) {
                    JSONObject temp = (JSONObject) o;
                    PlaceDto.PostRequest dto = gson.fromJson(temp.toString(), PlaceDto.PostRequest.class);
                    placeRepo.save(dto.toEntity());
                }
            }
        }
    }
}
