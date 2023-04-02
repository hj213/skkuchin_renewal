package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByUser(AppUser user);
    List<Review> findByPlace(Place place);

    @Query("SELECT r.place.id, AVG(r.rate) FROM Review r "+
            "WHERE r.place.campus = :campus "+
            "GROUP BY r.place ORDER BY COUNT(r) DESC")
    List<Object[]> findReviewCountPerPlace(@Param("campus") Campus campus);

    @Query("SELECT AVG(r.rate) FROM Review r " +
            "WHERE r.place.id = :placeId " +
            "GROUP BY r.place")
    double findAvgRateOfPlace(@Param("placeId") Long placeId);

    @Query("SELECT r FROM Review r WHERE r.user.id = :userId AND r.place.id = :placeId")
    List<Review> findByUserIdAndPlaceId(Long userId, Long placeId);
}
