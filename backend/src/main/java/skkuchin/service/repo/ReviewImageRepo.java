package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.ReviewImage;

import java.util.List;

public interface ReviewImageRepo extends JpaRepository<ReviewImage, Long> {
    List<ReviewImage> findByReview(Review review);
}
