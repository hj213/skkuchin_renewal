package skkuchin.service.webSocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.dto.DebeziumDto;
import skkuchin.service.dto.UserDto;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatRoomService;
import skkuchin.service.service.ChatSessionService;
import skkuchin.service.service.UserService;


import java.util.List;

@Controller
@RequiredArgsConstructor
@Log4j2
public class ChatRoomListController {
    private final RabbitTemplate template;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final UserService userService;
    private final ChatSessionService chatSessionService;

    @MessageMapping("chat.list")
    public void myChatList(Message<?> message){
        System.out.println("안녕7");

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String sessionId = accessor.getSessionId();
        ChatSession chatSession = chatSessionService.findSession(sessionId);
        String username = chatSession.getUsername();

        List<ChatRoomDto.Response> chatMessages = chatMessageService.getChatList(username);
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+username+"chatRoomList", chatMessages);
    }
}
