package skkuchin.service.domain.User;

import lombok.*;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Matching.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "user")
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nickname;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private int studentId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Major major;

    @Enumerated(EnumType.STRING)
    private Campus toggle;

    @Column(nullable = false)
    private Profile image;

    @Enumerated(EnumType.STRING)
    private Mbti mbti;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String introduction;

    private Boolean matching;

    private LocalDateTime startDate;

    private LocalDateTime lastAccessedTime;

    private Boolean emailAuth;

    private Boolean agreement;

    public void emailVerifiedSuccess() {
        this.emailAuth = true;
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRole> userRoles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserKeyword> userKeywords = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "user1")
    private List<ChatRoom> chatRoomsAsUser1 = new ArrayList<>();

    @OneToMany(mappedBy = "user2")
    private List<ChatRoom> chatRoomsAsUser2 = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidatesAsUser = new ArrayList<>();

    @OneToMany(mappedBy = "candidate1", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidatesAsCandidate1 = new ArrayList<>();

    @OneToMany(mappedBy = "candidate2", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidatesAsCandidate2 = new ArrayList<>();

    @OneToMany(mappedBy = "candidate3", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidatesAsCandidate3 = new ArrayList<>();

    @OneToMany(mappedBy = "candidate4", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidatesAsCandidate4 = new ArrayList<>();

    @OneToMany(mappedBy = "candidate5", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidate> candidatesAsCandidate5 = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PushToken> pushTokens = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Report> reports = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true )
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true )
    private List<Comment> comments = new ArrayList<>();


}
