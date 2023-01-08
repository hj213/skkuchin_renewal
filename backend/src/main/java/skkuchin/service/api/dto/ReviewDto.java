package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

//@Data
public class ReviewDto {

    @Getter
    public static class PostRequest {
        private Long placeId;
        private float rate;
        private String content;
        private String image;
        private List<String> keywords;

        public Review toEntity(AppUser user, Place place) {
            return Review.builder()
                    .place(place)
                    .content(content)
                    .rate(rate)
                    .image(image)
                    .user(user)
                    .build();
        }

        public ReviewReviewKeyword toReviewReviewKeywordEntity(Review review, ReviewKeyword reviewKeyword) {
            return ReviewReviewKeyword.builder()
                    .review(review)
                    .reviewKeyword(reviewKeyword)
                    .build();
        }
    }

    @Getter
    public static class PutRequest {
        private float rate;
        private String content;
        private String image;
        private List<String> keywords;

        public ReviewReviewKeyword toReviewReviewKeywordEntity(Review review, ReviewKeyword reviewKeyword) {
            return ReviewReviewKeyword.builder()
                    .review(review)
                    .reviewKeyword(reviewKeyword)
                    .build();
        }
    }

    /* 리뷰 전체 조회, 리뷰 상세 조회 */
    @Getter
    public static class Response {
        private Long id;
        private float rate;
        private String content;
        private String image;
        private LocalDateTime create_date;
        private String nickname;
        private Major major;
        private String student_id;
        private String user_image;
        private List<String> keywords;

        public Response(Review review, List<ReviewReviewKeyword> keywords) {
            this.id = review.getId();
            this.rate = review.getRate();
            this.content = review.getContent();
            this.image = review.getImage();
            this.create_date = review.getCreateDate();
            this.nickname = review.getUser().getNickname();
            this.major = review.getUser().getMajor();
            this.student_id = review.getUser().getStudent_id();
            this.user_image = review.getUser().getImage();
            this.keywords = keywords.stream().map(keyword -> keyword.getReviewKeyword().getName()).collect(Collectors.toList());
        }
    }
}
