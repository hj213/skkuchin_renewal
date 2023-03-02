package skkuchin.service.api.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDateTime;

public class ChatMessageDto {

    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class PostRequest{

        private String message;

        @JsonProperty
        private Long chatRoomId;


        public ChatMessage toEntity(ChatRoom chatRoom, AppUser user){
            return ChatMessage.builder()
                    .message(this.message)
                    .chatRoom(chatRoom)
                    .roomId(chatRoom.getRoomId())
                    .sender(user.getUsername())
                    .Date(LocalDateTime.now())
                    .userCount(chatRoom.getUserCount())
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
