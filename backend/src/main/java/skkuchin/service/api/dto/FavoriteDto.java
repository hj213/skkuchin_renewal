package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;


public class FavoriteDto {

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {

        @JsonProperty
        @NotNull
        private Long placeId;

        public Favorite toEntity(AppUser user, Place place) {
            return Favorite.builder()
                    .user(user)
                    .place(place)
                    .build();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {

        private Long id;
        private String name;
        @JsonProperty
        private Long placeId;
        private Category category;
        @JsonProperty
        private String detailCategory;
        private Campus campus;
        private Gate gate;
        private String address;
        private Double xcoordinate;
        private Double ycoordinate;
        @JsonProperty
        private String serviceTime;
        @JsonProperty
        private String breakTime;
        @JsonProperty
        private Boolean discountAvailability;
        @JsonProperty
        private String discountContent;
        private List<String> images;
        @JsonProperty
        private Long reviewCount;
        private Double rate;
        private List<String> tags;

        public Response(Favorite favorite,List<Image> images,List<Review> reviews,List<Tag> tags) {
            this.id = favorite.getId();
            this.name = favorite.getPlace().getName() ;
            this.placeId = favorite.getPlace().getId();
            this.category =  favorite.getPlace().getCategory();
            this.detailCategory = favorite.getPlace().getDetailCategory();
            this.campus =  favorite.getPlace().getCampus();
            this.gate = favorite.getPlace().getGate();
            this.address = favorite.getPlace().getAddress();
            this.xcoordinate = favorite.getPlace().getXcoordinate();
            this.ycoordinate = favorite.getPlace().getYcoordinate();
            this.serviceTime = favorite.getPlace().getServiceTime();
            this.breakTime = favorite.getPlace().getBreakTime();
            this.discountAvailability = favorite.getPlace().getDiscountAvailability();
            this.discountContent = favorite.getPlace().getDiscountContent();
            this.images = images.stream().map(image -> image.getUrl()).collect(Collectors.toList());
            this.reviewCount = reviews.stream().count();
            this.rate = Math.round(
                    reviews
                            .stream()
                            .mapToDouble(review -> review.getRate())
                            .average()
                            .orElse(0.0)*10)/10.0;

            this.tags = tags.stream().map(tag -> tag.getName()).collect(Collectors.toList());
        }
    }

}
