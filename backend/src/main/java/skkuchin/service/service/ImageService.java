package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.api.dto.ImageDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.transaction.Transactional;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {
    private static final List<String> IMAGE_FORMATS = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff");
    private static final String CATEGORY = "place";
    private final ImageRepo imageRepo;
    private final PlaceRepo placeRepo;
    private final S3Service s3Service;
    @Value("${aws.s3.start-url}")
    private String startUrl;


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
        checkFile(dto.getImage());

        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();

        String url = s3Service.uploadObject(dto.getImage(), CATEGORY, place.getCampus().name(), place.getName());

        Image image = dto.toEntity(place, url);
        imageRepo.save(image);
    }

    @Transactional
    public void uploadAll(List<ImageDto.PostRequest> dtos) {
        List<Image> images = new ArrayList<>();

        for (ImageDto.PostRequest dto : dtos) {
            checkFile(dto.getImage());

            Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();

            String url = s3Service.uploadObject(dto.getImage(), CATEGORY, place.getCampus().name(), place.getName());

            Image image = dto.toEntity(place, url);
            images.add(image);
        }

        imageRepo.saveAll(images);
    }


    @Transactional
    public void update(Long imageId, ImageDto.PutRequest dto) {
        checkFile(dto.getImage());

        Image existingImage = imageRepo.findById(imageId).orElseThrow();
        Place place = existingImage.getPlace();

        String originalUrl = existingImage.getUrl();
        String updatedUrl = s3Service.uploadObject(dto.getImage(), CATEGORY, place.getCampus().name(), place.getName());

        existingImage.setUrl(updatedUrl);
        imageRepo.save(existingImage);

        s3Service.deleteObject(originalUrl);
    }

    @Transactional
    public void delete(Long imageId) {
        Image existingImage = imageRepo.findById(imageId).orElseThrow();
        String url = existingImage.getUrl();

        imageRepo.deleteById(imageId);
        s3Service.deleteObject(url);
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
            String url = image.getUrl();
            imageRepo.delete(image);
            s3Service.deleteObject(url);
        }
    }

    public void insertData() {
        List<Place> places = placeRepo.findAll();
        List<S3Object> objects = s3Service.getObjects(CATEGORY);

        for (S3Object object : objects) {
            if (isImage(object.key())) {
                String normalized = Normalizer.normalize(object.key(), Normalizer.Form.NFC);
                String placeName = normalized.split("/")[4];

                Place place = placeRepo.findByName(placeName);

                if (place == null) {
                    continue;
                }

                String objectUrl = this.startUrl + object.key();

                Image image = Image.builder()
                    .place(place)
                    .url(objectUrl)
                    .build();

                imageRepo.save(image);
            }
        }
    }

    private void checkFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new CustomRuntimeException("파일이 비어있습니다.");
        }
    }

    private boolean isImage(String objectKey) {
        for (String format : IMAGE_FORMATS) {
            if (objectKey.endsWith(format)) {
                return true;
            }
        }
        return false;
    }
}
