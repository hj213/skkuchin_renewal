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
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private AppUser user;

    @JoinColumn(name = "article_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Comment comment;
}

