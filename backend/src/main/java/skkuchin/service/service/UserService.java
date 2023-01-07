package skkuchin.service.service;

import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.SignUpForm;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Role;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    boolean checkUsername(String username);
    //AppUser saveUser(AppUser user) throws MessagingException, UnsupportedEncodingException;
    AppUser saveUser(SignUpForm signUpForm) throws MessagingException, UnsupportedEncodingException;
    void saveAdmin(SignUpForm signUpForm);
    Boolean confirmEmail(EmailAuthRequestDto requestDto);
    void saveRole(Role role);
    Role getRole(String roleName);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> getUsers();
}
