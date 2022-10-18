package skkuchin.service.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import skkuchin.service.domain.AppUser;
import skkuchin.service.domain.Role;
import skkuchin.service.exception.BlankException;
import skkuchin.service.exception.DiscordException;
import skkuchin.service.exception.DuplicateException;
import skkuchin.service.repo.RoleRepo;
import skkuchin.service.service.UserService;

import javax.persistence.Column;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<AppUser>>getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }


    @PostMapping("/user/save")
    public ResponseEntity<AppUser> saveUser(@RequestBody SignUpForm signUpForm) {
        URI uri = URI.create(
                ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path("/api/user/save").toUriString());

        //비밀번호 일치 여부 확인
        if (!signUpForm.checkPassword()) {
            throw new DiscordException("re_password_error");
        }
        try {
            AppUser appUser = signUpForm.toEntity();
            appUser.getRoles().add(userService.getRole("ROLE_USER"));

            return ResponseEntity.created(uri).body(userService.saveUser(appUser));
        } catch (DataIntegrityViolationException exception) {
            //username 또는 nickname 중복 시 에러
            throw new DuplicateException("duplicate_error");
        } catch(TransactionSystemException exception) {
            //null 또는 blank data가 있을 경우 에러
            throw new BlankException("blank_error");
        }

    }

    /*
    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }*/

    @PostMapping("/role/addtouser")
    public ResponseEntity<Role>addRoleToUser(@RequestBody RoleToUser form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/token/verify")
    public ResponseEntity<Boolean> verifyToken(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

                String access_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(access_token);
                Date current = new Date(System.currentTimeMillis());
                return ResponseEntity.ok().body(current.before(decodedJWT.getExpiresAt())); // created(uri) -> ok()

        } else {
            throw new RuntimeException("Access token is missing");
        }
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                AppUser user = userService.getUser(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 1 * 60 * 1000)) //10분
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access", access_token); // access_token -> access
                tokens.put("refresh", refresh_token); // refresh_token -> refresh
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }

        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<AppUser> getApiUser(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String access_token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(access_token);
            String username = decodedJWT.getSubject();

            return ResponseEntity.ok().body(userService.getUser(username));
        }else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

@Data
class RoleToUser {
    private String username;
    private String roleName;
}

@Data @Builder @NoArgsConstructor
@AllArgsConstructor
class SignUpForm {

    private String nickname;
    private String username;
    private String password;
    private String re_password;

    public boolean checkPassword() {
        if (this.password.equals(this.re_password)) return true;
        else return false;
    }

    public AppUser toEntity() {
        return AppUser
                .builder().nickname(this.nickname).username(this.username).password(this.password)
                .roles(new ArrayList<>())
                .build();
    }
}



