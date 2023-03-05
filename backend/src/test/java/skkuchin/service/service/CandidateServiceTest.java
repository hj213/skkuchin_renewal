package skkuchin.service.service;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import skkuchin.service.dto.CandidateDto;
import skkuchin.service.common.MockTest;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.repo.CandidateRepo;
import skkuchin.service.repo.UserKeywordRepo;
import skkuchin.service.repo.UserRepo;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;


public class CandidateServiceTest extends MockTest {
    @InjectMocks
    CandidateService candidateService;
    @Mock
    CandidateRepo candidateRepo;
    @Mock
    UserKeywordRepo userKeywordRepo;
    @Mock
    UserRepo userRepo;


    @Test
    public void getCandidate_성공() {
        //1순위 1명, 2순위 1명, 3순위 1명 -> 모든 함수 테스트
        //given
        AppUser user = AppUser.builder().id(1L).nickname("user").major(Major.건축학과).build();
        AppUser existingUser = AppUser.builder().id(2L).nickname("existingUser").major(Major.경영학과).build();
        AppUser existingUser2 = AppUser.builder().id(3L).nickname("existingUser2").major(Major.경영학과).build();
        AppUser newUser = AppUser.builder().id(4L).nickname("newUser").major(Major.경영학과).build();
        AppUser newUser2 = AppUser.builder().id(5L).nickname("newUser2").major(Major.경영학과).build();
        AppUser newUser3 = AppUser.builder().id(6L).nickname("newUser3").major(Major.경영학과).build();
        List<Long> keywordIds = List.of(1L, 2L, 3L);
        List<String> categoryList = List.of("음식", "운동");
        Candidate existingCandidate = Candidate.builder().user(user).candidate1(existingUser).candidate2(existingUser2).build();
        List<Candidate> candidates = List.of(existingCandidate);
        List<AppUser> firstCandidates = List.of(newUser);
        List<AppUser> secondCandidates = List.of(newUser2);
        List<AppUser> thirdCandidates = List.of(newUser3);

        given(userKeywordRepo.findKeywordIdsByUserId(user.getId())).willReturn(keywordIds);
        given(candidateRepo.findByUserId(user.getId())).willReturn(candidates);
        given(userKeywordRepo.findUsersByKeywordIds(keywordIds, List.of(2L, 3L, 1L), Major.건축학과.name())).willReturn(firstCandidates);
        given(userKeywordRepo.findCategoryNamesByUserId(user.getId())).willReturn(categoryList);
        given(userKeywordRepo.findUsersByCategoryNames(categoryList, List.of(2L, 3L, 1L, 4L), "건축학과")).willReturn(secondCandidates);
        given(userKeywordRepo.findRemainUsers(List.of(2L, 3L, 1L, 4L, 5L), "건축학과")).willReturn(thirdCandidates);

        //when
        List<CandidateDto.Response> result = candidateService.getCandidate(user);

        //then
        assertThat(result.size()).isEqualTo(3);
        assertThat(result.get(0).getNickname()).isEqualTo("newUser");
        assertThat(result.get(1).getNickname()).isEqualTo("newUser2");
        assertThat(result.get(2).getNickname()).isEqualTo("newUser3");
    }

    @Test
    public void getCandidate_2명_미만() {
        //3순위 2명
        //given
        AppUser user = AppUser.builder().id(1L).nickname("user").major(Major.건축학과).build();
        AppUser existingUser = AppUser.builder().id(2L).nickname("existingUser").major(Major.경영학과).build();
        AppUser existingUser2 = AppUser.builder().id(3L).nickname("existingUser2").major(Major.경영학과).build();
        AppUser newUser = AppUser.builder().id(4L).nickname("newUser").major(Major.경영학과).build();
        AppUser newUser2 = AppUser.builder().id(5L).nickname("newUser2").major(Major.경영학과).build();
        List<Long> keywordIds = List.of(1L, 2L, 3L);
        List<String> categoryList = List.of("음식", "운동");
        Candidate existingCandidate = Candidate.builder().user(user).candidate1(existingUser).candidate2(existingUser2).build();
        List<Candidate> candidates = List.of(existingCandidate);
        List<AppUser> emptyList = new ArrayList();
        List<AppUser> newCandidates = List.of(newUser, newUser2);


        given(userKeywordRepo.findKeywordIdsByUserId(user.getId())).willReturn(keywordIds);
        given(candidateRepo.findByUserId(user.getId())).willReturn(candidates);
        given(userKeywordRepo.findUsersByKeywordIds(keywordIds, List.of(2L, 3L, 1L), Major.건축학과.name())).willReturn(emptyList);
        given(userKeywordRepo.findCategoryNamesByUserId(user.getId())).willReturn(categoryList);
        given(userKeywordRepo.findUsersByCategoryNames(categoryList, List.of(2L, 3L, 1L), "건축학과")).willReturn(emptyList);
        given(userKeywordRepo.findRemainUsers(List.of(2L, 3L, 1L), "건축학과")).willReturn(newCandidates);

        //when
        List<CandidateDto.Response> result = candidateService.getCandidate(user);

        //then
        assertThat(result.size()).isEqualTo(2);
        assertThat(result.get(0).getNickname()).isEqualTo("newUser");
        assertThat(result.get(1).getNickname()).isEqualTo("newUser2");
    }
}
