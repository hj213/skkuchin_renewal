package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Chat.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomName(String roomName);
    ChatRoom findByRoomId(String roomId);
}