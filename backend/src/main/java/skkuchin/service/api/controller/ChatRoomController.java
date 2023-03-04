package skkuchin.service.api.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatService;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/chat/room")
public class ChatRoomController {
    private final ChatService chatService;
    private final ChatRoomRepo chatRoomRepository;

    @PostMapping("")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomDto.PostRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){
         AppUser user = principalDetails.getUser();
         chatService.makeRoom(user,dto);
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);
     }





    //reaction = accept, refuse, hold
    //검증 추가 receiver id가 맞는지
    @PutMapping("/reaction/{roomId}")
    public ResponseEntity<?> receiverReaction(@PathVariable String roomId,  @RequestBody ChatRoomDto.Request dto,@AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatService.user2Accept(chatRoom,user,dto.getReaction());
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 매칭", null), HttpStatus.OK);
    }


    //상대 유저 블럭
    //block or remove
    @PutMapping("/block/{roomId}")
    public ResponseEntity<?> blockUser(@PathVariable String roomId,
                                       @RequestBody ChatRoomDto.Request dto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        if(dto.getReaction().equals("block")){
            chatService.blockUser(chatRoom,user);
        }
        else if(dto.getReaction().equals("remove")){
            chatService.removeBlockedUser(chatRoom,user);
        }

        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 차단", null), HttpStatus.OK);
    }

    @PutMapping("/alarm/{roomId}")
    public ResponseEntity<?> roomAlarm(@PathVariable String roomId,
                                       @RequestBody ChatRoomDto.Request dto, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        if(dto.getReaction().equals("set")){
            chatService.setAlarm(chatRoom,user);
        }
        else if(dto.getReaction().equals("disable")){
            chatService.disableAlarm(chatRoom,user);
        }

        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 알람 설정", null), HttpStatus.OK);
    }




    @PutMapping("/exit/{roomId}")
    public ResponseEntity<?> exitRoom(@PathVariable String roomId,@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        chatService.exitRoom(roomId,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 나가기 완료", null), HttpStatus.OK);
    }



}