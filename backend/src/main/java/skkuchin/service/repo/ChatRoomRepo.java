package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.RequestStatus;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRoomRepo extends JpaRepository<ChatRoom,Long> {
    ChatRoom findByRoomName(String roomName);
    ChatRoom findByRoomId(String roomId);

    List<ChatRoom> findByUserAndSenderAcceptedAndReceiverAccepted
            (AppUser user, boolean senderAccepted,boolean receiverAccepted);
    List<ChatRoom> findByUser1AndSenderAcceptedAndReceiverAccepted
            (AppUser user, boolean senderAccepted, boolean receiverAccepted);


    List<ChatRoom> findByUserAndSenderRequestStatusAndReceiverRequestStatus
            (AppUser user, RequestStatus senderRequestStatus, RequestStatus receiverRequestStatus);

    List<ChatRoom> findByUser1AndSenderRequestStatusAndReceiverRequestStatus
            (AppUser user, RequestStatus senderRequestStatus, RequestStatus receiverRequestStatus);

    @Query("SELECT a FROM ChatRoom a where a.user.id = :senderId " +
            "AND a.senderRequestStatus = 'ACCEPT' AND a.receiverRequestStatus = 'ACCEPT' ORDER BY a.latestMessageTime DESC")
    List<ChatRoom> findByUserId
            (@Param("senderId") Long senderId)
      ;

    @Query("SELECT a FROM ChatRoom a where a.user1.id = :senderId " +
            "AND a.senderRequestStatus = 'ACCEPT' AND a.receiverRequestStatus = 'ACCEPT' ORDER BY a.latestMessageTime DESC")
    List<ChatRoom> findByReceiverId
            (@Param("senderId") Long senderId)
            ;

    List<ChatRoom> findByExpireDateBefore(LocalDateTime now);
}