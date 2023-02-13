package skkuchin.service.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
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
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;

import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@Log4j2
public class StompRabbitController {

    private final RabbitTemplate template;
    private final ChatRepo chatRepository;
    private final ChatRoomRepo chatRoomRepository;
    private final ChatService chatService;
    private final ChatSessionService chatSessionService;

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";


    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(ChatMessage chat, @DestinationVariable String chatRoomId, @Header("token") String token){
        chat.setSender("hi");
        chat.setType(ChatMessage.MessageType.ENTER);
        chat.setMessage("입장하셨습니다.");
        //chat.setRoomId("87dff490-bed9-4153-a7aa-da0b7d1fb71a");

        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat); // exchange
    }

    @MessageMapping("chat.message.{chatRoomId}")
    public void send(ChatMessage chat, @DestinationVariable String chatRoomId
   , Message<?> message){
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        /*chat.setSender("hi");*/
        String sessionId = accessor.getSessionId();
        System.out.println("header = " + sessionId);
        ChatSession chatSession = chatSessionService.findSession(sessionId);
        /*System.out.println("token = " + token);*/
        /*String username = getUserNameFromJwt(token);*/
        String username = chatSession.getSender();
       
   /* System.out.println("getUserNameFromJwt(token) = " + getUserNameFromJwt(token));
    AppUser user = AppUser.builder().id(1L).nickname("user").major(Major.건축학과).build();*/
   /* AppUser user = principalDetails.getUser();
    System.out.println("user = " + user);*/
        /*System.out.println("user.getNickname() = " + user.getNickname());*/
        chat.setType(ChatMessage.MessageType.TALK);
        chat.setSender(username);
        System.out.println("chatRoomId = " + chatRoomId);
        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        //  System.out.println("chatRoom.getRoomId() = " + chatRoom.getRoomId());


            chat.setRoomId(chatRoom.getRoomId());
            chat.setChatRoom(chatRoom);
            chat.setDate(LocalDateTime.now());
            chatRoom.setLatestMessageTime(LocalDateTime.now());

            chat.setUserCount(2-chatRoom.getUserCount());
            //chat.setRoomId("87dff490-bed9-4153-a7aa-da0b7d1fb71a");
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);
            chatRoomRepository.save(chatRoom);
            chatRepository.save(chat);

    };

//    @RabbitListener(queues = CHAT_QUEUE_NAME)
//    public void receive(ChatMessage chat){
//        System.out.println("received : " + chat.getMessage());
//
//    }

    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }
}


