package skkuchin.service.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.ChatMessageRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageService {

    private final ChatRoomRepo chatRoomRepo;
    private final ChatMessageRepo chatMessageRepo;
    private final UserRepo userRepo;


    @Transactional
    public void write(AppUser user, ChatMessageDto.Request dto){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(dto.getRoomId());
        ChatMessage chatMessage = dto.toEntity(chatRoom,user);
        chatMessageRepo.save(chatMessage);
    }

    @Transactional
    public List<ChatRoomDto.Response> getChatList(String username){

        AppUser user = userRepo.findByUsername(username);
        List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(user.getId());

        if (chatRooms.size() > 0) {
            List<ChatRoomDto.Response> chatRoomDtos = chatRooms
                    .stream()
                    .map(chatRoom -> new ChatRoomDto.Response(
                            chatRoom,
                            getLatestMessage(chatRoom),
                            unReadMessage(chatRoom.getRoomId(), username),
                            getOtherUser(chatRoom, username)
                    ))
                    .collect(Collectors.toList());
            Collections.sort(chatRoomDtos,new DateComparator().reversed());

            return chatRoomDtos;
        }
        List<ChatRoomDto.Response> chatRoomDto = new ArrayList<>();
        return chatRoomDto;
    }

    @Transactional
    public List<ChatRoomDto.userResponse> getAlarmList(String username){

        AppUser user = userRepo.findByUsername(username);
        List<ChatRoom> chatRooms = chatRoomRepo.findRequestByUserId(user.getId());


        List<ChatRoomDto.userResponse> chatRoomDto = chatRooms
                .stream()
                .map(chatRoom -> new ChatRoomDto.userResponse(chatRoom))
                .collect(Collectors.toList());
        Collections.sort(chatRoomDto,new AlarmListDateComparator().reversed());

        return chatRoomDto;
    }

    @Transactional
    public int unReadMessage(String roomId, String username){
        return chatMessageRepo.countByReadStatus(roomId, username);
    }

    @Transactional
    public AppUser getOtherUser(ChatRoom chatRoom, String username){
        AppUser user = userRepo.findByUsername(username);
        return chatRoomRepo.findOtherUser(chatRoom, user.getId());
    }

    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }

    @Transactional
    public List<ChatMessageDto.Response> getAllMessage(ChatRoom chatRoom){
        List<ChatMessageDto.Response> messages = chatMessageRepo.findByChatRoom(chatRoom)
                .stream()
                .map(message -> new ChatMessageDto.Response(message,chatRoom))
                .collect(Collectors.toList());
        Collections.sort(messages,new MessageDateComparator().reversed());
        return messages;
    }

    private ChatMessage getLatestMessage(ChatRoom chatRoom){
        List<ChatMessage> chatMessages = chatMessageRepo.findByLatestTime(chatRoom.getRoomId());
        if(chatMessages.size() == 0) {
            throw new CustomRuntimeException("새로운 채팅방이 개설되었습니다");
        }
        ChatMessage chatMessage = chatMessages.get(0);
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

    private class AlarmListDateComparator implements Comparator<ChatRoomDto.userResponse> {
        @Override
        public int compare(ChatRoomDto.userResponse f1, ChatRoomDto.userResponse f2) {
            if (f1.getCreatedDate().isAfter(f2.getCreatedDate()) ) {
                return 1;
            } else  {
                return -1;
            }
        }
    }

    private class MessageDateComparator implements Comparator<ChatMessageDto.Response> {
        @Override
        public int compare(ChatMessageDto.Response f1, ChatMessageDto.Response f2) {
            if (f1.getDate().isAfter(f2.getDate()) ) {
                return 1;
            } else  {
                return -1;
            }
        }
    }

}
