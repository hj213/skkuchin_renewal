package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ImageDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.model.S3Object;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {
    private static final List<String> IMAGE_FORMATS = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tif", ".tiff");
    private final ImageRepo imageRepo;
    private final PlaceRepo placeRepo;
    private final S3Client s3Client;
    @Value("${aws.region.static}")
    private String region;
    @Value("${aws.bucket}")
    private String bucket;
    @Value("${aws.prefix}")
    private String prefix;

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

    public void insertData() throws Exception {
        try {
            ListObjectsRequest listObjects = ListObjectsRequest
                    .builder()
                    .bucket(this.bucket)
                    .prefix(this.prefix)
                    .build();

            ListObjectsResponse res = s3Client.listObjects(listObjects);
            List<S3Object> objects = res.contents();

            for (S3Object object : objects) {
                if (isImage(object.key())) {
                    String placeName = object.key().split("/")[2];
                    Place place = placeRepo.findByName(placeName);

                    if (place == null) {
                        continue;
                    }

                    String objectUrl = "https://" + bucket + ".s3." + region + ".amazonaws.com/" + object.key();

                    Image image = Image.builder()
                        .place(place)
                        .url(objectUrl)
                        .build();
                    imageRepo.save(image);

                }
            }

        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
    }

//        String[] campusNames = {"명륜", "율전"};
//
//        for (String campusName : campusNames) {
//            File imageDirectory = new File(path + "image/" + campusName + "/");
//            File[] placeImageFolders = imageDirectory.listFiles();
//
//            for (File folder : placeImageFolders) {
//                String placeName = folder.getName();
//                Place place = placeRepo.findByName(placeName);
//
//                if (place == null) {
//                    continue;
//                }
//
//                File[] images = folder.listFiles();
//                for (File image : images) {
//                    String imageUrl = "/app/src/image/" + campusName + "/" + placeName + "/" + image.getName();
//                    Image newImage = Image.builder()
//                            .place(place)
//                            .url(imageUrl)
//                            .build();
//                    imageRepo.save(newImage);
//                }
//            }
//        }

    public static boolean isImage(String objectKey) {
        for (String format : IMAGE_FORMATS) {
            if (objectKey.endsWith(format)) {
                return true;
            }
        }
        return false;
    }
}
