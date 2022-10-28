package skkuchin.service.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import skkuchin.service.domain.AppUser;

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

    public boolean checkPassword() {
        if (this.password.equals(this.re_password)) return true;
        else return false;
    }

    public AppUser toEntity() {
        return AppUser
                .builder().nickname(this.nickname).username(this.username).password(this.password)
                .roles(new ArrayList<>())
                .emailAuth(false)
                .build();
    }
}
