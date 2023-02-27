package skkuchin.service.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;
import org.json.simple.JSONArray;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.ReplayProcessor;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.config.chat.JwtErrorCode;
import skkuchin.service.config.chat.ResponseCode;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;




import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;

import skkuchin.service.repo.ChatSessionRepo;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

import javax.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Log4j2
public class StompRabbitController {

    private final RabbitTemplate template;
    private final ChatRepo chatRepository;
    private final ChatRoomRepo chatRoomRepository;
    private final ChatService chatService;
    private final ChatSessionService chatSessionService;
    private final ChatSessionRepo chatSessionRepo;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";


    //로직하나 더 만들어서 전체 채팅방 구독하는 거 하나 만들기
    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(ChatMessage chat, @DestinationVariable String chatRoomId, @Header("token") String token
    ,Message<?> message){
        String username = getUserNameFromJwt(token);
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        //세션, 채팅방 정보, 유저 정보 설정, 받아오기


        chat.setSender(username);
        chat.setMessage("입장하셨습니다.");
        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        ChatRoomDto.Response1 chatRoom2 = chatService.getRoomDto(chatRoom);

        List<ChatMessage> chatMessage = chatRepository.findByChatRoom(chatRoom);
        List<ChatMessageDto.Response> chatMessages = chatRepository.findByChatRoom(chatRoom)
                .stream()
                .map(message1 -> new ChatMessageDto.Response(message1))
                .collect(Collectors.toList());

        //list를 json 형태로 뿌려줘야함.
        /*ObjectMapper mapper = new ObjectMapper();

        String jsonArray = mapper.writeValueAsString(chatMessages);*/

        String json = new Gson().toJson(chatMessages);
        String json2 = new Gson().toJson(chatRoom2) + json;
        String json1 = json;

        System.out.println("json = " + json2);
   /*     if(username.equals("admin")){
              for (int i = 0; i < chatMessage.size(); i++) {
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +"1541d190-9021-49a6-9d6e-890953fc5b3e", chatMessage.get(i));

        }
        }*/
        if(username.equals("admin")){
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+"1541d190-9021-49a6-9d6e-890953fc5b3e",json2);

        }
        else{
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+"8ea645b1-d6c8-4cf9-9cdd-0eb401537e4b",json1);

        }






       /* template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId,chat);*/
       /* template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + "05de58dd-f22f-4ba8-bbff-b7341a65bf9f",chat);*/// exchange
    }

    @MessageMapping("chat.message.{chatRoomId}")
    public void send(ChatMessage chat, @DestinationVariable String chatRoomId
   , Message<?> message){
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        //세션, 채팅방 정보, 유저 정보 설정, 받아오기
        String sessionId = accessor.getSessionId();

        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        ChatSession chatSession = chatSessionService.findSession(sessionId);
        String username = chatSession.getSender();

        //chat 메시지 + 채팅방 정보 설정

        chat.setSender(username);
        chat.setRoomId(chatRoom.getRoomId());
        chat.setChatRoom(chatRoom);
        chat.setDate(LocalDateTime.now());
        chat.setUserCount(2-chatRoom.getUserCount());
        System.out.println("chatRoom.isReceiverBlocked() = " + chatRoom.isReceiverBlocked());
        System.out.println("chatRoom.isSenderBlocked() = " + chatRoom.isSenderBlocked());
        //메시지 매핑
      /*  template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);*/
       /* template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + "05de58dd-f22f-4ba8-bbff-b7341a65bf9f",chat);*/

       /*if (chatRoom.isSenderBlocked() == false && chatRoom.isReceiverBlocked() == false) {
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);
        }
        else{
            prepareErrorMessage(JwtErrorCode.ACCESS_TOKEN_EXPIRATION);

        }*/
        //DB 저장
        chatRoomRepository.save(chatRoom);
        chatRepository.save(chat);


    }

    @MessageMapping("chat.check.{chatRoomId}")
    public void check(ChatMessage chat, @DestinationVariable String chatRoomId
            , Message<?> message){
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        //세션, 채팅방 정보, 유저 정보 설정, 받아오기
        String sessionId = accessor.getSessionId();

        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        int count = chatRoom.getUserCount();
        chat.setMessage("over");
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId,chat);

    };


    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }





}


