package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.MatchingUserDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.MatchingUserService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matching")
public class MatchingUserController {
    private final MatchingUserService matchingUserService;

    @PostMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> addInfo(@Valid @RequestBody MatchingUserDto.Request dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                if (errorMap.containsKey("keywords")) {
                    throw new CustomValidationApiException("키워드는 3개부터 8개까지 입력 가능합니다", errorMap);
                }
                throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            matchingUserService.addInfo(user.getId(), dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "추가 정보 입력이 완료되었습니다", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("키워드가 중복 등록되었습니다");
        }
    }

    @PostMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addUserInfo(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.Request dto) {
        matchingUserService.addInfo(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자의 추가 정보 입력 완료", null), HttpStatus.CREATED);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getMyInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        MatchingUserDto.Response info = matchingUserService.getMyInfo(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "나의 매칭 관련 정보 조회 완료", info), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserInfo(@PathVariable Long userId) {
        MatchingUserDto.Response info = matchingUserService.getUserInfo(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 매칭 관련 정보 조회 완료", info), HttpStatus.OK);
    }

    @PutMapping("/user/{matching}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateMatchingStatus(@PathVariable Boolean matching, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        matchingUserService.updateMatchingStatus(user.getId(), matching);
        return new ResponseEntity<>(new CMRespDto<>(1, "매칭중 여부 수정 완료", null), HttpStatus.OK);
    }

    @PutMapping("/user/{userId}/{matching}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUserMatchingStatus(@PathVariable Long userId, @PathVariable Boolean matching) {
        matchingUserService.updateMatchingStatus(userId, matching);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 매칭중 여부 수정 완료", null), HttpStatus.OK);
    }

    @PutMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateInfo(@Valid @RequestBody MatchingUserDto.Request dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                if (errorMap.containsKey("keywords")) {
                    throw new CustomValidationApiException("키워드는 3개부터 8개까지 입력 가능합니다", errorMap);
                }
                throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            matchingUserService.updateInfo(user.getId(), dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "수정이 완료되었습니다", null), HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("키워드가 중복 등록되었습니다");
        }
    }

    @PutMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUserInfo(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.Request dto) {
        matchingUserService.updateInfo(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 키워드 수정 완료", null), HttpStatus.OK);
    }
}
