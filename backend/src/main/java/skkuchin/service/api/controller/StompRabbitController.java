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
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import skkuchin.service.config.chat.JwtErrorCode;
import skkuchin.service.config.chat.ResponseCode;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;

import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

import java.nio.charset.StandardCharsets;
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
        String username = getUserNameFromJwt(token);
        chat.setSender(username);
        chat.setMessage("입장하셨습니다.");
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat); // exchange
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
        chatRoom.setLatestMessageTime(LocalDateTime.now());
        chat.setUserCount(2-chatRoom.getUserCount());

        System.out.println("chatRoom.isReceiverBlocked() = " + chatRoom.isReceiverBlocked());
        System.out.println("chatRoom.isSenderBlocked() = " + chatRoom.isSenderBlocked());
        //메시지 매핑
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);

       /*if (chatRoom.isSenderBlocked() == false && chatRoom.isReceiverBlocked() == false) {
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);
        }
        else{
            prepareErrorMessage(JwtErrorCode.ACCESS_TOKEN_EXPIRATION);

        }*/


        //DB 저장
        chatRoomRepository.save(chatRoom);
        chatRepository.save(chat);

    };


    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }

    private Message<byte[]> prepareErrorMessage(ResponseCode responseCode)
    {
        String code = String.valueOf(responseCode.getMessage());
        //에러 생성
        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);
        //해당 메시지 출력
        accessor.setMessage(String.valueOf(responseCode.getCode()));
        accessor.setLeaveMutable(true);
        return MessageBuilder.createMessage(code.getBytes(StandardCharsets.UTF_8), accessor.getMessageHeaders());

    }
}


