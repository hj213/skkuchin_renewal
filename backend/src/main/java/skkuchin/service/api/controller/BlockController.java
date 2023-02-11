package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.BlockDto;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.BlockService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/block")
@RequiredArgsConstructor
@Slf4j
public class BlockController {
    private final BlockService blockService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getBlockedUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        List<BlockDto.Response> blocekdUsers = blockService.getBlockedUser(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "차단 유저 조회 완료", blocekdUsers), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> blockUser(@Valid @RequestBody BlockDto.Request dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("차단 계정 ID를 입력해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            blockService.blockUser(user, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "해당 유저가 차단되었습니다", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("해당 계정은 이미 차단된 계정입니다");
        }
    }

    @DeleteMapping("/{blockId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> unblockUser(@PathVariable Long blockId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        blockService.unblockUser(user, blockId);
        return new ResponseEntity<>(new CMRespDto<>(1, "해당 유저가 차단 해제되었습니다", null), HttpStatus.OK);
    }
}
