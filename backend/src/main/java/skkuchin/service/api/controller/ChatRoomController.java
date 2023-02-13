package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
@RequestMapping("/chat")
/*@RequestMapping("/api/chat")*/
public class ChatRoomController {
    private final ChatService chatService;
    private final ChatRoomRepo chatRoomRepository;



    @GetMapping("/rooms")
    public ResponseEntity<?> getAllChatroom() {

        List<ChatRoomDto.Response> responses = chatService.getAllRoom();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 채팅방 조회 완료", responses), HttpStatus.OK);
    }



    //최신 채팅방 정렬
    @GetMapping("/senderRooms")
    public ResponseEntity<?> test(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser appUser = principalDetails.getUser();

        List<ChatRoomDto.Response> responses = chatService.getSenderChatRoom(appUser);
        return new ResponseEntity<>(new CMRespDto<>(1, "sender's 채팅방 조회 완료", responses), HttpStatus.OK);
    }

    //상대방 기준으로 정렬
    @GetMapping("/receiverRooms")
    public ResponseEntity<?> test1(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser appUser = principalDetails.getUser();

        List<ChatRoomDto.Response> responses = chatService.getReceiverChatRoom(appUser);
        return new ResponseEntity<>(new CMRespDto<>(1, "receiver's 채팅방 조회 완료", responses), HttpStatus.OK);
    }
     @PostMapping("/rooms")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomDto.PostRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){

         AppUser user = principalDetails.getUser();
         chatService.makeRoom(user,dto);
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);


     }



    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getLatestMessage(@PathVariable String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        System.out.println("chatRoom.getRoomId() = " + chatRoom.getRoomId());
        System.out.println("chatRoom.getRoomName() = " + chatRoom.getRoomName());
        List<ChatMessageDto.Response> responses = chatService.getLatestMessages(chatRoom);
        System.out.println("responses = " + responses.size());
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 id로 채팅방 조회 완료", responses), HttpStatus.OK);
    }

    @GetMapping("/room/latest/{roomId}")
    public ResponseEntity<?> getLatestOneMessage(@PathVariable String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        System.out.println("chatRoom.getRoomId() = " + chatRoom.getRoomId());
        System.out.println("chatRoom.getRoomName() = " + chatRoom.getRoomName());
        ChatMessageDto.Response responses = chatService.getLatestMessage(chatRoom);

        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 id로 채팅방 조회 완료", responses), HttpStatus.OK);
    }


    @PostMapping("/room/accept/{roomId}")
    public ResponseEntity<?> receiverAccept(@PathVariable String roomId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatService.receiverAccept(chatRoom,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 개설 완료", null), HttpStatus.CREATED);


    }

    @PostMapping("/room/refuse/{roomId}")
    public ResponseEntity<?> receiverRefuse(@PathVariable String roomId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatService.receiverRefuse(chatRoom,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 거절", null), HttpStatus.CREATED);


    }

    @PostMapping("/room/hold/{roomId}")
    public ResponseEntity<?> receiverHold(@PathVariable String roomId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatService.receiverHold(chatRoom,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 보류", null), HttpStatus.CREATED);


    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteExpiredData() {
        chatService.deleteExpiredData();
        return new ResponseEntity<>(new CMRespDto<>(1, "만료 기간 지난 데이터 삭제 완료", null), HttpStatus.OK);
    }



    @GetMapping(value = "/room")
    public String getRoom(String chatRoomId, String sender, Model model){

        model.addAttribute("chatRoomId", chatRoomId);
        model.addAttribute("sender", sender);

        return "chat/rooms";
    }

    @GetMapping(value = "/roommm")
    public String getRoom(){



        return "chat/rrr";
    }


}