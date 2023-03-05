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
import skkuchin.service.dto.FavoriteDto;

import skkuchin.service.common.BaseIntegrationTest;
import skkuchin.service.config.FavoriteSetUp;

import skkuchin.service.domain.Map.Place;

import skkuchin.service.domain.User.AppUser;

import skkuchin.service.service.FavoriteService;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FavorIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private FavoriteSetUp favoriteSetUp;

    @Autowired
    private FavoriteService favoriteService;


    @Test
    @WithMockUser
    public void 즐겨찾기_상세_정보_가져오기() throws Exception {
        //given
        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(1L);
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        favoriteSetUp.saveFavorite(dto,user, place);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");
        //when
        ResultActions resultActions = mvc.perform(get("/api/favorite")
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());
    }



    @Test
    public void 즐겨찾기중복_작성() throws Exception {
        //given
        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(1L);
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        favoriteSetUp.saveFavorite(dto,user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234"); //자동 주입이 되어 있는 ROLE_USER 계정

        //when
        ResultActions resultActions = mvc.perform(post("/api/favorite")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is4xxClientError());
    }
    @Test
    public void 즐겨찾기_작성() throws Exception {
        //given

        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(1L);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String form = objectMapper.writeValueAsString(dto);
        String token = getToken("test", "12341234"); //자동 주입이 되어 있는 ROLE_USER 계정

        //when
        ResultActions resultActions = mvc.perform(post("/api/favorite")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(form))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().is2xxSuccessful());
    }



    @Test
    public void 즐겨찾기_삭제() throws Exception {
        //given
        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(1L);
        AppUser user = AppUser.builder().id(2L).nickname("테스트").username("test").build();
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        Long favoriteId = favoriteSetUp.saveFavorite(dto,user, place);

        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        String token = getToken("test", "12341234");

        //when
        ResultActions resultActions = mvc.perform(delete("/api/favorite/{favoriteId}", favoriteId)
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then
        resultActions
                .andExpect(status().isOk());
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

