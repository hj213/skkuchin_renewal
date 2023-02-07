package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Map.Tag;

import java.util.List;

public interface TagRepo extends JpaRepository<Tag, Long> {
    Tag findByName(String name);

    List<Tag> findAllByNameIn(List<String> keywords);
}
