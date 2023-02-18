package skkuchin.service.domain.User;

import lombok.*;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Map.Review;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name="user_report",
        uniqueConstraints={
                @UniqueConstraint(columnNames={"user_id", "chat_room_id"}),
                @UniqueConstraint(columnNames={"user_id", "review_id"})
        }
)
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReportType reportType;

    private String content;

    @Column(name = "chat_room_id")
    private String chatRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;
}
