package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;

import java.util.List;

public interface ChatRepo extends JpaRepository<ChatMessage,Long> {
    List<ChatMessage> findByChatRoom(ChatRoom chatRoom);


    @Query("SELECT a FROM ChatMessage a WHERE a.chatRoom.roomId = :roomId ORDER BY a.date DESC")
    List<ChatMessage> findByLatestMessageTime(@Param("roomId") String roomId);

    @Query("SELECT a FROM ChatMessage a WHERE a.chatRoom.roomId = :roomId AND a.readStatus = false " +
            "AND a.sender <> :sender")
    List<ChatMessage> findByReadStatus(@Param("roomId") String roomId,
                                       @Param("sender") String sender);


}