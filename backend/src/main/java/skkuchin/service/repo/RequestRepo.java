package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Request;

public interface RequestRepo extends JpaRepository<Request, Long> {
}
