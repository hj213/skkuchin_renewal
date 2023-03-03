package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;

    @Column
    private String message;

    @ManyToOne
    private ChatRoom chatRoom;

    private LocalDateTime Date;

    @Column(columnDefinition = "BIT DEFAULT FALSE")
    private boolean readStatus;

}
