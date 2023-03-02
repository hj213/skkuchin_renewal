package skkuchin.service.webSocket.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@Log4j2
public class ChatController {

    private final RabbitTemplate template;
    private final ChatRepo chatRepository;
    private final ChatRoomRepo chatRoomRepository;
    private final ChatService chatService;
    private final UserRepo userRepo;
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

        AppUser user = userRepo.findByUsername(username);

        chat.setSender(username);
        chat.setMessage("입장하셨습니다.");
        ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        ChatRoomDto.blockResponse chatRoom2 = chatService.getRoomDto(chatRoom);


        List<ChatMessageDto.Response> chatMessages = chatRepository.findByChatRoom(chatRoom)
                .stream()
                .map(message1 -> new ChatMessageDto.Response(message1))
                .collect(Collectors.toList());

        UserDto.Response user1 = new UserDto.Response(user);

        String chatMessageToJson = new Gson().toJson(chatMessages);
        String userToJson = new Gson().toJson(user1);
        JsonObject jsonObject = new JsonObject();
        JsonElement chatMessagesElement = JsonParser.parseString(chatMessageToJson);
        JsonElement user1Element = JsonParser.parseString(userToJson);
        JsonElement chatRoom2Element = JsonParser.parseString(new Gson().toJson(chatRoom2));
        jsonObject.add("chatMessages", chatMessagesElement);
        jsonObject.add("user", user1Element);
        jsonObject.add("chatRoom", chatRoom2Element);
        String concatenatedJson = jsonObject.toString();
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId,concatenatedJson);

    }


    //기존의 유저 메시지 불러오기
    @MessageMapping("chat.alarm.{chatRoomId}")
    public void newAppointment(ChatMessage chat, @Header("token") String token,@DestinationVariable String chatRoomId){

        String username = getUserNameFromJwt(token);
        AppUser user = userRepo.findByUsername(username);
        List<ChatRoom> chatRooms = chatRoomRepository.findByReceiverId(user.getId());
        System.out.println("user.getId() = " + user.getId());
        List<ChatRoomDto.userResponse> chatRoom = chatRooms
                .stream()
                .map(message -> new ChatRoomDto.userResponse(message))
                .collect(Collectors.toList());

        System.out.println("chatRooms = " + chatRoom);
        for (int i = 0; i < chatRooms.size(); i++) {
            System.out.println("chatRooms.get(i).getRoomName() = " + chatRooms.get(i).isReceiverBlocked());
        }
        String chatMessageToJson = new Gson().toJson(chatRoom);
        JsonObject jsonObject = new JsonObject();
        JsonElement chatMessagesElement = JsonParser.parseString(chatMessageToJson);

        jsonObject.add("Alarm", chatMessagesElement);
        String concatenatedJson = jsonObject.toString();
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId,concatenatedJson);

    }

    @MessageMapping("chat.list.{chatRoomId}")
    public void myChatList(@Header("token") String token,@DestinationVariable String chatRoomId){
        String username = getUserNameFromJwt(token);
        AppUser user = userRepo.findByUsername(username);
        List<ChatRoom> chatRooms = chatRoomRepository.findByNormalReceiverId(user.getId());
        System.out.println("user.getId() = " + user.getId());
        List<ChatRoomDto.blockResponse> chatMessages = chatRooms
                .stream()
                .map(message1 -> new ChatRoomDto.blockResponse(message1))
                .collect(Collectors.toList());

        System.out.println("chatRooms = " + chatRooms);
        for (int i = 0; i < chatRooms.size(); i++) {
            System.out.println("chatRooms.get(i).getRoomName() = " + chatRooms.get(i).getRoomName());
        }
        String chatMessageToJson = new Gson().toJson(chatMessages);
        JsonObject jsonObject = new JsonObject();
        JsonElement chatMessagesElement = JsonParser.parseString(chatMessageToJson);

        jsonObject.add("chatMessages", chatMessagesElement);
        String concatenatedJson = jsonObject.toString();
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+chatRoomId,concatenatedJson);

    }




    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }





}


