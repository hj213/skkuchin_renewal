package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.dto.ReviewDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.*;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    private static final String CATEGORY = "review";
    private final ReviewRepo reviewRepo;
    private final PlaceRepo placeRepo;
    private final TagRepo tagRepo;
    private final ReviewTagRepo reviewTagRepo;
    private final ReviewImageRepo reviewImageRepo;
    private final UserRepo userRepo;
    private final S3Service s3Service;
    @Value("${aws.s3.start-url}")
    private String startUrl;
    @Value("${aws.s3.prefix}")
    private String prefix;

    @Transactional
    public List<ReviewDto.AdminResponse> getAll() {
        return reviewRepo.findAll()
                .stream()
                .map(review -> new ReviewDto.AdminResponse(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList()),
                        reviewImageRepo.findByReview(review).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto.Response getDetail(Long reviewId) {
        Review review = reviewRepo.findById(reviewId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 리뷰입니다"));
        List<ReviewTag> reviewTags = reviewTagRepo.findByReview(review)
                .stream().collect(Collectors.toList());
        List<ReviewImage> reviewImages = reviewImageRepo.findByReview(review)
                .stream().collect(Collectors.toList());
        return new ReviewDto.Response(review, reviewTags, reviewImages);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "placeDetail", key = "#dto.placeId"),
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void write(AppUser user, ReviewDto.PostRequest dto) {
        List<ReviewImage> reviewImages = new ArrayList<>();

        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));
        Review review = dto.toEntity(user, place);
        reviewRepo.save(review);

        List<ReviewTag> reviewTags = dto.getTags().stream()
                .map(k -> {
                    Tag tag = tagRepo.findByName(k);
                    return dto.toReviewTagEntity(review, tag);
                })
                .collect(Collectors.toList());

        reviewTagRepo.saveAll(reviewTags);

        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, place.getCampus().name(), place.getName());
                ReviewImage reviewImage = ReviewImage.builder().review(review).url(url).build();
                reviewImages.add(reviewImage);
            }
        }
        if (reviewImages.size() > 0) {
            reviewImageRepo.saveAll(reviewImages);
        }
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "placeDetail", allEntries = true),
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void update(Long reviewId, ReviewDto.PutRequest dto, AppUser user) {
        Review existingReview = reviewRepo.findById(reviewId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 리뷰입니다"));
        Place place = existingReview.getPlace();
        // s3 저장후 받은 url로 저장할 새로운 이미지 배열
        List<ReviewImage> newImages = new ArrayList<>();
        canHandleReview(existingReview.getUser(), user);

        existingReview.setRate(dto.getRate());
        existingReview.setContent(dto.getContent());

        reviewRepo.save(existingReview);

        List<ReviewTag> existingTags = reviewTagRepo.findByReview(existingReview);

        // 새로운 키워드 리스트에 없는 기존의 키워드는 삭제
        for (int i = 0; i < existingTags.size(); i++) {
            if (!dto.getTags().contains(existingTags.get(i).getTag().getName()))
                reviewTagRepo.delete(existingTags.get(i));
        }
        // 기존의 키워드 리스트에 없는 새로운 키워드는 추가
        for (int i = 0; i < dto.getTags().size(); i++) {
            if (!existingTags.stream().map(object -> object.getTag().getName()).collect(Collectors.toList()).contains(dto.getTags().get(i))) {
                Tag tag = tagRepo.findByName(dto.getTags().get(i));
                reviewTagRepo.save(dto.toReviewTagEntity(existingReview, tag));
            }
        }

        List<ReviewImage> existingImages = reviewImageRepo.findByReview(existingReview);

        // s3에 업로드 후 newImages 배열에 url 정보 저장
        for (MultipartFile image : dto.getImages()) {
            if (!image.isEmpty()) {
                String url = s3Service.uploadObject(image, CATEGORY, place.getCampus().name(), place.getName());
                ReviewImage newImage = ReviewImage.builder().review(existingReview).url(url).build();
                newImages.add(newImage);
            }
        }

        if (newImages.size() > 0) {
            reviewImageRepo.saveAll(newImages);
        }

        // 기존 image url 중 없어진 url 삭제
        for (ReviewImage existingImage : existingImages) {
            if (!dto.getUrls().contains(existingImage.getUrl())) {
                s3Service.deleteObject(existingImage.getUrl());
                reviewImageRepo.delete(existingImage);
            }
        }
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = "placeDetail", allEntries = true),
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void delete(Long reviewId, AppUser user) {
        Review review = reviewRepo.findById(reviewId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 리뷰입니다"));
        canHandleReview(review.getUser(), user);
        List<ReviewImage> reviewImages = reviewImageRepo.findByReview(review);

        reviewRepo.delete(review);

        for (ReviewImage reviewImage : reviewImages) {
            s3Service.deleteObject(reviewImage.getUrl());
        }
    }

    @Transactional
    public List<ReviewDto.Response> getPlaceReview(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 장소입니다"));

        return reviewRepo.findByPlace(place)
                .stream()
                .map(review -> new ReviewDto.Response(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList()),
                        reviewImageRepo.findByReview(review).stream().collect(Collectors.toList()))
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDto.Response> getMyReview(AppUser user) {
        return reviewRepo.findByUser(user)
                .stream().map(review -> new ReviewDto.Response(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList()),
                        reviewImageRepo.findByReview(review).stream().collect(Collectors.toList()))
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDto.Response> getUserReview(Long userId) {
        return reviewRepo.findAll()
                .stream()
                .filter(review -> review.getUser().getId() == userId)
                .map(review -> new ReviewDto.Response(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList()),
                        reviewImageRepo.findByReview(review).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    public void insertData(String path) throws IOException, ParseException {
        if (reviewRepo.count() < 1) { //db가 비어있을 때만 실행

            FileInputStream ins = new FileInputStream(path + "review.json");
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject)parser.parse(
                    new InputStreamReader(ins, "UTF-8")
            );
            JSONArray jsonArray = (JSONArray) jsonObject.get("review");
            Gson gson = new Gson();

            List<AppUser> users = userRepo.findAll();

            String imageUrl = this.startUrl + this.prefix + CATEGORY + "/p4v9hOJorE9sAR9clE068RRB.jpeg";

            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject temp = (JSONObject) jsonArray.get(i);
                ReviewDto.PostRequest dto = gson.fromJson(temp.toString(), ReviewDto.PostRequest.class);
                Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
                Review review = dto.toEntity(users.get(i%2), place);
                reviewRepo.save(review);
                ReviewImage reviewImage = ReviewImage.builder().review(review).url(imageUrl).build();
                reviewImageRepo.save(reviewImage);

                List<ReviewTag> reviewTags = dto.getTags().stream()
                        .map(k -> {
                            Tag tag = tagRepo.findByName(k);
                            return dto.toReviewTagEntity(review, tag);
                        })
                        .collect(Collectors.toList());
                reviewTagRepo.saveAll(reviewTags);
            }
        }
    }

    private void canHandleReview(AppUser reviewUser, AppUser user) {
        if (!(reviewUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("리뷰 작성자 또는 관리자가 아닙니다.");
    }
}
