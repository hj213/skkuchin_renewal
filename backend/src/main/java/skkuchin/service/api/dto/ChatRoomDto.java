package skkuchin.service.api.dto;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.RequestStatus;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public static ChatRoomDto create(String name) {
        ChatRoomDto room = new ChatRoomDto();

        room.roomId = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }
    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class PostRequest{

        private String roomName;

        public ChatRoom toEntity(AppUser user){
            return ChatRoom.builder()
                    .user(user)
                    .roomName(this.roomName)
                    .build();


        }
    }

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class TestPostRequest{

        private String roomName;


        public ChatRoom toEntity(AppUser user){
            return ChatRoom.builder()
                    .user(user)
                    .roomId(UUID.randomUUID().toString())
                    .senderRequestStatus(RequestStatus.ACCEPT)
                    .roomName(this.roomName)
                    .build();


        }
    }



    @Getter
    public static class Response {
        private String roomId;
        private String roomName;
        private String latestDisplayTime;
        private LocalDateTime localDateTime;
        public Response(ChatRoom chatroom, ChatMessage chatMessage) {
            this.latestDisplayTime = setDisplayDateTime1(chatMessage);
            this.localDateTime = chatMessage.getDate();
            this.roomId = chatroom.getRoomId();
            this.roomName = chatroom.getRoomName();
        }

        public String setDisplayDateTime1(ChatMessage chatMessage) {

            LocalDateTime dateTimeNow = LocalDateTime.now();
            LocalDate dateNow = dateTimeNow.toLocalDate();
            String displayTime;
            LocalDateTime recordedDateTime = chatMessage.getDate();
            LocalDate recordedDate = recordedDateTime.toLocalDate();
            Period diff = Period.between(recordedDate, dateNow);
            if(diff.getDays() == 1  && diff.getMonths() ==0 && diff.getYears() ==0) {
                displayTime = "어제";

            }
            else if(diff.getDays() == 0  && diff.getMonths() ==0 && diff.getYears() ==0){
                displayTime = (recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "a h:mm")));

            }
            else{
                displayTime = (recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "yyyy-MM-dd")));

            }

            return displayTime;

        }



    }





}