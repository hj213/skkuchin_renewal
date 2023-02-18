package skkuchin.service.api.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import skkuchin.service.api.dto.CMRespDto;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.service.ChatService;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
/*@RequestMapping("/api/chat")*/
public class ChatRoomController {
    private final ChatService chatService;

    @GetMapping("/senderRooms")
    public ResponseEntity<?> sortSenderChatRoom(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser appUser = principalDetails.getUser();

        List<ChatRoomDto.Response> responses = chatService.getSenderChatRoom(appUser)
                .collectList()
                .doOnError(error -> {
                    // This block will be executed if there is an error during the database operation
                    System.err.println("Error saving room: " + error.getMessage());
                })
                .block();
        Collections.sort(responses, new DateComparator().reversed());

        return new ResponseEntity<>(new CMRespDto<>(1, "sender's 정렬된 채팅방 조회 완료", responses), HttpStatus.OK);
    }


    //receiver 기준 최신 채탕방 정렬
    @GetMapping("/receiverRooms")
    public ResponseEntity<?> sortReceiverChatRoom(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser appUser = principalDetails.getUser();

        List<ChatRoomDto.Response> responses = chatService.getSenderChatRoom(appUser)
                .collectList()
                .doOnError(error -> {
                    // This block will be executed if there is an error during the database operation
                    System.err.println("Error saving room: " + error.getMessage());
                })
                .block();
        Collections.sort(responses, new DateComparator().reversed());
        return new ResponseEntity<>(new CMRespDto<>(1, "receiver's 정렬된 채팅방 조회 완료", responses), HttpStatus.OK);
    }
    class DateComparator implements Comparator<ChatRoomDto.Response> {
        @Override
        public int compare(ChatRoomDto.Response f1, ChatRoomDto.Response f2) {
            if (f1.getLocalDateTime().isAfter(f2.getLocalDateTime()) ) {
                return 1;
            } else  {
                return -1;
            }

        }
    }


     @PostMapping("/rooms")
    public ResponseEntity<?> makeRoom(@RequestBody ChatRoomDto.PostRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails){

         AppUser user = principalDetails.getUser();
         chatService.makeRoom(user,dto)
                 .doOnError(error -> {
                     // This block will be executed if there is an error during the database operation
                     System.err.println("Error saving room: " + error.getMessage());
                 })
                 .block();
         return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 개설 완료", null), HttpStatus.CREATED);


     }


    //채팅방의 메시지 시간 순으로 정렬
    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getLatestMessage(@PathVariable String roomId) {
        List<ChatMessageDto.Response> responses = chatService.getLatestMessages(roomId)
                .collectList()
                .doOnError(error -> {
                    // This block will be executed if there is an error during the database operation
                    System.err.println("Error saving room: " + error.getMessage());
                })
                .block();
        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 id로 메시지 조회 완료", responses), HttpStatus.OK);
    }

    //채팅방의 가장 최근 메시지 1개만 받아옴
    @GetMapping("/room/latest/{roomId}")
    public ResponseEntity<?> getLatestOneMessage(@PathVariable String roomId) {
        ChatMessageDto.Response response = chatService.getLatestMessage(roomId)
                .doOnError(error -> {
                    // This block will be executed if there is an error during the database operation
                    System.err.println("Error saving room: " + error.getMessage());
                })
                .block();

        return new ResponseEntity<>(new CMRespDto<>(1, "채팅방 id로 메시지 조회 완료", response), HttpStatus.OK);
    }


    //reaction = accept, refuse, hold
    @PostMapping("/room/{reaction}/{roomId}")
    public ResponseEntity<?> receiverReaction(@PathVariable String roomId, @PathVariable
            String reaction,@AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser user = principalDetails.getUser();
        if(reaction.equals("accept")){
            System.out.println("his = ");
            chatService.receiverAccept(roomId,user)
                    .doOnError(error -> {
                        // This block will be executed if there is an error during the database operation
                        System.err.println("Error saving room: " + error.getMessage());
                    })
                    .block();
        }
        else if(reaction.equals("refuse")){
            chatService.receiverRefuse(roomId,user)
                    .doOnError(error -> {
                        // This block will be executed if there is an error during the database operation
                        System.err.println("Error saving room: " + error.getMessage());
                    })
                    .block();
        }

        else if (reaction.equals("hold")){
            chatService.receiverHold(roomId,user)
                    .doOnError(error -> {
                        // This block will be executed if there is an error during the database operation
                        System.err.println("Error saving room: " + error.getMessage());
                    })
                    .block();
        }

        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 매칭 완료", null), HttpStatus.CREATED);


    }



    //상대 유저 블럭
    //block or remove
    @PostMapping("/room/response/{response}/{roomId}")
    public ResponseEntity<?> blockUser(@PathVariable String roomId,
            @PathVariable String response, @AuthenticationPrincipal PrincipalDetails principalDetails){
        AppUser user = principalDetails.getUser();
        if(response.equals("block") ){
            chatService.blockUser(roomId,user)
                    .doOnError(error -> {
                        // This block will be executed if there is an error during the database operation
                        System.err.println("Error saving room: " + error.getMessage());
                    })
                    .block();
        }
        else if(response.equals("remove")){
            chatService.removeBlockedUser(roomId,user)
                    .doOnError(error -> {
                        // This block will be executed if there is an error during the database operation
                        System.err.println("Error saving room: " + error.getMessage());
                    })
                    .block();
        }

        return new ResponseEntity<>(new CMRespDto<>(1, "상대방 채팅 차단", null), HttpStatus.CREATED);
    }



    //데이터 삭제
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

    @GetMapping(value = "/roomm")
    public String getRoom1(){
        return "chat/rrrr";
    }


}