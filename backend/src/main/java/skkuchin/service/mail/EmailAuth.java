package skkuchin.service.mail;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

/*
@Getter
@Setter
@NoArgsConstructor*/
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class EmailAuth {
    private static final Long MAX_EXPIRE_TIME = 5L; //authNum 생성 5분 후 만료

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String authNum;
    private Boolean isExpired;
    private LocalDateTime expireDate;

    @Builder
    public EmailAuth(String email, String authNum, Boolean isExpired) {
        this.email = email;
        this.authNum = authNum;
        this.isExpired = isExpired;
        this.expireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    public void useToken() {
        this.isExpired = true;
    }
}
