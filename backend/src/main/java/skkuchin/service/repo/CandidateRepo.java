package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDateTime;
import java.util.List;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
    @Query("SELECT c FROM Candidate c WHERE c.user.id = :userId")
    List<Candidate> findByUserId(@Param("userId") Long userId);
    @Query("SELECT c FROM Candidate c WHERE c.user.id = :userId OR c.candidate1.id = :userId OR c.candidate2.id = :userId OR c.candidate3.id = :userId")
    List<Candidate> findMyAllCandidates(@Param("userId") Long userId);
    List<Candidate> findByExpireDateBefore(LocalDateTime now);
}
