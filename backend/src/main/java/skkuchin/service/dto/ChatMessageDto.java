package skkuchin.service.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import java.time.LocalDateTime;

public class ChatMessageDto {

    @Getter
    @Setter
    public static class DebeziumDto {
        private Long id;
        private long date;
        private String message;
        private String sender;
        private Long chat_room_id;
    }


    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class Request{

        private String message;

        @JsonProperty
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
        private String sender;
        private String message;
        @JsonProperty
        private String roomId;

        @JsonProperty
        private LocalDateTime date;
        public Response(ChatMessage chatMessage, ChatRoom chatRoom){
            this.sender= chatMessage.getSender();
            this.message = chatMessage.getMessage();
            this.roomId = chatRoom.getRoomId();
            this.date = chatMessage.getDate();
        }
}

}
