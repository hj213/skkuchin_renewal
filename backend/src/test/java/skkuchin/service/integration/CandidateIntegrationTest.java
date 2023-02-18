package skkuchin.service.integration;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import skkuchin.service.api.dto.CandidateDto;
import skkuchin.service.common.BaseIntegrationTest;
import skkuchin.service.config.CandidateSetUp;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.repo.UserRepo;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CandidateIntegrationTest extends BaseIntegrationTest {

    @Autowired
    CandidateSetUp candidateSetUp;
    @Autowired
    UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    public void 후보_3명_모두_1순위_같은학과_우선() throws Exception {
        //given
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        List<String> keywords = List.of("한식", "일식", "동아리");

        //이미 후보에 올랐던 유저
        AppUser existing1 = AppUser.builder().nickname("existing1").username("user2").major(Major.건축학과).email("test2").password("1234").studentId(20).build();
        List<String> existingKeywords1 = List.of("한식", "일식", "동아리");
        AppUser existing2 = AppUser.builder().nickname("existing2").username("user3").major(Major.건축학과).email("test3").password("1234").studentId(20).build();
        List<String> existingKeywords2 = List.of("한식", "일식", "동아리");
        AppUser existing3 = AppUser.builder().nickname("existing3").username("user4").major(Major.건축학과).email("test4").password("1234").studentId(20).build();
        List<String> existingKeywords3 = List.of("한식", "일식", "동아리");

        //후보에 오를 유저 (최종 출력 순서는 new2, new1, new3)
        AppUser new1 = AppUser.builder().nickname("new1").username("user5").major(Major.글로벌경영학과).matching(true).email("test5").password("1234").studentId(20).build();
        List<String> keywords1 = List.of("한식", "일식", "동아리");
        AppUser new2 = AppUser.builder().nickname("new2").username("user6").major(Major.건축학과).matching(true).email("test6").password("1234").studentId(20).build();
        List<String> keywords2 = List.of("한식", "일식", "동아리");
        AppUser new3 = AppUser.builder().nickname("new3").username("user7").major(Major.건설환경공학부).matching(true).email("test7").password("1234").studentId(20).build();
        List<String> keywords3 = List.of("한식", "일식", "축구");

        userRepo.saveAll(List.of(user, existing1, existing2, existing3, new1, new2, new3));
        candidateSetUp.saveUserKeyword(user, keywords);
        candidateSetUp.saveCandidate(user, existing1, existing2, existing3);
        candidateSetUp.saveUserKeyword(existing1, existingKeywords1);
        candidateSetUp.saveUserKeyword(existing2, existingKeywords2);
        candidateSetUp.saveUserKeyword(existing3, existingKeywords3);
        candidateSetUp.saveUserKeyword(new1, keywords1);
        candidateSetUp.saveUserKeyword(new2, keywords2);
        candidateSetUp.saveUserKeyword(new3, keywords3);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("user", "1234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("new2"))
                .andExpect(jsonPath("$..data[1].nickname", String.class).value("new1"))
                .andExpect(jsonPath("$..data[2].nickname", String.class).value("new3"));

    }

    @Test
    public void 후보_1명은_1순위_2명은_2순위_같은학과_우선() throws Exception {
        //given
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        List<String> keywords = List.of("한식", "일식", "동아리");

        //이미 후보에 올랐던 유저
        AppUser existing1 = AppUser.builder().nickname("existing1").username("user2").major(Major.건축학과).email("test2").password("1234").studentId(20).build();
        List<String> existingKeywords1 = List.of("한식", "일식", "동아리");
        AppUser existing2 = AppUser.builder().nickname("existing2").username("user3").major(Major.건축학과).email("test3").password("1234").studentId(20).build();
        List<String> existingKeywords2 = List.of("한식", "일식", "동아리");
        AppUser existing3 = AppUser.builder().nickname("existing3").username("user4").major(Major.건축학과).email("test4").password("1234").studentId(20).build();
        List<String> existingKeywords3 = List.of("한식", "일식", "동아리");

        //후보에 오를 유저 (최종 출력 순서는 new2, new3, new1)
        AppUser new1 = AppUser.builder().nickname("new1").username("user5").major(Major.글로벌경영학과).matching(true).email("test5").password("1234").studentId(20).build();
        List<String> keywords1 = List.of("양식", "축구", "학회");
        AppUser new2 = AppUser.builder().nickname("new2").username("user6").major(Major.건축학과).matching(true).email("test6").password("1234").studentId(20).build();
        List<String> keywords2 = List.of("한식", "일식", "동아리");
        AppUser new3 = AppUser.builder().nickname("new3").username("user7").major(Major.건축학과).matching(true).email("test7").password("1234").studentId(20).build();
        List<String> keywords3 = List.of("양식", "축구", "학회");

        userRepo.saveAll(List.of(user, existing1, existing2, existing3, new1, new2, new3));
        candidateSetUp.saveUserKeyword(user, keywords);
        candidateSetUp.saveCandidate(user, existing1, existing2, existing3);
        candidateSetUp.saveUserKeyword(existing1, existingKeywords1);
        candidateSetUp.saveUserKeyword(existing2, existingKeywords2);
        candidateSetUp.saveUserKeyword(existing3, existingKeywords3);
        candidateSetUp.saveUserKeyword(new1, keywords1);
        candidateSetUp.saveUserKeyword(new2, keywords2);
        candidateSetUp.saveUserKeyword(new3, keywords3);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("user", "1234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("new2"))
                .andExpect(jsonPath("$..data[1].nickname", String.class).value("new3"))
                .andExpect(jsonPath("$..data[2].nickname", String.class).value("new1"));
    }

    @Test
    public void 후보_1명_2순위_2명_3순위_같은학과_우선() throws Exception {
        //given
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        List<String> keywords = List.of("한식", "일식", "동아리");

        //이미 후보에 올랐던 유저
        AppUser existing1 = AppUser.builder().nickname("existing1").username("user2").major(Major.건축학과).email("test2").password("1234").studentId(20).build();
        List<String> existingKeywords1 = List.of("한식", "일식", "동아리");
        AppUser existing2 = AppUser.builder().nickname("existing2").username("user3").major(Major.건축학과).email("test3").password("1234").studentId(20).build();
        List<String> existingKeywords2 = List.of("한식", "일식", "동아리");
        AppUser existing3 = AppUser.builder().nickname("existing3").username("user4").major(Major.건축학과).email("test4").password("1234").studentId(20).build();
        List<String> existingKeywords3 = List.of("한식", "일식", "동아리");

        //후보에 오를 유저 (최종 출력 순서는 new2, new3, new1)
        AppUser new1 = AppUser.builder().nickname("new1").username("user5").major(Major.글로벌경영학과).matching(true).email("test5").password("1234").studentId(20).build();
        List<String> keywords1 = List.of("볼링", "댄스", "영화");
        AppUser new2 = AppUser.builder().nickname("new2").username("user6").major(Major.건축학과).matching(true).email("test6").password("1234").studentId(20).build();
        List<String> keywords2 = List.of("양식", "축구", "학회");
        AppUser new3 = AppUser.builder().nickname("new3").username("user7").major(Major.건축학과).matching(true).email("test7").password("1234").studentId(20).build();
        List<String> keywords3 = List.of("볼링", "댄스", "영화");

        userRepo.saveAll(List.of(user, existing1, existing2, existing3, new1, new2, new3));
        candidateSetUp.saveUserKeyword(user, keywords);
        candidateSetUp.saveCandidate(user, existing1, existing2, existing3);
        candidateSetUp.saveUserKeyword(existing1, existingKeywords1);
        candidateSetUp.saveUserKeyword(existing2, existingKeywords2);
        candidateSetUp.saveUserKeyword(existing3, existingKeywords3);
        candidateSetUp.saveUserKeyword(new1, keywords1);
        candidateSetUp.saveUserKeyword(new2, keywords2);
        candidateSetUp.saveUserKeyword(new3, keywords3);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("user", "1234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("new2"))
                .andExpect(jsonPath("$..data[1].nickname", String.class).value("new3"))
                .andExpect(jsonPath("$..data[2].nickname", String.class).value("new1"));
    }

    @Test
    public void _3순위_후보_3명_미만() throws Exception {
        //given
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        List<String> keywords = List.of("한식", "일식", "동아리");

        //이미 후보에 올랐던 유저
        AppUser existing1 = AppUser.builder().nickname("existing1").username("user2").major(Major.건축학과).email("test2").password("1234").studentId(20).build();
        List<String> existingKeywords1 = List.of("한식", "일식", "동아리");
        AppUser existing2 = AppUser.builder().nickname("existing2").username("user3").major(Major.건축학과).email("test3").password("1234").studentId(20).build();
        List<String> existingKeywords2 = List.of("한식", "일식", "동아리");
        AppUser existing3 = AppUser.builder().nickname("existing3").username("user4").major(Major.건축학과).email("test4").password("1234").studentId(20).build();
        List<String> existingKeywords3 = List.of("한식", "일식", "동아리");

        //후보에 오를 유저
        AppUser new1 = AppUser.builder().nickname("new1").username("user5").major(Major.글로벌경영학과).matching(true).email("test5").password("1234").studentId(20).build();
        List<String> keywords1 = List.of("볼링", "축구", "영화");
        AppUser new2 = AppUser.builder().nickname("new2").username("user6").major(Major.건축학과).matching(true).email("test6").password("1234").studentId(20).build();
        List<String> keywords2 = List.of("볼링", "축구", "영화");

        userRepo.saveAll(List.of(user, existing1, existing2, existing3, new1, new2));
        candidateSetUp.saveUserKeyword(user, keywords);
        candidateSetUp.saveCandidate(user, existing1, existing2, existing3);
        candidateSetUp.saveUserKeyword(existing1, existingKeywords1);
        candidateSetUp.saveUserKeyword(existing2, existingKeywords2);
        candidateSetUp.saveUserKeyword(existing3, existingKeywords3);
        candidateSetUp.saveUserKeyword(new1, keywords1);
        candidateSetUp.saveUserKeyword(new2, keywords2);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("user", "1234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.length()", equalTo(2)))
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("new2"))
                .andExpect(jsonPath("$..data[1].nickname", String.class).value("new1"));
    }

    @Test
    public void 일반_유저가_candidate추가_시도_에러() throws Exception {
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        AppUser user2 = AppUser.builder().nickname("user2").username("user2").major(Major.건축학과).matching(true).email("test2").password(passwordEncoder.encode("1234")).studentId(20).build();
        userRepo.saveAll(List.of(user, user2));

        CandidateDto.PostRequest dto = new CandidateDto.PostRequest(user.getId(), user2.getId(), null, null);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(post("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(form))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void 만료기간_지난_candidate_삭제_성공() throws Exception {
        //given
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        List<String> keywords = List.of("한식", "일식", "동아리");

        AppUser existing1 = AppUser.builder().nickname("existing1").username("user2").major(Major.건축학과).email("test2").password("1234").studentId(20).build();
        List<String> existingKeywords1 = List.of("한식", "일식", "동아리");
        AppUser existing2 = AppUser.builder().nickname("existing2").username("user3").major(Major.건축학과).email("test3").password("1234").studentId(20).build();
        List<String> existingKeywords2 = List.of("한식", "일식", "동아리");

        userRepo.saveAll(List.of(user, existing1, existing2));
        candidateSetUp.saveCandidateExpireDate(user, existing1, LocalDateTime.now().minusDays(1));
        candidateSetUp.saveCandidateExpireDate(user, existing2, LocalDateTime.now().plusDays(1));

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("user", "1234");

        //when
        ResultActions resultActions = mvc.perform(delete("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());
    }

    @Test
    public void 일반유저가_candidate_삭제_시도_에러() throws Exception {
        //given
        AppUser user = AppUser.builder().nickname("user").username("user").major(Major.건축학과).matching(true).email("test").password(passwordEncoder.encode("1234")).studentId(20).build();
        userRepo.save(user);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("user", "1234");

        //when
        ResultActions resultActions = mvc.perform(delete("/api/candidate")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    public String getToken(String username, String password) throws Exception {
        String form = objectMapper.writeValueAsString(new LoginFormTestVer(username, password));
        MvcResult loginResult = mvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        return "Bearer " + JsonPath.read(loginResult.getResponse().getContentAsString(), "$.access");
    }
}
