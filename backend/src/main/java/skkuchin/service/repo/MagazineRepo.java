package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Magazine.Magazine;

public interface MagazineRepo extends JpaRepository<Magazine,Long> {
}
