package skkuchin.service.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;

import javax.validation.constraints.NotBlank;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class ChatMessageDto {
    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class Request{
        @NotBlank
        private String message;

        @JsonProperty
        @NotBlank
        private String roomId;

        public ChatMessage toEntity(ChatRoom chatRoom, AppUser user){
            return ChatMessage.builder()
                    .message(this.message)
                    .chatRoom(chatRoom)
                    .sender(user.getUsername())
                    .build();

        }
    }

    @Getter
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response{
        private Long id;
        private String sender;
        private String message;
        @JsonProperty
        private String roomId;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "a hh:mm", locale = "ko-KR")
        private LocalDateTime date;

        public Response(ChatMessage chatMessage, ChatRoom chatRoom){
            this.id= chatMessage.getId();
            this.sender= chatMessage.getSender();
            this.message = chatMessage.getMessage();
            this.roomId = chatRoom.getRoomId();
            this.date = chatMessage.getDate();
        }
    }

    @Getter
    @Setter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class DebeziumDto {
        private Long id;

        private String sender;

        private String message;

        @JsonProperty
        private Long chatRoomId;

        private Timestamp date;

        @JsonProperty
        private boolean readStatus;
    }

}
