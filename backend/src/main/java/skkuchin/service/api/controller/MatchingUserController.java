package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.MatchingUserDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.MatchingUserService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matching")
public class MatchingUserController {
    private final MatchingUserService matchingUserService;

    @PostMapping("/user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> addInfo(@Valid @RequestBody MatchingUserDto.Request dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        matchingUserService.addInfo(user.getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "추가 정보 입력 완료", null), HttpStatus.OK);
    }

    @PostMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addUserInfo(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.Request dto) {
        matchingUserService.addInfo(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자의 추가 정보 입력 완료", null), HttpStatus.OK);
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

    @PutMapping("/user/keyword")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateKeywords(@Valid @RequestBody MatchingUserDto.KeywordUpdate dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        matchingUserService.updateKeywords(user.getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "키워드 수정 완료", null), HttpStatus.OK);
    }

    @PutMapping("/user/{userId}/keyword")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUserKeywords(@PathVariable Long userId, @Valid @RequestBody MatchingUserDto.KeywordUpdate dto) {
        matchingUserService.updateKeywords(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "다른 사용자 키워드 수정 완료", null), HttpStatus.OK);
    }
}
