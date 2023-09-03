package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Magazine.Magazine;
import skkuchin.service.domain.Magazine.RelatePlace;
import skkuchin.service.domain.Map.Place;

import java.util.List;

public interface RelatedPlaceRepo extends JpaRepository<RelatePlace,Long> {

    List<RelatePlace> findByMagazine(Magazine magazine);
}
