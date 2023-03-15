package skkuchin.service.webSocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.service.ChatRoomService;
import skkuchin.service.service.ChatSessionService;

@Controller
@RequiredArgsConstructor
@Log4j2
public class AlarmController {
    private final RabbitTemplate template;
    private final ChatRoomService chatRoomService;
    private final ChatSessionService chatSessionService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";

    @Transactional
    @MessageMapping("chat.alarm")
    public void getNewAlarm(Message<?> message){
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String sessionId = accessor.getSessionId();
        ChatSession chatSession = chatSessionService.findSession(sessionId);
        String username = chatSession.getUsername();
        Boolean alarm = chatRoomService.checkUnreadMessageOrRequest(username);
        template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+username, alarm);
    }
}
