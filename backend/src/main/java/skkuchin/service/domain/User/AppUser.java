package skkuchin.service.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.EnumType.STRING;
import static javax.persistence.GenerationType.AUTO;
// test
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true) @NotBlank // nickname도 중복되면 안되기에 unique 적용
    private String nickname;
    @Column(unique = true) @NotBlank
    private String username;
    @NotBlank
    private String password;
    @Column(unique = true) @NotBlank
    private String email;
    @Column(unique = true) @NotBlank
    private String student_id;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Major major;
    @NotBlank
    private String image;
    @Enumerated(EnumType.STRING)
    private Mbti mbti;
    private LocalDateTime start_date;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();
    private Boolean emailAuth;

    public void emailVerifiedSuccess() {
        this.emailAuth = true;
    }
}
