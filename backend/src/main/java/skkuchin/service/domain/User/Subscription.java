package skkuchin.service.domain.User;

import lombok.*;
import skkuchin.service.domain.Map.Place;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Subscription {
    @Id
    private Long id;

    private String endpoint;

    private String auth;

    private String p256dh;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;
}

Vvn4Y6jrAZ-L7CL5gstrMVbxjST11dQ8lsNLoJkLw0I
