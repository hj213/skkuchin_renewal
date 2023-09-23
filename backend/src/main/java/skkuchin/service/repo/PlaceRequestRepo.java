package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.PlaceRequest;

public interface PlaceRequestRepo extends JpaRepository<PlaceRequest, Long> {
}
