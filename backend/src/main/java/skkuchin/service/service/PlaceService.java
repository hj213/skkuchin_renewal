package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewRepo;
import skkuchin.service.repo.ReviewTagRepo;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceService {

    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final ReviewRepo reviewRepo;
    private final ReviewTagRepo reviewTagRepo;

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
        Place place = placeRepo.findById(placeId).orElseThrow();

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
        placeRepo.deleteById(placeId);
    }

    public void insertData(String path) throws IOException, ParseException {
        if (placeRepo.count() < 1) { //db가 비어있을 때만 실행

            FileInputStream ins = new FileInputStream(path + "place.json");
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
