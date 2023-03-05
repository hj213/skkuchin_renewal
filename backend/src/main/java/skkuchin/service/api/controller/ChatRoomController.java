package skkuchin.service.api.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatRoomService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat/room")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;
    private final ChatRoomRepo chatRoomRepo;

    @PostMapping("")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomDto.RoomRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){
         AppUser user = principalDetails.getUser();
         chatRoomService.makeRoom(user,dto);
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);
     }





    //reaction = accept, refuse, hold
    //검증 추가 receiver id가 맞는지
    @PutMapping("/request/{roomId}")
    public ResponseEntity<?> receiverReaction(@PathVariable String roomId,  @RequestBody ChatRoomDto.ReactionRequest dto,@AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatRoomService.user2Accept(chatRoom,user,dto.getReaction());
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 매칭", null), HttpStatus.OK);
    }


    //상대 유저 블럭
    //block or remove
    @PutMapping("/block/{roomId}")
    public ResponseEntity<?> blockUser(@PathVariable String roomId,
                                       @RequestBody ChatRoomDto.BooleanRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        if(dto.getReaction().equals(true)){
            chatRoomService.blockUser(chatRoom,user,dto.getReaction());
        }
        else if(dto.getReaction().equals(false)){
            chatRoomService.blockUser(chatRoom,user,dto.getReaction());
        }

        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 차단", null), HttpStatus.OK);
    }

    @PutMapping("/alarm/{roomId}")
    public ResponseEntity<?> roomAlarm(@PathVariable String roomId,
                                       @RequestBody ChatRoomDto.BooleanRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        if(dto.getReaction().equals(true)){
            chatRoomService.setAlarm(chatRoom,user,dto.getReaction());
        }
        else if(dto.getReaction().equals(false)){
            chatRoomService.setAlarm(chatRoom,user,dto.getReaction());
        }

        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 알람 설정", null), HttpStatus.OK);
    }




    @DeleteMapping("/exit/{roomId}")
    public ResponseEntity<?> exitRoom(@PathVariable String roomId,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatRoomService.exitRoom(roomId,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 나가기 완료", null), HttpStatus.OK);
    }

}