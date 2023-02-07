package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.EmailAuthRequestDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.service.EmailService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<?> sendEmail(@Valid @RequestBody UserDto.EmailRequest dto) throws MessagingException, UnsupportedEncodingException {
        emailService.sendEmail(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "인증 메일이 발송되었습니다", null), HttpStatus.CREATED);
    }

    @GetMapping("/confirm/signup")
    public ResponseEntity<Boolean> signupConfirm(@ModelAttribute EmailAuthRequestDto requestDto) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok().body(emailService.confirmSignup(requestDto));
    }

    @GetMapping("/signup/check")
    public ResponseEntity<?> checkSignup(@RequestBody Map<String, String> usernameMap) {
        emailService.checkSignup(usernameMap.get("username"));
        return new ResponseEntity<>(new CMRespDto<>(1, "회원가입 이메일 인증 완료", true), HttpStatus.OK);
    }

    @PostMapping("/password")
    public ResponseEntity<?> sendResetEmail(@RequestBody Map<String, String> emailMap) throws MessagingException, UnsupportedEncodingException {
        emailService.sendResetEmail(emailMap.get("email"));
        return new ResponseEntity<>(new CMRespDto<>(1, "인증 메일이 발송되었습니다", null), HttpStatus.CREATED);
    }

    @GetMapping("/confirm/password")
    public ResponseEntity<Boolean> passwordConfirm(@ModelAttribute EmailAuthRequestDto requestDto) throws MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok().body(emailService.confirmPassword(requestDto));
    }

    @GetMapping("/password/check")
    public ResponseEntity<?> checkPassword(@RequestBody Map<String, String> emailMap) {
        emailService.checkPassword(emailMap.get("email"));
        return new ResponseEntity<>(new CMRespDto<>(1, "비밀번호 초기화 이메일 인증 완료", true), HttpStatus.OK);
    }
}
