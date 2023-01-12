package skkuchin.service.integration;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.jayway.jsonpath.JsonPath;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.common.BaseIntegrationTest;
import skkuchin.service.config.ReviewSetUp;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.ReviewTag;
import skkuchin.service.domain.Map.Tag;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.DuplicateException;

import javax.transaction.Transactional;
import java.util.List;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class ReviewIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private ReviewSetUp reviewSetUp;

    @Test
    @WithMockUser
    public void 모든_리뷰_불러오기() throws Exception {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("가성비", "맛집"));
        ReviewDto.PostRequest dto2 = new ReviewDto.PostRequest(1L, 4.0F, "맛있네요!", "img", List.of("맛집"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        reviewSetUp.saveReview(dto, user, place);
        reviewSetUp.saveReview(dto2, user, place);

        //when
        ResultActions resultActions = mvc.perform(get("/api/review")
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.length()", equalTo(2)))
                .andExpect(jsonPath("$..data[0].place_id", Long.class).value(1))
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("테스트"))
                .andExpect(jsonPath("$..data[0].content", String.class).value("맛있어요"))
                .andExpect(jsonPath("$..data[0].tags.length()", equalTo(2)));
    }

    @Test
    @WithMockUser
    public void 리뷰_상세_정보_가져오기() throws Exception {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        Long reviewId = reviewSetUp.saveReview(dto, user, place);

        //when
        ResultActions resultActions = mvc.perform(get("/api/review/{reviewId}", reviewId)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.place_id", Long.class).value(1))
                .andExpect(jsonPath("$..data.nickname", String.class).value("테스트"))
                .andExpect(jsonPath("$..data.content", String.class).value("맛있어요"))
                .andExpect(jsonPath("$..data.tags.length()", equalTo(2)));
    }

    @Test
    public void 리뷰_작성() throws Exception {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234"); //자동 주입이 되어 있는 ROLE_USER 계정

        //when
        ResultActions resultActions = mvc.perform(post("/api/review")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    public void 리뷰_수정() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        Long reviewId = reviewSetUp.saveReview(existingReview, user, place);

        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(3.0F, "전엔 맛있었는데ㅜ", "이미지", List.of("분위기 좋은", "가성비"));
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(put("/api/review/{reviewId}", reviewId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());

    }

    @Test
    public void 남의_리뷰_수정_시도_에러() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(1L).nickname("스꾸친관리자").username("admin").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        reviewSetUp.saveReview(existingReview, user, place);

        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(3.0F, "전엔 맛있었는데ㅜ", "이미지", List.of("분위기 좋은", "가성비"));
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(put("/api/review/1")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void 리뷰_삭제() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        Long reviewId = reviewSetUp.saveReview(existingReview, user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(delete("/api/review/{reviewId}", reviewId)
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());
    }

    @Test
    public void 남의_리뷰_삭제_시도_에러() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(1L).nickname("스꾸친관리자").username("admin").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        reviewSetUp.saveReview(existingReview, user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(delete("/api/review/1")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void 장소별_리뷰_조회() throws Exception {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("가성비", "맛집"));
        ReviewDto.PostRequest dto2 = new ReviewDto.PostRequest(2L, 4.0F, "맛있네요!", "img", List.of("맛집"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        Place place2 = Place.builder().id(2L).name("칸다소바").build();
        reviewSetUp.saveReview(dto, user, place);
        reviewSetUp.saveReview(dto2, user, place2);

        //when
        ResultActions resultActions = mvc.perform(get("/api/review/place/1")
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.length()", equalTo(1)))
                .andExpect(jsonPath("$..data[0].place_id", Long.class).value(1))
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("테스트"))
                .andExpect(jsonPath("$..data[0].content", String.class).value("맛있어요"))
                .andExpect(jsonPath("$..data[0].tags.length()", equalTo(2)));
    }

    @Test
    public void 내가_쓴_리뷰_조회() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        reviewSetUp.saveReview(existingReview, user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/review/user/me")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.length()", equalTo(1)))
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("테스트"))
                .andExpect(jsonPath("$..data[0].content", String.class).value("맛있어요"))
                .andExpect(jsonPath("$..data[0].tags.length()", equalTo(2)));
    }

    @Test
    public void 사용자_id별_리뷰_조회() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        reviewSetUp.saveReview(existingReview, user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("admin", "12341234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/review/user/2")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.length()", equalTo(1)))
                .andExpect(jsonPath("$..data[0].nickname", String.class).value("테스트"))
                .andExpect(jsonPath("$..data[0].content", String.class).value("맛있어요"))
                .andExpect(jsonPath("$..data[0].tags.length()", equalTo(2)));
    }

    @Test
    public void 관리자가_아닌_사용자가_userId별_리뷰_조회_시도_에러() throws Exception {
        //given
        ReviewDto.PostRequest existingReview = new ReviewDto.PostRequest(1L, 5.0F, "맛있어요", "img", List.of("맛집", "가성비"));
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        reviewSetUp.saveReview(existingReview, user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/review/user/2")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    public String getToken(String username, String password) throws Exception {
        String form = objectMapper.writeValueAsString(new LoginFormTestVer(username, password));
        MvcResult loginResult = mvc.perform(post("/api/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form)
                        .accept(MediaType.APPLICATION_JSON))
                        .andReturn();

        return "Bearer " + JsonPath.read(loginResult.getResponse().getContentAsString(), "$.access");
    }
}
