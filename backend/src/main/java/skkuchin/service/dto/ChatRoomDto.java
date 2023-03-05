package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import skkuchin.service.config.chat.ResponseCode;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDateTime;


public class ChatRoomDto {

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class RoomRequest{

        @JsonProperty
        private String userName;

        public ChatRoom toEntity(AppUser user){
            return ChatRoom.builder()
                    .user1(user)
                    .build();


        }
    }


    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class ReactionRequest{

        private ResponseType reaction;

    }

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class BooleanRequest{

        private Boolean reaction;

    }



    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private String roomId;

        private String message;
        @JsonProperty
        private Long user1Id;
        @JsonProperty
        private Long user2Id;

        @JsonProperty
        private boolean isUser1AlarmOn;

        @JsonProperty
        private boolean isUser2AlarmOn;

        @JsonProperty
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime messageTime;
        @JsonProperty
        private int messageCount;
        public Response(ChatRoom chatroom, ChatMessage chatMessage,int messageCount) {
            this.messageTime = chatMessage.getDate();
            this.message = chatMessage.getMessage();
            this.roomId = chatroom.getRoomId();
            this.user1Id = chatroom.getUser1().getId();
            this.user2Id = chatroom.getUser2().getId();
            this.messageCount = messageCount;
            this.isUser1AlarmOn = chatroom.isUser1AlarmOn();
            this.isUser2AlarmOn = chatroom.isUSer2AlarmOn();
        }

    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class blockResponse{
        @JsonProperty
        private boolean isUser1Blocked;

        @JsonProperty
        private boolean isUser2Blocked;

        public blockResponse(ChatRoom chatRoom){
            this.isUser1Blocked = chatRoom.isUser1Blocked();
            this.isUser2Blocked = chatRoom.isUser2Blocked();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class userResponse{
        @JsonProperty
        private Long user1Id;
        @JsonProperty
        private Long user2Id;
        @JsonProperty
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;

        public userResponse(ChatRoom chatRoom){
            this.user1Id = chatRoom.getUser1().getId();
            this.user2Id = chatRoom.getUser2().getId();
            this.createdDate = chatRoom.getExpireDate().minusDays(2);
        }
    }


    @Getter
    public static class DebeziumDto{
        private Long id;
        private String expire_date;
        private String is_user1_blocked;
        private String is_user2_blocked;
        private String room_id;
        private String response;
        private String room_name;
        private Long sender_id;
        private Long receiver_id;
    }







}