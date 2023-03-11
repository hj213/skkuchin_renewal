package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.PushTokenDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.PushTokenService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/push")
@Slf4j
public class PushTokenController {
    private final PushTokenService pushTokenService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> get(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        PushTokenDto.Response dto = pushTokenService.get(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "토큰 조회 완료", dto), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> upload(@Valid @RequestBody PushTokenDto.PostRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        pushTokenService.upload(user, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "토큰 업로드 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/chat")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> updateChatAlarm(@RequestBody Map<String, Boolean> alarmMap, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        pushTokenService.updateChatAlarm(user, alarmMap.get("chat"));
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅 푸시 알림 업데이트 완료", null), HttpStatus.OK);
    }

    @PutMapping("/info")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> updateChatInfo(@RequestBody Map<String, Boolean> alarmMap, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        pushTokenService.updateChatInfo(user, alarmMap.get("info"));
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 푸시 알림 업데이트 완료", null), HttpStatus.OK);
    }
}
