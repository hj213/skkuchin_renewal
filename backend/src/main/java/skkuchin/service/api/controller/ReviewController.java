package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.ReviewService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<ReviewDto.Response> reviews = reviewService.getAll();
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
    public ResponseEntity<?> write(@Valid @RequestBody ReviewDto.PostRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        reviewService.write(user, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 작성 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long reviewId, @Valid @RequestBody ReviewDto.PutRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getId();
        reviewService.update(reviewId, dto, userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long reviewId, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getId();
        reviewService.delete(reviewId, userId);
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
