package skkuchin.service.domain.Magazine;

import lombok.*;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(
        name="relatePlace",
        uniqueConstraints={
                @UniqueConstraint(
                        columnNames={"place_id", "magazine_id"}
                )
        }
)
public class RelatePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id", nullable = false)
    private Place place;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "magazine_id", nullable = false)
    private Magazine magazine;
}

