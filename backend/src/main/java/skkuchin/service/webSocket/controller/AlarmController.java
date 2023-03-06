package skkuchin.service.webSocket.controller;

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


import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatSessionService;


import java.util.List;

@Controller
@RequiredArgsConstructor
@Log4j2
public class AlarmController {

    private final RabbitTemplate template;
    private final ChatMessageService chatMessageService;
    private final ChatSessionService chatSessionService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";

    @MessageMapping("chat.alarm")
    public void newMatching(Message<?> message){
        System.out.println("안녕8");
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String sessionId = accessor.getSessionId();
        System.out.println(sessionId);
        ChatSession chatSession = chatSessionService.findSession(sessionId);
        System.out.println(chatSession);
        String username = chatSession.getUsername();
        System.out.println(username);
        List<ChatRoomDto.userResponse> alarmList = chatMessageService.getAlarmList(username);
        System.out.println(alarmList);
        template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+username,alarmList);
    }
}
