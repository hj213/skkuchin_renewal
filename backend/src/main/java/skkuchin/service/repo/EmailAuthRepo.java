package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.EmailAuth;
import skkuchin.service.domain.User.EmailType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EmailAuthRepo extends JpaRepository<EmailAuth, Long> {
    //Optional<EmailAuth> findValidAuthByEmail(String email, String authNum, LocalDateTime currentTime);
    Optional<EmailAuth> findByEmailAndAuthNumAndExpireDateAfter(String email, String authNum, LocalDateTime now);
    List<EmailAuth> findByEmailAndExpireDateAfter(String email, LocalDateTime now);
    List<EmailAuth> findByEmailAndIsAuthAndType(String email, Boolean isAuth, EmailType type);
}
