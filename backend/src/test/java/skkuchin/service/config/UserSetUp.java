package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.domain.User.*;
import skkuchin.service.repo.UserRepo;

import java.time.LocalDateTime;
import java.util.Collection;

@Component
public class UserSetUp {
    @Autowired
    private UserRepo userRepo;


    public Long saveUser(String nickname, String username, String password, String email, int student_id, Major major) {
        AppUser user = AppUser.builder()
                .nickname(nickname)
                .username(username)
                .password(password)
                .email(email)
                .studentId(student_id)
                .major(major)
                .startDate(LocalDateTime.now())
                .build();
        return userRepo.save(user).getId();
    }

    /*
    public Long saveUser(AppUser user) {
        return userRepo.save(user).getId();
    }*/
}
