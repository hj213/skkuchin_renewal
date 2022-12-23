package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Role;
import skkuchin.service.repo.UserRepo;

import java.util.Collection;

@Component
public class UserSetUp {
    @Autowired
    private UserRepo userRepo;


    public Long saveUser(String nickname, String username, String password, Collection<Role> roles) {
        AppUser user = AppUser.builder()
                .nickname(nickname)
                .username(username)
                .password(password)
                .roles(roles)
                .build();
        return userRepo.save(user).getId();
    }

    /*
    public Long saveUser(AppUser user) {
        return userRepo.save(user).getId();
    }*/
}
