package skkuchin.service.domain.Place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private float rate;

    @NotNull
    @Size(min = 1) //리뷰 최대 글자 수 나중에 추가
    private String content;

    private String image;

    //@JoinColumn(name = "place_id")
    //@ManyToOne
    //private Place place;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private AppUser user;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @PrePersist
    public void preCreateDate() {
        this.createDate = LocalDateTime.now();
    }

    public void update(ReviewDto.PutRequest dto) {
        this.setContent(dto.getContent());
        this.setRate(dto.getRate());
        this.setImage(dto.getImage());
    }
}
