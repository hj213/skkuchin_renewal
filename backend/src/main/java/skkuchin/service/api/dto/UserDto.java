package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;


public class UserDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class SignUpForm {
        @NotBlank
        private String nickname;
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        @JsonProperty
        private String rePassword;
        @NotBlank
        private String email;
        @NotBlank
        @JsonProperty
        private String studentId;
        @NotNull
        private Major major;
        @NotBlank
        private String image;
        private Mbti mbti;

        public boolean checkPassword() {
            if (this.password.equals(this.rePassword)) return true;
            else return false;
        }

        public AppUser toEntity() {
            return AppUser.builder()
                    .nickname(this.nickname)
                    .username(this.username)
                    .password(this.password)
                    .email(this.email)
                    .studentId(this.studentId)
                    .major(this.major)
                    .image(this.image)
                    .mbti(this.mbti)
                    .startDate(LocalDateTime.now())
                    .roles(new ArrayList<>())
                    .emailAuth(false)
                    .build();
        }
    }

    @Getter
    public static class RoleToUser {
        private String username;
        private String roleName;
    }

    @Getter
    @AllArgsConstructor
    public static class TokenResponse {
        private String access;
        private String refresh;
    }
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        private String nickname;
        private String username;
        private String email;
        @JsonProperty
        private String studentId;
        private Major major;
        private String image;
        private Mbti mbti;

        public Response(AppUser user) {
            this.id = user.getId();
            this.nickname = user.getNickname();
            this.username = user.getUsername();
            this.email = user.getEmail();
            this.studentId = user.getStudentId();
            this.major = user.getMajor();
            this.image = user.getImage();
            this.mbti = user.getMbti();
        }
    }
}
