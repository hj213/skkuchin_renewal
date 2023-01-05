package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.*;

import java.util.List;
import java.util.stream.Collectors;

public class PlaceDto {

    @Getter
    public static class PostRequest {
        private String name;
        private String detail_category;
        private Location location;
        private String address;
        private Double x_coordinate;
        private Double y_coordinate;
        private String service_time;
        private String break_time;
        private Boolean discount_availability;
        private String discount_content;
        private Category category;
        private Campus campus;

        public Place toEntity() {
            return Place.builder()
                    .name(this.name)
                    .detail_category(this.detail_category)
                    .location(this.location)
                    .address(this.address)
                    .x_coordinate(this.x_coordinate)
                    .y_coordinate(this.y_coordinate)
                    .service_time(this.service_time)
                    .break_time(this.break_time)
                    .discount_availability(this.discount_availability)
                    .discount_content(this.discount_content)
                    .category(this.category)
                    .campus(this.campus)
                    .build();
        }
    }

    @Getter
    public static class PutRequest {
        private String name;
        private String detail_category;
        private Location location;
        private String address;
        private Double x_coordinate;
        private Double y_coordinate;
        private String service_time;
        private String break_time;
        private Boolean discount_availability;
        private String discount_content;
        private Category category;
        private Campus campus;
    }

    /* 리뷰 전체 조회, 리뷰 상세 조회 */
    @Getter
    public static class Response {
        private Long id;
        private String name;
        private String detail_category;
        private Location location;
        private String address;
        private Double x_coordinate;
        private Double y_coordinate;
        private String service_time;
        private String break_time;
        private Boolean discount_availability;
        private String discount_content;
        private Category category;
        private Campus campus;
        private List<String> image;
        private Long review_count;
        private Double rate;

        public Response(Place place, List<Image> images, List<Review> reviews) {
            this.id = place.getId();
            this.name = place.getName();
            this.detail_category = place.getDetail_category();
            this.location = place.getLocation();
            this.address = place.getAddress();
            this.x_coordinate = place.getX_coordinate();
            this.y_coordinate = place.getY_coordinate();
            this.service_time = place.getService_time();
            this.break_time = place.getBreak_time();
            this.discount_availability = place.getDiscount_availability();
            this.discount_content = place.getDiscount_content();
            this.category = place.getCategory();
            this.campus = place.getCampus();
            this.image = images.stream().map(image -> image.getUrl()).collect(Collectors.toList());
            this.review_count = reviews.stream().count();
            this.rate = Math.round(
                    reviews
                    .stream()
                    .mapToDouble(review -> review.getRate())
                    .average()
                    .orElse(0.0)*10)/10.0;
        }
    }
}
