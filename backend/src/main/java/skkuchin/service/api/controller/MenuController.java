package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.MenuDto;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.MenuService;
import skkuchin.service.service.ReviewService;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menu/place")
@Slf4j
public class MenuController {
    private final MenuService menuService;

    @PostMapping("")
    public ResponseEntity<?> write(@RequestBody MenuDto.PostRequest dto) {

        menuService.write(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 작성 완료", null), HttpStatus.CREATED);
    }



    @GetMapping("/{placeId}")
    public ResponseEntity<?> getPlaceReview(@PathVariable Long placeId) {
        List<MenuDto.Response> placeMenus = menuService.getPlaceReview(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 조회 완료", placeMenus), HttpStatus.OK);
    }

}
