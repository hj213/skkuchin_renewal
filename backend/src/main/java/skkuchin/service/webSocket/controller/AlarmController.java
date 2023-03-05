package skkuchin.service.webSocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.service.ChatMessageService;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Log4j2
public class AlarmController {

    private final RabbitTemplate template;
    private final ChatMessageService chatMessageService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";


    @MessageMapping("chat.alarm.{chatRoomId}")
    public void newMatching(@Header("token") String token,@DestinationVariable String chatRoomId){
        String username = chatMessageService.getUserNameFromJwt(token);
        List<ChatRoomDto.userResponse> alarmList = chatMessageService.getAlarmList(username);
        template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+username,alarmList);

    }
}
