package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.User.Profile;
import skkuchin.service.domain.User.*;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Optional;


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
        @NotNull
        @JsonProperty
        @Min(value = 10)
        @Max(value = 23)
        private int studentId;
        @NotNull
        private Major major;
        @NotNull
        private Profile image;

        public AppUser toEntity() {
            return AppUser.builder()
                    .nickname(this.nickname)
                    .username(this.username)
                    .password(this.password)
                    .studentId(this.studentId)
                    .major(this.major)
                    .image(this.image)
                    .toggle(findCampus(this.major))
                    .startDate(LocalDateTime.now())
                    .emailAuth(false)
                    .build();
        }

        public Campus findCampus(Major major) {
            EnumSet<Major> majors = EnumSet.allOf(Major.class);
            List<Major> majorList = new ArrayList<>();
            majorList.addAll(majors);

            if (majorList.indexOf(major) < majorList.indexOf(Major.건설환경공학부)) {
                return Campus.명륜;
            } else {
                return Campus.율전;
            }
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
    @AllArgsConstructor
    public static class EmailRequest {
        @NotBlank
        private String username;
        @NotBlank
        private String email;
        @NotNull
        private Boolean agreement;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PutRequest {
        @NotBlank
        private String nickname;
        @NotNull
        private Major major;
        @NotNull
        private Profile image;
        @NotNull
        @JsonProperty
        @Min(value = 10)
        @Max(value = 23)
        private int studentId;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PutPassword {
        @NotBlank
        private String password;
        @JsonProperty
        @NotBlank
        private String newPassword;
        @JsonProperty
        @NotBlank
        private String newRePassword;
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ResetPassword {
        @NotBlank
        private String email;
        @JsonProperty
        @NotBlank
        private String newPassword;
        @JsonProperty
        @NotBlank
        private String newRePassword;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        private String nickname;
        private String username;
        @JsonProperty
        private int studentId;
        private Major major;
        private Profile image;
        private Campus campus;
        private Campus toggle;
        private Optional<Gender> gender;

        public Response(AppUser user) {
            this.id = user.getId();
            this.nickname = user.getNickname();
            this.username = user.getUsername();
            this.studentId = user.getStudentId();
            this.major = user.getMajor();
            this.image = user.getImage();
            this.campus = findCampus(user.getMajor());
            this.toggle = user.getToggle();
            this.gender = Optional.ofNullable(user.getGender());
        }

        public Campus findCampus(Major major) {
            EnumSet<Major> majors = EnumSet.allOf(Major.class);
            List<Major> majorList = new ArrayList<>();
            majorList.addAll(majors);

            if (majorList.indexOf(major) < majorList.indexOf(Major.건설환경공학부)) {
                return Campus.명륜;
            } else {
                return Campus.율전;
            }
        }
    }


    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class chatRoomResponse {
        private Long id;
        private String nickname;
        private String username;
        private Major major;
        private Profile image;

        public chatRoomResponse(AppUser user) {
            this.id = user.getId();
            this.nickname = user.getNickname();
            this.username = user.getUsername();
            this.major = user.getMajor();
            this.image = user.getImage();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class DebeziumUserResponse {
        private Long id;
        private String nickname;
        private String username;
        private Major major;
        private Profile image;
    }
}
