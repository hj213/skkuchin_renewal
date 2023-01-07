package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skkuchin.service.domain.Map.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ImageDto {

    @Getter
    @NoArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotNull
        @JsonProperty
        private Long placeId;

        @NotBlank
        private String url;

        public PostRequest(String url) {
            this.url = url;
        }

        public Image toEntity(Place place) {
            return Image.builder()
                    .place(place)
                    .url(this.url)
                    .build();
        }
    }

    @Getter
    public static class PutRequest {
        @NotBlank
        private String url;
    }

    /* 이미지 전체 조회, 이미지 상세 조회 */
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        @JsonProperty
        private String placeName;
        private String url;

        public Response(Image image) {
            this.id = image.getId();
            this.placeName = image.getPlace().getName();
            this.url = image.getUrl();
        }
    }
}
