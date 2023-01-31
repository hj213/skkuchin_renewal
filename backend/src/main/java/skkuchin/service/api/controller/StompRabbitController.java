package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepository;
import skkuchin.service.repo.ChatRoomRepository;
import skkuchin.service.security.auth.PrincipalDetails;
import skkuchin.service.service.ChatService;

@Controller
@RequiredArgsConstructor
@Log4j2
public class StompRabbitController {

    private final RabbitTemplate template;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatService chatService;

    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";

    @MessageMapping("chat.enter.{chatRoomId}")
    public void enter(ChatMessage chat, @DestinationVariable String chatRoomId){
        chat.setSender("hi");
        chat.setType(ChatMessage.MessageType.ENTER);
        chat.setMessage("입장하셨습니다.");
        //chat.setRoomId("87dff490-bed9-4153-a7aa-da0b7d1fb71a");

        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat); // exchange

    }

    @MessageMapping("chat.message.{chatRoomId}")
    public void send(ChatMessage chat, @DestinationVariable String chatRoomId){
        chat.setSender("hi");
       /* AppUser user = principalDetails.getUser();
        System.out.println("user = " + user);*/
        chat.setType(ChatMessage.MessageType.TALK);
       ChatRoom chatRoom = chatService.findChatroom(chatRoomId);
        //  System.out.println("chatRoom.getRoomId() = " + chatRoom.getRoomId());
       chat.setChatRoom(chatRoom);
       // chat.setChatRoom(chatRoom);
        chat.setRoomId(chatRoom.getRoomId());
        //chat.setRoomId("87dff490-bed9-4153-a7aa-da0b7d1fb71a");
        template.convertAndSend(CHAT_EXCHANGE_NAME, "room." + chatRoomId, chat);
        chatRepository.save(chat);
    }

    @RabbitListener(queues = CHAT_QUEUE_NAME)
    public void receive(ChatMessage chat){
        System.out.println("received : " + chat.getMessage());

    }


}


