package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Chat.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
}
