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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private AppUser user;

    @Column(nullable = false)
    private  String content;

    @CreationTimestamp
    private LocalDateTime date;
}
