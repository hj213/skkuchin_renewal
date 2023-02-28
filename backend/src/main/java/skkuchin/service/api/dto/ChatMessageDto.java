package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Chat.ChatMessage;
public class ChatMessageDto {

    @JsonProperty
    private Long id;

    //채팅방 ID
    @JsonProperty
    private String roomId;
    //보내는 사람
    @JsonProperty
    private String sender;
    //내용
    @JsonProperty
    private String message;



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
