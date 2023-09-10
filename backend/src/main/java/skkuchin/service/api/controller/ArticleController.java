package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleDto;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.service.ArticleService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;
    private final UserRepo userRepo;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> addArticle(@Valid @RequestBody ArticleDto.PostRequest dto
    , @AuthenticationPrincipal PrincipalDetails principalDetails,BindingResult bindingResult){
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("모든 정보를 입력해주시기 바랍니다", errorMap);
        }
        AppUser appUser = principalDetails.getUser();
        System.out.println("appUser = " + appUser.getUsername());
        articleService.addArticle(appUser,dto);
        return new ResponseEntity<>(new CMRespDto<>(1,"게시글 생성 완료",null), HttpStatus.CREATED);
    }


    @GetMapping("")
    public ResponseEntity<?> getAllArticle(@AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser appUser = principalDetails.getUser();
        List<ArticleDto.Response> article = articleService.searchArticle(appUser);
        return new ResponseEntity<>(new CMRespDto<>(1,"게시판 조회 완료",article), HttpStatus.OK);
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<?> getSpecificArticle(@PathVariable Long articleId,@AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser appUser = principalDetails.getUser();
        List<ArticleDto.Response> articles = articleService.getSpecificArticle(articleId,appUser);
        return new ResponseEntity<>(new CMRespDto<>(1,"특정 게시글 조회 완료",articles),HttpStatus.OK);
    }


    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getMyArticle(@PathVariable Long userId){
        AppUser appUser = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("유저 아이디가 존재하지 않습니다."));
        List<ArticleDto.Response> articles = articleService.getMyArticle(appUser);
        return new ResponseEntity<>(new CMRespDto<>(1,"내 게시글 조회 완료",articles),HttpStatus.OK);
    }

    @PutMapping("/{articleId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateMyArticle(@PathVariable Long articleId, @AuthenticationPrincipal PrincipalDetails principalDetails
    , @Valid @RequestBody ArticleDto.PutRequest dto, BindingResult bindingResult){
        AppUser appUser = principalDetails.getUser();
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("게시글 관련 필수 수정 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        articleService.updateArticle(articleId,appUser,dto);
        return new ResponseEntity<>(new CMRespDto<>(1,"내 게시글 수정 완료",null),HttpStatus.OK);
    }

    @DeleteMapping("/{articleId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteMyArticle(@PathVariable Long articleId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser appUser = principalDetails.getUser();
        articleService.deleteArticle(articleId,appUser);
        return new ResponseEntity<>(new CMRespDto<>(1,"내 게시글 삭제 완료",null),HttpStatus.OK);
    }

    @GetMapping("/search/keyword")
    public ResponseEntity<?> searchKeyword(@RequestParam("q") String keyword,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser appUser = principalDetails.getUser();
        List<ArticleDto.Response> articles = articleService.searchKeyword(keyword,appUser);
        return new ResponseEntity<>(new CMRespDto<>(1, "게시글 검색 완료", articles), HttpStatus.OK);
    }


    @GetMapping("/tags/{articleType}")
    public ResponseEntity<?> getSpecificArticle(@PathVariable("articleType") String articleTypeStr,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        ArticleType articleType = ArticleType.valueOf(articleTypeStr);
        AppUser appUser = principalDetails.getUser();
        System.out.println("articleType = " + articleType);
        List<ArticleDto.Response> articles = articleService.getSpecificArticle(articleType,appUser);
        return new ResponseEntity<>(new CMRespDto<>(1, "게시판 조회 완료", articles), HttpStatus.OK);
    }



}
