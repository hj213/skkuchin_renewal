
package skkuchin.service.api.chatController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.service.ChatService;


@RestController
@RequiredArgsConstructor
public class DebeziumController {

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatService chatService;


    //Topics 안에 들어갈 변수 =  topic_prefix + schema_name + table_name
    @KafkaListener(topics = "kk.skkuchin2.chat_message")
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


    @KafkaListener(topics = "kk.skkuchin2.chat_room")
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
        ChatRoomDto.Response1 chatRoom2 = chatService.getRoomDto(chatRoom);
        String json2 = new Gson().toJson(chatRoom2);
        System.out.println("payload = " + payload);
        if(operation1.equals("u")){
            JsonNode beforeBlock =  payload.get("before").get("is_receiver_blocked");
            JsonNode afterBlock = payload.get("after").get("is_receiver_blocked");

            JsonNode beforeBlock1 =  payload.get("before").get("is_sender_blocked");
            JsonNode afterBlock1 = payload.get("after").get("is_sender_blocked");

            String blocked = mapper.writeValueAsString(afterBlock).replace("\"","");
            String blocked1 = mapper.writeValueAsString(afterBlock1).replace("\"","");

            //blocked = true/false
            System.out.println("blocked = " + blocked);
            if(!beforeBlock.equals(afterBlock) && blocked.equals("false") || !beforeBlock1.equals(afterBlock1) && blocked1.equals("false")){
                template.convertAndSend(CHAT_EXCHANGE_NAME, "room." +roomId, json2);
            }




        }


    }
}
