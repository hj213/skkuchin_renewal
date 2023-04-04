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
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.NoticeDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.NoticeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
@Slf4j
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        List<NoticeDto.Response> notices = noticeService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 공지 조회 완료", notices), HttpStatus.OK);
    }

    @GetMapping("/{noticeId}")
    public ResponseEntity<?> getDetail(@PathVariable Long noticeId) {
        NoticeDto.Response notice = noticeService.getDetail(noticeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 상세 조회 완료", notice), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> upload(@RequestBody NoticeDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("공지 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        noticeService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 추가 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{noticeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long noticeId, @RequestBody NoticeDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("공지 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        noticeService.update(noticeId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{noticeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long noticeId) {
        noticeService.delete(noticeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 삭제 완료", null), HttpStatus.OK);
    }

    @GetMapping("/read")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> readNotice(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        noticeService.readNotice(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 읽음 완료", null), HttpStatus.OK);
    }

    @PostMapping("/push")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> makePush(@RequestBody NoticeDto.DirectPush dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("공지 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        noticeService.makePush(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 푸시 알림 완료", null), HttpStatus.CREATED);
    }
}
