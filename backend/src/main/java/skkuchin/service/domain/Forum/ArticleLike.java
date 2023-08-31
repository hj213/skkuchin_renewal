package skkuchin.service.domain.Forum;

import lombok.*;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(
        name="articleLike",
        uniqueConstraints={
                @UniqueConstraint(
                        columnNames={"article_id", "user_id"}
                )
        }
)
public class ArticleLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private AppUser user;

    @JoinColumn(name = "article_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Article article;
}
