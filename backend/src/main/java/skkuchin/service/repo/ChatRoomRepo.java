package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.RequestStatus;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Block;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRoomRepo extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomName(String roomName);
    ChatRoom findByRoomId(String roomId);

    @Query("SELECT a FROM ChatRoom a where a.user.id = :senderId " +
            "AND a.senderRequestStatus = 'ACCEPT' AND a.receiverRequestStatus = 'ACCEPT' ORDER BY a.latestMessageTime DESC")
    List<ChatRoom> findByNormalSenderId
            (@Param("senderId") Long senderId);

    @Query("SELECT a FROM ChatRoom a where a.user1.id = :senderId " +
            "AND a.senderRequestStatus = 'ACCEPT' AND a.receiverRequestStatus = 'ACCEPT' ORDER BY a.latestMessageTime DESC")
    List<ChatRoom> findByNormalReceiverId
            (@Param("senderId") Long senderId);

   /* @Query("SELECT a FROM ChatRoom a where a.user1.id = :senderId " +
            "AND a.senderRequestStatus = 'ACCEPT' AND a.receiverRequestStatus = 'ACCEPT' AND a.user.id NOT IN (:blockedUsers)" +
            " ORDER BY a.latestMessageTime DESC")
    List<ChatRoom> findByReceiverId
            (@Param("senderId") Long senderId ,@Param("blockedUsers") Long[] blockedUsers);

    @Query("SELECT a FROM ChatRoom a where a.user.id = :senderId " +
            "AND a.senderRequestStatus = 'ACCEPT' AND a.receiverRequestStatus = 'ACCEPT' AND a.user1.id NOT IN (:blockedUsers) " +
            "ORDER BY a.latestMessageTime DESC")
    List<ChatRoom> findBySenderId
            (@Param("senderId") Long senderId ,@Param("blockedUsers") Long[] blockedUsers);*/




    List<ChatRoom> findByExpireDateBefore(LocalDateTime now);
}