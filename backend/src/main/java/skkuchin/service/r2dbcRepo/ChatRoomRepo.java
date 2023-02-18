package skkuchin.service.r2dbcRepo;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import skkuchin.service.domain.Chat.ChatRoom;

import java.time.LocalDateTime;

@Repository
public interface ChatRoomRepo extends R2dbcRepository<ChatRoom, Long> {
    @Query("SELECT * FROM chat_room WHERE room_name = :roomName")
    Mono<ChatRoom> findByRoomName(String roomName);
    @Query("SELECT * FROM chat_room WHERE room_id = :roomId")
    Mono<ChatRoom> findByRoomId(String roomId);

    @Query("SELECT * FROM chat_room WHERE user_id = :senderId AND receiver_request_status = 'ACCEPT'")
    Flux<ChatRoom> findByNormalSenderId(Long senderId);

    @Query("SELECT * FROM chat_room WHERE user1_id = :receiverId AND receiver_request_status = 'ACCEPT'")
    Flux<ChatRoom> findByNormalReceiverId(Long receiverId);

    /*@Query("SELECT * FROM chat_room WHERE user1_id = :senderId AND sender_request_status = 'ACCEPT' AND receiver_request_status = 'ACCEPT' AND user_id NOT IN (:blockedUsers) ORDER BY latest_message_time DESC")
    Flux<ChatRoom> findByReceiverId(@Param("senderId") Long senderId, @Param("blockedUsers") Long[] blockedUsers);

    @Query("SELECT * FROM chat_room WHERE user_id = :senderId AND sender_request_status = 'ACCEPT' AND receiver_request_status = 'ACCEPT' AND user1_id NOT IN (:blockedUsers) ORDER BY latest_message_time DESC")
    Flux<ChatRoom> findBySenderId(@Param("senderId") Long senderId, @Param("blockedUsers") Long[] blockedUsers);*/

    @Query("SELECT * FROM chat_room WHERE expire_date < NOW()")
    Flux<ChatRoom> findByExpireDateBefore();
}
