package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.TagDto;
import skkuchin.service.service.TagService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tag")
public class TagController {
    private final TagService tagService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<TagDto.Response> tags = tagService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 태그 전체 조회 완료", tags), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> add(@RequestBody TagDto.Request dto) {
        tagService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 태그 추가 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{tagId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long tagId, @RequestBody TagDto.Request dto) {
        tagService.update(tagId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 태그 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{tagId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long tagId) {
        tagService.delete(tagId);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 태그 삭제 완료", null), HttpStatus.OK);
    }

}
