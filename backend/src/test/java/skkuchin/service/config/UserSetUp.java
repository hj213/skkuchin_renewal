package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;
import skkuchin.service.domain.User.Role;
import skkuchin.service.repo.UserRepo;

import java.time.LocalDateTime;
import java.util.Collection;

@Component
public class UserSetUp {
    @Autowired
    private UserRepo userRepo;


    public Long saveUser(String nickname, String username, String password, String email, String student_id, Major major, String image, Mbti mbti, Collection<Role> roles) {
        AppUser user = AppUser.builder()
                .nickname(nickname)
                .username(username)
                .password(password)
                .email(email)
                .studentId(student_id)
                .major(major)
                .image(image)
                .mbti(mbti)
                .start_date(LocalDateTime.now())
                .roles(roles)
                .build();
        return userRepo.save(user).getId();
    }

    /*
    public Long saveUser(AppUser user) {
        return userRepo.save(user).getId();
    }*/
}
