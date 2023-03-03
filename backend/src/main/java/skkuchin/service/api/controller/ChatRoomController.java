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
/*@RequestMapping("/chat")*/
@RequestMapping("/api/chat")
public class ChatRoomController {
    private final ChatService chatService;
    private final ChatRoomRepo chatRoomRepository;



     @PostMapping("")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomDto.PostRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){

         AppUser user = principalDetails.getUser();
         chatService.makeRoom(user,dto);
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);


     }



    //채팅방의 메시지 시간 순으로 정렬
    //아래 api랑 합쳐야
    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getLatestMessage(@PathVariable String roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        List<ChatMessageDto.Response> responses = chatService.getLatestMessages(chatRoom);
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 id로 메시지 조회 완료", responses), HttpStatus.OK);
    }



    //reaction = accept, refuse, hold
    //검증 추가 receiver id가 맞는지
    @PostMapping("/room/{roomId}")
    public ResponseEntity<?> receiverReaction(@PathVariable String roomId,  @RequestBody ChatRoomDto.Request dto,@AuthenticationPrincipal PrincipalDetails principalDetails){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        AppUser user = principalDetails.getUser();
        chatService.receiverAccept(chatRoom,user,dto.getReaction());
        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 매칭 완료", null), HttpStatus.CREATED);


    }


    //상대 유저 블럭
    //block or remove
    @PostMapping("/block/{roomId}")
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

        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 차단", null), HttpStatus.CREATED);
    }




    @PutMapping("/{roomId}")
    public ResponseEntity<?> deleteExpiredData(@PathVariable String roomId,@AuthenticationPrincipal PrincipalDetails principalDetails) {

        AppUser user = principalDetails.getUser();
        chatService.exitRoom(roomId,user);
        return new ResponseEntity<>(new CMRespDto<>(1, "삭제 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<?> exitRoom() {
        chatService.deleteExpiredData();
        return new ResponseEntity<>(new CMRespDto<>(1, "만료 기간 지난 데이터 삭제 완료", null), HttpStatus.OK);
    }


}