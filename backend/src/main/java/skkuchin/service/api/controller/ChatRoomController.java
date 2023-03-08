package skkuchin.service.api.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.dto.CMRespDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatRoomService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat/room")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;

    @PostMapping("")
    public ResponseEntity<?> makeRoom(@Valid @RequestBody ChatRoomDto.RoomRequest dto,
                                      BindingResult bindingResult,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails){
        Map<String, String> errorMap = new HashMap<>();
        if (bindingResult.hasErrors()) {
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            throw new CustomValidationApiException("상대방 아이디를 입력해주시기 바랍니다", errorMap);
        }
         AppUser user = principalDetails.getUser();
         chatRoomService.makeRoom(user,dto);
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);
     }

    @PutMapping("/request/{roomId}")
    public ResponseEntity<?> receiverReaction(@PathVariable String roomId,
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
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 매칭", null), HttpStatus.OK);
    }

    @PutMapping("/block/{roomId}")
    public ResponseEntity<?> blockUser(@PathVariable String roomId,
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
    public ResponseEntity<?> roomAlarm(@PathVariable String roomId,
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

    @DeleteMapping("/exit/{roomId}")
    public ResponseEntity<?> exitRoom(@PathVariable String roomId,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.exitRoom(roomId,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 나가기 완료", null), HttpStatus.OK);
    }

}