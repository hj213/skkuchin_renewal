package skkuchin.service.domain.Forum;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(columnDefinition = "BIT DEFAULT FALSE")
    private boolean anonymous;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ArticleLike> articleLikes = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentLike> commentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ArticleReport> articleReports = new ArrayList<>();

}
