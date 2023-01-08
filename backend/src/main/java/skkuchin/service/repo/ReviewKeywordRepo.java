package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.ReviewKeyword;

public interface ReviewKeywordRepo extends JpaRepository<ReviewKeyword, Long> {
    ReviewKeyword findByName(String name);
}
