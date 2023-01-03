package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Place.Review;

public interface ReviewRepo extends JpaRepository<Review, Long> {
}
