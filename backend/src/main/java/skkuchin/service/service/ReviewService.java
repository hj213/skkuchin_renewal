package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.Tag;
import skkuchin.service.domain.Map.Review_Tag;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.TagRepo;
import skkuchin.service.repo.ReviewRepo;
import skkuchin.service.repo.Review_TagRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {

    private final ReviewRepo reviewRepo;
    private final PlaceRepo placeRepo;
    private final TagRepo tagRepo;
    private final Review_TagRepo reviewTagRepo;

    @Transactional
    public List<ReviewDto.Response> getAll() {
        return reviewRepo.findAll()
                .stream()
                .map(review -> new ReviewDto.Response(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto.Response getDetail(Long reviewId) {
        Review review = reviewRepo.findById(reviewId).orElseThrow();
        List<Review_Tag> reviewTags = reviewTagRepo.findByReview(review)
                .stream().collect(Collectors.toList());
        return new ReviewDto.Response(review, reviewTags);
    }

    @Transactional
    public void write(AppUser user, ReviewDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
        Review review = dto.toEntity(user, place);
        reviewRepo.save(review);

        List<Review_Tag> reviewTags = dto.getTags()
                .stream()
                .map(k -> {
                    Tag tag = tagRepo.findByName(k);
                    return dto.toReview_TagEntity(review, tag);
                })
                .collect(Collectors.toList());
        reviewTagRepo.saveAll(reviewTags);
    }

    @Transactional
    public void update(Long reviewId, ReviewDto.PutRequest dto, Long userId) {
        Review existingReview = reviewRepo.findById(reviewId).orElseThrow();
        isMyReview(existingReview.getUser().getId(), userId);

        existingReview.setRate(dto.getRate());
        existingReview.setContent(dto.getContent());
        existingReview.setImage(dto.getImage());

        reviewRepo.save(existingReview);

        List<Review_Tag> existingTags = reviewTagRepo.findByReview(existingReview);

        // 새로운 키워드 리스트에 없는 기존의 키워드는 삭제
        for (int i = 0; i < existingTags.size(); i++) {
            if (!dto.getTags().contains(existingTags.get(i).getTag().getName()))
                reviewTagRepo.delete(existingTags.get(i));
        }
        // 기존의 키워드 리스트에 없는 새로운 키워드는 추가
        for (int i = 0; i < dto.getTags().size(); i++) {
            if (!existingTags.stream().map(object -> object.getTag().getName()).collect(Collectors.toList()).contains(dto.getTags().get(i))) {
                Tag tag = tagRepo.findByName(dto.getTags().get(i));
                reviewTagRepo.save(dto.toReview_TagEntity(existingReview, tag));
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
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList()))
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDto.Response> getMyReview(AppUser user) {
        return reviewRepo.findByUser(user)
                .stream().map(review -> new ReviewDto.Response(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList()))
                ).collect(Collectors.toList());
    }

    @Transactional
    public List<ReviewDto.Response> getUserReview(Long userId) {
        return reviewRepo.findAll()
                .stream()
                .filter(review -> review.getUser().getId() == userId)
                .map(review -> new ReviewDto.Response(
                        review,
                        reviewTagRepo.findByReview(review).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    public void isMyReview(Long reviewUserId, Long userId) {
        if (reviewUserId != userId) throw new IllegalArgumentException("리뷰 작성자가 아닙니다.");
    }
}
