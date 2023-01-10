package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.FavoriteDto;
import skkuchin.service.api.dto.MenuDto;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.FavoriteService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final UserRepo userRepo;
    @PostMapping("")
    public ResponseEntity<?> write(@RequestBody FavoriteDto.PostRequest dto) {
        AppUser user = userRepo.findByEmail("test@test");
        System.out.println("user = " + user.getUsername());
        favoriteService.write(user, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "즐겨찾기 저장 완료", null), HttpStatus.CREATED);
    }



    @GetMapping("")
    public ResponseEntity<?> getPlaceReview() {
        AppUser user = userRepo.findByEmail("test@test");
        List<FavoriteDto.Response> favoriteMenus = favoriteService.getMyFavorite(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "즐겨찾기 조회 완료", favoriteMenus), HttpStatus.OK);
    }

    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<?> delete(@PathVariable Long favoriteId) {
        AppUser user = userRepo.findByEmail("test@test");
        Long userId = user.getId();
        favoriteService.delete(favoriteId, userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 삭제 완료", null), HttpStatus.OK);
    }

}