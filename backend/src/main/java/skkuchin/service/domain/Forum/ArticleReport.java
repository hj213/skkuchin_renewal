package skkuchin.service.domain.Forum;

import lombok.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.ReportType;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "article_report",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id","article_id"}),
                @UniqueConstraint(columnNames = {"user_id","comment_id"})

        }
)

public class ArticleReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ReportType reportType;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AppUser appUser;
}
