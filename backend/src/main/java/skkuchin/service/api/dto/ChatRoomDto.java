package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDateTime;


public class ChatRoomDto {

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class PostRequest{

        @JsonProperty
        private String roomName;
        @JsonProperty
        private String userName;

        public ChatRoom toEntity(AppUser user){
            return ChatRoom.builder()
                    .user1(user)
                    .roomName(this.roomName)
                    .build();


        }
    }


    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class Request{

        private String reaction;

    }



    @Getter
    public static class Response {
        private String roomId;
        private String roomName;
        private String message;
        private Long senderUserId;
        private Long receiverUserId;
        private LocalDateTime messageTime;
        public Response(ChatRoom chatroom, ChatMessage chatMessage) {
            this.messageTime = chatMessage.getDate();
            this.message = chatMessage.getMessage();
            this.roomId = chatroom.getRoomId();
            this.roomName = chatroom.getRoomName();
            this.senderUserId = chatroom.getUser1().getId();
            this.receiverUserId = chatroom.getUser2().getId();
        }

    }

    @Getter
    public static class blockResponse{
        private boolean isSenderBlocked;
        private boolean isReceiverBlocked;

        public blockResponse(ChatRoom chatRoom){
            this.isReceiverBlocked = chatRoom.isUser1Blocked();
            this.isSenderBlocked = chatRoom.isUser2Blocked();
        }
    }

    @Getter
    public static class userResponse{
        private Long senderUserId;
        private Long receiverUserId;
        private LocalDateTime createdDate;

        public userResponse(ChatRoom chatRoom){
            this.senderUserId = chatRoom.getUser1().getId();
            this.receiverUserId = chatRoom.getUser2().getId();
            this.createdDate = chatRoom.getExpireDate().minusDays(2);
        }
    }

    @Getter
    public static class ChatListResponse{

        private String roomId;
        private Long senderUserId;
        private Long receiverUserId;

        public ChatListResponse(ChatRoom chatRoom){
            this.roomId = chatRoom.getRoomId();
            this.senderUserId = chatRoom.getUser1().getId();
            this.receiverUserId = chatRoom.getUser2().getId();

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