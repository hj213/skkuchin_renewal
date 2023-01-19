package skkuchin.service.service;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Map.*;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewRepo;
import skkuchin.service.repo.ReviewTagRepo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;


public class PlaceServiceTest extends MockTest {
    @InjectMocks
    private PlaceService placeService;
    @Mock
    private PlaceRepo placeRepo;
    @Mock
    private ImageRepo imageRepo;
    @Mock
    private ReviewRepo reviewRepo;
    @Mock
    private ReviewTagRepo reviewTagRepo;

    @Test
    public void getAll_성공() {
        //given
        Place place1 = new Place(
            1L,
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
            null,
            null
        );
        Place place2 = new Place(
            2L,
            "한창희천하일면 수원성대점",
            Category.valueOf("한식"),
            "국수",
            Campus.valueOf("율전"),
            Gate.valueOf("정문"),
            "경기 수원시 장안구 화산로233번길 46 1층 (우)16362",
            113.2,
            11.23,
            "월,화,수,목,금,일 11:30 ~ 21:00",
            "월,화,수,목,금,일 브레이크타임 15:00 ~ 17:00",
            false,
            null,
            null
        );

        given(placeRepo.findAll()).willReturn(List.of(place1, place2));

        //when
        List<PlaceDto.Response> places = placeService.getAll();

        //then
        assertThat(places.size()).isEqualTo(2);
        assertThat(places.get(0).getGate()).isEqualTo(Gate.valueOf("쪽문"));
    }

    @Test
    public void getDetail_성공() {
        //given
        Place place = new Place(
            1L,
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
            null,
            null
        );

        given(placeRepo.findById(1L)).willReturn(Optional.of(place));

        //when
        PlaceDto.Response placeRespDto = placeService.getDetail(1L);

        //then
        assertThat(placeRespDto.getName()).isEqualTo("정통집 수원성대점");
        assertThat(placeRespDto.getCategory()).isEqualTo(Category.valueOf("한식"));
    }

    @Test
    public void getDetail_존재하지않는_placeId로_조회_시도_오류() {
        //given
        given(placeRepo.findById(5L)).willThrow(new NoSuchElementException());

        //when
        assertThrows(NoSuchElementException.class, () -> {placeService.getDetail(5L);});
    }
}
