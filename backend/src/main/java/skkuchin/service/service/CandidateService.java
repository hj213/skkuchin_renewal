package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.CandidateDto;
import skkuchin.service.domain.Match.Candidate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.repo.CandidateRepo;
import skkuchin.service.repo.KeywordRepo;
import skkuchin.service.repo.UserKeywordRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepo candidateRepo;

    private final UserKeywordRepo userKeywordRepo;
    private final UserRepo userRepo;
    private final KeywordRepo keywordRepo;

    @Transactional
    public List<CandidateDto.Response> getCandidate(AppUser user) {
        /**
         * 1순위: 겹치는 키워드가 많은 순
         * 키워드 개수가 같으면 학과가 같은 유저가 우선
         */
        int remain = 3; //뽑아야 하는 인원
        List<AppUser> returnUsers = new ArrayList<>();

        //유저의 키워드 리스트
        List<Long> keywordIds = userKeywordRepo.findKeywordIdsByUserId(user.getId());

        //excludeIds: 제외 대상인 userId 리스트
        //이미 매칭 후보로 올랐던 유저는 제외 대상
        List<Candidate> candidates = candidateRepo.findByUserId(user.getId());
        List<Long> excludeIds = new ArrayList<>();
        for (int i = 0; i < candidates.size(); i++) {
            Candidate candidate = candidates.get(i);
            excludeIds.addAll(List.of(candidate.getCandidate1().getId(), candidate.getCandidate2().getId(), candidate.getCandidate3().getId()));
        }
        excludeIds.add(user.getId()); //자기 자신도 제외 대상에 포함

        List<AppUser> usersOrderByCommonKeywordNum = userKeywordRepo.findUsersByKeywordIds(keywordIds, excludeIds, user.getMajor().name());
        returnUsers.addAll(usersOrderByCommonKeywordNum);
        remain = remain - usersOrderByCommonKeywordNum.size();

        if (remain > 0) {
            /**
             * 2순위: 키워드 1개 이상 겹치는 유저가 3명 미만일 경우
             * 겹치는 카테고리가 많은 순
             * 카테고리 개수가 같으면 학과가 같은 유저 우선
             */
            List<Long> firstUsers = usersOrderByCommonKeywordNum.stream().map(u -> u.getId()).collect(Collectors.toList());
            excludeIds.addAll(firstUsers); //1순위로 뽑힌 유저들도 제외 대상에 포함
            List<String> categoryList = userKeywordRepo.findCategoryNamesByUserId(user.getId());

            List<AppUser> usersOrderByCommonCategoryNum = userKeywordRepo.findUsersByCategoryNames(categoryList, excludeIds, user.getMajor().name());
            returnUsers.addAll(usersOrderByCommonCategoryNum);
            remain = remain - usersOrderByCommonCategoryNum.size();

            if (remain > 0) {
                /**
                 * 3순위: 나머지
                 * 학과가 같은 유저 우선
                 */
                List<Long> secondUsers = usersOrderByCommonCategoryNum.stream().map(u -> u.getId()).collect(Collectors.toList());
                excludeIds.addAll(secondUsers); //2순위로 뽑힌 유저들도 제외 대상에 포함
                List<AppUser> remainUsers = userKeywordRepo.findRemainUsers(excludeIds, user.getMajor().name());
                returnUsers.addAll(remainUsers);
            }
        }

        Candidate candidate = Candidate.builder()
                .user(user)
                .candidate1(returnUsers.get(0))
                .candidate2(returnUsers.get(1))
                .candidate3(returnUsers.get(2))
                .build();
        candidateRepo.save(candidate);
        return returnUsers.subList(0, 3).stream()
                .map(returnUser -> new CandidateDto.Response(
                        returnUser,
                        userKeywordRepo.findByUser(returnUser).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());

        //이 함수를 호출함으로써 candidate table에 세 명이 저장되는 동시에 지속기간 2주가 설정되고, 그 기한이 지나면 자동으로 삭제되는 거 가능한지.
    }

    //findByFirstRule

    @Transactional
    public void addCandidate(CandidateDto.PostRequest dto) {
        AppUser user = userRepo.findById(dto.getUserId()).orElseThrow();
        AppUser candidate1 = userRepo.findById(dto.getCandidate1Id()).orElseThrow();
        AppUser candidate2 = userRepo.findById(dto.getCandidate2Id()).orElseThrow();
        AppUser candidate3 = userRepo.findById(dto.getCandidate3Id()).orElseThrow();

        Candidate candidate = dto.toEntity(user, candidate1, candidate2, candidate3);
        candidateRepo.save(candidate);
    }
}
