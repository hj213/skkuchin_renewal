package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.CandidateDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.CandidateService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getCandidate(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        List<CandidateDto.Response> candidates = candidateService.getCandidate(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "매칭 3명 불러오기 완료", candidates), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addCandidate(@Valid @RequestBody CandidateDto.PostRequest dto) {
        candidateService.addCandidate(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "매칭 3명 추가 완료", null), HttpStatus.CREATED);
    }
}
