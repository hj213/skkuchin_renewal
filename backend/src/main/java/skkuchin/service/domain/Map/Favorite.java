package skkuchin.service.domain.Map;

import lombok.*;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;

// test
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(
        name="favorite",
        uniqueConstraints={
                @UniqueConstraint(
                        columnNames={"place_id", "user_id"}
                )
        }
)
public class Favorite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;






}

