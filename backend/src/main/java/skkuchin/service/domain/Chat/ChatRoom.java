package skkuchin.service.domain.Chat;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Report;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
@Table(
        name="chat_room",
        uniqueConstraints={
                @UniqueConstraint(
                        columnNames={"user1_id", "user2_id"}
                )
        }
)
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user1_id")
    private AppUser user1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user2_id")
    private AppUser user2;

    @Enumerated(EnumType.STRING)
    private ResponseType response;

    private LocalDateTime expireDate;

    @Column(columnDefinition = "BIT DEFAULT FALSE")
    private boolean user1Blocked;

    @Column(columnDefinition = "BIT DEFAULT FALSE")
    private boolean user2Blocked;

    private boolean user1Alarm;

    private boolean user2Alarm;

    private String meetPlace;

    private LocalDateTime meetTime;

    @PrePersist
    public void setDate() {
        LocalDateTime now = LocalDateTime.now();
        this.expireDate = now.plusDays(2);
    }

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();
}