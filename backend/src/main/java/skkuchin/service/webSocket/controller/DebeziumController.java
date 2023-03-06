//package skkuchin.service.webSocket.controller;
//import com.fasterxml.jackson.databind.DeserializationFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.web.bind.annotation.RestController;
//import skkuchin.service.dto.ChatMessageDto;
//import skkuchin.service.dto.ChatRoomDto;
//import skkuchin.service.dto.DebeziumDto;
//import skkuchin.service.dto.UserDto;
//import skkuchin.service.domain.Chat.ChatRoom;
//import skkuchin.service.domain.User.AppUser;
//import skkuchin.service.repo.ChatRoomRepo;
//import skkuchin.service.service.ChatMessageService;
//import skkuchin.service.service.ChatRoomService;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//public class DebeziumController {
//    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
//    private final RabbitTemplate template;
//    private final ChatRoomService chatRoomService;
//    private final ChatMessageService chatMessageService;
//    private final ChatRoomRepo chatRoomRepo;
//
//    @KafkaListener(topics = "dbserver.service.chat_message")
//    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
//        System.out.println("kafka consume test topic : "  + message);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        DebeziumDto.ChatMessageRequest dto= objectMapper.readValue(message, DebeziumDto.ChatMessageRequest.class);
//        ChatRoom chatRoom = chatRoomService.findChatById(dto.getPayload().getAfter().getChat_room_id());
//
//        AppUser user1 = chatRoom.getUser1();
//        AppUser user2 = chatRoom.getUser2();
//
//        String roomId = chatRoom.getRoomId();
//
//        String user1Name = user1.getUsername();
//        String user2Name = user2.getUsername();
//
//        List<ChatMessageDto.Response> chatMessages = chatMessageService.getAllMessage(chatRoom);
//
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user1", chatMessages);
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user2", chatMessages);
//
//        List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(user1Name);
//        List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(user2Name);
//
//        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user1Name+"chatRoomList", chatRooms1);
//        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user2Name+"chatRoomList", chatRooms2);
//    }
//
//
//    @KafkaListener(topics = "dbserver.service.chat_room")
//    public void chatRoomChange(@Payload(required = false) String message) throws Exception {
//        System.out.println("kafka consume test topic : "  + message);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        DebeziumDto.ChatRoomRequest dto= objectMapper.readValue(message, DebeziumDto.ChatRoomRequest.class);
//
//        String roomId = dto.getPayload().getAfter().getRoom_id();
//        ChatRoom chatRoom = chatRoomService.findChatRoom(roomId);
//
//        AppUser user1 = chatRoom.getUser1();
//        AppUser user2 = chatRoom.getUser2();
//
//        String userName1 = user1.getUsername();
//        String userName2 = user2.getUsername();
//
//        List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(userName1);
//        List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(userName2);
//        ChatRoomDto.settingResponse settingResponse = chatRoomService.getSettingResponse(chatRoom);
//
//        if(dto.getPayload().getOp().equals("c")){
//            List<ChatRoomDto.userResponse> alarmList = chatRoomService.getAlarmList(userName2);
//            template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+ userName2, alarmList);
//        }
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+userName1+"chatRoomList", chatRooms1);
//        template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+userName2+"chatRoomList", chatRooms2);
//        template.convertAndSend(CHAT_EXCHANGE_NAME,"setting."+roomId +"user1",settingResponse);
//        template.convertAndSend(CHAT_EXCHANGE_NAME,"setting."+roomId +"user2",settingResponse);
//    }
//
//
//    @KafkaListener(topics = "dbserver.service.user")
//    public void userChange(@Payload(required = false) String message) throws Exception{
//        System.out.println("kafka consume test topic : "  + message);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        DebeziumDto.UserRequest dto= objectMapper.readValue(message, DebeziumDto.UserRequest.class);
//
//        Long userId = dto.getPayload().getAfter().getId();
//
//        if (dto.getPayload().getOp().equals("u") || dto.getPayload().getOp().equals("d")) {
//            List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(userId);
//
//            for (ChatRoom chatRoom : chatRooms) {
//                AppUser user1 = chatRoom.getUser1();
//                AppUser user2 = chatRoom.getUser2();
//
//                String user1Name = user1.getUsername();
//                String user2Name = user2.getUsername();
//
//                List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(user1Name);
//                List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(user2Name);
//
//                UserDto.Response user1Dto= new UserDto.Response(user1);
//                UserDto.Response user2Dto = new UserDto.Response(user2);
//
//                template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+user1Name+"chatRoomList", chatRooms1);
//                template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+user2Name+"chatRoomList", chatRooms2);
//
//                template.convertAndSend(CHAT_EXCHANGE_NAME, "user."+chatRoom.getRoomId()+"user1",user2Dto);
//                template.convertAndSend(CHAT_EXCHANGE_NAME, "user."+chatRoom.getRoomId()+"user2",user1Dto);
//            }
//        }
//    }
//
//}
//
//
