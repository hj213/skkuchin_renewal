
package skkuchin.service.webSocket.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.UserRepo;
import skkuchin.service.service.ChatService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
public class DebeziumController {

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatService chatService;
    private final ChatRepo chatRepo;
    private final UserRepo userRepo;


    //Topics 안에 들어갈 변수 =  topic_prefix + schema_name + table_name
    @KafkaListener(topics = "dbserver.service.chat_message")
    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(message);
        JsonNode payload = jsonNode.get("payload");
        JsonNode operation = jsonNode.get("payload").get("op");
        String operation1 = mapper.writeValueAsString(operation).replace("\"", "");;
        System.out.println("payload = " + payload);
        System.out.println("operation1 = " + operation1);
        if(operation1.equals("c")){
            JsonNode beforeSender =  payload.get("after").get("sender");
            JsonNode beforeMessage = payload.get("after").get("message");
            JsonNode beforeRoomId = payload.get("after").get("room_id");
            JsonNode beforeUserCnt = payload.get("after").get("user_count");
            String sender = mapper.writeValueAsString(beforeSender).replace("\"", "");
            String messages = mapper.writeValueAsString(beforeMessage).replace("\"", "");
            String roomId = mapper.writeValueAsString(beforeRoomId).replace("\"","");
            String userCnt = mapper.writeValueAsString(beforeUserCnt).replace("\"","");
            int userCnt1 = Integer.parseInt(userCnt);
            System.out.println("sender = " + sender);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setMessage(messages);
            chatMessage.setSender(sender);
            chatMessage.setUserCount(userCnt1);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +roomId, chatMessage);
           /* template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+"8ea645b1-d6c8-4cf9-9cdd-0eb401537e4b",chatMessage);*/

        }

    //테스트 다시 해봐야
     /*   else if(operation1.equals("u")){
            JsonNode beforeUserCnt = payload.get("after").get("user_count");
            JsonNode beforeId =  payload.get("after").get("id");

            String id = mapper.writeValueAsString(beforeId).replace("\"","");
            JsonNode beforeRoomId = payload.get("after").get("room_id");

            String roomId = mapper.writeValueAsString(beforeRoomId).replace("\"","");
            String userCnt = mapper.writeValueAsString(beforeUserCnt).replace("\"","");
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +roomId, id);


        }*/


    }


    @KafkaListener(topics = "dbserver.service.chat_room")
    public void blockUser(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(message);
        JsonNode payload = jsonNode.get("payload");
        JsonNode operation = jsonNode.get("payload").get("op");

        String operation1 = mapper.writeValueAsString(operation).replace("\"", "");;
        JsonNode beforeRoomId = payload.get("after").get("room_id");
        String roomId = mapper.writeValueAsString(beforeRoomId).replace("\"","");
        ChatRoom chatRoom = chatService.findChatroom(roomId);
        List<ChatMessageDto.Response> chatMessages = chatRepo.findByChatRoom(chatRoom)
                .stream()
                .map(message1 -> new ChatMessageDto.Response(message1))
                .collect(Collectors.toList());

        ChatRoomDto.Response1 chatRoom2 = chatService.getRoomDto(chatRoom);
        String json2 = new Gson().toJson(chatRoom2);
        System.out.println("payload = " + payload);
        System.out.println("operation1 = " + operation1);
        String chatMessageToJson = new Gson().toJson(chatMessages);
        JsonElement chatRoom2Element = JsonParser.parseString(new Gson().toJson(chatRoom2));
        JsonElement chatMessagesElement = JsonParser.parseString(chatMessageToJson);
        JsonObject jsonObject = new JsonObject();
        jsonObject.add("chatMessages", chatMessagesElement);
        jsonObject.add("chatRoom", chatRoom2Element);
        if(operation1.equals("u")){
            JsonNode beforeBlock =  payload.get("before").get("is_receiver_blocked");
            JsonNode afterBlock = payload.get("after").get("is_receiver_blocked");

            JsonNode beforeBlock1 =  payload.get("before").get("is_sender_blocked");
            JsonNode afterBlock1 = payload.get("after").get("is_sender_blocked");

            String blocked = mapper.writeValueAsString(afterBlock).replace("\"","");
            String blocked1 = mapper.writeValueAsString(afterBlock1).replace("\"","");

            //blocked = true/false
            System.out.println("blocked = " + blocked);
            if(!beforeBlock.equals(afterBlock)){


                AppUser user = chatService.findUser(chatRoom);
                UserDto.Response user1 = new UserDto.Response(user);
                String userToJson = new Gson().toJson(user1);
                JsonElement user1Element = JsonParser.parseString(userToJson);
                jsonObject.add("user", user1Element);
                String concatenatedJson = jsonObject.toString();
                template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +roomId, concatenatedJson);
            }
            else if(!beforeBlock1.equals(afterBlock1) && blocked1.equals("true")){/*
                AppUser user = chatRoom.getUser1();
                UserDto.Response user1 = new UserDto.Response(user);
                String userToJson = new Gson().toJson(user1);
                JsonElement user1Element = JsonParser.parseString(userToJson);
                jsonObject.add("user", user1Element);*/
                String concatenatedJson = jsonObject.toString();
                template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +roomId, concatenatedJson);

            }




        }


    }

    @KafkaListener(topics = "dbserver.service.favorite")
    public void test(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        }



    @KafkaListener(topics = "dbserver.service.user")
    public void test1(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
    }

}


