package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;

import java.util.List;

public interface ImageRepo extends JpaRepository<Image, Long> {
    List<Image> findByPlace(Place place);
}
