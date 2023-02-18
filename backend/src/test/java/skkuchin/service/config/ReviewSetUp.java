package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.ReviewTag;
import skkuchin.service.domain.Map.Tag;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.*;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewSetUp {
    @Autowired
    private ReviewRepo reviewRepo;
    @Autowired
    private TagRepo tagRepo;
    @Autowired
    private ReviewTagRepo reviewTagRepo;
    private Place place;
    private AppUser user;

    public Long saveReview(ReviewDto.PostRequest dto, AppUser user, Place place) {
        Review review = dto.toEntity(user, place);
        Long reviewId = reviewRepo.save(review).getId();

        List<ReviewTag> reviewTags = dto.getTags()
                .stream()
                .map(k -> {
                    Tag tag = tagRepo.findByName(k);
                    return dto.toReviewTagEntity(review, tag);
                })
                .collect(Collectors.toList());
        reviewTagRepo.saveAll(reviewTags);
        return reviewId;
    }

}
