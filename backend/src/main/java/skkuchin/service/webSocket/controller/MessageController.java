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
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.UserRepo;
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
    private final UserRepo userRepo;
    private final ChatMessageService chatMessageService;
    private final ChatSessionService chatSessionService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";


    @MessageMapping("chat.chatMessage.{chatRoomId}")
    public void chatMessage(@DestinationVariable String chatRoomId, Message<?> message){
        ChatRoom chatRoom = chatRoomService.findChatroom(chatRoomId);
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        String sessionId = accessor.getSessionId();
        ChatSession chatSession = chatSessionService.findSession(sessionId);
        String username = chatSession.getSender();
        AppUser user1 = userRepo.findByUsername(username);
        AppUser user2 = chatRoomService.findUser2(chatRoom);
        UserDto.Response user1Dto= new UserDto.Response(user1);
        UserDto.Response user2Dto = new UserDto.Response(user2);
        ChatRoomDto.blockResponse blockResponse = chatRoomService.getRoomDto(chatRoom);
        List<ChatMessageDto.Response> chatMessages = chatMessageService.getAllMessage(chatRoom);

       if(chatRoomService.findUser1(chatRoom).getUsername().equals(username)){
           template.convertAndSend(CHAT_EXCHANGE_NAME,"block."+chatRoomId +"user1",blockResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"chat."+chatRoomId +"user1",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"user."+chatRoomId +"user1",user2Dto);

       }
       else{
           template.convertAndSend(CHAT_EXCHANGE_NAME,"block."+chatRoomId +"user2",blockResponse);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"chat."+chatRoomId +"user2",chatMessages);
           template.convertAndSend(CHAT_EXCHANGE_NAME,"user."+chatRoomId +"user2",user1Dto);
        }
    }


















}


