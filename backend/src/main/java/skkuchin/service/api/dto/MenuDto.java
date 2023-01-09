package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;

import java.time.LocalDateTime;

public class MenuDto {


    @Getter
    public static class PostRequest {
        private Long placeId;
        private String name;
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
    public static class Response {

        private String name;
        private int price;
        private Long placeId;
        private Long id;

        public Response(Menu menu) {

            this.name = menu.getName();
            this.price = menu.getPrice();
            this.id = menu.getId();
            this.placeId = menu.getPlace().getId();


        }
    }

}
