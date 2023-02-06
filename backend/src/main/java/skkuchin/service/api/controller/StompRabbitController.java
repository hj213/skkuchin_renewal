package skkuchin.service.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.repo.ChatRepository;
import skkuchin.service.repo.ChatRoomRepository;

import skkuchin.service.service.ChatService;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
@Log4j2
public class StompRabbitController {

    private final RabbitTemplate template;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";

    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(ChatMessage chat, @DestinationVariable String chatRoomId){
        chat.setSender("hi");
        chat.setType(ChatMessage.MessageType.ENTER);
        chat.setMessage("입장하셨습니다.");
        //chat.setRoomId("87dff490-bed9-4153-a7aa-da0b7d1fb71a");

        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat); // exchange
    }

    @MessageMapping("chat.message.{chatRoomId}")
    public void send(ChatMessage chat, @DestinationVariable String chatRoomId, @Header("token") String token){

        /*chat.setSender("hi");*/
        System.out.println("token = " + token);
        String username = getUserNameFromJwt(token);
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

//        chat.setChatRoom(chatRoom);

        chat.setRoomId(chatRoom.getRoomId());
        chat.setDate(LocalDateTime.now());
        //chat.setRoomId("87dff490-bed9-4153-a7aa-da0b7d1fb71a");
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);
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


