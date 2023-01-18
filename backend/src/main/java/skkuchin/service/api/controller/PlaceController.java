package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.service.PlaceService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/place")
@Slf4j
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<PlaceDto.Response> places = placeService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 장소 조회 완료", places), HttpStatus.OK);
    }

    @GetMapping("/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    public ResponseEntity<?> getDetail(@PathVariable Long placeId) {
        PlaceDto.Response place = placeService.getDetail(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 상세 정보 조회 완료", place), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> add(@Valid @RequestBody PlaceDto.Request dto) {
        placeService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 추가 완료", null), HttpStatus.CREATED);
    }

    @PostMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> addAll(@Valid @RequestBody List<PlaceDto.Request> dto) {
        placeService.addAll(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "여러 장소 추가 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long placeId, @Valid @RequestBody PlaceDto.Request dto) {
        placeService.update(placeId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long placeId) {
        placeService.delete(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 삭제 완료", null), HttpStatus.OK);
    }
}
