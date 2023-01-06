package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Place;

public interface PlaceRepo extends JpaRepository<Place, Long> {
}
