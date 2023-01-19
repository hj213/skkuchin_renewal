package skkuchin.service.domain.Match;

import lombok.*;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "candidate1_id")
    private AppUser candidate1;

    @ManyToOne
    @JoinColumn(name = "candidate2_id")
    private AppUser candidate2;

    @ManyToOne
    @JoinColumn(name = "candidate3_id")
    private AppUser candidate3;

    private LocalDateTime expireDate;
}
