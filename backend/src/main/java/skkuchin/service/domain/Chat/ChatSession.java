package skkuchin.service.domain.Chat;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ChatSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;

    private String sessionId;

    private String sender;
}
