package skkuchin.service.dto;
import lombok.Getter;
import lombok.Setter;

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
            private UserDto.DebeziumDto after;
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
            private ChatRoomDto.DebeziumDto before;
            private ChatRoomDto.DebeziumDto after;
            private String op;

        }
    }
}