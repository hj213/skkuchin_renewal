package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.ReviewService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review")
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("")
    public ResponseEntity<?> write(@RequestBody ReviewDto dto, Authentication authentication) {
        PrincipalDetails PrincipalDetails = (PrincipalDetails) authentication.getPrincipal();
        AppUser user = PrincipalDetails.getUser();
        //reviewService.write(user, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 작성 완료", null), HttpStatus.OK);
    }

}
