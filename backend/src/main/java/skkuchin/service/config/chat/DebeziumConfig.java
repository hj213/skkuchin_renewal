
package skkuchin.service.config.chat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.json.simple.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.converter.KafkaMessageHeaders;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.domain.Chat.ChatMessage;

@RestController
@RequiredArgsConstructor
public class DebeziumConfig{

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;


    @KafkaListener(topics = "hi.skkuchin2.chat_message")
    public void consumeBuyerProjectOpeningArarmEvent(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(message);
        JsonNode payload = jsonNode.get("payload");
        JsonNode operation = jsonNode.get("op");

        System.out.println("payload = " + payload);
        if(operation.equals("c")){
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

        }


    }


    @KafkaListener(topics = "hi.skkuchin2.chat_room")
    public void blockUser(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(message);
        JsonNode payload = jsonNode.get("payload");
        JsonNode operation = jsonNode.get("op");



        System.out.println("payload = " + payload);
        if(operation.equals("c")){
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

        }


    }
}
