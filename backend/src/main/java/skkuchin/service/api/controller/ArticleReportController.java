package skkuchin.service.api.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleReportDto;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.ReportDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.ArticleReportService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/article/report")
@RequiredArgsConstructor
@Slf4j
public class ArticleReportController {
    private final ArticleReportService articleReportService;

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> reportUser(@Valid @RequestBody ArticleReportDto.Request dto, BindingResult bindingResult, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("신고할 내용을 선택해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            articleReportService.reportArticle(user, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "신고가 완료 되었습니다.", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("한 번만 신고 가능합니다");
        }
    }
}
