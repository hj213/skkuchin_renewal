package skkuchin.service.integration;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.common.BaseIntegrationTest;
import skkuchin.service.config.PlaceSetUp;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Map.Category;
import skkuchin.service.domain.Map.Gate;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PlaceIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private PlaceSetUp placeSetUp;

    @Test
    @WithMockUser
    public void 모든_장소_불러오기() throws Exception {
        //given
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/place")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.length()", equalTo(3)))
                .andExpect(jsonPath("$..data[0].id", Long.class).value(1))
                .andExpect(jsonPath("$..data[0].category", String.class).value("일식"))
                .andExpect(jsonPath("$..data[0].campus", String.class).value("명륜"));
    }

    @Test
    @WithMockUser
    public void 식당_상세_정보_가져오기() throws Exception {
        //given
        Long placeId = 1L;
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(get("/api/place/{placeId}", placeId)
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$..data.id", Long.class).value(1))
                .andExpect(jsonPath("$..data.category", String.class).value("일식"))
                .andExpect(jsonPath("$..data.campus", String.class).value("명륜"));
    }

    @Test
    public void 유저의_식당_업로드_시도_에러() throws Exception {
        //given
        PlaceDto.Request dto = new PlaceDto.Request(
                "정통집 수원성대점",
                Category.valueOf("한식"),
                "육류,고기",
                Campus.valueOf("율전"),
                Gate.valueOf("쪽문"),
                "경기 수원시 장안구 서부로2105번길 12 1층 (우)16362",
                123.2,
                12.23,
                "매일 17:00 ~ 01:00",
                null,
                false,
                null
        );
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(post("/api/place")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void 유저의_식당_수정_시도_에러() throws Exception {
        //given
        Long placeId = 1L;

        PlaceDto.Request dto = new PlaceDto.Request(
                "정통집 수원성대점",
                Category.valueOf("한식"),
                "육류,고기",
                Campus.valueOf("율전"),
                Gate.valueOf("쪽문"),
                "경기 수원시 장안구 서부로2105번길 12 1층 (우)16362",
                123.2,
                12.23,
                "매일 17:00 ~ 01:00",
                null,
                false,
                null
        );
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(put("/api/place/{placeId}", placeId)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void 유저의_식당_삭제_시도_에러() throws Exception {
        //given
        Long placeId = 1L;

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(delete("/api/place/{placeId}", placeId)
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
