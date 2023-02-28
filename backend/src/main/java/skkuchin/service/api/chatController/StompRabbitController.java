package skkuchin.service.api.chatController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
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
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.ChatSessionRepo;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

import java.time.LocalDateTime;
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


        List<ChatMessageDto.Response> chatMessages = chatRepository.findByChatRoom(chatRoom)
                .stream()
                .map(message1 -> new ChatMessageDto.Response(message1))
                .collect(Collectors.toList());



        String json = new Gson().toJson(chatMessages);
        String json2 = new Gson().toJson(chatRoom2) + json;

        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId,json2);

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

        //DB 저장
        chatRoomRepository.save(chatRoom);
        chatRepository.save(chat);


    }




    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }





}


