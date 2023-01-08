package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ReviewKeywordDto;
import skkuchin.service.service.ReviewKeywordService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/review-keyword")
public class ReviewKeywordController {
    private final ReviewKeywordService reviewKeywordService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<ReviewKeywordDto.Response> keywords = reviewKeywordService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 키워드 전체 조회 완료", keywords), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> add(@RequestBody ReviewKeywordDto.Request dto) {
        reviewKeywordService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 키워드 추가 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{keywordId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long keywordId, @RequestBody ReviewKeywordDto.Request dto) {
        reviewKeywordService.update(keywordId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 키워드 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{keywordId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long keywordId) {
        reviewKeywordService.delete(keywordId);
        return new ResponseEntity<>(new CMRespDto<>(1, "리뷰 키워드 삭제 완료", null), HttpStatus.OK);
    }

}
