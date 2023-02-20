package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Report;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomId;
    private String roomName;

    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private List<ChatSession> chatSessions = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "sender_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "receiver_id")
    private AppUser user1;


    @Enumerated(EnumType.STRING)
    private RequestStatus receiverRequestStatus;

    private int userCount;

    private LocalDateTime expireDate;





    @Column(columnDefinition = "boolean default false")
    private boolean isSenderBlocked;

    @Column(columnDefinition = "boolean default false")
    private boolean isReceiverBlocked;


    @PrePersist
    public void setDate() {
        LocalDateTime now = LocalDateTime.now();
        this.expireDate = now.plusDays(2);
        /*this.expireDate = now.plusMinutes(1);*/
    }

    // 신고 관련 매핑입니다 지우지 마세요
    @JsonIgnore
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Report> reports = new ArrayList<>();
}