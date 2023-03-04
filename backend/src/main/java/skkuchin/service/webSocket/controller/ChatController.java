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


import java.util.List;

@Controller
@RequiredArgsConstructor
@Log4j2
public class ChatController {

    private final RabbitTemplate template;
    private final ChatService chatService;
    private final UserRepo userRepo;
    private final ChatMessageService chatMessageService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";


    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(@DestinationVariable String chatRoomId, @Header("token") String token){
        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        String username = chatMessageService.getUserNameFromJwt(token);
        AppUser user = userRepo.findByUsername(username);
        UserDto.Response userDto= new UserDto.Response(user);
        ChatRoomDto.blockResponse blockResponse = chatService.getRoomDto(chatRoom);
        List<ChatMessageDto.Response> chatMessages = chatService.getAllMessage(chatRoom);

       if(chatService.findUser1(chatRoom).getUsername().equals(username)){
           template.convertAndSend(CHAT_EXCHANGE_NAME,"block."+chatRoomId +"user1",blockResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user1",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"user."+chatRoomId +"user1",userDto);

       }
       else{
           template.convertAndSend(CHAT_EXCHANGE_NAME,"block."+chatRoomId +"user2",blockResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId +"user2",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"user."+chatRoomId +"user2",userDto);
        }
    }


















}


