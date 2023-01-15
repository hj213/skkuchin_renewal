package skkuchin.service.service;

import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Role;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    boolean checkUsername(String username);
    //AppUser saveUser(AppUser user) throws MessagingException, UnsupportedEncodingException;
    AppUser saveUser(UserDto.SignUpForm signUpForm) throws MessagingException, UnsupportedEncodingException;
    void saveAdmin(UserDto.SignUpForm signUpForm);
    void saveTestUser(UserDto.SignUpForm signUpForm);
    Boolean confirmEmail(EmailAuthRequestDto requestDto);
    void saveRole(Role role);
    Role getRole(String roleName);
    void addRoleToUser(String username, String roleName);
    UserDto.Response getUser(String username);
    AppUser getUserForRefresh(String username);
    List<UserDto.Response> getUsers();
}
