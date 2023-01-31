package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.EmailAuth;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepo extends JpaRepository<EmailAuth, Long> {
    //Optional<EmailAuth> findValidAuthByEmail(String email, String authNum, LocalDateTime currentTime);
    Optional<EmailAuth> findByEmailAndAuthNumAndExpireDateAfter(String email, String authNum, LocalDateTime now);
    EmailAuth findByEmailAndExpireDateAfter(String email, LocalDateTime now);
}
