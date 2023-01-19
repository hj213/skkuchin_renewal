package skkuchin.service.domain.Map;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//@Data
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private float rate;

    @Column(nullable = false)
    private String content;

    private String image;

    @JoinColumn(name = "place_id", nullable = false)
    @ManyToOne
    private Place place;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne
    private AppUser user;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewTag> reviewTags = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createDate;
}
