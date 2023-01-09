package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

//@Data
public class ReviewDto {

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @JsonProperty
        private Long placeId;
        @NotNull
        private float rate;
        @NotBlank
        private String content;
        private String image;
        private List<String> tags;

        public Review toEntity(AppUser user, Place place) {
            return Review.builder()
                    .place(place)
                    .content(content)
                    .rate(rate)
                    .image(image)
                    .user(user)
                    .build();
        }

        public Review_Tag toReview_TagEntity(Review review, Tag tag) {
            return Review_Tag.builder()
                    .review(review)
                    .tag(tag)
                    .build();
        }
    }

    @Getter
    public static class PutRequest {
        private float rate;
        private String content;
        private String image;
        private List<String> tags;

        public Review_Tag toReview_TagEntity(Review review, Tag tag) {
            return Review_Tag.builder()
                    .review(review)
                    .tag(tag)
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
        private List<String> tags;

        public Response(Review review, List<Review_Tag> tags) {
            this.id = review.getId();
            this.rate = review.getRate();
            this.content = review.getContent();
            this.image = review.getImage();
            this.create_date = review.getCreateDate();
            this.nickname = review.getUser().getNickname();
            this.major = review.getUser().getMajor();
            this.student_id = review.getUser().getStudent_id();
            this.user_image = review.getUser().getImage();
            this.tags = tags.stream().map(tag -> tag.getTag().getName()).collect(Collectors.toList());
        }
    }
}
