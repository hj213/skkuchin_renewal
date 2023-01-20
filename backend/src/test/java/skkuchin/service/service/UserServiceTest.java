package skkuchin.service.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;
import skkuchin.service.domain.User.Role;
import skkuchin.service.exception.DuplicateException;
import skkuchin.service.repo.RoleRepo;
import skkuchin.service.repo.UserRepo;

import javax.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collection;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

public class UserServiceTest extends MockTest {
    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepo userRepo;
    @Mock
    private RoleRepo roleRepo;
    @Mock
    private EmailService emailService;
    @Mock
    private PasswordEncoder passwordEncoder;

    @Before
    public void setUp() {
        ReflectionTestUtils.setField(userService, "passwordEncoder", passwordEncoder);
    }

    @Test
    public void saveUser_성공() throws MessagingException, UnsupportedEncodingException {
        //given
        Collection<Role> roles = new ArrayList<>();
        roles.add(new Role(1L, "ROLE_USER"));
        AppUser userReturnedByRepo = AppUser.builder()
                .id(1L).nickname("user").username("user111").password("encoderPassword").email("dlaudwns789@gmail.com").studentId("2016310372").major(Major.글로벌경영학과).roles(roles)
                .build();
        UserDto.SignUpForm signUpForm = new UserDto.SignUpForm("user", "user111", "1234", "1234", "dlaudwns789@gmail.com", "2016310372", Major.글로벌경영학과);

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
        verify(emailService, times(1)).sendEmail(signUpForm.getEmail());
    }

    @Test
    public void user_role_추가_성공() {
        //given
        Role role = new Role(1L, "ROLE_USER");
        Collection<Role> roles = new ArrayList<>();
        AppUser user = AppUser.builder()
                .id(1L).nickname("user").username("user111").password("encoderPassword").email("dlaudwns789@gmail.com").studentId("2016310372").major(Major.글로벌경영학과).image("이미지").mbti(Mbti.ENFP).roles(roles)
                .build();
        given(userRepo.findByUsername("user111")).willReturn(user);
        given(roleRepo.findByName("ROLE_USER")).willReturn(role);

        //when
        userService.addRoleToUser(user.getUsername(), role.getName());

        //then
        verify(userRepo, times(1)).findByUsername("user111");
        verify(roleRepo, times(1)).findByName("ROLE_USER");
    }

    @Test
    public void addRoleToUser_role_이미_존재하면_추가x() {
        //given
        Role role = new Role(1L, "ROLE_USER");
        Collection<Role> roles = new ArrayList<>();
        roles.add(role);
        AppUser user = AppUser.builder()
                .id(1L).nickname("user").username("user111").password("encoderPassword").email("dlaudwns789@gmail.com").studentId("2016310372").major(Major.글로벌경영학과).image("이미지").mbti(Mbti.ENFP).roles(roles)
                .build();
        given(userRepo.findByUsername("user111")).willReturn(user);
        given(roleRepo.findByName("ROLE_USER")).willReturn(role);

        //when
        assertThrows(DuplicateException.class, () -> {userService.addRoleToUser(user.getUsername(), role.getName());});
    }


}
