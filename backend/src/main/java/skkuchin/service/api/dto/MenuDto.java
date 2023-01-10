package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class MenuDto {

    /* 메뉴 등록 */
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @JsonProperty
        @NotNull
        private Long placeId;
        @NotBlank
        private String name;
        @NotNull
        private int price;

        public Menu toEntity(Place place) {
            return Menu.builder()
                    .place(place)
                    .name(name)
                    .price(price)
                    .build();
        }
    }

    /* 메뉴조회 */
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        @JsonProperty
        private Long placeId;
        private String name;
        private int price;

        public Response(Menu menu) {
            this.id = menu.getId();
            this.placeId = menu.getPlace().getId();
            this.name = menu.getName();
            this.price = menu.getPrice();
        }
    }

}
