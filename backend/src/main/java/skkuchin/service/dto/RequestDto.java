package skkuchin.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class RequestDto {

    @Setter
    @AllArgsConstructor
    public static class PostRequest {
        @NotNull
        private Campus campus;
        @NotBlank
        private String name;
        private String reason;

        public Request toEntity() {
            return Request.builder()
                    .name(this.name)
                    .campus(this.campus)
                    .reason(this.reason)
                    .check(false)
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
        private Campus campus;
        private String reason;
    }

    @Getter
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private Campus campus;
        private String reason;
        private Boolean check;

        public Response(Request request) {
            this.id = request.getId();
            this.name = request.getName();
            this.campus = request.getCampus();
            this.reason = request.getReason();
            this.check = request.getCheck();
        }

    }
}
