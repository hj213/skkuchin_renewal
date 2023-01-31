package skkuchin.service.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.repo.ChatRepository;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessageSendingOperations sendingOperations;
    private final ChatRepository chatRepository;

    @MessageMapping("/chat/message")
    public void enter(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender()+"님이 입장하였습니다.");
        }

        System.out.println("message = " + message.getType());
        System.out.println("message.getRoomId() = " + message.getRoomId());
        System.out.println("message = " + message.getSender());
        System.out.println("message = " + message.getMessage());
        chatRepository.save(message);
        sendingOperations.convertAndSend("/topic/chat/room/"+message.getRoomId(),message);
    }
}