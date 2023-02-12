package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByUser(AppUser user);
    List<Review> findByPlace(Place place);

    @Query("SELECT r FROM Review r WHERE r.user.id = :userId AND r.place.id = :placeId")
    List<Review> findByUserIdAndPlaceId(Long userId, Long placeId);

    @Query("SELECT r FROM Review r WHERE r.place = :place AND r.user NOT IN :blockedUsers")
    List<Review> findByPlaceAndAuthorNotIn(Place place, List<AppUser> blockedUsers);
}
