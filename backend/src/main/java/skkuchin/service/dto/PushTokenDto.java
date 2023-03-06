package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.User.*;

public class PushTokenDto {
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        private String token;
        @JsonProperty
        private Boolean isChatAlarmOn;
        @JsonProperty
        private Boolean isInfoAlarmOn;

        public PushToken toEntity(AppUser user) {
            return PushToken.builder()
                    .token(this.token)
                    .isChatAlarmOn(this.isChatAlarmOn)
                    .isInfoAlarmOn(this.isInfoAlarmOn)
                    .user(user)
                    .build();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Long tokenId;
        private String token;
        @JsonProperty
        private Boolean isChatAlarmOn;
        @JsonProperty
        private Boolean isInfoAlarmOn;

        public Response(PushToken pushToken) {
            this.tokenId = pushToken.getId();
            this.token = pushToken.getToken() ;
            this.isChatAlarmOn = pushToken.isChatAlarmOn();
            this.isInfoAlarmOn =  pushToken.isInfoAlarmOn();
        }
    }
}
