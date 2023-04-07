package skkuchin.service.webSocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.dto.UserDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatRoomService;
import skkuchin.service.service.ChatSessionService;


import java.util.List;

@Controller
@RequiredArgsConstructor
@Log4j2
public class MessageController {

    private final RabbitTemplate template;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final ChatSessionService chatSessionService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";

    @Transactional
    @MessageMapping("chat.chatMessage.{chatRoomId}")
    public void getChatMessage(@DestinationVariable String chatRoomId, Message<?> message){
        ChatRoom chatRoom = chatRoomService.findChatRoom(chatRoomId);
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String sessionId = accessor.getSessionId();
        ChatSession chatSession = chatSessionService.findSession(sessionId);

        String username = chatSession.getUsername();

        AppUser user1 = chatRoom.getUser1();
        AppUser user2 = chatRoom.getUser2();
        UserDto.Response user1Dto= new UserDto.Response(user1);
        UserDto.Response user2Dto = new UserDto.Response(user2);

        ChatRoomDto.settingResponse settingResponse = chatRoomService.getSettingResponse(chatRoom);
        List<ChatMessageDto.Response> chatMessages = chatMessageService.getAllMessage(chatRoom);

       if (chatRoom.getUser1() != null && chatRoom.getUser1().getUsername().equals(username)) {
           template.convertAndSend(CHAT_EXCHANGE_NAME,"setting."+chatRoomId +"user1",settingResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"chat."+chatRoomId +"user1",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"user."+chatRoomId +"user1",user2Dto);
       } else {
           template.convertAndSend(CHAT_EXCHANGE_NAME,"setting."+chatRoomId +"user2",settingResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"chat."+chatRoomId +"user2",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"user."+chatRoomId +"user2",user1Dto);
        }
    }


















}


