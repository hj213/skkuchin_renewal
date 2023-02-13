package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Report;

import java.util.List;

public interface ReportRepo extends JpaRepository<Report, Long> {
    List<Report> findByUser(AppUser appUser);
}
