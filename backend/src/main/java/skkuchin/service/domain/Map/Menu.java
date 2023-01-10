package skkuchin.service.domain.Map;

import lombok.*;

import javax.persistence.*;

//@Data
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @JoinColumn(name = "place_id")
    @ManyToOne
    private Place place;

    @Column(nullable = false)
    private int price;

}
