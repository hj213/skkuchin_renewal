package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Match.Candidate;

import java.util.List;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
    //@Query("SELECT new Tuple(c.candidate1Id, c.candidate2Id, c.candidate3Id) FROM Candidate c")
    //List<Tuple> findAllCandidateIds();

    @Query("SELECT c FROM Candidate c WHERE c.user.id = :userId")
    List<Candidate> findByUserId(@Param("userId") Long userId);

    //List<Candidate>
}
