package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.*;

public class ImageDto {

    @Getter
    public static class PostRequest {
        private Long placeId;
        private String url;

        public Image toEntity(Place place) {
            return Image.builder()
                    .place(place)
                    .url(this.url)
                    .build();
        }
    }

    @Getter
    public static class PutRequest {
        private String url;
    }

    /* 이미지 전체 조회, 이미지 상세 조회 */
    @Getter
    public static class Response {
        private Long id;
        private String placeName;
        private String url;

        public Response(Image image) {
            this.id = image.getId();
            this.placeName = image.getPlace().getName();
            this.url = image.getUrl();
        }
    }
}
