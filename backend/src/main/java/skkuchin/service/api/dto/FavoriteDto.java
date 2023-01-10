package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;

import javax.validation.constraints.NotNull;
import java.util.List;


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

        private Long id;
        private String name;
        private Long placeId;
        private Category category;
        private String detailCategory;
        private Campus campus;
        private Gate gate;
        private String address;
        private Double xCoordinate;
        private Double yCoordinate;
        private String serviceTime;
        private String breakTime;
        private Boolean discountAvailability;
        private String discountContent;
        private List<String> image;
        @JsonProperty
        private Long reviewCount;
        private Double rate;
        private List<String> tags;










        public Response(Favorite favorite) {
            this.placeId = favorite.getPlace().getId();
            this.id = favorite.getId();
            this.name = favorite.getPlace().getName() ;
            this.category =  favorite.getPlace().getCategory();
            this.campus =  favorite.getPlace().getCampus();
            this.gate = favorite.getPlace().getGate();
            this.address = favorite.getPlace().getAddress();
            this.xCoordinate = favorite.getPlace().getXcoordinate();
            this.yCoordinate = favorite.getPlace().getYcoordinate();
            this.serviceTime = favorite.getPlace().getServiceTime();
            this.breakTime = favorite.getPlace().getBreakTime();
            this.discountAvailability = favorite.getPlace().getDiscountAvailability();
            this.discountContent = favorite.getPlace().getDiscountContent();


        }

    }

}
