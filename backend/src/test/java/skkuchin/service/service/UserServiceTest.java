package skkuchin.service.service;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import skkuchin.service.common.MockTest;
import skkuchin.service.mail.EmailService;
import skkuchin.service.repo.RoleRepo;
import skkuchin.service.repo.UserRepo;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

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
/*
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
    }*/


}
