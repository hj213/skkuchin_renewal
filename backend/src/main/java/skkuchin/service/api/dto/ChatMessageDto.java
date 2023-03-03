package skkuchin.service.api.dto;
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
    public static  class PostRequest{

        private String message;

        @JsonProperty
        private String roomId;




        public ChatMessage toEntity(ChatRoom chatRoom, AppUser user){
            return ChatMessage.builder()
                    .message(this.message)
                    .chatRoom(chatRoom)
                    .sender(user.getUsername())
                    .Date(LocalDateTime.now())
                    .build();

        }
    }

    @Getter
    @RequiredArgsConstructor

    public static class Response{
        private Long id;
        private String sender;
        private String message;
        public Response(ChatMessage chatMessage){
            this.id = chatMessage.getId();;
            this.sender= chatMessage.getSender();
            this.message = chatMessage.getMessage();
        }
}

}
