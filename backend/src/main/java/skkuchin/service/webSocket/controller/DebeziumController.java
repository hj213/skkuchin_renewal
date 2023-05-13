package skkuchin.service.webSocket.controller;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import nl.martijndwars.webpush.Subscription;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.dto.DebeziumDto;
import skkuchin.service.dto.UserDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.service.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class DebeziumController {
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final RabbitTemplate template;
    private final ChatRoomService chatRoomService;
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepo chatRoomRepo;
    private final PushTokenService pushTokenService;
    private final UserService userService;
    private final NoticeService noticeService;
    private final CacheService cacheService;

    @Transactional
    @KafkaListener(topics = "dbserver.service.chat_message")
    public void listenChatMessage(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatMessageRequest dto = objectMapper.registerModule(new JavaTimeModule()).readValue(message, DebeziumDto.ChatMessageRequest.class);

        ChatRoom chatRoom = chatRoomService.findChatById(dto.getPayload().getAfter().getChatRoomId());

        AppUser user1 = chatRoom.getUser1();
        AppUser user2 = chatRoom.getUser2();

        String roomId = chatRoom.getRoomId();

        String user1Name = null;
        String user2Name = null;

        List<ChatMessageDto.Response> chatMessages = chatMessageService.getAllMessage(chatRoom);

        if (user1 != null) {
            user1Name = user1.getUsername();
            List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(user1Name);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user1Name+"chatRoomList", chatRooms1);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user1", chatMessages);
            Boolean alarm1 = chatRoomService.checkUnreadMessageOrRequest(user1Name);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+user1Name, alarm1);
        }

        if (user2 != null) {
            user2Name = user2.getUsername();
            List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(user2Name);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"room."+user2Name+"chatRoomList", chatRooms2);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "chat." + roomId+"user2", chatMessages);
            Boolean alarm2 = chatRoomService.checkUnreadMessageOrRequest(user2Name);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+user2Name, alarm2);
        }

        if (dto.getPayload().getOp().equals("c") && !Objects.equals(dto.getPayload().getAfter().getSender(), "admin")) {
            String sender = dto.getPayload().getAfter().getSender();
            AppUser user = null;

            String pushTitle = null;
            String pushMessage = dto.getPayload().getAfter().getMessage();
            Boolean chatPermit = null;

            if (Objects.equals(chatRoom.getUser1().getUsername(), sender)) {
                user = chatRoom.getUser2();
                chatPermit = chatRoom.isUser2Alarm();
                pushTitle = chatRoom.getUser1().getNickname();
            } else {
                user = chatRoom.getUser1();
                chatPermit = chatRoom.isUser1Alarm();
                pushTitle = chatRoom.getUser2().getNickname();
            }

            if (chatPermit) {
                Subscription subscription = pushTokenService.toSubscription(user, "chat");

                if (subscription != null && subscription.keys.auth != null) {
                    pushTokenService.sendNotification(subscription, pushTitle, pushMessage);
                }
            }
        }
    }

    @Transactional
    @KafkaListener(topics = "dbserver.service.chat_room")
    public void listenChatRoom(@Payload(required = false) String message) throws Exception {
        System.out.println("kafka consume test topic : "  + message);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.ChatRoomRequest dto= objectMapper.registerModule(new JavaTimeModule()).readValue(message, DebeziumDto.ChatRoomRequest.class);

        String roomId = dto.getPayload().getAfter().getRoomId();
        ChatRoom chatRoom = chatRoomService.findChatRoom(roomId);

        AppUser user1 = chatRoom.getUser1();
        AppUser user2 = chatRoom.getUser2();

        String userName1 = null;
        String userName2 = null;

        ChatRoomDto.settingResponse settingResponse = chatRoomService.getSettingResponse(chatRoom);

        if (user1 != null) {
            userName1 = user1.getUsername();
            List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(userName1);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+userName1+"chatRoomList", chatRooms1);
            Boolean alarm1 = chatRoomService.checkUnreadMessageOrRequest(userName1);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+userName1, alarm1);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"setting."+roomId +"user1",settingResponse);
        }

        if (user2 != null) {
            userName2 = user2.getUsername();
            List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(userName2);
            List<ChatRoomDto.userResponse> requestList = chatRoomService.getRequestList(userName2);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"request."+ userName2, requestList);
            template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+userName2+"chatRoomList", chatRooms2);
            Boolean alarm2 = chatRoomService.checkUnreadMessageOrRequest(userName2);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"alarm."+userName2, alarm2);
            template.convertAndSend(CHAT_EXCHANGE_NAME,"setting."+roomId +"user2",settingResponse);
        }

        if (dto.getPayload().getOp().equals("c")) {
            String pushTitle = "스꾸친";
            String pushMessage = "새로운 상대방이 대화를 원합니다!";

            Subscription subscription = pushTokenService.toSubscription(user2, "chat");

            if (subscription != null && subscription.keys.auth != null) {
                pushTokenService.sendNotification(subscription, pushTitle, pushMessage);
            } else if (subscription != null) {
                List<String> phones = new ArrayList<>();
                phones.add(subscription.endpoint);
                pushTokenService.sendSMS(phones, "[스꾸친] " + pushMessage);
            }

            template.convertAndSend(CHAT_EXCHANGE_NAME, "alarm." + userName2, true);
        } else if (dto.getPayload().getOp().equals("u")) {
            if (
                dto.getPayload().getBefore().getResponse() == ResponseType.HOLD
                &&
                dto.getPayload().getAfter().getResponse() == ResponseType.ACCEPT
            ) {
                String pushTitle = "스꾸친";
                String pushMessage = "대화가 성사되었습니다!";

                Subscription subscription = pushTokenService.toSubscription(user1, "chat");

                if (subscription != null && subscription.keys.auth != null) {
                    pushTokenService.sendNotification(subscription, pushTitle, pushMessage);
                }  else if (subscription != null) {
                    List<String> phones = new ArrayList<>();
                    phones.add(subscription.endpoint);
                    pushTokenService.sendSMS(phones, "[스꾸친] " + pushMessage);
                }

                template.convertAndSend(CHAT_EXCHANGE_NAME, "alarm." + userName1, true);
            }
        }
    }

    @Transactional
    @KafkaListener(topics = "dbserver.service.user")
    public void listenUser(@Payload(required = false) String message) throws Exception{
        System.out.println("kafka consume test topic : "  + message);

        if (message != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            DebeziumDto.UserRequest dto= objectMapper.readValue(message, DebeziumDto.UserRequest.class);

            if (dto.getPayload().getOp().equals("u") || dto.getPayload().getOp().equals("d")) {
                Long userId = dto.getPayload().getBefore().getId();
                List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(userId);

                for (ChatRoom chatRoom : chatRooms) {
                    AppUser user1 = chatRoom.getUser1();
                    AppUser user2 = chatRoom.getUser2();

                    String user1Name = null;
                    String user2Name = null;

                    UserDto.Response user1Dto= new UserDto.Response(user1);
                    UserDto.Response user2Dto = new UserDto.Response(user2);

                    if (user1 != null) {
                        user1Name = user1.getUsername();
                        List<ChatRoomDto.Response> chatRooms1 = chatRoomService.getChatRoomList(user1Name);
                        template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+user1Name+"chatRoomList", chatRooms1);
                        template.convertAndSend(CHAT_EXCHANGE_NAME, "user."+chatRoom.getRoomId()+"user1",user2Dto);
                    }

                    if (user2 != null) {
                        user2Name = user2.getUsername();
                        List<ChatRoomDto.Response> chatRooms2 = chatRoomService.getChatRoomList(user2Name);
                        template.convertAndSend(CHAT_EXCHANGE_NAME, "room."+user2Name+"chatRoomList", chatRooms2);
                        template.convertAndSend(CHAT_EXCHANGE_NAME, "user."+chatRoom.getRoomId()+"user2",user1Dto);
                    }
                }
            }
        }
    }

    @Transactional
    @KafkaListener(topics = "dbserver.service.notice")
    public void listenNotice(@Payload(required = false) String message) throws Exception{
        System.out.println("kafka consume test topic : "  + message);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        DebeziumDto.NoticeRequest dto= objectMapper.readValue(message, DebeziumDto.NoticeRequest.class);

        if (dto.getPayload().getOp().equals("c")) {
            List<AppUser> users = userService.getAllUsers();

            for (AppUser user : users) {
                String username = user.getUsername();
                template.convertAndSend(CHAT_EXCHANGE_NAME,"notice."+username, true);
            }
        } else if (dto.getPayload().getOp().equals("u")) {
            String readUsersBefore = dto.getPayload().getBefore().getReadUsers();
            String readUsersAfter = dto.getPayload().getAfter().getReadUsers();
            if (readUsersBefore == null && readUsersAfter != null) {
                Boolean alarm = noticeService.checkUnreadNotice(readUsersAfter);
                template.convertAndSend(CHAT_EXCHANGE_NAME,"notice."+readUsersAfter, alarm);
            } else if (readUsersBefore != null && !Objects.equals(readUsersBefore, readUsersAfter)) {
                String[] beforeArray = readUsersBefore.split(",");
                String[] afterArray = readUsersAfter.split(",");
                for (String username : afterArray) {
                    if (!Arrays.asList(beforeArray).contains(username)) {
                        Boolean alarm = noticeService.checkUnreadNotice(username);
                        template.convertAndSend(CHAT_EXCHANGE_NAME,"notice."+username, alarm);
                        break;
                    }
                }
            }
        }
    }

//    @Transactional
//    @KafkaListener(topics = "dbserver.service.place")
//    public void listenPlace(@Payload(required = false) String message) {
//        System.out.println("kafka consume test topic : " + message);
//        if (message != null) {
//            cacheService.caching();
//        }
//    }
//
//    @Transactional
//    @KafkaListener(topics = "dbserver.service.review")
//    public void listenReview(@Payload(required = false) String message) {
//        System.out.println("kafka consume test topic : " + message);
//        if (message != null) {
//            cacheService.caching();
//        }
//    }
}


