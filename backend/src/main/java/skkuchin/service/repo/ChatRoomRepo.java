package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;


import java.time.LocalDateTime;
import java.util.List;
public interface ChatRoomRepo extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomId(String roomId);
    @Query("SELECT a FROM ChatRoom a where a.response = 'ACCEPT'")
    List<ChatRoom> findAllAcceptRoom();

    @Query("SELECT a FROM ChatRoom a where (a.user2.id = :userId OR a.user1.id = :userId )")
    List<ChatRoom> findMyAllRoomList(Long userId);

    @Query("SELECT a FROM ChatRoom a where (a.user2.id = :userId OR a.user1.id = :userId )" +
            "AND a.response = 'ACCEPT'")
    List<ChatRoom> findMyRoomList(Long userId);

    @Query("SELECT a.user2.id FROM ChatRoom a where a.user1.id = :userId " +
            "AND a.response = 'HOLD'")
    List<Long> findMyRequest(Long userId);

    @Query("SELECT a FROM ChatRoom a WHERE a.user2.id = :userId AND a.response = 'HOLD'")
    List<ChatRoom> findRequestByUserId(Long userId);

    List<ChatRoom> findByExpireDateBefore(LocalDateTime now);
}