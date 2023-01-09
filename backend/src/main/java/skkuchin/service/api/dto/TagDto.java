package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.Tag;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class TagDto {

    @Getter
    public static class Request {
        @NotBlank
        private String name;

        public Tag toEntity() {
            return Tag.builder()
                    .name(name)
                    .build();
        }
    }

    @Getter
    public static class Response {
        @NotNull
        private Long id;
        @NotBlank
        private String name;

        public Response(Tag tag) {
            this.id = tag.getId();
            this.name = tag.getName();
        }
    }
}
