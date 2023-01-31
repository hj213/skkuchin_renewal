package skkuchin.service.api.dto;

import lombok.Getter;
import skkuchin.service.domain.Chat.ChatMessage;

public class ChatMessageDto {

    private Long id;

    //채팅방 ID
    private String roomId;
    //보내는 사람
    private String sender;
    //내용

    private String message;



    @Getter
    public static class Response{
        private String roomId;
        private String sender;
        private String message;
        public Response(ChatMessage chatMessage){

            this.roomId = chatMessage.getRoomId();
            this.sender= chatMessage.getSender();
            this.message = chatMessage.getMessage();
        }



    }
}
