package skkuchin.service.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import skkuchin.service.api.dto.FavoriteDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Map.Tag;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.FavoriteRepo;
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

public class FavoriteServiceTest extends MockTest {



    @InjectMocks
    private FavoriteService favoriteService;

    @Mock
    private PlaceRepo placeRepo;

    @Mock
    private FavoriteRepo favoriteRepo;

    private Place place;
    private AppUser user;



    @Before
    public void setUp() {
        place = Place.builder()
                .id(1L)
                .name("기꾸스시")
                .build();

        user = AppUser.builder()
                .id(1L)
                .nickname("test")
                .username("test")
                .build();

    }


    @Test
    public void favorite(){

        //given

        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(1L);
        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));
        System.out.println("dto = " + dto.getPlaceId());
        //when
        favoriteService.write(user,dto);
        Optional<Favorite> favorite = favoriteRepo.findById(1L);
        System.out.println("favorite = " + favorite);
        //then



        //assertThat(favorite.get(0).getPlace().getName()).isEqualTo("기꾸스시");
        verify(favoriteRepo, times(1)).save(any());


    }
}
