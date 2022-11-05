package skkuchin.service.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUser {
    @Id @GeneratedValue(strategy = AUTO)
    private Long id;
    @Column(unique = true) @NotBlank // nickname도 중복되면 안되기에 unique 적용
    private String nickname;
    @Column(unique = true) @NotBlank
    private String username;
    @NotBlank
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();
    private Boolean emailAuth;

    public void emailVerifiedSuccess() {
        this.emailAuth = true;
    }
}
