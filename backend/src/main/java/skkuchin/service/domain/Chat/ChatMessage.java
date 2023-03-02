package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //채팅방 ID
    private String roomId;
    //보내는 사람
    private String sender;
    //내용
    @Column
    private String message;

    @ManyToOne
    private ChatRoom chatRoom;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime Date;

    private int userCount;
}
