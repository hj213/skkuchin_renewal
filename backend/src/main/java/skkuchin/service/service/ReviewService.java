package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Place.Review;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ReviewRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepo reviewRepo;

    @Transactional
    public void write(AppUser user, ReviewDto dto) {

        //place 관련 코드

        /*
        Review review = Review.builder()
                .content(dto.getContent())
                .rate(dto.getRate())
                .image(dto.getImage())
                .user(user)
                .build();*/

        //reviewRepo.save(review);
    }
}
