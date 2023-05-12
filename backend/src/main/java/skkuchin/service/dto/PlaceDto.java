package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.domain.Map.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.stream.Collectors;

public class PlaceDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostRequest {
        @NotBlank
        private String name;
        @NotNull
        private Category category;
        @NotBlank
        private String detailCategory;
        @NotNull
        private Campus campus;
        private Gate gate;
        @NotBlank
        private String address;
        @NotNull
        private Double xcoordinate;
        @NotNull
        private Double ycoordinate;
        private String serviceTime;
        private String breakTime;
        private Boolean discountAvailability;
        private String discountContent;
        private List<MultipartFile> images;

        public Place toEntity() {
            return Place.builder()
                    .name(this.name)
                    .detailCategory(this.detailCategory)
                    .gate(this.gate)
                    .address(this.address)
                    .xcoordinate(this.xcoordinate)
                    .ycoordinate(this.ycoordinate)
                    .serviceTime(this.serviceTime)
                    .breakTime(this.breakTime)
                    .discountAvailability(this.discountAvailability)
                    .discountContent(this.discountContent)
                    .category(this.category)
                    .campus(this.campus)
                    .build();
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PutRequest {
        @NotBlank
        private String name;
        @NotNull
        private Category category;

        @NotBlank
        private String detailCategory;
        @NotNull
        private Campus campus;
        private Gate gate;
        @NotBlank
        private String address;
        @NotNull
        private Double xcoordinate;
        @NotNull
        private Double ycoordinate;
        private String serviceTime;
        private String breakTime;
        private Boolean discountAvailability;
        private String discountContent;
        private List<String> urls;
        private List<MultipartFile> images;
    }

    /* 리뷰 전체 조회, 리뷰 상세 조회 */
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private String marker;
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

        public Response(Place place, List<Image> images, List<Review> reviews, List<Tag> tags) {
            this.id = place.getId();
            this.name = place.getName();
            this.marker = place.getCategory().getTitle();
            this.category = place.getCategory();
            this.detailCategory = place.getDetailCategory();
            this.campus = place.getCampus();
            this.gate = place.getGate();
            this.address = place.getAddress();
            this.xcoordinate = place.getXcoordinate();
            this.ycoordinate = place.getYcoordinate();
            this.serviceTime = place.getServiceTime();
            this.breakTime = place.getBreakTime();
            this.discountAvailability = place.getDiscountAvailability();
            this.discountContent = place.getDiscountContent();
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

    @Getter
    public static class AdminResponse {
        private Long id;
        private String name;
        private Category category;
        private Campus campus;

        public AdminResponse(Place place) {
            this.id = place.getId();
            this.name = place.getName();
            this.category = place.getCategory();
            this.campus = place.getCampus();
        }
    }
}
