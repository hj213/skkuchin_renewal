package skkuchin.service.domain.Chat;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dateTime;

    private String place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id" ,nullable = false)
    private ChatRoom chatRoom;
}