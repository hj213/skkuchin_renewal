package skkuchin.service.integration;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.ResultActions;
import skkuchin.service.dto.MenuDto;
import skkuchin.service.common.BaseIntegrationTest;
import skkuchin.service.config.MenuSetUp;
import skkuchin.service.domain.Map.Place;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MenuIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private MenuSetUp menuSetUp;

    @Test
    @WithMockUser

    public void 메뉴_상세_정보_가져오기() throws Exception {
        //given
        Place place = Place.builder().id(1L).name("기꾸스시").build();
        MenuDto.PostRequest dto = new MenuDto.PostRequest(1L,"공기밥",1000);
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);

        //when
        ResultActions resultActions = mvc.perform(get("/api/menu/place/{placeId}",place.getId())

                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print());

        //then

        resultActions
                .andExpect(status().isOk());
    }

}
