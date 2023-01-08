package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.ReviewKeyword;

public class ReviewKeywordDto {

    @Getter
    public static class Request {
        private String name;

        public ReviewKeyword toEntity() {
            return ReviewKeyword.builder()
                    .name(name)
                    .build();
        }
    }

    @Getter
    public static class Response {
        private Long id;
        private String name;

        public Response(ReviewKeyword keyword) {
            this.id = keyword.getId();
            this.name = keyword.getName();
        }
    }
}
