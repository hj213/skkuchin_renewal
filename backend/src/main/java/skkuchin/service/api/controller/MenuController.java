package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.MenuDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.MenuService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menu")
@Slf4j
public class MenuController {
    private final MenuService menuService;

    @GetMapping("/place/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getPlaceMenu(@PathVariable Long placeId) {
        List<MenuDto.Response> placeMenus = menuService.getPlaceReview(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 조회 완료", placeMenus), HttpStatus.OK);
    }

    @PostMapping("/place/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> write(@PathVariable Long placeId, @Valid @RequestBody MenuDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("메뉴 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        menuService.write(placeId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 작성 완료", null), HttpStatus.CREATED);
    }

    @PostMapping("/all/place/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> writeManyMenus(@PathVariable Long placeId, @Valid @RequestBody List<MenuDto.Request> dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("메뉴 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        menuService.addAll(placeId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "여러 메뉴 작성 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{menuId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long menuId, @Valid @RequestBody MenuDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("메뉴 필수 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        menuService.update(menuId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{menuId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long menuId) {
        menuService.delete(menuId);
        return new ResponseEntity<>(new CMRespDto<>(1, "메뉴 삭제 완료", null), HttpStatus.OK);
    }
}
