package skkuchin.service.domain.Chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private MessageType type;
    //채팅방 ID
    private String roomId;
    //보내는 사람
    private String sender;
    //내용
    @Column
    private String message;

    @ManyToOne
    private ChatRoom chatRoom;
}
