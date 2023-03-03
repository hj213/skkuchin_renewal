package skkuchin.service.api.dto;

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
            private UserDto.DebeziumUserResponse before;
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
            private ChatMessageDto.DebeziumDto before;
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