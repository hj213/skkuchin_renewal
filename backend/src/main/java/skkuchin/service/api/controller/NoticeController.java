package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.NoticeDto;
import skkuchin.service.service.NoticeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notice")
@Slf4j
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<NoticeDto.Response> notices = noticeService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 공지 조회 완료", notices), HttpStatus.OK);
    }

    @GetMapping("/{noticeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDetail(@PathVariable Long noticeId) {
        NoticeDto.Response notice = noticeService.getDetail(noticeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 상세 조회 완료", notice), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> upload(@RequestBody NoticeDto.Request dto) {
        noticeService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 추가 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{noticeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long noticeId, @RequestBody NoticeDto.Request dto) {
        noticeService.update(noticeId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{noticeId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long noticeId) {
        noticeService.delete(noticeId);
        return new ResponseEntity<>(new CMRespDto<>(1, "공지 삭제 완료", null), HttpStatus.OK);
    }
}
