package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import skkuchin.service.domain.User.AppUser;

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

    @Column(columnDefinition = "boolean default false")
    private boolean senderAccepted;

    @Column(columnDefinition = "boolean default false")
    private boolean receiverAccepted;


    @Enumerated(EnumType.STRING)
    private RequestStatus senderRequestStatus;

    @Enumerated(EnumType.STRING)
    private RequestStatus receiverRequestStatus;

    private int userCount;

    private LocalDateTime expireDate;

    @PrePersist
    public void setDate() {
        LocalDateTime now = LocalDateTime.now();
        this.expireDate = now.plusDays(2);
    }





}