package skkuchin.service.domain.User;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/*
@Getter
@Setter
@NoArgsConstructor*/
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String authNum;
    @Enumerated(EnumType.STRING)
    private EmailType type;
    private Boolean isAuth;
    private LocalDateTime expireDate;
}
