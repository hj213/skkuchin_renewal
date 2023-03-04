package skkuchin.service.service;

import com.google.firebase.messaging.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.User.PushToken;

import java.util.ArrayList;
import java.util.List;

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

    public void sendInfoNotification(List<PushToken> pushTokens, String title, String content) {
        try {
            List<String> registrationTokens = new ArrayList<>();

            for (PushToken pushToken : pushTokens) {
                if (pushToken.getToken() != null && pushToken.isInfoAlarmOn()) {
                    registrationTokens.add(pushToken.getToken());
                }
            }

            MulticastMessage message = MulticastMessage.builder()
                    .addAllTokens(registrationTokens)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(content)
                            .build())
                    .build();

            FirebaseMessaging.getInstance().sendMulticast(message);
        } catch (FirebaseMessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
