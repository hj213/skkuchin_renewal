package skkuchin.service.domain.Chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import skkuchin.service.domain.User.Report;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("chat_room")
public class ChatRoom {

    @Id
    private Long id;
    private String roomId;
    private String roomName;

    private Long userId;

    private Long user1Id;

    @Enumerated(EnumType.STRING)
    private RequestStatus receiverRequestStatus;

    private int userCount;

    private LocalDateTime expireDate;

    private boolean isSenderBlocked;

    private boolean isReceiverBlocked;
}
