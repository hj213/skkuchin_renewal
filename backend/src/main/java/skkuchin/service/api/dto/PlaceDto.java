package skkuchin.service.api.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

public class PlaceDto {

    @Getter
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotBlank
        private String name;
        private String detailCategory;
        private Gate gate;
        @NotBlank
        private String address;
        @NotNull
        private Double xCoordinate;
        @NotNull
        private Double yCoordinate;
        private String serviceTime;
        private String breakTime;
        private Boolean discountAvailability;
        private String discountContent;
        private Category category;
        @NotNull
        private Campus campus;

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
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        private String name;
        private String detailCategory;
        private Gate gate;
        private String address;
        private Double xCoordinate;
        private Double yCoordinate;
        private String serviceTime;
        private String breakTime;
        private Boolean discountAvailability;
        private String discountContent;
        private Category category;
        private Campus campus;
        private List<String> image;
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
