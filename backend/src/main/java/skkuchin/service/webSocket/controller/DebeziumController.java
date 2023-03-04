package skkuchin.service.webSocket.controller;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.api.dto.DebeziumDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatService;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class DebeziumController {
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatService chatService;
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepo chatRoomRepository;



    @KafkaListener(topics = "dbserver.service.chat_message")
    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        //payload null 여부 확인
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatMessageRequest dto= objectMapper.readValue(message, DebeziumDto.ChatMessageRequest.class);
        objectMapper.writeValueAsString(dto);


        ChatRoom chatRoom = chatService.findChatById(dto.getPayload().getAfter().getChat_room_id());
        AppUser user1 = chatService.findUser1(chatRoom);
        AppUser user2 = chatService.findUser2(chatRoom);
        String roomId = chatRoom.getRoomId();
        String user1Name = user1.getUsername();
        String user2Name = user2.getUsername();

        if(dto.getPayload().getOp().equals("c")){
            String sender = dto.getPayload().getAfter().getSender();
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + roomId+"user1", dto);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + roomId+"user2", dto);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+sender+"chatRoomList",chatMessageService.getChatList(sender));
            if(user1Name.equals(sender)){
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user2Name+"chatRoomList",chatMessageService.getChatList(user2Name));
             }
            else{
                template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user1Name+"chatRoomList",chatMessageService.getChatList(user1Name));
            }
        }


        else if(dto.getPayload().getOp().equals("u")){
            String sender = dto.getPayload().getAfter().getSender();
            List<ChatRoomDto.Response> chatMessages = chatMessageService.getChatList(sender);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+sender+"chatRoomList",chatMessages);
            if(user1Name.equals(sender)){
                template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user2Name+"chatRoomList",chatMessageService.getChatList(user2Name));
            }
            else{
                template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user1Name+"chatRoomList",chatMessageService.getChatList(user1Name));
            }
        }
    }


    @KafkaListener(topics = "dbserver.service.chat_room")
    public void blockUser(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatRoomRequest dto= objectMapper.readValue(message, DebeziumDto.ChatRoomRequest.class);
        objectMapper.writeValueAsString(dto);
        String roomId = dto.getPayload().getAfter().getRoom_id();
        ChatRoom chatRoom = chatService.findChatroom(roomId);


        if(dto.getPayload().getOp().equals("u")){
                ChatRoomDto.userResponse chatRoomBlockInfo = chatService.getUserRoomDto(chatRoom);
                AppUser user1 = chatService.findUser1(chatRoom);
                AppUser user2 = chatService.findUser2(chatRoom);
                String userName1 = user1.getUsername();
                String userName2 = user2.getUsername();

                template.convertAndSend(CHAT_EXCHANGE_NAME, "block." +roomId+"user1", chatRoomBlockInfo);
                template.convertAndSend(CHAT_EXCHANGE_NAME, "block." +roomId+"user2", chatRoomBlockInfo);
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName1 +"chatRoomList",chatMessageService.getChatList(userName1));
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName2+"chatRoomList",chatMessageService.getChatList(userName2));

        }

        else if(dto.getPayload().getOp().equals("c")){
            AppUser user2 = chatService.findUser2(chatRoom);
            String username = user2.getUsername();
            List<ChatRoomDto.userResponse> alarmList = chatMessageService.getAlarmList(username);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+ username+"alarm",alarmList);
        }
    }


    @KafkaListener(topics = "dbserver.service.user")
    public void userChange(@Payload(required = false) String message) throws Exception{
        System.out.println("kafka consume test topic : "  + message);
        //payload null 여부 확인

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.UserRequest dto= objectMapper.readValue(message, DebeziumDto.UserRequest.class);
        objectMapper.writeValueAsString(dto);
        String userName1 = dto.getPayload().getAfter().getUsername();
        Long userId = dto.getPayload().getAfter().getId();
        if(dto.getPayload().getOp().equals("u") || dto.getPayload().getOp().equals("d")){
            template.convertAndSend(CHAT_EXCHANGE_NAME,
                    "room."+userName1 +"chatRoomList",dto);
            template.convertAndSend(CHAT_EXCHANGE_NAME,
                    "room."+userName1+"alarm",dto);

            List<ChatRoom> chatRooms = chatRoomRepository.findByUser1Id(userId);
            for (int i = 0; i < chatRooms.size(); i++) {
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+chatRooms.get(i).getRoomId()+"user1",dto);
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+chatRooms.get(i).getRoomId()+"user2",dto);

            }

        }


    }

}


