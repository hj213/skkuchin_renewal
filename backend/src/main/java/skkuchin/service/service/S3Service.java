package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.exception.CustomRuntimeException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {
    private final S3Client s3Client;
    @Value("${aws.s3.bucket}")
    private String bucket;
    @Value("${aws.s3.prefix}")
    private String prefix;
    @Value("${aws.s3.start-url}")
    private String startUrl;

    @Transactional
    public List<S3Object> getObjects(String category) {

        String prefix = this.prefix
                + category
                + "/";

        ListObjectsRequest listObjects = ListObjectsRequest
                .builder()
                .bucket(this.bucket)
                .prefix(prefix)
                .encodingType(EncodingType.URL)
                .build();

        ListObjectsResponse res = s3Client.listObjects(listObjects);

        List<S3Object> objects = res.contents();

        return objects;
    }

    @Transactional
    public String uploadObject(MultipartFile file, String category , String campus, String placeName) {
        try {
            String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
            String objectKey = this.prefix
                    + category
                    + "/"
                    + campus
                    + "/"
                    + placeName
                    + "/"
                    + fileName;

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(this.bucket)
                    .key(objectKey)
                    .build();

            s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return getUrl(objectKey);

        } catch (S3Exception e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void deleteObject(String url) {
        String key = url.substring(this.startUrl.length());

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(this.bucket)
                .key(key)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }


    private String getUrl(String key) {
        return this.startUrl + key;
    }
}
