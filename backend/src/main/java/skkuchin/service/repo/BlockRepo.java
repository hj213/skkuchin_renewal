package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Block;

import java.util.List;

public interface BlockRepo extends JpaRepository<Block, Long> {
    List<Block> findByUser(AppUser appUser);
}
