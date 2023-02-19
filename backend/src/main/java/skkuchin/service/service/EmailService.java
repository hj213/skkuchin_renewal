package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.EmailAuth;
import skkuchin.service.domain.User.EmailType;
import skkuchin.service.domain.User.UserRole;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.EmailAuthNumNotFoundException;
import skkuchin.service.repo.EmailAuthRepo;
import skkuchin.service.repo.RoleRepo;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.repo.UserRoleRepo;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@EnableAsync
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    private static final Long MAX_EXPIRE_TIME = 5L; //authNum 생성 5분 후 만료
    @Autowired
    JavaMailSenderImpl emailSender;
    private final EmailAuthRepo emailAuthRepo;
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final UserRoleRepo userRoleRepo;
    private String authNum;

    @Transactional
    public void sendEmail(UserDto.EmailRequest dto) throws MessagingException, UnsupportedEncodingException {
        if (!dto.getAgreement()) {
            throw new CustomRuntimeException("개인정보처리방침 및 이용약관에 동의해야합니다", "이메일 전송 실패");
        }

        AppUser user = userRepo.findByUsername(dto.getUsername());
        if (user == null) {
            throw new CustomRuntimeException("먼저 회원가입을 진행해주시기 바랍니다", "이메일 전송 실패");
        }

        if (!dto.getEmail().endsWith("@skku.edu") && !dto.getEmail().endsWith("@g.skku.edu")) {
            throw new CustomRuntimeException("성균관대학교 메일 주소가 아닙니다", "이메일 전송 실패");
        }

        if (user.getEmailAuth()) {
            throw new CustomRuntimeException("이미 인증을 완료하였습니다", "이메일 전송 실패");
        }

        AppUser existingUser = userRepo.findByEmail(dto.getEmail());
        if (existingUser != null && existingUser.getEmailAuth()) {
            throw new CustomRuntimeException("사용 중인 이메일입니다", "이메일 전송 실패");
        }

        user.setEmail(dto.getEmail());
        user.setAgreement(true);
        sendEmail(dto.getEmail(), EmailType.SIGNUP);
    }

    @Transactional
    public Boolean confirmSignup(EmailAuthRequestDto requestDto) {
        EmailAuth emailAuth = emailAuthRepo.findByEmailAndAuthNumAndExpireDateAfter(
                        requestDto.getEmail(), requestDto.getAuthNum(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthNumNotFoundException());
        AppUser user = userRepo.findByEmail(requestDto.getEmail());
        emailAuth.setIsAuth(true);
        user.emailVerifiedSuccess();
        return true;
    }

    //회원가입 - 이메일 인증 완료한 유저인지 확인
    @Transactional
    public void checkSignup(String username) {
        if (username == null || username.isBlank()) {
            throw new CustomRuntimeException("이메일을 입력하여주시기 바랍니다");
        }

        AppUser user = userRepo.findByUsername(username);
        if (user == null) {
            throw new CustomRuntimeException("회원이 아닙니다");
        }
        if (user.getEmailAuth()) {
            UserRole userRole = UserRole.builder().user(user).role(roleRepo.findByName("ROLE_USER")).build();
            userRoleRepo.save(userRole);
        } else {
            //throw new CustomRuntimeException("인증을 완료하지 않았습니다");
            throw new CustomRuntimeException("인증이 완료되지 않았어요🥲\n이메일을 다시 확인해주세요");
        }
    }

    @Transactional
    public void sendResetEmail(String email) throws MessagingException, UnsupportedEncodingException {
        if (email == null || email.isBlank()) {
            throw new CustomRuntimeException("이메일을 입력하여주시기 바랍니다");
        }

        AppUser user = userRepo.findByEmail(email);
        if (user == null) {
            throw new CustomRuntimeException("등록되지 않은 이메일 주소입니다", "비밀번호 초기화 인증 메일 발송 실패");
        }
        sendEmail(email, EmailType.PASSWORD);
    }

    @Transactional
    public Boolean confirmPassword(EmailAuthRequestDto requestDto) {
        EmailAuth emailAuth = emailAuthRepo.findByEmailAndAuthNumAndExpireDateAfter(
                        requestDto.getEmail(), requestDto.getAuthNum(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthNumNotFoundException());
        emailAuth.setIsAuth(true);
        return true;
    }

    @Transactional
    public void checkPassword(String email) {
        if (email == null || email.isBlank()) {
            throw new CustomRuntimeException("이메일을 입력하여주시기 바랍니다");
        }

        List<EmailAuth> emailAuth = emailAuthRepo.findByEmailAndIsAuthAndType(email, true, EmailType.PASSWORD);
        if (emailAuth.size() == 0) {
            throw new CustomRuntimeException("인증을 완료하지 않았습니다");
        }
    }

    //랜덤 인증 코드 생성
    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    //메일 양식 작성
    public MimeMessage createEmailForm(String email, EmailType type) throws MessagingException, UnsupportedEncodingException {
        String emailType = getEmailType(type);
        createCode();
        String setFrom = "skkuchin@gmail.com";
        String toEmail = email; //받는 사람
        String title = "SKKUCHIN "+emailType+" 이메일 인증";
        String mailContent = "<h3>["+emailType+" 이메일 인증]</h3>"
                + "<br><p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>"
                + "<a href='http://localhost:8080/api/email/confirm/"
                + type.name().toLowerCase()
                + "?email=" + email + "&authNum=" + authNum + "' target='_blenk'>이메일 인증 확인</a>";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email); //보낼 이메일 설정
        message.setSubject(title); //제목 설정
        message.setFrom(setFrom);
        message.setText(mailContent, "utf-8", "html");

        return message;
    }

    //실제 메일 전송
    @Async
    public void sendEmail(String toEmail, EmailType type) throws MessagingException, UnsupportedEncodingException {

        MimeMessage emailForm = createEmailForm(toEmail, type);
        emailAuthRepo.save(
            EmailAuth.builder()
                    .email(toEmail)
                    .authNum(authNum)
                    .type(type)
                    .isAuth(false)
                    .expireDate(LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME))
                    .build());
        emailSender.send(emailForm);
    }

    public String getEmailType(EmailType type) {
        String emailType = "";
        switch (type) {
            case SIGNUP: emailType = "회원가입";
            break;
            case PASSWORD: emailType = "비밀번호 초기화";
            break;
            default: emailType = "Invalid type";
        }
        return emailType;
    }
}
