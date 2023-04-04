package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.RankDto;
import skkuchin.service.service.RankService;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rank")
public class RankController {

    private final RankService rankService;

    @GetMapping("/campus/{campus}")
    public ResponseEntity<?> getRank(@PathVariable String campus) {
        List<RankDto.Response> ranks = rankService.getRank(campus);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 상위 5곳 불러오기 완료", ranks), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> addRank() {
        rankService.addRank();
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 상위 5곳 추가 완료", null), HttpStatus.CREATED);
    }

    @DeleteMapping("/{rankId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteRank(@PathVariable Long rankId) {
        rankService.deleteRank(rankId);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 상위 5곳 삭제 완료", null), HttpStatus.OK);
    }
}
