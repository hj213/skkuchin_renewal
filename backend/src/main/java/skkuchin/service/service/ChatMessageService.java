package skkuchin.service.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageService {

    private final ChatRoomRepo chatRoomRepo;
    private final ChatRepo chatRepo;
    private final UserRepo userRepo;


    @Transactional
    public void write(AppUser user, ChatMessageDto.Request dto){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(dto.getRoomId());
        ChatMessage chatMessage = dto.toEntity(chatRoom,user);
        chatRepo.save(chatMessage);
    }





    @Transactional
    public List<ChatRoomDto.Response> getChatList(String sender){

        AppUser user = userRepo.findByUsername(sender);
        List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(user.getId());
        List<ChatRoomDto.Response> chatRoomsFindByUserId = chatRooms
                .stream()
                .map(chatRoom -> new ChatRoomDto.Response(chatRoom,getLatestMessage(chatRoom),
                        unReadMessage(chatRoom.getRoomId(),sender)))
                .collect(Collectors.toList());
        Collections.sort(chatRoomsFindByUserId,new DateComparator().reversed());

        return chatRoomsFindByUserId;
    }

    @Transactional
    public List<ChatRoomDto.userResponse> getAlarmList(String sender){

        AppUser user = userRepo.findByUsername(sender);
        List<ChatRoom> chatRooms = chatRoomRepo.findByUser2Id(user.getId());
        List<ChatRoomDto.userResponse> chatRoom = chatRooms
                .stream()
                .map(message -> new ChatRoomDto.userResponse(message))
                .collect(Collectors.toList());
        return chatRoom;
    }



    @Transactional
    public int unReadMessage(String roomId, String sender){
        List<ChatMessage> chatMessages = chatRepo.findByReadStatus(roomId, sender);
        return chatMessages.size();
    }





    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }




    private ChatMessage getLatestMessage(ChatRoom chatRoom){

        ChatMessage chatMessage = new ChatMessage() ;
        if(chatRepo.findByLatestMessageTime(chatRoom.getRoomId()).size() == 0){
            chatMessage.setDate(chatRoom.getExpireDate().minusDays(2));
        }
        else{
            chatMessage = chatRepo.findByLatestMessageTime(chatRoom.getRoomId()).get(0);

        }
        return chatMessage;
    }
    private class DateComparator implements Comparator<ChatRoomDto.Response> {
        @Override
        public int compare(ChatRoomDto.Response f1, ChatRoomDto.Response f2) {
            if (f1.getMessageTime().isAfter(f2.getMessageTime()) ) {
                return 1;
            } else  {
                return -1;
            }

        }
    }

}
