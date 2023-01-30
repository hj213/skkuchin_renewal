package skkuchin.service.domain.User;

import lombok.*;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.Matching.Gender;
import skkuchin.service.domain.Matching.UserKeyword;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
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

    //@Column(nullable = false)
    private String image;

    @Enumerated(EnumType.STRING)
    private Mbti mbti;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private String introduction;

    private Boolean matching;

    private LocalDateTime startDate;

    @OneToMany(mappedBy = "user")
    private List<UserKeyword> userKeywords = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Favorite> favorites = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();
    private Boolean emailAuth;



    public void emailVerifiedSuccess() {
        this.emailAuth = true;
    }
}
