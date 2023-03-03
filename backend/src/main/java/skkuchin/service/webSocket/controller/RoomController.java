package skkuchin.service.webSocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;
import skkuchin.service.service.UserService;

@Controller
@RequiredArgsConstructor
@Log4j2
public class RoomController {

    private final RabbitTemplate template;
    private final ChatRepo chatRepository;
    private final ChatService chatService;
    private final ChatSessionService chatSessionService;
    private final ChatMessageService chatMessageService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";
    private final UserService userService;

    @MessageMapping("chat.list.{chatRoomId}")
    public void myChatList(@Header("token") String token){
        String username = chatMessageService.getUserNameFromJwt(token);
        UserDto.chatRoomResponse chatRoomResponse = userService.getChatRoomUser(username);
        template.convertAndSend(CHAT_EXCHANGE_NAME,
                "room."+username+"chatRoomList",chatRoomResponse);
        template.convertAndSend(CHAT_EXCHANGE_NAME,
                "room."+username+"chatRoomList",chatMessageService.getChatList(username));
    }
}
