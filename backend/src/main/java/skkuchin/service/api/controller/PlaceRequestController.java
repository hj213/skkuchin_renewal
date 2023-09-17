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
import skkuchin.service.dto.PlaceRequestDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.PlaceRequestService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/request")
@Slf4j
public class PlaceRequestController {
    private final PlaceRequestService requestService;

    @GetMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        List<PlaceRequestDto.Response> requests = requestService.getAll();
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 추가 요청 전체 조회 완료", requests), HttpStatus.OK);
    }

    @GetMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDetail(@PathVariable Long requestId) {
        PlaceRequestDto.Response request = requestService.getDetail(requestId);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 추가 요청 상세 조회 완료", request), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> add(@Valid @RequestBody PlaceRequestDto.PostRequest dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            if (errorMap.containsKey("campus")) {
                throw new CustomValidationApiException("캠퍼스를 선택해주시기 바랍니다", errorMap);
            }
            if (errorMap.containsKey("name")) {
                throw new CustomValidationApiException("식당 이름을 입력해주시기 바랍니다", errorMap);
            }
            throw new CustomValidationApiException("식당 추가 요청 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        requestService.add(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 추가 요청 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long requestId, @Valid @RequestBody PlaceRequestDto.PutRequest dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("식당 추가 요청 정보를 모두 작성해주시기 바랍니다", errorMap);
        }
        requestService.update(requestId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 추가 요청 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/{requestId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long requestId) {
        requestService.delete(requestId);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 추가 요청 삭제 완료", null), HttpStatus.OK);
    }

    @PutMapping("/check/{requestId}/{isChecked}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Long requestId, @PathVariable Boolean isChecked) {
        requestService.updateCheck(requestId, isChecked);
        return new ResponseEntity<>(new CMRespDto<>(1, "식당 추가 요청 승인 상태 업데이트 완료", null), HttpStatus.OK);
    }
}
