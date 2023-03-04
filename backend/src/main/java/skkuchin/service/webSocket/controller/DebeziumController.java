package skkuchin.service.webSocket.controller;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.api.dto.DebeziumDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.UserService;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class DebeziumController {
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatService chatService;
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepo chatRoomRepo;
    private final UserService userService;



    @KafkaListener(topics = "dbserver.service.chat_message")
    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        //payload null 여부 확인
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatMessageRequest dto= objectMapper.readValue(message, DebeziumDto.ChatMessageRequest.class);

        ChatRoom chatRoom = chatService.findChatById(dto.getPayload().getAfter().getChat_room_id());
        AppUser user1 = chatService.findUser1(chatRoom);
        AppUser user2 = chatService.findUser2(chatRoom);

        String roomId = chatRoom.getRoomId();
        String user1Name = user1.getUsername();
        String user2Name = user2.getUsername();

        UserDto.chatRoomResponse user1Info = userService.getChatRoomUser(user1Name);
        UserDto.chatRoomResponse user2Info = userService.getChatRoomUser(user2Name);
        List<ChatRoomDto.Response> user1ChatMessages = chatMessageService.getChatList(user1Name);
        List<ChatRoomDto.Response> user2chatMessages = chatMessageService.getChatList(user2Name);
        DebeziumDto.UserChatInfo user1ChatInfo = new DebeziumDto.UserChatInfo(user1Info,user1ChatMessages);
        DebeziumDto.UserChatInfo user2ChatInfo = new DebeziumDto.UserChatInfo(user2Info,user2chatMessages);

        dto.getPayload().getAfter().getChat_room_id();
        List<ChatMessageDto.Response> chatMessages = chatService.getAllMessage(chatRoom);

        template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user1", chatMessages);
        template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user2", chatMessages);

        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user2Name+"chatRoomList",user2ChatInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user1Name+"chatRoomList",user1ChatInfo);

    }


    @KafkaListener(topics = "dbserver.service.chat_room")
    public void chatRoomChange(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatRoomRequest dto= objectMapper.readValue(message, DebeziumDto.ChatRoomRequest.class);
        String roomId = dto.getPayload().getAfter().getRoom_id();
        ChatRoom chatRoom = chatService.findChatroom(roomId);


        ChatRoomDto.userResponse chatRoomBlockInfo = chatService.getUserRoomDto(chatRoom);
        AppUser user1 = chatService.findUser1(chatRoom);
        AppUser user2 = chatService.findUser2(chatRoom);
        String userName1 = user1.getUsername();
        String userName2 = user2.getUsername();
        UserDto.chatRoomResponse user1Info = userService.getChatRoomUser(userName1);
        UserDto.chatRoomResponse user2Info = userService.getChatRoomUser(userName2);
        List<ChatRoomDto.Response> user1ChatMessages = chatMessageService.getChatList(userName1);
        List<ChatRoomDto.Response> user2chatMessages = chatMessageService.getChatList(userName2);
        DebeziumDto.UserChatInfo user1ChatInfo = new DebeziumDto.UserChatInfo(user1Info,user1ChatMessages);
        DebeziumDto.UserChatInfo user2ChatInfo = new DebeziumDto.UserChatInfo(user2Info,user2chatMessages);


        
        template.convertAndSend(CHAT_EXCHANGE_NAME, "block." +roomId+"user1", chatRoomBlockInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME, "block." +roomId+"user2", chatRoomBlockInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName1 +"chatRoomList",user1ChatInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName2+"chatRoomList",user2ChatInfo);

        if(dto.getPayload().getOp().equals("c")){
            String username = user2.getUsername();
            List<ChatRoomDto.userResponse> alarmList = chatMessageService.getAlarmList(username);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+ username,alarmList);
        }
    }


    @KafkaListener(topics = "dbserver.service.user")
    public void userChange(@Payload(required = false) String message) throws Exception{
        System.out.println("kafka consume test topic : "  + message);
        //payload null 여부 확인

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.UserRequest dto= objectMapper.readValue(message, DebeziumDto.UserRequest.class);
        String userName1 = dto.getPayload().getAfter().getUsername();
        Long userId = dto.getPayload().getAfter().getId();
        UserDto.Response userDto = userService.getUser(userId);


        if(dto.getPayload().getOp().equals("u") || dto.getPayload().getOp().equals("d")){

            template.convertAndSend(CHAT_EXCHANGE_NAME,
                    "alarm."+userName1,dto);

            List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(userId);
            for (int i = 0; i < chatRooms.size(); i++) {
                AppUser user1 = chatService.findUser1(chatRooms.get(i));
                AppUser user2 = chatService.findUser2(chatRooms.get(i));
                String user1Name = user1.getUsername();
                String user2Name = user2.getUsername();
                UserDto.chatRoomResponse user1Info = userService.getChatRoomUser(user1Name);
                UserDto.chatRoomResponse user2Info = userService.getChatRoomUser(user2Name);
                List<ChatRoomDto.Response> user1ChatMessages = chatMessageService.getChatList(user1Name);
                List<ChatRoomDto.Response> user2chatMessages = chatMessageService.getChatList(user2Name);
                DebeziumDto.UserChatInfo user1ChatInfo = new DebeziumDto.UserChatInfo(user1Info,user1ChatMessages);
                DebeziumDto.UserChatInfo user2ChatInfo = new DebeziumDto.UserChatInfo(user2Info,user2chatMessages);

                template.convertAndSend(CHAT_EXCHANGE_NAME,
                            "room."+user1Name+"chatRoomList",user1ChatInfo);
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+user1Name+"chatRoomList",user2ChatInfo);



                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "user."+chatRooms.get(i).getRoomId()+"user1",userDto);
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "user."+chatRooms.get(i).getRoomId()+"user2",userDto);
            }
        }
    }

}


