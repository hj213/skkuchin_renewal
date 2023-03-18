package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Role;
import skkuchin.service.domain.User.UserRole;

import java.util.List;

public interface UserRoleRepo extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUser(AppUser user);
}
