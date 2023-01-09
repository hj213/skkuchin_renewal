package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;

import java.util.List;

public interface MenuRepo extends JpaRepository<Menu, Long> {
    List<Menu> findByPlace(Place place);
}
