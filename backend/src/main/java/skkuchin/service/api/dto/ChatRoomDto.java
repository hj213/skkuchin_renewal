package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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


public class ChatRoomDto {

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class PostRequest{

        @JsonProperty
        private String roomName;
        @JsonProperty
        private String userName;

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

    @Getter
    public static class Response1{
        private boolean isSenderBlocked;
        private boolean isReceiverBlocked;

        public Response1(ChatRoom chatRoom){
            this.isReceiverBlocked = chatRoom.isReceiverBlocked();
            this.isSenderBlocked = chatRoom.isSenderBlocked();
        }
    }





}