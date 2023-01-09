package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.ReviewTag;

import java.util.List;

public interface ReviewTagRepo extends JpaRepository<ReviewTag, Long> {
    List<ReviewTag> findByReview(Review review);
}
