package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.Review_Tag;

import java.util.List;

public interface Review_TagRepo extends JpaRepository<Review_Tag, Long> {
    List<Review_Tag> findByReview(Review review);
}
