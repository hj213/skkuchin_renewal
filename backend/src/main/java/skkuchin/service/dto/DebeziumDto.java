package skkuchin.service.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class DebeziumDto {

    @Getter
    @Setter
    public static class UserRequest {
        private Payload payload;

        @Getter
        @Setter
        public static class Payload {
            private UserDto.DebeziumUserResponse after;
            private String op;

        }
    }

    @Getter
    @Setter
    public static class ChatMessageRequest {
        private Payload payload;

        @Getter
        @Setter
        public static class Payload {
            private ChatMessageDto.DebeziumDto after;
            private String op;

        }
    }
    @Getter
    @Setter
    public static class ChatRoomRequest {
        private Payload payload;

        @Getter
        @Setter
        public static class Payload {
            private ChatRoomDto.DebeziumDto after;
            private String op;

        }
    }


    @Setter
    @Getter
    @AllArgsConstructor
    public static class UserChatInfo {
        private UserDto.chatRoomResponse userInfo;
        private List<ChatRoomDto.Response> chatMessages;
    }
}