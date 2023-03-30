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
import skkuchin.service.dto.ReviewDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.ReviewService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<ReviewDto.AdminResponse> reviews = reviewService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 리뷰 가져오기 완료", reviews), HttpStatus.OK);
    }

    @GetMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getDetail(@PathVariable Long reviewId) {
        ReviewDto.Response review = reviewService.getDetail(reviewId);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 상세 정보 가져오기 완료", review), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> write(@Valid @ModelAttribute ReviewDto.PostRequest dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();

        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            if (errorMap.containsKey("rate")) {
                throw new CustomValidationApiException("평점을 선택해주시기 바랍니다", errorMap);
            }
            throw new CustomValidationApiException("리뷰를 작성해주시기 바랍니다", errorMap);
        }

        AppUser user = principalDetails.getUser();
        reviewService.write(user, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 작성 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> update(
            @PathVariable Long reviewId,
            @Valid @ModelAttribute ReviewDto.PutRequest dto,
            BindingResult bindingResult, @AuthenticationPrincipal
            PrincipalDetails principalDetails
    ) {
        Map<String, String> errorMap = new HashMap<>();

        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            if (errorMap.containsKey("rate")) {
                throw new CustomValidationApiException("평점을 선택해주시기 바랍니다", errorMap);
            }
            throw new CustomValidationApiException("리뷰를 작성해주시기 바랍니다", errorMap);
        }

        AppUser user = principalDetails.getUser();
        reviewService.update(reviewId, dto, user);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long reviewId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        reviewService.delete(reviewId, user);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 삭제 완료", null), HttpStatus.OK);
    }

    @GetMapping("/place/{placeId}")
    public ResponseEntity<?> getPlaceReview(@PathVariable Long placeId) {
        List<ReviewDto.Response> placeReviews = reviewService.getPlaceReview(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소별 리뷰 가져오기 완료", placeReviews), HttpStatus.OK);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getMyReview(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        List<ReviewDto.Response> myReviews = reviewService.getMyReview(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "내가 쓴 리뷰 조회 완료", myReviews), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserReview(@PathVariable Long userId) {
        List<ReviewDto.Response> userReviews = reviewService.getUserReview(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "사용자 id별 리뷰 조회 완료", userReviews), HttpStatus.OK);
    }

}
