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
import skkuchin.service.dto.ArticleLikeDto;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.ArticleLikeService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/article/like")
public class ArticleLikeController {

    private final ArticleLikeService articleLikeService;
    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> addArticleLike(@Valid @RequestBody ArticleLikeDto.PostRequest dto, BindingResult bindingResult, 
                                            @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("게시글 ID를 입력해주시기 바랍니다");
            }
            AppUser user = principalDetails.getUser();
            articleLikeService.addArticleLike(user, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "게시글 좋아요 완료", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("이미 좋아요를 누른 게시글입니다");
        }
    }


    @GetMapping("")
    public ResponseEntity<?> getMyLikes(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser appUser = principalDetails.getUser();
        List<ArticleLikeDto.Response> articleLikes = articleLikeService.getMyArticleLikes(appUser);
        return new ResponseEntity<>(new CMRespDto<>(1, "내가 좋아요 추가한 게시글 가져오기 완료", articleLikes), HttpStatus.OK);
    }
    
    
    @PostMapping("/{articleLikeId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> deleteArticleLike(@AuthenticationPrincipal PrincipalDetails principalDetails, @PathVariable Long articleLikeId){
        
        AppUser user = principalDetails.getUser();
        articleLikeService.delete(articleLikeId,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "게시글 좋아요 삭제 완료", null), HttpStatus.OK);

    }


}
