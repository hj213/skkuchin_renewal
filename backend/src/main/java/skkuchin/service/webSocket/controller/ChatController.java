package skkuchin.service.webSocket.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;
import skkuchin.service.util.LocalDateTimeSerializer;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Log4j2
public class ChatController {

    private final RabbitTemplate template;
    private final ChatRepo chatRepository;
    private final ChatService chatService;
    private final ChatSessionService chatSessionService;
    private final UserRepo userRepo;
    private final ChatMessageService chatMessageService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";


    //로직하나 더 만들어서 전체 채팅방 구독하는 거 하나 만들기
    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(@DestinationVariable String chatRoomId, @Header("token") String token){
        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        String username = chatMessageService.getUserNameFromJwt(token);
        AppUser user = userRepo.findByUsername(username);
        UserDto.Response userDto= new UserDto.Response(user);
        ChatRoomDto.blockResponse blockResponse = chatService.getRoomDto(chatRoom);
        List<ChatMessageDto.Response> chatMessages = chatService.getAllMessage(chatRoom);

       if(chatService.findUser(chatRoom).getUsername().equals(username)){
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user1",blockResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user1",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user1",userDto);

       }
       else{
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user2",blockResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user2",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user2",userDto);
        }
    }


















}


