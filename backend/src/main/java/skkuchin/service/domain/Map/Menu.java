package skkuchin.service.domain.Map;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @JoinColumn(name = "place_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Place place;

    @Column(nullable = false)
    private int price;
}
