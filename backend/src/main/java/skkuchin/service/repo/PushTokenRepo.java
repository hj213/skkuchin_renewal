package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.PushToken;

public interface PushTokenRepo extends JpaRepository<PushToken, Long> {
    PushToken findByUser(AppUser user);
}
