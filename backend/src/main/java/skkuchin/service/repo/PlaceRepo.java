package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import skkuchin.service.domain.Map.Place;

import java.util.List;

public interface PlaceRepo extends JpaRepository<Place, Long> {
    Place findByName(String name);
    @Query("SELECT p FROM Place p LEFT JOIN Review r ON p.id = r.place.id WHERE r.place IS NULL")
    List<Place> findNoReviewPlaces();
    @Query("SELECT p FROM Place p LEFT JOIN Image i ON p.id = i.place.id WHERE i.place IS NULL")
    List<Place> findNoImagePlaces();
    @Query("SELECT p FROM Place p LEFT JOIN Menu m ON p.id = m.place.id WHERE m.place IS NULL")
    List<Place> findNoMenuPlaces();
}
