package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.ReviewKeyword;
import skkuchin.service.domain.Map.ReviewReviewKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewKeywordRepo;
import skkuchin.service.repo.ReviewRepo;
import skkuchin.service.repo.ReviewReviewKeywordRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepo reviewRepo;
    private final PlaceRepo placeRepo;
    private final ReviewKeywordRepo reviewKeywordRepo;
    private final ReviewReviewKeywordRepo reviewReviewKeywordRepo;

    @Transactional
    public List<ReviewDto.Response> getAll() {
        return reviewRepo.findAll()
                .stream()
                .map(review -> new ReviewDto.Response(
                        review,
                        reviewReviewKeywordRepo.findByReview(review).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto.Response getDetail(Long reviewId) {
        Review review = reviewRepo.findById(reviewId).orElseThrow();
        List<ReviewReviewKeyword> reviewReviewKeywords = reviewReviewKeywordRepo.findByReview(review)
                .stream().collect(Collectors.toList());
        return new ReviewDto.Response(review, reviewReviewKeywords);
    }

    @Transactional
    public void write(AppUser user, ReviewDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
        Review review = dto.toEntity(user, place);
        reviewRepo.save(review);

        List<ReviewReviewKeyword> reviewReviewKeywords = dto.getKeywords()
                .stream()
                .map(k -> {
                    ReviewKeyword keyword = reviewKeywordRepo.findByName(k);
                    return dto.toReviewReviewKeywordEntity(review, keyword);
                })
                .collect(Collectors.toList());
        reviewReviewKeywordRepo.saveAll(reviewReviewKeywords);
    }

    @Transactional
    public void update(Long reviewId, ReviewDto.PutRequest dto, Long userId) {
        Review existingReview = reviewRepo.findById(reviewId).orElseThrow();
        isMyReview(existingReview.getUser().getId(), userId);

        existingReview.setRate(dto.getRate());
        existingReview.setContent(dto.getContent());
        existingReview.setImage(dto.getImage());

        reviewRepo.save(existingReview);

        List<ReviewReviewKeyword> existingKeywords = reviewReviewKeywordRepo.findByReview(existingReview);

        // 새로운 키워드 리스트에 없는 기존의 키워드는 삭제
        for (int i = 0; i < existingKeywords.size(); i++) {
            if (!dto.getKeywords().contains(existingKeywords.get(i).getReviewKeyword().getName()))
                reviewReviewKeywordRepo.delete(existingKeywords.get(i));
        }
        // 기존의 키워드 리스트에 없는 새로운 키워드는 추가
        for (int i = 0; i < dto.getKeywords().size(); i++) {
            if (!existingKeywords.stream().map(object -> object.getReviewKeyword().getName()).collect(Collectors.toList()).contains(dto.getKeywords().get(i))) {
                ReviewKeyword keyword = reviewKeywordRepo.findByName(dto.getKeywords().get(i));
                reviewReviewKeywordRepo.save(dto.toReviewReviewKeywordEntity(existingReview, keyword));
            }
        }
    }

    @Transactional
    public void delete(Long reviewId, Long userId) {
        Review review = reviewRepo.findById(reviewId).orElseThrow();
        isMyReview(review.getUser().getId(), userId);
        reviewRepo.delete(review);
    }

    @Transactional
    public List<ReviewDto.Response> getPlaceReview(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();
        return reviewRepo.findByPlace(place)
                .stream()
                .map(review -> new ReviewDto.Response(
                        review,
                        reviewReviewKeywordRepo.findByReview(review).stream().collect(Collectors.toList()))
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDto.Response> getMyReview(AppUser user) {
        return reviewRepo.findByUser(user)
                .stream().map(review -> new ReviewDto.Response(
                        review,
                        reviewReviewKeywordRepo.findByReview(review).stream().collect(Collectors.toList()))
                ).collect(Collectors.toList());
    }

    public void isMyReview(Long reviewUserId, Long userId) {
        if (reviewUserId != userId) throw new IllegalArgumentException("리뷰 작성자가 아닙니다.");
    }
}
