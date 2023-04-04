package skkuchin.service.domain.Notice;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NoticeType type;

    @Column(nullable = false)
    private String title;

    private String pushTitle;

    private String pushContent;

    private String url;

    private String readUsers;

    @CreationTimestamp
    private LocalDateTime createDate;
}
