package skkuchin.service.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import skkuchin.service.api.dto.MenuDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.MenuRepo;
import skkuchin.service.repo.PlaceRepo;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

public class MenuServiceTest extends MockTest {

    @InjectMocks
    private MenuService menuService;
    @Mock
    private PlaceRepo placeRepo;

    @Mock
    private MenuRepo menuRepo;

    private Place place;


    @Before
    public void setUp(){

        place = Place.builder()
                .id(1L)
                .name("밥집")
                .build();


    }


    @Test
    public void getPlaceMenu(){
        //given

        Menu menu = new Menu(1L,"음식",place,30000);
        given(menuRepo.findByPlace(place)).willReturn(List.of(menu));
        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));

        //when
        List<MenuDto.Response> menus = menuService.getPlaceReview(1L);


        //then
        assertThat(menus.get(0).getPrice()).isEqualTo(30000);
        assertThat(menus.get(0).getName()).isEqualTo("음식");
        System.out.println("menus.get(0).getPrice() = " + menus.get(0).getPrice());


    }

}
