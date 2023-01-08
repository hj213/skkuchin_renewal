package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ImageDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {

    private final ImageRepo imageRepo;
    private final PlaceRepo placeRepo;

    @Transactional
    public List<ImageDto.Response> getAll() {
        return imageRepo.findAll()
                .stream()
                .map(image -> new ImageDto.Response(image))
                .collect(Collectors.toList());
    }

    @Transactional
    public ImageDto.Response getDetail(Long imageId) {
        Image image = imageRepo.findById(imageId).orElseThrow();
        return new ImageDto.Response(image);
    }

    @Transactional
    public void upload(ImageDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
        Image image = dto.toEntity(place);
        imageRepo.save(image);
    }

    @Transactional
    public void uploadAll(List<ImageDto.PostRequest> dto) {
        List<Image> images = dto
                .stream()
                .map(imageDto -> imageDto.toEntity(placeRepo
                        .findById(imageDto.getPlaceId())
                        .orElseThrow()))
                .collect(Collectors.toList());
        imageRepo.saveAll(images);
    }

    @Transactional
    public void update(Long imageId, ImageDto.PutRequest dto) {
        Image existingImage = imageRepo.findById(imageId).orElseThrow();
        existingImage.setUrl(dto.getUrl());
        imageRepo.save(existingImage);
    }

    @Transactional
    public void delete(Long imageId) {
        imageRepo.deleteById(imageId);
    }

    @Transactional
    public List<ImageDto.Response> getPlaceImages(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();

        return imageRepo.findByPlace(place)
                .stream()
                .map(image -> new ImageDto.Response(image))
                .collect(Collectors.toList());
    }

    @Transactional
    public void deletePlaceImages(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();
        List<Image> images =  imageRepo.findByPlace(place);
        for (Image image : images) {
            imageRepo.delete(image);
        }
    }

    public void insertData(String path) throws IOException, ParseException {
        if (imageRepo.count() < 1) { //db가 비어있을 때만 실행

            FileInputStream ins = new FileInputStream(path + "image.json");
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject)parser.parse(
                    new InputStreamReader(ins, "UTF-8")
            );
            JSONArray jsonArray = (JSONArray) jsonObject.get("image");
            Gson gson = new Gson();

            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject temp = (JSONObject) jsonArray.get(i);
                ImageDto.PostRequest dto = gson.fromJson(temp.toString(), ImageDto.PostRequest.class);
                Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
                imageRepo.save(dto.toEntity(place));
            }
        }
    }
}
