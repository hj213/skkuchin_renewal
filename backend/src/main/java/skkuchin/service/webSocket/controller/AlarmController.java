package skkuchin.service.webSocket.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.service.ChatMessageService;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

@Controller
@RequiredArgsConstructor
@Log4j2
public class AlarmController {

    private final RabbitTemplate template;
    private final ChatRepo chatRepository;
    private final ChatService chatService;
    private final ChatSessionService chatSessionService;
    private final ChatMessageService chatMessageService;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";


    //기존의 유저 메시지 불러오기
    @MessageMapping("chat.alarm.{chatRoomId}")
    public void newAppointment(@Header("token") String token){
        String username = chatMessageService.getUserNameFromJwt(token);
        template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+username+"alarm",chatMessageService.getAlarmList(username));

    }
}
