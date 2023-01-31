package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.AppUser;

public interface UserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    AppUser findByNickname(String nickName);
    AppUser findByEmail(String email);
}
