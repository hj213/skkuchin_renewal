package skkuchin.service.r2dbcRepo;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;

@Repository
public interface ChatRepo extends R2dbcRepository<ChatMessage, Long> {

    @Query("SELECT * FROM chat_message WHERE id = :chatRoomId")
    Flux<ChatMessage> findByChatRoomId(Long chatRoomId);

    @Query("SELECT * FROM chat_message WHERE room_id = :roomId")
    Flux<ChatMessage> findByRoomId(String roomId);

    @Query("SELECT * FROM chat_message WHERE room_id = :roomId ORDER BY date DESC")
    Flux<ChatMessage> findByLatestMessageTime(String roomId);

    @Query("SELECT * FROM chat_message WHERE room_id = :roomId ORDER BY date DESC LIMIT 1")
    Mono<ChatMessage> findFirstByRoomIdOrderByDateDesc(String roomId);
}
