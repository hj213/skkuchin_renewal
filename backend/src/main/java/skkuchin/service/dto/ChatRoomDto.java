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
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Profile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;


public class ChatRoomDto {

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class RoomRequest {
        @NotNull
        private Long id;

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
        @NotNull
        private ResponseType reaction;
    }

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class BooleanRequest{
        @NotNull
        private Boolean reaction;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private String roomId;

        private String message;
        private Major major;
        private String nickname;
        private Profile image;

        @JsonProperty
        private Long user1Id;
        @JsonProperty
        private Long user2Id;

        @JsonProperty
        private boolean user1Alarm;

        @JsonProperty
        private boolean user2Alarm;

        @JsonProperty
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime messageTime;
        @JsonProperty
        private int messageCount;
        public Response(ChatRoom chatroom, ChatMessage chatMessage, int messageCount, AppUser otherUser) {
            this.messageTime = chatMessage.getDate();
            this.message = chatMessage.getMessage();
            this.roomId = chatroom.getRoomId();
            this.user1Id = chatroom.getUser1().getId();
            this.user2Id = chatroom.getUser2().getId();
            this.messageCount = messageCount;
            this.user1Alarm = chatroom.isUser1Alarm();
            this.user2Alarm = chatroom.isUser2Alarm();
            this.major = otherUser.getMajor();
            this.nickname = otherUser.getNickname();
            this.image = otherUser.getImage();
        }

    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class settingResponse{
        @JsonProperty
        private boolean user1Blocked;
        @JsonProperty
        private boolean user2Blocked;
        @JsonProperty
        private boolean user1Alarm;
        @JsonProperty
        private boolean user2Alarm;

        public settingResponse(ChatRoom chatRoom){
            this.user1Blocked = chatRoom.isUser1Blocked();
            this.user2Blocked = chatRoom.isUser2Blocked();
            this.user1Alarm = chatRoom.isUser1Alarm();
            this.user2Alarm = chatRoom.isUser2Alarm();
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
        private String roomId;
        @JsonProperty
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;

        public userResponse(ChatRoom chatRoom){
            this.user1Id = chatRoom.getUser1().getId();
            this.user2Id = chatRoom.getUser2().getId();
            this.roomId = chatRoom.getRoomId();
            this.createdDate = chatRoom.getExpireDate().minusDays(2);
        }
    }


    @Getter
    @Setter
    public static class DebeziumDto{
        private Long id;
        private String expire_date;
        private Boolean is_user1_blocked;
        private Boolean is_user2_blocked;
        private Boolean is_user1_alarm_on;
        private Boolean is_user2_alarm_on;
        private String room_id;
        private String response;
        private Long user1_id;
        private Long user2_id;
    }







}