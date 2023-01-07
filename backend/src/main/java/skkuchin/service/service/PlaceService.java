package skkuchin.service.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ImageDto;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewRepo;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceService {

    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final ReviewRepo reviewRepo;

    @Transactional
    public List<PlaceDto.Response> getAll() {
        return placeRepo.findAll()
                .stream()
                .map(place -> new PlaceDto.Response(
                        place,
                        imageRepo.findByPlace(place).stream().collect(Collectors.toList()),
                        reviewRepo.findByPlace(place).stream().collect(Collectors.toList())
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

        return new PlaceDto.Response(place, images, reviews);
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

    @PostConstruct
    public void init() {
        List<Place> places = loadPlacesFromJson();
        placeRepo.saveAll(places);
        List<Image> images = loadImagesFromJson();
        imageRepo.saveAll(images);
    }

    private List<Place> loadPlacesFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            InputStream inputStream = new FileInputStream("/Users/myungjun/Desktop/skkuchin_renewal/backend/src/main/java/skkuchin/service/json/places.json");
            JsonNode rootNode = objectMapper.readTree(inputStream);
            JsonNode placesNode = rootNode.path("places");
            List<Place> places = new ArrayList<>();

            for (JsonNode node : placesNode) {
                String name = node.path("name").asText();
                Category category = Category.valueOf(node.path("category").asText());
                String detailCategory = node.path("detail_category").asText();
                Campus campus = Campus.valueOf(node.path("campus").asText());
                Gate gate = Gate.valueOf(node.path("gate").asText());
                String address = node.path("address").asText();
                double xcoordinate = node.path("xcoordinate").asDouble();
                double ycoordinate = node.path("ycoordinate").asDouble();
                String serviceTime = node.path("service_time").asText();
                String breakTime = node.path("break_time").asText();
                Boolean discountAvailability = node.path("discount_availability").asBoolean();
                String discountContent = node.path("discount_content").asText();

                PlaceDto.Request dto = new PlaceDto.Request(name, category, detailCategory, campus, gate, address, xcoordinate, ycoordinate, serviceTime, breakTime, discountAvailability, discountContent);
                places.add(dto.toEntity());
            }

            inputStream.close();
            return places;
        } catch (IOException e) {
            throw new RuntimeException("Failed to load places from JSON file", e);
        }
    }

    private List<Image> loadImagesFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            InputStream inputStream = new FileInputStream("/Users/myungjun/Desktop/skkuchin_renewal/backend/src/main/java/skkuchin/service/json/images.json");
            JsonNode rootNode = objectMapper.readTree(inputStream);
            JsonNode placesNode = rootNode.path("images");
            List<Image> images = new ArrayList<>();

            for (JsonNode node : placesNode) {
                Long placeId = node.path("place_id").asLong();
                String url = node.path("url").asText();

                Place place = placeRepo.findById(placeId).orElseThrow();

                ImageDto.PostRequest dto = new ImageDto.PostRequest(url);
                images.add(dto.toEntity(place));
            }

            inputStream.close();
            return images;
        } catch (IOException e) {
            throw new RuntimeException("Failed to load images from JSON file", e);
        }
    }
}
