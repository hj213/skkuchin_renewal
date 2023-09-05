package skkuchin.service.domain.Forum;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private  ArticleType articleType;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private  String content;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private AppUser user;

    @CreationTimestamp
    private LocalDateTime date;

}
