package skkuchin.service.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpForm {

    @NotBlank
    private String nickname;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private String re_password;
    @NotBlank
    private String email;
    @NotBlank
    private String student_id;
    @NotNull
    private Major major;
    @NotBlank
    private String image;
    private Boolean agreement;
    private Mbti mbti;

    public boolean checkPassword() {
        if (this.password.equals(this.re_password)) return true;
        else return false;
    }

    public AppUser toEntity() {
        return AppUser.builder()
                .nickname(this.nickname)
                .username(this.username)
                .password(this.password)
                .email(this.email)
                .student_id(this.student_id)
                .major(this.major)
                .image(this.image)
                .mbti(this.mbti)
                .start_date(LocalDateTime.now())
                .roles(new ArrayList<>())
                .emailAuth(false)
                .build();
    }
}
