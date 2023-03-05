package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;

import javax.validation.constraints.NotNull;

public class ImageDto {

    @Setter
    @AllArgsConstructor
    public static class PostRequest {
        @NotNull
        private Long place_id;
        private MultipartFile image;

        public Image toEntity(Place place, String url) {
            return Image.builder()
                    .place(place)
                    .url(url)
                    .build();
        }

        public @NotNull Long getPlaceId() {
            return this.place_id;
        }

        public MultipartFile getImage() {
            return this.image;
        }
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PutRequest {
        private MultipartFile image;
    }

    /* 이미지 전체 조회, 이미지 상세 조회 */
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        @JsonProperty
        private Long placeId;
        @JsonProperty
        private String placeName;
        private String url;

        public Response(Image image) {
            this.id = image.getId();
            this.placeId = image.getPlace().getId();
            this.placeName = image.getPlace().getName();
            this.url = image.getUrl();
        }
    }
}
