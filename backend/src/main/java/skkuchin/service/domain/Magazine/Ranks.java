package skkuchin.service.domain.Magazine;

import lombok.*;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Place;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Ranks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Place place1;

    @ManyToOne(fetch = FetchType.LAZY)
    private Place place2;

    @ManyToOne(fetch = FetchType.LAZY)
    private Place place3;

    @ManyToOne(fetch = FetchType.LAZY)
    private Place place4;

    @ManyToOne(fetch = FetchType.LAZY)
    private Place place5;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Campus campus;

    private LocalDateTime date;

    @PrePersist
    public void setDate() {
        this.date = LocalDateTime.now();
    }
}
