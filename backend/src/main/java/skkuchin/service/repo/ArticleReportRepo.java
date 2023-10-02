package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Forum.ArticleReport;

public interface ArticleReportRepo extends JpaRepository<ArticleReport,Long> {
}
