package skkuchin.service.webSocket.controller;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.api.dto.DebeziumDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class DebeziumController {
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatService chatService;
    private final ChatRepo chatRepo;
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepo chatRoomRepository;


    //Topics 안에 들어갈 변수 =  topic_prefix + schema_name + table_name
    @KafkaListener(topics = "dbserver.service.chat_message")
    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        //payload null 여부 확인

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatMessageRequest dto= objectMapper.readValue(message, DebeziumDto.ChatMessageRequest.class);
        objectMapper.writeValueAsString(dto);

        System.out.println(dto.getPayload().getOp());
        if(dto.getPayload().getOp().equals("c")){
            String sender = dto.getPayload().getAfter().getSender();
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + dto.getPayload().getAfter().getRoom_id()+"user1", dto);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + dto.getPayload().getAfter().getRoom_id()+"user2", dto);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+dto.getPayload().getAfter().getSender()+"chatRoomList",chatMessageService.getChatList(sender));
        }


    //테스트 다시 해봐야
        else if(dto.getPayload().getOp().equals("u")){
           String roomId = dto.getPayload().getAfter().getRoom_id();
            Long id = dto.getPayload().getAfter().getId();
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+roomId +"user1",id);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+roomId +"user2",id);

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
        ChatRoom chatRoom = chatService.findChatroom(dto.getPayload().getAfter().getRoom_id());


        //+ chatRoom 크리에이트 + ACCEPT로 바뀔 때 해주자
        //챗룸 개설 시 유저 정보 보내기
        if(dto.getPayload().getOp().equals("u")){

                ChatRoomDto.userResponse chatRoomBlockInfo = chatService.getUserRoomDto(chatRoom);
                AppUser user = chatService.findUser(chatRoom);
                AppUser user1 = chatService.findUser1(chatRoom);

                String userName1 = user.getUsername();
                String userName2 = user1.getUsername();
                template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +chatRoom.getRoomId()+"user1", chatRoomBlockInfo);
                template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +chatRoom.getRoomId()+"user2", chatRoomBlockInfo);
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName1 +"chatRoomList",chatMessageService.getChatList(user.getUsername()));
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+userName2+"chatRoomList",chatMessageService.getChatList(user1.getUsername()));

        }

        else if(dto.getPayload().getOp().equals("c")){

            AppUser user = chatService.findUser1(chatRoom);
            List<ChatRoom> chatRooms = chatRoomRepository.findByReceiverId(user.getId());
            String username = user.getUsername();
            List<ChatRoomDto.userResponse> chatRoom1 = chatRooms
                    .stream()
                    .map(message1 -> new ChatRoomDto.userResponse(message1))
                    .collect(Collectors.toList());

            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+ username+"alarm",chatRoom1);
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
            System.out.println("dto.getPayload().getAfter().getMessage() = " + dto.getPayload().getAfter().getUsername());
            template.convertAndSend(CHAT_EXCHANGE_NAME,
                    "room."+userName1 +"chatRoomList",dto);
            template.convertAndSend(CHAT_EXCHANGE_NAME,
                    "room."+userName1+"alarm",dto);

            List<ChatRoom> chatRooms = chatRoomRepository.findByUserId(userId);
            for (int i = 0; i < chatRooms.size(); i++) {
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+chatRooms.get(i).getRoomId()+"user1",dto);
                template.convertAndSend(CHAT_EXCHANGE_NAME,
                        "room."+chatRooms.get(i).getRoomId()+"user2",dto);

            }

        }


    }





}


