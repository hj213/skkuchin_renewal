package skkuchin.service.api.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import skkuchin.service.api.dto.*;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.config.auth.PrincipalDetails;
import skkuchin.service.service.UserService;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUsers() {
        List<UserDto.Response> users = userService.getUsers();
        return new ResponseEntity<>(new CMRespDto<>(1, "유저 전체 조회 완료", users), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserDto.SignUpForm signUpForm, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationApiException("유효성 검사 실패", errorMap);
            }
            AppUser user = userService.saveUser(signUpForm);
            return new ResponseEntity<>(new CMRespDto<>(1, "회원가입 완료", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationApiException("중복 오류");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/role/addtouser")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addRoleToUser(@RequestBody UserDto.RoleToUser form) {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return new ResponseEntity<>(new CMRespDto<>(1, "role 추가 완료", null), HttpStatus.OK);
    }

    @GetMapping("/token/verify")
    public ResponseEntity<?> verifyToken(HttpServletRequest request) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String access = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(access);
                Date current = new Date(System.currentTimeMillis());
                return new ResponseEntity<>(new CMRespDto<>(1, "토큰 유효성 검증 완료", current.before(decodedJWT.getExpiresAt())), HttpStatus.OK);
            } catch (SignatureVerificationException e) {
                throw new CustomValidationApiException("토큰이 유효하지 않습니다");
            } catch (JWTDecodeException e) {
                throw new CustomValidationApiException("토큰 형식이 올바르지 않습니다");
            }
        } else {
            throw new RuntimeException("Access token is missing");
        }
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh);
                String username = decodedJWT.getSubject();
                AppUser user = userService.getUserForRefresh(username);
                String access = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) //10분
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getUserRoles().stream().map(userRole -> userRole.getRole().getName()).collect(Collectors.toList()))
                        .sign(algorithm);

                UserDto.TokenResponse response = new UserDto.TokenResponse(access, refresh);
                return new ResponseEntity<>(new CMRespDto<>(1, "access token 재발급 완료", response), HttpStatus.OK);
            } catch (SignatureVerificationException e) {
                throw new CustomValidationApiException("자동 로그인 기간이 만료되어 로그인 페이지로 이동합니다");
            } catch (JWTDecodeException e) {
                throw new CustomValidationApiException("토큰 형식이 올바르지 않습니다");
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> getMyInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        UserDto.Response userResp = userService.getUser(user.getId());
        return new ResponseEntity<>(new CMRespDto<>(1, "본인 계정 상세 정보 조회 완료", userResp), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getUserInfo(@PathVariable Long userId) {
        UserDto.Response userResp = userService.getUser(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "특정 유저 상세 정보 조회 완료", userResp), HttpStatus.OK);
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateMyInfo(@Valid @RequestBody UserDto.PutRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        userService.updateUser(user.getId(), dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "본인 계정 수정 완료", null), HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @Valid @RequestBody UserDto.PutRequest dto) {
        userService.updateUser(userId, dto);
        return new ResponseEntity<>(new CMRespDto<>(1, "특정 유저 계정 수정 완료", null), HttpStatus.OK);
    }

    @DeleteMapping("/me")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        AppUser user = principalDetails.getUser();
        userService.deleteUser(user.getId());
        return new ResponseEntity<>(new CMRespDto<>(1, "회원 탈퇴되었습니다", null), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteAnotherUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "특정 유저 삭제 완료", null), HttpStatus.OK);
    }

    @GetMapping("/check/username")
    public ResponseEntity<?> checkUsername(@RequestBody Map<String, String> usernameMap) {
        userService.checkUsername(usernameMap.get("username"));
        return new ResponseEntity<>(new CMRespDto<>(1, "사용 가능한 아이디입니다", true), HttpStatus.OK);
    }

    @GetMapping("/check/nickname")
    public ResponseEntity<?> checkNickName(@RequestBody Map<String, String> nicknameMap) {
        userService.checkNickname(nicknameMap.get("nickname"));
        return new ResponseEntity<>(new CMRespDto<>(1, "사용 가능한 닉네임입니다", true), HttpStatus.OK);
    }

    @GetMapping("/find/username")
    public ResponseEntity<?> findUsername(@RequestBody Map<String, String> emailMap) {
        String username = userService.findUsername(emailMap.get("email"));
        System.out.println(username);
        return new ResponseEntity<>(new CMRespDto<>(1, "아이디 조회 완료", username), HttpStatus.OK);
    }

    @PutMapping("/password")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody UserDto.PutPassword dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getId();
        userService.updatePassword(dto, userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "비밀번호가 변경되었습니다", null), HttpStatus.OK);
    }

    @PutMapping("/password/reset")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody UserDto.ResetPassword dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getId();
        userService.resetPassword(dto, userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "비밀번호가 초기화되었습니다", null), HttpStatus.OK);
    }

    @PutMapping("/toggle")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    public ResponseEntity<?> updateToggleValue(@RequestBody Map<String, Campus> campusMap, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long userId = principalDetails.getUser().getId();
        userService.updateToggleValue(campusMap.get("campus"), userId);
        return new ResponseEntity<>(new CMRespDto<>(1, "토글값 변경 완료", null), HttpStatus.OK);
    }
}



