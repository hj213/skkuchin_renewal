package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Magazine.Ranks;
import skkuchin.service.domain.Map.Campus;

import java.util.List;

public interface RankRepo extends JpaRepository<Ranks, Long> {

    @Query("SELECT r FROM Ranks r WHERE r.campus = :campus ORDER BY r.date DESC")
    List<Ranks> findLatestRanksByCampus(@Param("campus") Campus campus);
}
