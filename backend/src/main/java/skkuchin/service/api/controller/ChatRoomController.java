package skkuchin.service.api.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.service.ChatRoomService;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat/room")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @GetMapping("/request")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getRequestUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        List<Long> requestedId = chatRoomService.getRequestUser(user);
        return new ResponseEntity<>(new CMRespDto<>(1, "요청 보낸 유저 조회 완료", requestedId), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> makeRoom(@Valid @RequestBody ChatRoomDto.RoomRequest dto,
                                      BindingResult bindingResult,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("상대방 아이디를 입력해주시기 바랍니다", errorMap);
            }
            AppUser user = principalDetails.getUser();
            chatRoomService.makeRoom(user,dto);
            return new ResponseEntity<>(new CMRespDto<>(1, "대화 요청 완료", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("이미 요청하셨습니다");
        }
     }

    @PostMapping("/admin")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> makeAdminRoom(@Valid @RequestBody ChatRoomDto.AdminRoomRequest dto,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser user = principalDetails.getUser();
        chatRoomService.makeAdminRoom(dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "관리자 채팅방 개설 완료", null), HttpStatus.CREATED);
    }

    @PutMapping("/request/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> setReceiverReaction(@PathVariable String roomId,
                                              @Valid @RequestBody ChatRoomDto.ReactionRequest dto,
                                              BindingResult bindingResult,
                                              @AuthenticationPrincipal PrincipalDetails principalDetails){
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("수락 혹은 거부를 선택해주시기 바랍니다", errorMap);
        }
        AppUser user = principalDetails.getUser();
        chatRoomService.user2Accept(roomId, user,dto.getReaction());
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방이 대화 요청에 응답했습니다", null), HttpStatus.OK);
    }

    @PutMapping("/block/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> setBlock(@PathVariable String roomId,
                                       @Valid @RequestBody ChatRoomDto.BooleanRequest dto,
                                       BindingResult bindingResult,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails){
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("행동을 선택해주시기 바랍니다", errorMap);
        }
        AppUser user = principalDetails.getUser();
        chatRoomService.blockUser(roomId,user,dto.getReaction());
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 차단", null), HttpStatus.OK);
    }

    @PutMapping("/alarm/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> setAlarm(@PathVariable String roomId,
                                       @Valid @RequestBody ChatRoomDto.BooleanRequest dto,
                                       BindingResult bindingResult,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("행동을 선택해주시기 바랍니다", errorMap);
        }
        AppUser user = principalDetails.getUser();
        chatRoomService.setAlarm(roomId, user, dto.getReaction());
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 알람 설정", null), HttpStatus.OK);
    }

    @PutMapping("/meet/time/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> setMeetTime(@PathVariable String roomId,
                                          @RequestBody Map<String, LocalDateTime> timeMap,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.setMeetTime(roomId, user, timeMap.get("time"));
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 만남 장소 설정", null), HttpStatus.OK);
    }

    @PutMapping("/meet/place/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> setMeetPlace(@PathVariable String roomId,
                                          @RequestBody Map<String, String> placeMap,
                                          @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.setMeetPlace(roomId, user, placeMap.get("place"));
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 만남 시간 설정", null), HttpStatus.OK);
    }

    @DeleteMapping("/meet/time/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteMeetTime(@PathVariable String roomId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.deleteMeetTime(roomId, user);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 만남 장소 삭제 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/meet/place/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteMeetPlace(@PathVariable String roomId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.deleteMeetPlace(roomId, user);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 만남 시간 삭제 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/exit/{roomId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> exitRoom(@PathVariable String roomId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.exitRoom(roomId,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 나가기 완료", null), HttpStatus.OK);
    }

}