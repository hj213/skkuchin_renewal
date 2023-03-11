package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import skkuchin.service.domain.User.*;

public class PushTokenDto {
    @Getter
    @Setter
    public static class PostRequest {
        private String endpoint;
        private Keys keys;

        @Getter
        @Setter
        public static class Keys {
            private String p256dh;
            private String auth;
        }

        public PushToken toEntity(AppUser user) {
            return PushToken.builder()
                    .endpoint(this.endpoint)
                    .p256dh(this.keys.p256dh)
                    .auth(this.keys.auth)
                    .user(user)
                    .build();
        }
    }

    @Getter
    @Setter
    public static class PutRequest {
        private Boolean chatAlarm;
        private Boolean infoAlarm;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Boolean chatAlarm;
        @JsonProperty
        private Boolean infoAlarm;

        public Response(PushToken pushToken) {
            this.chatAlarm = pushToken.isChatAlarm();
            this.infoAlarm =  pushToken.isInfoAlarm();
        }
    }
}
