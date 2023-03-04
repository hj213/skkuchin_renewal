package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Notice.Notice;

public interface NoticeRepo extends JpaRepository<Notice, Long> {
}
