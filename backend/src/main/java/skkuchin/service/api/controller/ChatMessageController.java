package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.ChatMessageService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat/message")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> createMessage(@Valid @RequestBody ChatMessageDto.Request dto,
                                           BindingResult bindingResult,
                                           @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
        }
        AppUser user = principalDetails.getUser();
        chatMessageService.write(user,dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅 메시지 생성 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/read/{messageId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> readMessage(@PathVariable Long messageId,
                                          @RequestBody Map<String, Boolean> messageMap,
                                          @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatMessageService.readMessage(messageId, user, messageMap.get("read"));
        return new ResponseEntity<>(new CMRespDto<>(1, "메시지 읽음", null), HttpStatus.OK);
    }
}
