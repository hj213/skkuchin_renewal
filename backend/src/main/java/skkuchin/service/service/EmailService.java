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
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.EmailAuthNumNotFoundException;
import skkuchin.service.repo.EmailAuthRepo;
import skkuchin.service.repo.UserRepo;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
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
    private String authNum;

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
            sendEmail(dto.getEmail(), EmailType.SIGNUP);
        }
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

    @Transactional
    public void sendResetEmail(String email, Long userId) throws MessagingException, UnsupportedEncodingException {
        AppUser user = userRepo.findById(userId).orElseThrow();
        if (!user.getEmail().equals(email)) {
            throw new CustomRuntimeException("비밀번호 초기화 인증 메일 발송 실패", "이메일 주소를 다시 입력하세요");
        }
        sendEmail(email, EmailType.PASSWORD);
    }

    @Transactional
    public Boolean confirmPassword(EmailAuthRequestDto requestDto) {
        EmailAuth emailAuth = emailAuthRepo.findByEmailAndAuthNumAndExpireDateAfter(
                        requestDto.getEmail(), requestDto.getAuthNum(), LocalDateTime.now())
                .orElseThrow(() -> new EmailAuthNumNotFoundException());
        AppUser user = userRepo.findByEmail(requestDto.getEmail());
        emailAuth.setIsAuth(true);
        return true;
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
        EmailAuth emailAuth = emailAuthRepo.save(
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
            case ID: emailType = "아이디 찾기";
            break;
            default: emailType = "Invalid type";
        }
        return emailType;
    }
}
