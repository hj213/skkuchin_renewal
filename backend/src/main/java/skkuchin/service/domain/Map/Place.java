package skkuchin.service.domain.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String detail_category;

    private Location location;

    @NotNull
    private String address;

    @NotNull
    private Double x_coordinate;

    @NotNull
    private Double y_coordinate;

    private String service_time;

    private String break_time;

    private Boolean discount_availability;

    private String discount_content;

    @Enumerated(EnumType.STRING)
    private Category category;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Campus campus;
}
