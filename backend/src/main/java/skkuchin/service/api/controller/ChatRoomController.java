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
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepository;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.ChatService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;



    @GetMapping("/rooms")
    public ResponseEntity<?> getAllChatroom() {

        List<ChatRoomDto.Response> responses = chatService.getAllRoom();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 채팅방 조회 완료", responses), HttpStatus.OK);
    }

     @PostMapping("/rooms")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomDto.PostRequest dto,@AuthenticationPrincipal PrincipalDetails principalDetails){

         AppUser user = principalDetails.getUser();
         chatService.makeRoom(user,dto);
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);


     }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getCertainMessage(@PathVariable String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        System.out.println("chatRoom.getRoomId() = " + chatRoom.getRoomId());
        System.out.println("chatRoom.getRoomName() = " + chatRoom.getRoomName());
        List<ChatMessageDto.Response> responses = chatService.getAllMessage(chatRoom);
        System.out.println("responses = " + responses.size());
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 id로 채팅방 조회 완료", responses), HttpStatus.OK);
    }


    @PostMapping("/room/{roomId}")
    public ResponseEntity<?> updateUser(@PathVariable String roomId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatService.update(chatRoom,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 개설 완료", null), HttpStatus.CREATED);


    }


   /* @GetMapping("/roomsss")
    public String getRooms(){
        return "chat/rooms";
    }*/

    @GetMapping(value = "/room")
    public String getRoom(String chatRoomId, String sender, Model model){

        model.addAttribute("chatRoomId", chatRoomId);
        model.addAttribute("sender", sender);

        return "chat/rooms";
    }


    /* // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }
    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatService.findAllRoom();
    }
    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String name) {
        return chatService.createRoom(name);
    }
    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "/chat/roomdetail";
    }
    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findById(roomId);
    }*/
}