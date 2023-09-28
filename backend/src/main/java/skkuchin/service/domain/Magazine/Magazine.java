package skkuchin.service.domain.Magazine;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.Map.Gate;
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
public class Magazine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Gate gate;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private  String content;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private AppUser user;

    @CreationTimestamp
    private LocalDateTime date;

    private String link;

}
