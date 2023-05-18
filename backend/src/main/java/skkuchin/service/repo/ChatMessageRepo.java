package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;

import java.util.List;

public interface ChatMessageRepo extends JpaRepository<ChatMessage,Long> {
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);

    void deleteByChatRoom(ChatRoom chatRoom);

    @Query("SELECT a FROM ChatMessage a WHERE a.chatRoom.roomId = :roomId ORDER BY a.date DESC")
    List<ChatMessage> findByLatestTime(@Param("roomId") String roomId);

    @Query("SELECT COUNT(a) FROM ChatMessage a WHERE a.chatRoom.roomId = :roomId AND a.readStatus = false " +
            "AND a.sender <> :username")
    int countByReadStatus(@Param("roomId") String roomId, @Param("username") String username);
}