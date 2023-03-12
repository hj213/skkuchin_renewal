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
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

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
    @AllArgsConstructor
    public static  class BooleanRequest{
        @NotNull
        private Boolean read;
    }

    @Getter
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response{
        private Long id;
        private String sender;
        private String message;
        @JsonProperty
        private boolean readStatus;
        @JsonProperty
        private String roomId;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "a hh:mm", locale = "ko-KR", timezone = "Asia/Seoul")
        private LocalDateTime time;
        @JsonProperty
        private String date;

        public Response(ChatMessage chatMessage, ChatRoom chatRoom){
            this.id= chatMessage.getId();
            this.sender= chatMessage.getSender();
            this.message = chatMessage.getMessage();
            this.readStatus = chatMessage.isReadStatus();
            this.roomId = chatRoom.getRoomId();
            this.time = chatMessage.getDate();
            this.date = formatDate(chatMessage.getDate());
        }

        private String formatDate(LocalDateTime date) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 M월 d일 EEEE", Locale.KOREAN);
            return date.format(formatter);
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
