package skkuchin.service.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Mbti;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewRepo;
import skkuchin.service.repo.ReviewTagRepo;
import skkuchin.service.repo.TagRepo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


public class ReviewServiceTest extends MockTest {
    @InjectMocks
    private ReviewService reviewService;
    @Mock
    private ReviewRepo reviewRepo;
    @Mock
    private TagRepo tagRepo;
    @Mock
    private ReviewTagRepo reviewTagRepo;
    @Mock
    private PlaceRepo placeRepo;

    private Place place;
    private AppUser user;
    private Tag tag1;
    private Tag tag2;

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

        tag1 = Tag.builder()
                .name("맛집")
                .build();

        tag2 = Tag.builder()
                .name("가성비")
                .build();
    }

    @Test
    public void getAll_성공() {
        //given
        Review review1 = new Review(1L, 5.0F, "맛있어요", "img", place, user, null, null);
        Review review2 = new Review(2L, 4.5F, "맛있네용~", "img2", place, user, null, null);
        List<ReviewTag> review1Tags = List.of(new ReviewTag(1L, review1, tag1), new ReviewTag(2L, review1, tag2));
        List<ReviewTag> review2Tags = List.of(new ReviewTag(2L, review2, tag1));

        given(reviewRepo.findAll()).willReturn(List.of(review1, review2));
        given(reviewTagRepo.findByReview(review1)).willReturn(review1Tags);
        given(reviewTagRepo.findByReview(review2)).willReturn(review2Tags);

        //when
        List<ReviewDto.Response> reviews = reviewService.getAll();

        //then
        assertThat(reviews.size()).isEqualTo(2);
        assertThat(reviews.get(0).getTags().size()).isEqualTo(2);
    }

    //givenEmptyReviewList_whenGetAll_thenReturnEmptyList() {}

    @Test
    public void getDetail_성공() {
        //given
        Review review = new Review(1L, 3.0F, "보통입니다", null, place, user, null, null);
        List<ReviewTag> reviewTags = List.of(new ReviewTag(1L, review, tag1), new ReviewTag(2L, review, tag2));

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));
        given(reviewTagRepo.findByReview(review)).willReturn(reviewTags);

        //when
        ReviewDto.Response reviewRespDto = reviewService.getDetail(1L);

        //then
        assertThat(reviewRespDto.getContent()).isEqualTo("보통입니다");
        assertThat(reviewRespDto.getTags().size()).isEqualTo(2);
    }

    @Test
    public void getDetail_존재하지않는_reviewId로_조회_시도_오류() {
        //given
        given(reviewRepo.findById(5L)).willThrow(new NoSuchElementException());

        //when
        assertThrows(NoSuchElementException.class, () -> {reviewService.getDetail(5L);});
    }

    @Test
    public void write_성공() {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(1L, 5.0F, "굿!", "이미지", List.of("맛집", "가성비"));

        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));
        given(tagRepo.findByName("맛집")).willReturn(tag1);
        given(tagRepo.findByName("가성비")).willReturn(tag2);

        //when
        reviewService.write(user, dto);

        //then
        verify(placeRepo, times(1)).findById(1L);
        verify(reviewRepo, times(1)).save(any());
        verify(tagRepo, times(2)).findByName(any());
        verify(reviewTagRepo, times(1)).saveAll(any());
    }

    @Test
    public void write_존재하지않는_placeId로_등록_시도_오류() {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(2L, 5.0F, "굿!", "이미지", null);

        given(placeRepo.findById(2L)).willThrow(new NoSuchElementException());

        //when
        assertThrows(NoSuchElementException.class, () -> reviewService.write(user, dto));
    }

    @Test
    public void update_성공() {
        //given
        Tag tag3 = Tag.builder().name("분위기 좋은").build();
        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(5.0F, "맛있어요", "이미지", List.of("분위기 좋은", "맛집"));
        Review existingReview = new Review(1L, 4.5F, "맛있다", "img", place, user, null, null);
        List<ReviewTag> existingTags = List.of(new ReviewTag(1L, existingReview, tag1), new ReviewTag(2L, existingReview, tag2));

        given(reviewRepo.findById(1L)).willReturn(Optional.of(existingReview));
        given(reviewTagRepo.findByReview(existingReview)).willReturn(existingTags);
        given(tagRepo.findByName("분위기 좋은")).willReturn(tag3);

        //when
        reviewService.update(1L, dto, 1L);

        //then
        verify(reviewRepo, times(1)).findById(1L);
        verify(reviewRepo, times(1)).save(existingReview);
        verify(reviewTagRepo, times(1)).delete(existingTags.get(1));
        verify(reviewTagRepo, times(1)).save(dto.toReviewTagEntity(any(), tag3));
    }

    @Test
    public void update_존재하지않는_reviewId로_수정_시도_오류() {
        //given
        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(5.0F, "굿!", "이미지", null);

        given(reviewRepo.findById(5L)).willThrow(new NoSuchElementException());

        //when
        assertThrows(NoSuchElementException.class, () -> reviewService.update(5L, dto, 1L));
    }

    @Test
    public void update_다른_유저가_리뷰_수정_시도_오류() {
        //given
        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(5.0F, "굿!", "이미지", null);
        Review review = new Review(1L, 5.0F, "맛있어요", null, null, user, null, null);

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));

        //when
        assertThrows(IllegalArgumentException.class, () -> reviewService.update(1L, dto, 2L));
    }



    @Test
    public void delete_성공() {
        //given
        Review review = new Review(1L, 4.0F, "또 갈래요", "이미지", place, user, null, null);

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));
        willDoNothing().given(reviewRepo).delete(review);

        //when
        reviewService.delete(1L, 1L);

        //then
        verify(reviewRepo, times(1)).delete(review);
    }

    @Test
    public void delete_다른_유저가_리뷰_삭제_시도_오류() {
        //given
        Review review = new Review(1L, 4.0F, "또 갈래요", "이미지", place, user, null, null);

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));

        //when
        assertThrows(IllegalArgumentException.class, () -> reviewService.delete(1L, 2L));
    }

    @Test
    public void getPlaceReview_성공() {
        //given
        Review review = new Review(1L, 4.0F, "또 갈래요", "이미지", place, user, null, null);
        List<ReviewTag> reviewTags = List.of(new ReviewTag(1L, review, tag1), new ReviewTag(2L, review, tag2));

        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));
        given(reviewRepo.findByPlace(place)).willReturn(List.of(review));
        given(reviewTagRepo.findByReview(review)).willReturn(reviewTags);

        //when
        List<ReviewDto.Response> reviews = reviewService.getPlaceReview(1L);

        //then
        assertThat(reviews.size()).isEqualTo(1);
        assertThat(reviews.get(0).getContent()).isEqualTo("또 갈래요");
        assertThat(reviews.get(0).getTags().size()).isEqualTo(2);
    }

    @Test
    public void getMyReview_성공() {
        //given
        Review review = new Review(1L, 4.0F, "또 갈래요", "이미지", place, user, null, null);
        List<ReviewTag> reviewTags = List.of(new ReviewTag(1L, review, tag1), new ReviewTag(2L, review, tag2));

        given(reviewRepo.findByUser(user)).willReturn(List.of(review));
        given(reviewTagRepo.findByReview(review)).willReturn(reviewTags);

        //when
        List<ReviewDto.Response> reviews = reviewService.getMyReview(user);

        //then
        assertThat(reviews.size()).isEqualTo(1);
        assertThat(reviews.get(0).getPlaceId()).isEqualTo(1L);
        assertThat(reviews.get(0).getContent()).isEqualTo("또 갈래요");
        assertThat(reviews.get(0).getTags().size()).isEqualTo(2);
    }

    @Test
    public void getUserReview_성공() {
        //given
        AppUser user2 = new AppUser(2L, "test2", "test2", "1234", "test", "0000000001", null, null, null, null, null, null, null);
        Review review1 = new Review(1L, 4.0F, "또 갈래요", "이미지", place, user, null, null);
        Review review2 = new Review(2L, 5.0F, "짱", "img", place, user2, null, null);
        List<ReviewTag> reviewTags = List.of(new ReviewTag(1L, null, tag1), new ReviewTag(2L, null, tag2));

        given(reviewRepo.findAll()).willReturn(List.of(review1, review2));
        given(reviewTagRepo.findByReview(review1)).willReturn(reviewTags);

        //when
        List<ReviewDto.Response> reviews = reviewService.getUserReview(1L);

        //then
        assertThat(reviews.size()).isEqualTo(1);
        assertThat(reviews.get(0).getPlaceId()).isEqualTo(1L);
        assertThat(reviews.get(0).getContent()).isEqualTo("또 갈래요");
        assertThat(reviews.get(0).getTags().size()).isEqualTo(2);
    }
}
