package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.AppointmentDto;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.AppointmentService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
@Slf4j
public class AppointmentController {
    private final AppointmentService appointmentService;

    @GetMapping("/room/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getDetail(@PathVariable String roomId) {
        AppointmentDto.Response appointment = appointmentService.getAppointment(roomId);
        return new ResponseEntity<>(new CMRespDto<>(1, "약속이 조회되었습니다", appointment), HttpStatus.OK);
    }

    @PostMapping("/room/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> add(@PathVariable String roomId, @Valid @RequestBody AppointmentDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("채팅방 아이디가 없습니다", errorMap);
            }
            appointmentService.makeAppointment(roomId, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "약속이 성사되었습니다", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("약속은 한 방당 하나만 가능합니다");
        }
    }

    @PutMapping ("/room/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> update(@PathVariable String roomId, @Valid @RequestBody AppointmentDto.Request dto, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("채팅방 아이디가 없습니다", errorMap);
            }
            appointmentService.changeAppointment(roomId, dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "약속이 변경되었습니다", null), HttpStatus.OK);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("약속은 한 방당 하나만 가능합니다");
        }
    }

    @DeleteMapping("/room/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable String roomId) {
        appointmentService.cancelAppointment(roomId);
        return new ResponseEntity<>(new CMRespDto<>(1, "약속이 삭제되었습니다", null), HttpStatus.OK);
    }
}
