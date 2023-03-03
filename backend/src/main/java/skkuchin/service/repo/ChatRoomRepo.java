package skkuchin.service.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatRoom;



import java.time.LocalDateTime;
import java.util.List;
public interface ChatRoomRepo extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomName(String roomName);
    ChatRoom findByRoomId(String roomId);


    @Query("SELECT a FROM ChatRoom a where (a.user2.id = :senderId OR a.user1.id = :senderId )" +
            "AND a.response = 'ACCEPT'")
    List<ChatRoom> findByUser1Id
            (@Param("senderId") Long senderId);

    @Query("SELECT a FROM ChatRoom a where a.user2.id = :senderId " +
            "AND (a.response <> 'ACCEPT' OR a.response IS NULL OR a.response = '')")
   List<ChatRoom> findByUser2Id
            (@Param("senderId") Long senderId);

    @Query("SELECT a FROM ChatRoom a where a.user1.id = :senderId " +
            "AND (a.response <> 'ACCEPT' OR a.response IS NULL OR a.response = '')")
    List<ChatRoom> findBySenderId
            (@Param("senderId") Long senderId);


    List<ChatRoom> findByExpireDateBefore(LocalDateTime now);
}