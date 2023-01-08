package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ImageDto;
import skkuchin.service.service.ImageService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
@Slf4j
public class ImageController {

    private final ImageService imageService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<ImageDto.Response> images = imageService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 이미지 조회 완료", images), HttpStatus.OK);
    }

    @GetMapping("/{imageId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDetail(@PathVariable Long imageId) {
        ImageDto.Response image = imageService.getDetail(imageId);
        return new ResponseEntity<>(new CMRespDto<>(1, "이미지 상세 정보 조회 완료", image), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> upload(@Valid @RequestBody ImageDto.PostRequest dto) {
        imageService.upload(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "이미지 업로드 완료", null), HttpStatus.CREATED);
    }

    @PostMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> uploadAll(@Valid @RequestBody List<ImageDto.PostRequest> dto) {
        imageService.uploadAll(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "여러 이미지 업로드 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{imageId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long imageId, @Valid @RequestBody ImageDto.PutRequest dto) {
        imageService.update(imageId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "이미지 업데이트 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{imageId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long imageId) {
        imageService.delete(imageId);
        return new ResponseEntity<>(new CMRespDto<>(1, "이미지 삭제 완료", null), HttpStatus.OK);
    }

    @GetMapping("/place/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getPlaceImages(@PathVariable Long placeId) {
        List<ImageDto.Response> placeImages = imageService.getPlaceImages(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 모든 이미지 조회 완료", placeImages), HttpStatus.OK);
    }

    @DeleteMapping("/place/{placeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> deletePlaceImages(@PathVariable Long placeId) {
        imageService.deletePlaceImages(placeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "장소 모든 이미지 조회 완료", null), HttpStatus.OK);
    }

}
