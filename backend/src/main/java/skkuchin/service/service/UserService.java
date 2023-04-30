package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.dto.UserDto;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Matching.*;
import skkuchin.service.domain.User.*;
import skkuchin.service.exception.*;
import skkuchin.service.repo.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final UserRoleRepo userRoleRepo;
    private final UserKeywordRepo userKeywordRepo;
    private final KeywordRepo keywordRepo;
    private final EmailAuthRepo emailAuthRepo;
    private final PasswordEncoder passwordEncoder;
    private final ChatRoomRepo chatRoomRepo;
    private final ReportRepo reportRepo;
    private final CandidateRepo candidateRepo;


    private final Random random = new Random();

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
            appUser.setEmail("admin@example.com");
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
            appUser.setEmail("test@example.com");
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
        List<UserRole> myRoles = userRoleRepo.findByUser(user);

        for (UserRole myRole : myRoles) {
            if (Objects.equals(myRole.getRole().getId(), role.getId())) {
                throw new CustomRuntimeException("이미 해당 역할이 존재합니다");
            }
        }

        UserRole userRole = UserRole.builder().user(user).role(role).build();
        userRoleRepo.save(userRole);
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
        user.setImage(dto.getImage());
        user.setStudentId(dto.getStudentId());

        userRepo.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));

        List<ChatRoom> chatRooms = chatRoomRepo.findMyAllRoomList(userId);
        for (ChatRoom chatRoom : chatRooms) {
            if (Objects.equals(chatRoom.getUser1().getId(), userId)) {
                chatRoom.setUser1(null);
            } else {
                chatRoom.setUser2(null);
            }
            chatRoomRepo.save(chatRoom);
        }

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

    @Transactional
    public List<AppUser> getAllUsers() {
        return userRepo.findAll();
    }

    @Transactional
    public void saveTestMatchingUsers(int count) {
        for (int i = 1; i <= count; i++) {
            UserDto.SignUpForm signUpForm = new UserDto.SignUpForm(
                    "테스트" + i,
                    "test" + i,
                    "12341234",
                    "12341234",
                    random.nextInt(23 - 10 + 1) + 10,
                    Major.values()[random.nextInt(Major.values().length)],
                    Profile.values()[random.nextInt(Profile.values().length)]
            );
            signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
            AppUser appUser = signUpForm.toEntity();
            appUser.setEmail("test"+i+"@example.com");
            appUser.emailVerifiedSuccess();
            UserRole userRole = UserRole.builder().user(appUser).role(roleRepo.findByName("ROLE_USER")).build();
            userRepo.save(appUser);
            userRoleRepo.save(userRole);

            AppUser existingUser = userRepo.findByUsername(appUser.getUsername());
            existingUser.setGender(Gender.values()[random.nextInt(Gender.values().length)]);
            existingUser.setIntroduction("잘 부탁드려요" + i);
            existingUser.setMbti(Mbti.values()[random.nextInt(Mbti.values().length)]);
            existingUser.setMatching(true);
            userRepo.save(existingUser);

            AppUser matchingUser = userRepo.findById(existingUser.getId()).orElseThrow();

            List<String> keywords = new ArrayList<>();
            String[] keywordPool = {"한식", "일식", "중식", "양식", "남미음식", "분식", "아시아음식", "카페",
                    "축구", "야구", "농구", "골프", "테니스", "당구", "헬스", "주짓수", "보드스키", "서핑", "등산", "스포츠관람", "러닝", "볼링", "댄스", "배드민턴",
                    "영화", "음악", "전시회", "연극뮤지컬", "덕질", "여행", "게임", "노래방", "방탈출", "보드게임", "반려동물", "요리", "맛집탐방", "만화",
                    "학회", "동아리", "교환학생", "봉사", "재테크", "빅데이터", "금융", "문학", "토론", "시사", "어학", "CPA", "로스쿨", "행시", "피트"};

            int keywordsCount = random.nextInt(6) + 3;
            Set<String> keywordSet = new HashSet<>();
            while (keywordSet.size() < keywordsCount) {
                int keywordIndex = random.nextInt(keywordPool.length);
                keywordSet.add(keywordPool[keywordIndex]);
            }
            keywords.addAll(keywordSet);

            List<UserKeyword> userKeywords = keywords
                    .stream()
                    .map(k -> {
                        Keyword keyword = keywordRepo.findByName(k);
                        return UserKeyword.builder().user(matchingUser).keyword(keyword).build();
                    })
                    .collect(Collectors.toList());
            userKeywordRepo.saveAll(userKeywords);
        }
    }
}