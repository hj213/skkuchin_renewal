package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;

import javax.validation.constraints.NotNull;


public class FavoriteDto {

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {

        @JsonProperty
        @NotNull
        private Long placeId;


        public Favorite toEntity(AppUser user, Place place) {
            return Favorite.builder()
                    .user(user)
                    .place(place)
                    .build();
        }
    }


    @Getter
    public static class Response {

        private Long placeId;
        private Long userId;
        private Long id;
        private String name;
        private String detailCategory;
        private String gate;
        private String address;
        private Double xCoordinate;
        private Double yCoordinate;
        private String serviceTime;
        private String breakTime;
        private boolean discountAvailability;
        private String discountContent;
        private Category category;
        private Campus campus;


        public Response(Favorite favorite) {
            this.placeId = favorite.getPlace().getId();
            this.id = favorite.getId();
            this.name = favorite.getPlace().getName() ;
            this.category =  favorite.getPlace().getCategory();
            this.campus =  favorite.getPlace().getCampus();
        }

    }

}
