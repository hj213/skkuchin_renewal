package skkuchin.service.domain.Map;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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

    @JoinColumn(name = "place_id")
    @ManyToOne
    private Place place;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private AppUser user;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL)
    private List<Review_Tag> reviewTags = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createDate;
/*
    @PrePersist
    public void preCreateDate() {
        this.createDate = LocalDateTime.now();
    }*/
}
