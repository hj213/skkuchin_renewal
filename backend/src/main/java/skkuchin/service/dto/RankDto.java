package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;

import java.util.List;

public class RankDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Long placeId;
        @JsonProperty
        private String placeName;
        private String image;
        private double rate;

        public Response(Place place, List<Image> images, double rate) {
            this.placeId = place.getId();
            this.placeName = place.getName();
            if (images != null && !images.isEmpty()) {
                this.image = images.get(0).getUrl();
            }
            this.rate = Math.round(rate*10)/10.0;
        }
    }
}
