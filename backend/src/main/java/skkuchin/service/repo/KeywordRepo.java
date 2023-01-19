package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.Keyword;

public interface KeywordRepo extends JpaRepository<Keyword, Long> {

    Keyword findByName(String name);
}
