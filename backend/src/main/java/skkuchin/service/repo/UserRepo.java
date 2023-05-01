package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface UserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
    AppUser findByNickname(String nickName);
    AppUser findByEmail(String email);
    @Query("SELECT user FROM AppUser user " +
            "WHERE user.matching = true " +
            "AND user.id NOT IN :userIds")
    List<AppUser> findAvailableUsers(@Param("userIds") List<Long> userIds);
}
