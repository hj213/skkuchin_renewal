package skkuchin.service.integration;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.jayway.jsonpath.JsonPath;
import lombok.Builder;
import lombok.Data;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import skkuchin.service.common.BaseIntegrationTest;
import skkuchin.service.config.UserSetUp;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Role;
import skkuchin.service.exception.DiscordException;
import skkuchin.service.exception.DuplicateException;

import java.util.ArrayList;
import java.util.Collection;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserIntegrationTest extends BaseIntegrationTest {
    @Autowired
    private UserSetUp userSetUp;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @WithMockUser
    @DisplayName("[GET] /api/users 성공")
    public void 모든_회원_불러오기() throws Exception {
        //given
        userSetUp.saveUser("user1", "user111", "1234", "dlaudwns789@gmail.com", 16, Major.글로벌경영학과);
        userSetUp.saveUser("user2", "user222", "1234", "dlaudwns780@gmail.com", 16, Major.글로벌경영학과);

        //when
        ResultActions resultActions = mvc.perform(get("/api/users")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", equalTo(4))); //자동 주입 유저 포함 4명
    }

    @Test
    @DisplayName("[POST] /api/user/save 성공")
    void 회원가입_성공() throws Exception {
        //given
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY); //SignUpForm을 읽어들이기 위함.
        String form = objectMapper.writeValueAsString(
                new SignUpFormTestVer("user", "user111", "1234", "1234", "dlaudwns789@gmail.com", 16, Major.글로벌경영학과));

        //when
        ResultActions resultActions = mvc.perform(post("/api/user/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(form)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("nickname", equalTo("user")));
    }

    @Test
    @DisplayName("[POST] /api/user/save 실패")
    void 비밀번호_불일치() throws Exception {
        //given
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(
                new SignUpFormTestVer("user", "user111", "124", "1234", "dlaudwns789@gmail.com", 16, Major.건설환경공학부));

        //when
        ResultActions resultActions = mvc.perform(post("/api/user/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is5xxServerError())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof DiscordException))
                .andExpect(result -> assertThat(result.getResolvedException().getMessage()).isEqualTo("re_password_error"));
    }

    @Test
    @Disabled
    @DisplayName("[POST] /api/user/save 실패")
    void nickname_중복_확인() throws Exception {
        //given
        Collection<Role> roles = new ArrayList<>();
        roles.add(new Role(1L, "ROLE_USER", null));
        userSetUp.saveUser("user1", "user111", "1234", "dlaudwns789@gmail.com", 16, Major.글로벌경영학과);
        //userSetUp.saveUser("user1", "user111", "1234", roles);
        //ConstraintViolationException DataIntegrityViolationException

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(
                new SignUpFormTestVer("user1", "user222", "1234", "1234", "dlaudwns789@gmail.com", 16, Major.글로벌경영학과));

        //when
        ResultActions resultActions = mvc.perform(post("/api/user/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is5xxServerError())
                .andExpect(result -> assertTrue(result.getResolvedException() instanceof DuplicateException))
                .andExpect(result -> assertThat(result.getResolvedException().getMessage()).isEqualTo("duplicate_error"));
    }

    @Test
    @DisplayName("[GET] /api/token/verify 성공")
    void verify_token() throws Exception {
        //login의 반환 값으로 access token을 받은 후 verify
        //given
        Collection<Role> roles = new ArrayList<>();
        String pw = passwordEncoder.encode("1111");
        userSetUp.saveUser("user1", "user111", pw, "dlaudwns789@gmail.com", 16, Major.글로벌경영학과);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(new LoginFormTestVer("user111", "1111"));

        MvcResult loginResult = mvc.perform(post("/api/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(form)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        String access_token = "Bearer " + JsonPath.read(loginResult.getResponse().getContentAsString(), "$.access");

        //when
        ResultActions resultActions = mvc.perform(get("/api/token/verify")
                .header("Authorization", access_token))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("[GET] /api/token/refresh 성공")
    void refresh_token() throws Exception {
        //given
        Collection<Role> roles = new ArrayList<>();
        String pw = passwordEncoder.encode("1111");
        userSetUp.saveUser("user1", "user111", pw, "dlaudwns789@gmail.com", 16, Major.글로벌경영학과);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(new LoginFormTestVer("user111", "1111"));

        MvcResult loginResult = mvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        String access_token = "Bearer " + JsonPath.read(loginResult.getResponse().getContentAsString(), "$.access");

        //when
        ResultActions resultActions = mvc.perform(get("/api/token/refresh")
                        .header("Authorization", access_token))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());

    }

    @Test
    @WithMockUser
    @DisplayName("[GET] /api/user 성공")
    void user_불러오기() throws Exception{
        //given
        Collection<Role> roles = new ArrayList<>();
        roles.add(new Role(1L, "ROLE_USER", null));
        String pw = passwordEncoder.encode("1111");
        userSetUp.saveUser("user1", "user111", pw, "dlaudwns789@gmail.com", 16, Major.글로벌경영학과);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(new LoginFormTestVer("user111", "1111"));

        MvcResult loginResult = mvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        String access_token = "Bearer " + JsonPath.read(loginResult.getResponse().getContentAsString(), "$.access");

        //when
        ResultActions resultActions = mvc.perform(get("/api/user")
                        .header("Authorization", access_token))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", equalTo("user111")));
    }
}

@Data
@Builder
class SignUpFormTestVer {

    private String nickname;
    private String username;
    private String password;
    private String re_password;
    private String email;
    private int student_id;
    private Major major;

    public SignUpFormTestVer(String nickname, String username, String password, String re_password, String email, int student_id, Major major) {
        this.nickname = nickname;
        this.username = username;
        this.password = password;
        this.re_password = re_password;
        this.email = email;
        this.student_id = student_id;
        this.major = major;
    }
}

@Data
class RoleToUserTestVer {
    private String username;
    private String roleName;

    public RoleToUserTestVer(String username, String roleName) {
        this.username = username;
        this.roleName = roleName;
    }
}

@Data
class LoginFormTestVer {
    private String username;
    private String password;

    public LoginFormTestVer(String username, String password) {
        this.username = username;
        this.password = password;
    }
}