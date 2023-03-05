package skkuchin.service.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import skkuchin.service.dto.ReviewDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.*;

import java.io.FileInputStream;
import java.io.IOException;
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
    private ReviewImageRepo reviewImageRepo;
    @Mock
    private ReviewTagRepo reviewTagRepo;
    @Mock
    private PlaceRepo placeRepo;

    private Place place;
    private AppUser user;
    private Image image1;
    private Image image2;
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
        Review review1 = new Review(1L, 5, "맛있어요", place, user, null, null, null);
        Review review2 = new Review(2L, 4, "맛있네용~", place, user, null, null, null);
        List<ReviewImage> review1Images = List.of(new ReviewImage(1L, review1, "image1"), new ReviewImage(2L, review1, "image2"));
        List<ReviewImage> review2Images = List.of(new ReviewImage(2L, review2, "image1"));
        List<ReviewTag> review1Tags = List.of(new ReviewTag(1L, review1, tag1), new ReviewTag(2L, review1, tag2));
        List<ReviewTag> review2Tags = List.of(new ReviewTag(2L, review2, tag1));

        given(reviewRepo.findAll()).willReturn(List.of(review1, review2));
        given(reviewImageRepo.findByReview(review1)).willReturn(review1Images);
        given(reviewImageRepo.findByReview(review2)).willReturn(review2Images);
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
        Review review = new Review(1L, 3, "보통입니다", place, user, null, null, null);
        List<ReviewImage> reviewImages = List.of(new ReviewImage(1L, review, "image1"), new ReviewImage(2L, review, "image2"));
        List<ReviewTag> reviewTags = List.of(new ReviewTag(1L, review, tag1), new ReviewTag(2L, review, tag2));

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));
        given(reviewImageRepo.findByReview(review)).willReturn(reviewImages);
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
    public void write_성공() throws IOException {
        //given
        MultipartFile image1 = new MockMultipartFile("image1",
                "test1.png",
                "image/png",
                new FileInputStream("src/test/java/skkuchin/service/data/image/test1.png"));

        MultipartFile image2 = new MockMultipartFile("image2",
                "test2.png",
                "image/png",
                new FileInputStream("src/test/java/skkuchin/service/data/image/test2.png"));

        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(1L, 5, "굿!", List.of(image1, image2), List.of("맛집", "가성비"));

        given(placeRepo.findById(1L)).willReturn(Optional.ofNullable(place));
        given(tagRepo.findByName("맛집")).willReturn(tag1);
        given(tagRepo.findByName("가성비")).willReturn(tag2);

        //when
        reviewService.write(user, dto);

        //then
        verify(placeRepo, times(1)).findById(1L);
        verify(reviewRepo, times(1)).save(any());
        verify(tagRepo, times(2)).findByName(any());
        verify(reviewImageRepo, times(1)).saveAll(any());
        verify(reviewTagRepo, times(1)).saveAll(any());
    }

    @Test
    public void write_존재하지않는_placeId로_등록_시도_오류() {
        //given
        ReviewDto.PostRequest dto = new ReviewDto.PostRequest(2L, 5, "굿!", null, null);

        given(placeRepo.findById(2L)).willThrow(new NoSuchElementException());

        //when
        assertThrows(NoSuchElementException.class, () -> reviewService.write(user, dto));
    }

    @Test
    public void update_성공() {
        //given
        Tag tag3 = Tag.builder().name("분위기 좋은").build();
        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(5, "맛있어요", null, List.of("분위기 좋은", "맛집"));
        Review existingReview = new Review(1L, 4, "맛있다", place, user, null, null, null);
        List<ReviewTag> existingTags = List.of(new ReviewTag(1L, existingReview, tag1), new ReviewTag(2L, existingReview, tag2));

        given(reviewRepo.findById(1L)).willReturn(Optional.of(existingReview));
        given(reviewTagRepo.findByReview(existingReview)).willReturn(existingTags);
        given(tagRepo.findByName("분위기 좋은")).willReturn(tag3);

        //when
        reviewService.update(1L, dto, user);

        //then
        verify(reviewRepo, times(1)).findById(1L);
        verify(reviewRepo, times(1)).save(existingReview);
        verify(reviewTagRepo, times(1)).delete(existingTags.get(1));
        verify(reviewTagRepo, times(1)).save(dto.toReviewTagEntity(any(), tag3));
    }

    @Test
    public void update_존재하지않는_reviewId로_수정_시도_오류() {
        //given
        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(5, "굿!", null, null);

        given(reviewRepo.findById(5L)).willThrow(new NoSuchElementException());

        //when
        assertThrows(NoSuchElementException.class, () -> reviewService.update(5L, dto, user));
    }

    @Test
    public void update_다른_유저가_리뷰_수정_시도_오류() {
        //given
        ReviewDto.PutRequest dto = new ReviewDto.PutRequest(5, "굿!", null, null);
        Review review = new Review(1L, 5, "맛있어요", place, user, null, null, null);

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));

        //when
        assertThrows(IllegalArgumentException.class, () -> reviewService.update(1L, dto, user));
    }



    @Test
    public void delete_성공() {
        //given
        Review review = new Review(1L, 4, "또 갈래요", place, user, null, null, null);

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));
        willDoNothing().given(reviewRepo).delete(review);

        //when
        reviewService.delete(1L, user);

        //then
        verify(reviewRepo, times(1)).delete(review);
    }

    @Test
    public void delete_다른_유저가_리뷰_삭제_시도_오류() {
        //given
        Review review = new Review(1L, 4, "또 갈래요", place, user, null, null, null);

        given(reviewRepo.findById(1L)).willReturn(Optional.of(review));

        //when
        assertThrows(IllegalArgumentException.class, () -> reviewService.delete(1L, user));
    }

    @Test
    public void getPlaceReview_성공() {
        //given
        Review review = new Review(1L, 4, "또 갈래요", place, user, null, null, null);
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
        Review review = new Review(1L, 4, "또 갈래요", place, user, null, null, null);
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
        //AppUser user2 = new AppUser(2L, "test2", "test2", "1234", "test", "0000000001", null, null, null, null, null, null, null, null, null, null);
        AppUser user2 = AppUser.builder()
                .id(2L).nickname("test2").username("test2").password("1234").email("test").studentId(20)
                .build();
        Review review1 = new Review(1L, 4, "또 갈래요", place, user, null, null, null);
        Review review2 = new Review(2L, 5, "짱", place, user2, null, null, null);
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
