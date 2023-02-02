package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.User.*;
import skkuchin.service.exception.*;
import skkuchin.service.repo.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final UserRoleRepo userRoleRepo;
    private final EmailAuthRepo emailAuthRepo;
    private final KeywordRepo keywordRepo;
    private final UserKeywordRepo userKeywordRepo;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public boolean checkUsername(String username) {
        AppUser existingUser = userRepo.findByUsername(username);
        if (existingUser == null) {
            return true;
        } else return false;
    }

    public boolean checkNickname(String nickname) {
        AppUser existingUser = userRepo.findByNickname(nickname);
        if (existingUser == null) {
            return true;
        } else return false;
    }

    @Transactional
    public AppUser saveUser(UserDto.SignUpForm signUpForm) throws MessagingException, UnsupportedEncodingException {
        log.info("Saving new user {} to the database", signUpForm.getNickname());

        if (!signUpForm.getPassword().equals(signUpForm.getRePassword())) {
            //throw new DiscordException("re_password_error");
            throw new CustomRuntimeException("회원가입 실패", "일치하지 않는 비밀번호입니다.");
        }
        signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        AppUser appUser = signUpForm.toEntity();
        AppUser newUser = userRepo.save(appUser);
        return newUser;
    }

    @Transactional
    public void saveAdmin(UserDto.SignUpForm signUpForm) {
        if (userRepo.findByUsername("admin") == null) {
            signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
            AppUser appUser = signUpForm.toEntity();
            //appUser.getRoles().add(roleRepo.findByName("ROLE_ADMIN"));
            appUser.emailVerifiedSuccess();
            UserRole userRole = UserRole.builder().user(appUser).role(roleRepo.findByName("ROLE_ADMIN")).build();
            userRepo.save(appUser);
            userRoleRepo.save(userRole);
        }
    }

    @Transactional
    public void saveTestUser(UserDto.SignUpForm signUpForm) {
        if (userRepo.findByUsername("test") == null) {
            signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
            AppUser appUser = signUpForm.toEntity();
            //appUser.getRoles().add(roleRepo.findByName("ROLE_USER"));
            appUser.emailVerifiedSuccess();
            UserRole userRole = UserRole.builder().user(appUser).role(roleRepo.findByName("ROLE_USER")).build();
            userRepo.save(appUser);
            userRoleRepo.save(userRole);
        }
    }

    @Transactional
    public Boolean confirmEmail(EmailAuthRequestDto requestDto) {
        EmailAuth emailAuth = emailAuthRepo.findByEmailAndAuthNumAndExpireDateAfter(
                requestDto.getEmail(), requestDto.getAuthNum(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthNumNotFoundException());
        AppUser user = userRepo.findByEmail(requestDto.getEmail());
        emailAuth.useToken();
        user.emailVerifiedSuccess();
        return true;
    }

    @Transactional
    public void sendEmail(UserDto.EmailRequest dto) throws MessagingException, UnsupportedEncodingException {
        if (!dto.getAgreement()) throw new CustomRuntimeException("이메일 전송 실패", "개인정보처리방침 및 이용약관에 동의해야 합니다.");
        AppUser user = userRepo.findByUsername(dto.getUsername());
        if (user == null) {
            throw new CustomRuntimeException("이메일 전송 실패", "회원가입한 유저에게만 이메일 전송이 가능합니다.");
        }
        if (user.getEmailAuth()) {
            throw new CustomRuntimeException("이메일 전송 실패", "이미 인증 완료하였습니다.");
        }
        AppUser existingUser = userRepo.findByEmail(dto.getEmail());
        if (existingUser != null && existingUser.getEmailAuth()) {
            throw new CustomRuntimeException("이메일 전송 실패", "사용 중인 이메일입니다.");
        } else {
            user.setEmail(dto.getEmail());
            user.setAgreement(true);
            emailService.sendEmail(dto.getEmail(), EmailType.SIGNUP);
        }
    }


    //이메일 인증 완료한 유저인지 확인
    @Transactional
    public Boolean checkEmail(String username) {
        AppUser user = userRepo.findByUsername(username);
        if (user == null) throw new RuntimeException("회원이 아닙니다.");
        if (user.getEmailAuth()) {
            UserRole userRole = UserRole.builder().user(user).role(roleRepo.findByName("ROLE_USER")).build();
            userRoleRepo.save(userRole);
            //user.getRoles().add(roleRepo.findByName("ROLE_USER"));
            return true;
        } else return false;
    }

    @Transactional
    public void saveRole(Role role) {
        String roleName = role.getName();
        if (roleRepo.findByName(roleName) == null) {
            log.info("Saving new role {} to the database", role.getName());
            roleRepo.save(role);
        }
    }

    public Role getRole(String roleName) {
        log.info("Fetching role {}", roleName);
        return roleRepo.findByName(roleName);
    }

    @Transactional
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        AppUser user = userRepo.findByUsername(username);
        Role role = roleRepo.findByName(roleName);
        if (userRoleRepo.findByRole(role) != null) {
            throw new DuplicateException("role_duplicate_error");
        } else {
            UserRole userRole = UserRole.builder().user(user).role(role).build();
            userRoleRepo.save(userRole);
        }
    }

    @Transactional
    public UserDto.Response getUser(Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        return new UserDto.Response(user);
    }

    @Transactional
    public AppUser getUserForRefresh(String username) {
        return userRepo.findByUsername(username);
    }

    @Transactional
    public List<UserDto.Response> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll()
                .stream()
                .map(user -> new UserDto.Response(user))
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateUser(Long userId, UserDto.PutRequest dto) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        AppUser existingUser = userRepo.findByNickname(dto.getNickname());
        if (!(existingUser == null || user.equals(existingUser)))
            throw new CustomRuntimeException("사용할 수 없는 닉네임입니다.");
        user.setNickname(dto.getNickname());
        user.setMajor(dto.getMajor());
        //user.setImage(dto.getImage());

        userRepo.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        userRepo.delete(user);
    }

    @Transactional
    public void updatePassword(UserDto.PutPassword dto, Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new CustomRuntimeException("비밀번호 변경 실패", "현재 비밀번호가 일치하지 않습니다.");
        }
        if (!dto.getNewPassword().equals(dto.getNewRePassword())) {
            throw new CustomRuntimeException("비밀번호 변경 실패", "신규 비밀번호가 일치하지 않습니다.");
        }
        String newPassword = passwordEncoder.encode(dto.getNewPassword());
        user.setPassword(newPassword);

        userRepo.save(user);
    }

    @Transactional
    public void sendResetEmail(String email, Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        if (user.getEmail() != email) {
            throw new CustomRuntimeException("비밀번호 초기화 인증 메일 발송 실패", "이메일 주소를 다시 입력하세요");
        }

    }
    @Transactional
    public void resetPassword(String email, Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
    }

    @Transactional
    public void updateToggleValue(Campus campus, Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        user.setToggle(campus);
        userRepo.save(user);
    }

    public void sendEmails(String username, String email) throws MessagingException, UnsupportedEncodingException {




    }
}
