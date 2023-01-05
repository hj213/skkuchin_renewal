package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

import java.time.LocalDateTime;

//@Data
public class ReviewDto {

    @Getter
    public static class PostRequest {
        private Long placeId;
        private float rate;
        private String content;
        private String image;

        public Review toEntity(AppUser user, Place place) {
            return Review.builder()
                    .place(place)
                    .content(content)
                    .rate(rate)
                    .image(image)
                    .user(user)
                    .build();
        }
    }

    @Getter
    public static class PutRequest {
        private float rate;
        private String content;
        private String image;
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

        public Response(Review review) {
            this.id = review.getId();
            this.rate = review.getRate();
            this.content = review.getContent();
            this.image = review.getImage();
            this.create_date = review.getCreateDate();
            this.nickname = review.getUser().getNickname();
            this.major = review.getUser().getMajor();
            this.student_id = review.getUser().getStudent_id();
            this.user_image = review.getUser().getImage();
        }
    }
}
