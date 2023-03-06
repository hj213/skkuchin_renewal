package skkuchin.service.webSocket.controller;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.dto.DebeziumDto;
import skkuchin.service.dto.UserDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatRoomService;
import skkuchin.service.service.UserService;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class DebeziumController {
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepo chatRoomRepo;
    private final UserService userService;



    @KafkaListener(topics = "dbserver.service.chat_message")
    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        LocalDateTime start = LocalDateTime.now();
        //payload null 여부 확인
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatMessageRequest dto= objectMapper.readValue(message, DebeziumDto.ChatMessageRequest.class);

        ChatRoom chatRoom = chatRoomService.findChatById(dto.getPayload().getAfter().getChat_room_id());
        AppUser user1 = chatRoomService.findUser1(chatRoom);
        AppUser user2 = chatRoomService.findUser2(chatRoom);

        String roomId = chatRoom.getRoomId();

        String user1Name = user1.getUsername();
        String user2Name = user2.getUsername();

        DebeziumDto.UserChatInfo user1ChatInfo = chatRoomService.getUserChatInfo(user1Name);
        DebeziumDto.UserChatInfo user2ChatInfo = chatRoomService.getUserChatInfo(user2Name);

        List<ChatMessageDto.Response> chatMessages = chatMessageService.getAllMessage(chatRoom);
        for (int i = 0; i <chatMessages.size() ; i++) {
            System.out.println("------index------- : " + i);
            System.out.println("chatMessages.message = " + chatMessages.get(i).getMessage());
            System.out.println("chatMessages.date = " + chatMessages.get(i).getDate());
            System.out.println("chatMessages.sender = " + chatMessages.get(i).getSender());
            System.out.println("chatMessages.roomId = " + chatMessages.get(i).getRoomId());
        }

        template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user1", chatMessages);
        template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user2", chatMessages);

        for (int i = 0; i < user2ChatInfo.getChatMessages().size(); i++) {
            System.out.println("------index------- : " + i);
            System.out.println("user2ChatInfo.messageCount = " + user2ChatInfo.getChatMessages().get(i).getMessageCount());
            System.out.println("user2ChatInfo.messageTime = " + user2ChatInfo.getChatMessages().get(i).getMessageTime());
            System.out.println("user2ChatInfo.roomId = " + user2ChatInfo.getChatMessages().get(i).getRoomId());
            System.out.println("user2ChatInfo.message = " + user2ChatInfo.getChatMessages().get(i).getMessage());
        }

        for (int i = 0; i < user1ChatInfo.getChatMessages().size(); i++) {
            System.out.println("------index------- : " + i);
            System.out.println("user1ChatInfo.messageCount = " + user1ChatInfo.getChatMessages().get(i).getMessageCount());
            System.out.println("user1ChatInfo.messageTime = " + user1ChatInfo.getChatMessages().get(i).getMessageTime());
            System.out.println("user1ChatInfo.roomId = " + user1ChatInfo.getChatMessages().get(i).getRoomId());
            System.out.println("user1ChatInfo.message = " + user1ChatInfo.getChatMessages().get(i).getMessage());
        }


        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user2Name+"chatRoomList",user2ChatInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user1Name+"chatRoomList",user1ChatInfo);
        System.out.println("Duration.between(LocalDateTime.now(),start) = " + Duration.between(LocalDateTime.now(),start));

    }


    @KafkaListener(topics = "dbserver.service.chat_room")
    public void chatRoomChange(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatRoomRequest dto= objectMapper.readValue(message, DebeziumDto.ChatRoomRequest.class);

        String roomId = dto.getPayload().getAfter().getRoom_id();
        ChatRoom chatRoom = chatRoomService.findChatroom(roomId);
        ChatRoomDto.blockResponse chatRoomBlockInfo = chatRoomService.getRoomDto(chatRoom);

        AppUser user1 = chatRoomService.findUser1(chatRoom);
        AppUser user2 = chatRoomService.findUser2(chatRoom);

        String userName1 = user1.getUsername();
        String userName2 = user2.getUsername();

        DebeziumDto.UserChatInfo user1ChatInfo = chatRoomService.getUserChatInfo(userName1);
        DebeziumDto.UserChatInfo user2ChatInfo = chatRoomService.getUserChatInfo(userName2);

        System.out.println("chatRoomBlockInfo.getUser2Id = " + chatRoomBlockInfo.isUser1Blocked());
        System.out.println("chatRoomBlockInfo.getUser1Id = " + chatRoomBlockInfo.isUser2Blocked());

        template.convertAndSend(CHAT_EXCHANGE_NAME, "block." +roomId+"user1", chatRoomBlockInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME, "block." +roomId+"user2", chatRoomBlockInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName1 +"chatRoomList",user1ChatInfo);
        template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName2+"chatRoomList",user2ChatInfo);

        if(dto.getPayload().getOp().equals("c")){
            String username = user2.getUsername();
            List<ChatRoomDto.userResponse> alarmList = chatMessageService.getAlarmList(username);
            for (int i = 0; i <alarmList.size(); i++) {
                System.out.println("alarmList - user1 = " + alarmList.get(i).getUser1Id());
                System.out.println("alarmList - user2= " + alarmList.get(i).getUser2Id());
                System.out.println("alarmList - date= " + alarmList.get(i).getCreatedDate());
            }
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
/*
        String userName1 = dto.getPayload().getAfter().getUsername();
*/
        Long userId = dto.getPayload().getAfter().getId();
        UserDto.Response userDto = userService.getUser(userId);

        System.out.println("userDto.getUsername() = " + userDto.getUsername());
        System.out.println("userDto.getMajor() = " + userDto.getMajor());
        if(dto.getPayload().getOp().equals("u") || dto.getPayload().getOp().equals("d")){

            /*template.convertAndSend(CHAT_EXCHANGE_NAME,
                    "alarm."+userName1,dto);
*/
            List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(userId);
            for (int i = 0; i < chatRooms.size(); i++) {
                AppUser user1 = chatRoomService.findUser1(chatRooms.get(i));
                AppUser user2 = chatRoomService.findUser2(chatRooms.get(i));
                String user1Name = user1.getUsername();
                String user2Name = user2.getUsername();
                DebeziumDto.UserChatInfo user1ChatInfo = chatRoomService.getUserChatInfo(user1Name);
                DebeziumDto.UserChatInfo user2ChatInfo = chatRoomService.getUserChatInfo(user2Name);

                System.out.println("user2ChatInfo.getUserInfo().getUsername() = " + user2ChatInfo.getUserInfo().getUsername());
                System.out.println("user2ChatInfo.getUserInfo().getMajor() = " + user2ChatInfo.getUserInfo().getMajor());
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


