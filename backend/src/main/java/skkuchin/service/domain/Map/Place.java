package skkuchin.service.domain.Map;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private Category category;

    private String detailCategory;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Campus campus;

    @Enumerated(EnumType.STRING)
    private Gate gate;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private Double xcoordinate;

    @Column(nullable = false)
    private Double ycoordinate;

    private String serviceTime;

    private String breakTime;

    private Boolean discountAvailability;

    private String discountContent;
}
