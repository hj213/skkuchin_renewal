package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.ReviewReviewKeyword;

import java.util.List;

public interface ReviewReviewKeywordRepo extends JpaRepository<ReviewReviewKeyword, Long> {
    List<ReviewReviewKeyword> findByReview(Review review);
}
