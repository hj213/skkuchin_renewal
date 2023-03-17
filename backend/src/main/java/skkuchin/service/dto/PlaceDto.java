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

    @Setter
    @AllArgsConstructor
    public static class PostRequest {
        @NotBlank
        private String name;
        @NotNull
        private Category category;
        @JsonProperty
        @NotBlank
        private String detail_category;
        @NotNull
        private Campus campus;
        private Gate gate;
        @NotBlank
        private String address;
        @NotNull
        private Double xcoordinate;
        @NotNull
        private Double ycoordinate;
        @JsonProperty
        private String service_time;
        @JsonProperty
        private String break_time;
        @JsonProperty
        private Boolean discount_availability;
        @JsonProperty
        private String discount_content;
        private List<MultipartFile> images;

        public Place toEntity() {
            return Place.builder()
                    .name(this.name)
                    .detailCategory(this.detail_category)
                    .gate(this.gate)
                    .address(this.address)
                    .xcoordinate(this.xcoordinate)
                    .ycoordinate(this.ycoordinate)
                    .serviceTime(this.service_time)
                    .breakTime(this.break_time)
                    .discountAvailability(this.discount_availability)
                    .discountContent(this.discount_content)
                    .category(this.category)
                    .campus(this.campus)
                    .build();
        }

        public @NotBlank String getName() {
            return this.name;
        }

        public @NotNull Category getCategory() {
            return this.category;
        }

        public @NotBlank String getDetailCategory() {
            return this.detail_category;
        }

        public @NotNull Campus getCampus() {
            return this.campus;
        }

        public Gate getGate() {
            return this.gate;
        }

        public @NotBlank String getAddress() {
            return this.address;
        }

        public @NotNull Double getXcoordinate() {
            return this.xcoordinate;
        }

        public @NotNull Double getYcoordinate() {
            return this.ycoordinate;
        }

        public String getServiceTime() {
            return this.service_time;
        }

        public String getBreakTime() {
            return this.break_time;
        }

        public Boolean getDiscountAvailability() {
            return this.discount_availability;
        }

        public String getDiscountContent() {
            return this.discount_content;
        }

        public List<MultipartFile> getImages() {
            return this.images;
        }
    }

    @Setter
    @AllArgsConstructor
    public static class PutRequest {
        @NotBlank
        private String name;
        @NotNull
        private Category category;
        @JsonProperty
        @NotBlank
        private String detail_category;
        @NotNull
        private Campus campus;
        private Gate gate;
        @NotBlank
        private String address;
        @NotNull
        private Double xcoordinate;
        @NotNull
        private Double ycoordinate;
        @JsonProperty
        private String service_time;
        @JsonProperty
        private String break_time;
        @JsonProperty
        private Boolean discount_availability;
        @JsonProperty
        private String discount_content;
        private List<String> urls;
        private List<MultipartFile> images;

        public @NotBlank String getName() {
            return this.name;
        }

        public @NotNull Category getCategory() {
            return this.category;
        }

        public @NotBlank String getDetailCategory() {
            return this.detail_category;
        }

        public @NotNull Campus getCampus() {
            return this.campus;
        }

        public Gate getGate() {
            return this.gate;
        }

        public @NotBlank String getAddress() {
            return this.address;
        }

        public @NotNull Double getXcoordinate() {
            return this.xcoordinate;
        }

        public @NotNull Double getYcoordinate() {
            return this.ycoordinate;
        }

        public String getServiceTime() {
            return this.service_time;
        }

        public String getBreakTime() {
            return this.break_time;
        }

        public Boolean getDiscountAvailability() {
            return this.discount_availability;
        }

        public String getDiscountContent() {
            return this.discount_content;
        }

        public List<String> getUrls() {
            return this.urls;
        }

        public List<MultipartFile> getImages() {
            return this.images;
        }
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
}
