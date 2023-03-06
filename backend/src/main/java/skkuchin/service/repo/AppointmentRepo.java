package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Chat.Appointment;
import skkuchin.service.domain.Chat.ChatRoom;

public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    Appointment findByChatRoom(ChatRoom chatRoom);
    void deleteByChatRoom(ChatRoom chatRoom);
}
