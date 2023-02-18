package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Getter
@Setter
@Table("chat_message")
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    private Long id;

    //채팅방 ID
    private String roomId;
    //보내는 사람
    private String sender;
    //내용
    private String message;

    private Long chatRoomId;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime date;

    private int userCount;
}
