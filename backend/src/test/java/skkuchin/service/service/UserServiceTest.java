package skkuchin.service.service;

import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import skkuchin.service.api.dto.SignUpForm;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;
import skkuchin.service.domain.User.Role;
import skkuchin.service.exception.DuplicateException;
import skkuchin.service.mail.EmailAuthRepo;
import skkuchin.service.mail.EmailService;
import skkuchin.service.repo.RoleRepo;
import skkuchin.service.repo.UserRepo;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

public class UserServiceTest extends MockTest {
    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private UserRepo userRepo;
    @Mock
    private RoleRepo roleRepo;
    @Mock
    private EmailService emailService;
    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        ReflectionTestUtils.setField(userService, "passwordEncoder", passwordEncoder);
    }

    @Test
    public void username으로_user_불러오기_성공() {
        //given
        Collection<Role> roles = new ArrayList<>();
        roles.add(new Role(1L, "ROLE_USER"));
        AppUser user = new AppUser(1L, "user", "user111", "1234", "dlaudwns789@gmail.com", "2016310372", Major.글로벌경영학과, "이미지", Mbti.ENFP, LocalDateTime.now(), roles, true);
        given(userRepo.findByUsername(any())).willReturn(user);

        //when
        UserDetails test = userService.loadUserByUsername("user");

        //then
        assertThat(test).isNotNull();
    }

    @Test(expected = UsernameNotFoundException.class)
    public void username으로_user_불러오기_실패() {
        //given
        given(userRepo.findByUsername("user2")).willReturn(null);

        //when
        UserDetails test = userService.loadUserByUsername("user2");
    }

    @Test
    public void saveUser_성공() throws MessagingException, UnsupportedEncodingException {
        //given
        Collection<Role> roles = new ArrayList<>();
        roles.add(new Role(1L, "ROLE_USER"));
        AppUser userReturnedByRepo = new AppUser(1L, "user", "user111", "encoderPassword", "dlaudwns789@gmail.com", "2016310372", Major.글로벌경영학과, "이미지", Mbti.ENFP, LocalDateTime.now(), roles, false);
        SignUpForm signUpForm = new SignUpForm("user", "user111", "1234", "1234", "dlaudwns789@gmail.com", "2016310372", Major.글로벌경영학과, "이미지", false, Mbti.ENFP);

        given(passwordEncoder.encode(anyString())).willReturn("encoderPassword");
        given(userRepo.save(any())).willReturn(userReturnedByRepo);
        doNothing().when(emailService).sendEmail(signUpForm.getEmail());

        //when
        AppUser savedUser = userService.saveUser(signUpForm);

        //then
        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getNickname()).isEqualTo(signUpForm.getNickname());
        assertThat(savedUser.getUsername()).isEqualTo(signUpForm.getUsername());
        assertThat(savedUser.getPassword()).isEqualTo("encoderPassword");
    }

    @Test
    public void user_role_추가_성공() {
        //given
        Role role = new Role(1L, "ROLE_USER");
        Collection<Role> roles = new ArrayList<>();
        AppUser user = new AppUser(1L, "user", "user111", "1234", "dlaudwns789@gmail.com", "2016310372", Major.글로벌경영학과, "이미지", Mbti.ENFP, LocalDateTime.now(), roles, false);
        given(userRepo.findByUsername("user111")).willReturn(user);
        given(roleRepo.findByName("ROLE_USER")).willReturn(role);

        //when
        userService.addRoleToUser(user.getUsername(), role.getName());
    }

    @Test(expected = DuplicateException.class)
    @DisplayName("addRoleToUser 실패")
    public void user_role_이미_존재하면_추가x() {
        //given
        Role role = new Role(1L, "ROLE_USER");
        Collection<Role> roles = new ArrayList<>();
        roles.add(role);
        AppUser user = new AppUser(1L, "user", "user111", "1234", "dlaudwns789@gmail.com", "2016310372", Major.글로벌경영학과, "이미지", Mbti.ENFP, LocalDateTime.now(), roles, false);
        given(userRepo.findByUsername("user111")).willReturn(user);
        given(roleRepo.findByName("ROLE_USER")).willReturn(role);

        //when
        userService.addRoleToUser(user.getUsername(), role.getName());
    }


}
