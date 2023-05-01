package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import nl.martijndwars.webpush.Subscription;
import skkuchin.service.domain.User.*;

public class PushTokenDto {
    @Getter
    @Setter
    public static class PostRequest {
        private Subscription subscription;

        public PushToken toEntity(AppUser user) {
            return PushToken.builder()
                    .endpoint(this.subscription.endpoint)
                    .p256dh(this.subscription.keys.p256dh)
                    .auth(this.subscription.keys.auth)
                    .user(user)
                    .ChatAlarm(true)
                    .infoAlarm(true)
                    .build();
        }
    }

    @Getter
    @Setter
    public static class PhoneRequest {
        private String phone;

        public PushToken toEntity(AppUser user) {
            return PushToken.builder()
                    .phone(this.phone)
                    .user(user)
                    .ChatAlarm(true)
                    .infoAlarm(true)
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
        private String phone;
        @JsonProperty
        private Boolean chatAlarm;
        @JsonProperty
        private Boolean infoAlarm;
        @JsonProperty
        private Boolean webPush;


        public Response(PushToken pushToken) {
            this.phone = pushToken.getPhone();
            this.chatAlarm = pushToken.isChatAlarm();
            this.infoAlarm =  pushToken.isInfoAlarm();
            if (pushToken.getAuth() == null) {
                this.webPush = false;
            } else {
                this.webPush = true;
            }
        }
    }
}
