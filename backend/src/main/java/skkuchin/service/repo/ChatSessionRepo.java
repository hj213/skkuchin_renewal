package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Chat.ChatSession;

public interface ChatSessionRepo extends JpaRepository<ChatSession, Long> {

    ChatSession findBySessionId(String sessionId);
}
