package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.User.AppUser;

import java.util.List;


public interface FavoriteRepo extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(AppUser user);
    List<Favorite> findByPlace(Place place);
}
