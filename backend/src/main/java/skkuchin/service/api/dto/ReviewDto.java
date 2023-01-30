package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ReviewDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotNull
        @JsonProperty
        private Long placeId;
        @NotNull
        @Min(value = 1)
        @Max(value = 5)
        private int rate;
        @NotBlank
        private String content;
        private List<MultipartFile> images;
        private List<String> tags;

        public Review toEntity(AppUser user, Place place) {
            return Review.builder()
                    .place(place)
                    .content(content)
                    .rate(rate)
                    .user(user)
                    .build();
        }

        public ReviewTag toReviewTagEntity(Review review, Tag tag) {
            return ReviewTag.builder()
                    .review(review)
                    .tag(tag)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PutRequest {
        @NotNull
        @Min(value = 1)
        @Max(value = 5)
        private int rate;
        @NotBlank
        private String content;
        private List<MultipartFile> images;
        private List<String> tags;

        public ReviewTag toReviewTagEntity(Review review, Tag tag) {
            return ReviewTag.builder()
                    .review(review)
                    .tag(tag)
                    .build();
        }
    }

    /* 리뷰 전체 조회, 리뷰 상세 조회 */
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        @JsonProperty
        private Long placeId;
        private int rate;
        private String content;
        private List<String> images;
        @JsonProperty
        private LocalDateTime createDate;
        private String nickname;
        private Major major;
        @JsonProperty
        private int studentId;
        @JsonProperty
        private String userImage;
        private List<String> tags;

        public Response(Review review, List<ReviewTag> tags, List<ReviewImage> images) {
            this.id = review.getId();
            this.placeId = review.getPlace().getId();
            this.rate = review.getRate();
            this.content = review.getContent();
            this.images = images.stream().map(image -> image.getUrl()).collect(Collectors.toList());
            this.createDate = review.getCreateDate();
            this.nickname = review.getUser().getNickname();
            this.major = review.getUser().getMajor();
            this.studentId = review.getUser().getStudentId();
            this.userImage = review.getUser().getImage();
            this.tags = tags.stream().map(tag -> tag.getTag().getName()).collect(Collectors.toList());
        }
    }
}
