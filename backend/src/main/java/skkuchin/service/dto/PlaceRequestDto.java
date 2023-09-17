package skkuchin.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.PlaceRequest;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PlaceRequestDto {

    @Setter
    @AllArgsConstructor
    public static class PostRequest {
        @NotNull
        private Campus campus;
        @NotBlank
        private String name;
        private String reason;

        public PlaceRequest toEntity() {
            return PlaceRequest.builder()
                    .name(this.name)
                    .campus(this.campus)
                    .reason(this.reason)
                    .isChecked(false)
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

        public Response(PlaceRequest request) {
            this.id = request.getId();
            this.name = request.getName();
            this.campus = request.getCampus();
            this.reason = request.getReason();
            this.check = request.getIsChecked();
        }

    }
}
