package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.User.*;
import skkuchin.service.exception.*;
import skkuchin.service.repo.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final BlockRepo blockRepo;
    private final UserRoleRepo userRoleRepo;
    private final EmailAuthRepo emailAuthRepo;
    private final PasswordEncoder passwordEncoder;

    public void checkUsername(String username) {
        if (username == null || username.isBlank()) {
            throw new CustomRuntimeException("아이디를 입력해주시기 바랍니다", "아이디 중복확인 실패");
        }

        AppUser existingUser = userRepo.findByUsername(username);
        if (existingUser != null) {
            throw new CustomRuntimeException("사용 중인 아이디입니다", "아이디 중복확인 실패");
        }
    }

    public void checkNickname(String nickname) {
        if (nickname == null || nickname.isBlank()) {
            throw new CustomRuntimeException("닉네임을 입력해주시기 바랍니다", "닉네임 중복확인 실패");
        }

        AppUser existingUser = userRepo.findByNickname(nickname);
        if (existingUser != null) {
            throw new CustomRuntimeException("사용 중인 닉네임입니다", "닉네임 중복확인 실패");
        }
    }

    @Transactional
    public AppUser saveUser(UserDto.SignUpForm signUpForm) throws MessagingException, UnsupportedEncodingException {
        if (!signUpForm.getPassword().equals(signUpForm.getRePassword())) {
            throw new CustomRuntimeException("비밀번호가 일치하지 않습니다", "회원가입 실패");
        }
        log.info("Saving new user {} to the database", signUpForm.getNickname());
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
            appUser.emailVerifiedSuccess();
            UserRole userRole = UserRole.builder().user(appUser).role(roleRepo.findByName("ROLE_USER")).build();
            userRepo.save(appUser);
            userRoleRepo.save(userRole);
        }
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
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
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
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        user.setNickname(dto.getNickname());
        user.setMajor(dto.getMajor());

        userRepo.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        userRepo.delete(user);
    }

    @Transactional
    public String findUsername(String email) {
        if (email == null || email.isBlank()) {
            throw new CustomRuntimeException("이메일을 입력하여주시기 바랍니다", "아이디 찾기 실패");
        }

        AppUser user = userRepo.findByEmail(email);
        if (user == null) {
            throw new CustomRuntimeException("등록되지 않은 이메일 주소입니다", "아이디 찾기 실패");
        }
        return user.getUsername();
    }

    @Transactional
    public void updatePassword(UserDto.PutPassword dto, Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new CustomRuntimeException("현재 비밀번호가 올바르지 않습니다", "비밀번호 변경 실패");
        }
        if (!dto.getNewPassword().equals(dto.getNewRePassword())) {
            throw new CustomRuntimeException("신규 비밀번호가 일치하지 않습니다", "비밀번호 변경 실패");
        }
        String newPassword = passwordEncoder.encode(dto.getNewPassword());
        user.setPassword(newPassword);

        userRepo.save(user);
    }

    @Transactional
    public void resetPassword(UserDto.ResetPassword dto) {
        List<EmailAuth> emailAuth = emailAuthRepo.findByEmailAndIsAuthAndType(dto.getEmail(), true, EmailType.PASSWORD);
        if (emailAuth.size() == 0) {
            throw new CustomRuntimeException("이메일 인증이 필요합니다", "비밀번호 초기화 실패");
        }
        if (!dto.getNewPassword().equals(dto.getNewRePassword())) {
            throw new CustomRuntimeException("비밀번호가 일치하지 않습니다", "비밀번호 초기화 실패");
        }
        AppUser user = userRepo.findByEmail(dto.getEmail());
        String newPassword = passwordEncoder.encode(dto.getNewPassword());
        user.setPassword(newPassword);

        userRepo.save(user);
        emailAuthRepo.deleteAll(emailAuth);
    }

    @Transactional
    public void updateToggleValue(Campus campus, Long userId) {
        if (campus == null) {
            throw new CustomRuntimeException("캠퍼스를 입력해주시기 바랍니다", "토글 변경 실패");
        }

        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        user.setToggle(campus);
        userRepo.save(user);
    }
}