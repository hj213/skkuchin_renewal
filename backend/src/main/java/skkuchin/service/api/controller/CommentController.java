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
import skkuchin.service.dto.ArticleDto;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.CommentDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.CommentService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> addComment(@Valid @RequestBody CommentDto.PostRequest dto,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails, BindingResult bindingResult){
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
        }
        AppUser appUser = principalDetails.getUser();
        commentService.addComment(appUser,dto);
        return new ResponseEntity<>(new CMRespDto<>(1,"댓글 저장 완료",null), HttpStatus.CREATED);

    }

    @GetMapping("/{articleId}")
    public ResponseEntity<?> getComment(@AuthenticationPrincipal PrincipalDetails principalDetails,@PathVariable Long articleId){
        AppUser appUser = principalDetails.getUser();
        List<CommentDto.Response> comments = commentService.getComment(appUser,articleId);
        return new ResponseEntity<>(new CMRespDto<>(1,"댓글 불러오기 완료",comments), HttpStatus.OK);

    }

    @DeleteMapping("/{commentId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteMyArticle(@PathVariable Long commentId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser appUser = principalDetails.getUser();
        commentService.deleteComment(commentId,appUser);
        return new ResponseEntity<>(new CMRespDto<>(1,"내 게시글 삭제 완료",null),HttpStatus.OK);
    }

}
