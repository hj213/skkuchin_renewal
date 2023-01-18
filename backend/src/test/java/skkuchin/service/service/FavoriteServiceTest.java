package skkuchin.service.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import skkuchin.service.api.dto.FavoriteDto;

import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.FavoriteRepo;
import skkuchin.service.repo.PlaceRepo;

import java.util.List;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

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
    public void get_My_Detail_성공() {
        //given

        Favorite favorite = new Favorite(1L,place,user);


        given(favoriteRepo.findByUser(user)).willReturn(List.of(favorite));
        //when
        List<Favorite> favorite1 = favoriteRepo.findByUser(user);


        //then
        assertThat(favorite1.size()).isEqualTo(1);
        assertThat(favorite1.get(0).getPlace().getName()).isEqualTo("기꾸스시");

    }



    @Test
    public void add_favorite(){

        //given

        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(1L);

        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));

        //when
        favoriteService.write(user,dto);
        Optional<Favorite> favorite = favoriteRepo.findById(1L);
        //then
        verify(favoriteRepo, times(1)).save(any());


    }
    @Test
    public void add_favorite_없는_장소_추가_오류(){

        //given

        FavoriteDto.PostRequest dto = new FavoriteDto.PostRequest(5L);

        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));

        //when


        //then
        assertThrows(NoSuchElementException.class, () -> favoriteService.write(user,dto));


    }
    @Test
    public void delete_favorite(){
        Favorite favorite = new Favorite(1L,place,user);
        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));

        favoriteRepo.delete(favorite);

        verify(favoriteRepo, times(1)).delete(favorite);


    }

    @Test
    public void 남의_즐겨찾기_delete_favorite_오류(){
        //given
        Favorite favorite = new Favorite(1L,place,user);
        given(favoriteRepo.findById(1L)).willReturn(Optional.ofNullable(favorite));

        //then
        assertThrows(IllegalArgumentException.class, () -> favoriteService.delete(1L,2L));


    }


    @Test
    public void 중복_추가_오류() {
        //given

        Favorite favorite = new Favorite(1L,place,user);
        Favorite favorite1 = new Favorite(2L,place,user);
        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));

        //when

        when(favoriteRepo.save(favorite)).thenReturn(favorite);
        when(favoriteRepo.save(favorite1)).thenReturn(favorite1);

        //then
        assertThat(favoriteRepo.findByUser(user).size() == 1);



    }


}
