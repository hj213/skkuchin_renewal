package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Place;

import java.util.Optional;

public class RankDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Long placeId;
        @JsonProperty
        private String placeName;
        private Campus campus;
        private double rate;

        public Response(Place place, double rate) {
            this.placeId = place.getId();
            this.placeName = place.getName();
            this.campus = place.getCampus();
            this.rate = rate;
        }
    }
}
