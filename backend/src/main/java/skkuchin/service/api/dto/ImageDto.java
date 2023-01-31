package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.domain.Map.*;

import javax.validation.constraints.NotNull;

public class ImageDto {

    @Getter
    @Setter
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
    }

    @Getter
    @Setter
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
