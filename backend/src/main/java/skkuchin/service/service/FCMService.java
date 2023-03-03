package skkuchin.service.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.User.PushToken;

@Service
@Slf4j
public class FCMService {

    private static final String INFO_TITLE = "스꾸친";
    private static final String INFO_MESSAGE = "밥약 신청이 도착했습니다!";

    public void sendChatNotification(PushToken pushToken, ChatMessage chatMessage) {
        try {
            Message message = Message.builder()
                    .setToken(pushToken.getToken())
                    .setNotification(Notification.builder()
                            .setTitle(chatMessage.getSender())
                            .setBody(chatMessage.getMessage())
                            .build())
                    .build();

            FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void requestMatching(PushToken pushToken) {
        try {
            Message message = Message.builder()
                    .setToken(pushToken.getToken())
                    .setNotification(Notification.builder()
                            .setTitle(INFO_TITLE)
                            .setBody(INFO_MESSAGE)
                            .build())
                    .build();

            FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
