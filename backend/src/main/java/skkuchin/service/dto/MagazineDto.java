package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.Magazine.Magazine;
import skkuchin.service.domain.Magazine.RelatePlace;
import skkuchin.service.domain.Map.Gate;
import skkuchin.service.domain.User.AppUser;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class MagazineDto {

    @Getter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest{
        @NotBlank
        private String title;

        @NotNull
        private Gate gate;

        @NotBlank
        private String content;

        @JsonProperty
        private List<Long> placeId;

        @NotBlank
        private String link;

        public Magazine toEntity(AppUser user){
            return Magazine.builder()
                    .user(user)
                    .content(content)
                    .title(title)
                    .gate(gate)
                    .date(LocalDateTime.now())
                    .link(link)
                    .build();
        }


    }


    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class Response {

        @NotBlank
        private String title;

        @NotNull
        @JsonProperty
        private Gate gate;

        @NotBlank
        private String content;

        @JsonProperty
        private List<Long> placeId;

        @NotBlank
        private String link;


        public Response(Magazine magazine, List<RelatePlace> relatePlaces) {
            this.gate = magazine.getGate();
            this.title = magazine.getTitle();
            this.content = magazine.getContent();
            this.link = magazine.getLink();
            this.placeId = relatePlaces.stream().map(relatePlace -> relatePlace.getPlace().getId()).collect(Collectors.toList());
        }
    }
}
