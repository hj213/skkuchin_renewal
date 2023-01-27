package skkuchin.service.api.dto;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.User.AppUser;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    public static ChatRoomDto create(String name) {
        ChatRoomDto room = new ChatRoomDto();

        room.roomId = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }
    @Getter
    @RequiredArgsConstructor
    @AllArgsConstructor
    public static  class PostRequest{

        private String roomName;

        public ChatRoom toEntity(AppUser user){
            return ChatRoom.builder()
                    .user(user)
                    .roomName(this.roomName)
                    .receiverAccepted(true)
                    .roomId(UUID.randomUUID().toString())
                    .build();


        }
    }



    @Getter
    public static class Response {
        private String roomId;
        private String roomName;

        public Response(ChatRoom chatroom) {

            this.roomId = chatroom.getRoomId();
            this.roomName = chatroom.getRoomName();
        }


    }
}