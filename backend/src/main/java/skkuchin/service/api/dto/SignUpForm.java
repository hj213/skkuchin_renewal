package skkuchin.service.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpForm {

    private String nickname;
    private String username;
    private String password;
    private String re_password;
    private String email;
    private String student_id;
    private Major major;
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
