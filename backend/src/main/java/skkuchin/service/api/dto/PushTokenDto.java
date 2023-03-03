package skkuchin.service.api.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.PushToken;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PushTokenDto {
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotBlank
        private String token;
        @NotNull
        private Boolean isChatAlarmOn;
        @NotNull
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
}
