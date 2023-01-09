package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Tag;

public interface TagRepo extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}
