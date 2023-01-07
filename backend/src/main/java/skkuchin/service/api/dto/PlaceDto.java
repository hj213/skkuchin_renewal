package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PlaceDto {

    @Getter
//    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotBlank
        private String name;
        private Category category;
        @JsonProperty
        private String detailCategory;
        @NotNull
        private Campus campus;
        private Gate gate;
        @NotBlank
        private String address;
        @NotNull
        @JsonProperty
        private Double xCoordinate;
        @NotNull
        @JsonProperty
        private Double yCoordinate;
        @JsonProperty
        private String serviceTime;
        @JsonProperty
        private String breakTime;
        @JsonProperty
        private Boolean discountAvailability;
        @JsonProperty
        private String discountContent;

        public Place toEntity() {
            return Place.builder()
                    .name(this.name)
                    .detailCategory(this.detailCategory)
                    .gate(this.gate)
                    .address(this.address)
                    .xCoordinate(this.xCoordinate)
                    .yCoordinate(this.yCoordinate)
                    .serviceTime(this.serviceTime)
                    .breakTime(this.breakTime)
                    .discountAvailability(this.discountAvailability)
                    .discountContent(this.discountContent)
                    .category(this.category)
                    .campus(this.campus)
                    .build();
        }
    }

    /* 리뷰 전체 조회, 리뷰 상세 조회 */
    @Getter
    public static class Response {
        private Long id;
        private String name;
        private Category category;
        @JsonProperty
        private String detailCategory;
        private Campus campus;
        private Gate gate;
        private String address;
        @JsonProperty
        private Double xCoordinate;
        @JsonProperty
        private Double yCoordinate;
        @JsonProperty
        private String serviceTime;
        @JsonProperty
        private String breakTime;
        @JsonProperty
        private Boolean discountAvailability;
        @JsonProperty
        private String discountContent;
        private List<String> image;
        @JsonProperty
        private Long reviewCount;
        private Double rate;

        public Response(Place place, List<Image> images, List<Review> reviews) {
            this.id = place.getId();
            this.name = place.getName();
            this.detailCategory = place.getDetailCategory();
            this.gate = place.getGate();
            this.address = place.getAddress();
            this.xCoordinate = place.getXCoordinate();
            this.yCoordinate = place.getYCoordinate();
            this.serviceTime = place.getServiceTime();
            this.breakTime = place.getBreakTime();
            this.discountAvailability = place.getDiscountAvailability();
            this.discountContent = place.getDiscountContent();
            this.category = place.getCategory();
            this.campus = place.getCampus();
            this.image = images.stream().map(image -> image.getUrl()).collect(Collectors.toList());
            this.reviewCount = reviews.stream().count();
            this.rate = Math.round(
                    reviews
                    .stream()
                    .mapToDouble(review -> review.getRate())
                    .average()
                    .orElse(0.0)*10)/10.0;
        }
    }
}
