package skkuchin.service.domain.Matching;

import lombok.*;
import skkuchin.service.domain.User.AppUser;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate1_id")
    private AppUser candidate1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate2_id")
    private AppUser candidate2;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate3_id")
    private AppUser candidate3;

    private LocalDateTime expireDate;

    @PrePersist
    public void setDate() {
        LocalDateTime now = LocalDateTime.now();
        this.expireDate = now.plusDays(14);
    }
}
