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
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.CommentLikeDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.CommentLikeService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment/like")
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> addCommentLike(@Valid @RequestBody CommentLikeDto.PostRequest dto, BindingResult bindingResult,
                                            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("댓글 ID를 입력해주시기 바랍니다");
            }
            AppUser user = principalDetails.getUser();
            commentLikeService.addCommentLike(user, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "댓글 좋아요 완료", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("이미 좋아요를 누른 댓글입니다");
        }
    }


    @DeleteMapping("/{commentLikeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteMyCommentLike(@PathVariable Long commentLikeId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser appUser = principalDetails.getUser();
        commentLikeService.delete(commentLikeId,appUser);
        return new ResponseEntity<>(new CMRespDto<>(1,"댓글 좋아요요 삭제완료",null),HttpStatus.OK);
    }
}
