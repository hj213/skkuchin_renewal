package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepo reviewRepo;
    private final PlaceRepo placeRepo;

    @Transactional
    public List<ReviewDto.Response> getAll() {
        return reviewRepo.findAll()
                .stream().map(review -> new ReviewDto.Response(review)).collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto.Response getDetail(Long reviewId) {
        Review review = reviewRepo.findById(reviewId).orElseThrow();
        return new ReviewDto.Response(review);
    }

    @Transactional
    public void write(AppUser user, ReviewDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
        Review review = dto.toEntity(user, place);
        reviewRepo.save(review);
    }

    @Transactional
    public void update(Long reviewId, ReviewDto.PutRequest dto, Long userId) {
        Review existingReview = reviewRepo.findById(reviewId).orElseThrow();
        isMyReview(existingReview.getUser().getId(), userId);

        existingReview.setRate(dto.getRate());
        existingReview.setContent(dto.getContent());
        existingReview.setImage(dto.getImage());

        reviewRepo.save(existingReview);
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
                .stream().map(review -> new ReviewDto.Response(review)).collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDto.Response> getMyReview(AppUser user) {
        return reviewRepo.findByUser(user)
                .stream().map(review -> new ReviewDto.Response(review)).collect(Collectors.toList());
    }

    public void isMyReview(Long reviewUserId, Long userId) {
        if (reviewUserId != userId) throw new IllegalArgumentException("리뷰 작성자가 아닙니다.");
    }
}
