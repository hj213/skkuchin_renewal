package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.User.Major;
import skkuchin.service.dto.CandidateDto;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.CandidateRepo;
import skkuchin.service.repo.UserKeywordRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CandidateService {
    private final CandidateRepo candidateRepo;
    private final UserKeywordRepo userKeywordRepo;
    private final UserRepo userRepo;

    @Transactional
    public void addCandidate(CandidateDto.PostRequest dto) {
        AppUser user = userRepo.findById(dto.getUserId()).orElseThrow();
        AppUser candidate1 = userRepo.findById(dto.getCandidate1Id()).orElseThrow();
        AppUser candidate2 = userRepo.findById(dto.getCandidate2Id()).orElseThrow();
        AppUser candidate3 = userRepo.findById(dto.getCandidate3Id()).orElseThrow();
        AppUser candidate4 = userRepo.findById(dto.getCandidate4Id()).orElseThrow();
        AppUser candidate5 = userRepo.findById(dto.getCandidate5Id()).orElseThrow();

        Candidate candidate = dto.toEntity(user, candidate1, candidate2, candidate3, candidate4, candidate5);
        candidateRepo.save(candidate);
    }

    @Transactional
    public List<CandidateDto.Response> getCandidate(AppUser user) {
        if (user.getMatching() == null) {
            throw new CustomRuntimeException("스꾸챗 프로필을 등록하여주시기 바랍니다");
        } else if (!user.getMatching()) {
            throw new CustomRuntimeException("대화 활성화 버튼이 꺼져있습니다");
        }

        List<Candidate> candidates = candidateRepo.findByUserId(user.getId());
        Candidate recentCandidate = null;
        Long differenceTime;

        if (candidates.size() > 0) {
            recentCandidate = candidates.get(candidates.size() - 1);
            LocalDateTime createDate = recentCandidate.getExpireDate().minusDays(14);
            Duration duration = Duration.between(createDate, LocalDateTime.now());
            differenceTime = duration.toDays();
        } else {
            differenceTime = 1L;
        }

        if (differenceTime < 1) {
            List<AppUser> fiveCandidates = Arrays.asList(
                    recentCandidate.getCandidate1(),
                    recentCandidate.getCandidate2(),
                    recentCandidate.getCandidate3(),
                    recentCandidate.getCandidate4(),
                    recentCandidate.getCandidate5()
            );

            return fiveCandidates.stream()
                    .filter(Objects::nonNull)
                    .map(candidate -> new CandidateDto.Response(
                            candidate,
                            userKeywordRepo.findByUser(candidate)
                    ))
                    .collect(Collectors.toList());
        } else {
//            List<AppUser> returnUsers = findReturnUsers(user);
            List<AppUser> returnUsers = findRandomUsers(user);

            if (returnUsers.size() > 0) {
                Candidate candidate = Candidate.builder()
                        .user(user)
                        .candidate1(returnUsers.get(0))
                        .candidate2(returnUsers.size() > 1 ? returnUsers.get(1) : null)
                        .candidate3(returnUsers.size() > 2 ? returnUsers.get(2) : null)
                        .candidate4(returnUsers.size() > 3 ? returnUsers.get(3) : null)
                        .candidate5(returnUsers.size() > 4 ? returnUsers.get(4) : null)
                        .build();
                candidateRepo.save(candidate);
            }

            return returnUsers.stream()
                    .map(returnUser -> new CandidateDto.Response(
                            returnUser,
                            userKeywordRepo.findByUser(returnUser)
                    ))
                    .collect(Collectors.toList());
        }
    }

    private List<AppUser> findRandomUsers(AppUser user) {
        List<Long> excludeIds = new ArrayList<>();

        List<Candidate> candidates = candidateRepo.findByUserId(user.getId());
        for (Candidate candidate : candidates) {
            excludeIds.add(candidate.getCandidate1().getId());
            if (candidate.getCandidate2() != null) excludeIds.add(candidate.getCandidate2().getId());
            if (candidate.getCandidate3() != null) excludeIds.add(candidate.getCandidate3().getId());
            if (candidate.getCandidate4() != null) excludeIds.add(candidate.getCandidate4().getId());
            if (candidate.getCandidate5() != null) excludeIds.add(candidate.getCandidate5().getId());
        }
        excludeIds.add(user.getId());

        List<AppUser> availableUsers = userRepo.findAvailableUsers(excludeIds);

        Collections.shuffle(availableUsers);
        return new ArrayList<>(availableUsers.subList(0, Math.min(availableUsers.size(), 5)));
    }

    public List<AppUser> findReturnUsers(AppUser user) {
        int remain = 3; //뽑아야 하는 인원
        List<AppUser> returnUsers = new ArrayList<>();
        List<Long> excludeIds = new ArrayList<>(); //제외 대상인 userId 리스트
        Campus campus = findCampus(user.getMajor());

        /**
         * 1순위: 겹치는 키워드가 많은 순
         * 키워드 개수가 같으면 학과가 같은 유저가 우선
         */
        List<AppUser> usersOrderByKeyword = orderByKeyword(user, excludeIds);
        List<AppUser> usersOrderByCampus = orderByCampus(usersOrderByKeyword, campus);
        returnUsers.addAll(usersOrderByCampus);
        remain = remain - usersOrderByKeyword.size();

        if (remain > 0) {
            /**
             * 2순위: 키워드 1개 이상 겹치는 유저가 3명 미만일 경우
             * 겹치는 카테고리가 많은 순
             * 카테고리 개수가 같으면 학과가 같은 유저 우선
             */
            List<AppUser> usersOrderByCategory = orderByCategory(user, excludeIds, usersOrderByKeyword);
            usersOrderByCampus = orderByCampus(usersOrderByCategory, campus);
            returnUsers.addAll(usersOrderByCampus);
            remain = remain - usersOrderByCategory.size();

            if (remain > 0) {
                /**
                 * 3순위: 나머지
                 * 학과가 같은 유저 우선
                 */
                List<AppUser> remainingUsers = findRemainingUsers(user, excludeIds, usersOrderByCategory);
                usersOrderByCampus = orderByCampus(remainingUsers, campus);
                returnUsers.addAll(usersOrderByCampus);
            }
        }

        if (returnUsers.size() < 3) return returnUsers;
        //else return returnUsers.subList(0, 3);
        else if (returnUsers.size() < 10) {
            Collections.shuffle(returnUsers);
        } else {
            Collections.shuffle(returnUsers.subList(0, 10));
        }
        return returnUsers.subList(0, 3);
    }
    public List<AppUser> orderByKeyword(AppUser user, List<Long> excludeIds) {
        //유저의 키워드 리스트
        List<Long> keywordIds = userKeywordRepo.findKeywordIdsByUserId(user.getId());
        //이미 대화 후보로 올랐던 유저는 제외 대상
        List<Candidate> candidates = candidateRepo.findByUserId(user.getId());
        for (int i = 0; i < candidates.size(); i++) {
            Candidate candidate = candidates.get(i);
            excludeIds.add(candidate.getCandidate1().getId());
            if (candidate.getCandidate2() != null) excludeIds.add(candidate.getCandidate2().getId());
            if (candidate.getCandidate3() != null) excludeIds.add(candidate.getCandidate3().getId());
            //excludeIds.addAll(List.of(candidate.getCandidate1().getId(), candidate.getCandidate2().getId(), candidate.getCandidate3().getId()));
        }
        excludeIds.add(user.getId()); //자기 자신도 제외 대상에 포함
        return userKeywordRepo.findUsersByKeywordIds(keywordIds, excludeIds, user.getMajor().name());
    }

    public List<AppUser> orderByCategory(AppUser user, List<Long> excludeIds, List<AppUser> usersOrderByKeyword) {
        List<Long> firstUsers = usersOrderByKeyword.stream().map(u -> u.getId()).collect(Collectors.toList());
        excludeIds.addAll(firstUsers); //1순위로 뽑힌 유저들은 제외 대상
        List<String> categoryList = userKeywordRepo.findCategoryNamesByUserId(user.getId());

        return userKeywordRepo.findUsersByCategoryNames(categoryList, excludeIds, user.getMajor().name());
    }

    public List<AppUser> findRemainingUsers(AppUser user, List<Long> excludeIds, List<AppUser> usersOrderByCategory) {
        List<Long> secondUsers = usersOrderByCategory.stream().map(u -> u.getId()).collect(Collectors.toList());
        excludeIds.addAll(secondUsers); //2순위로 뽑힌 유저들은 제외 대상
        return userKeywordRepo.findRemainUsers(excludeIds, user.getMajor().name());
    }

    @Transactional
    @Scheduled(cron = "0 30 8 * * ?") //매일 오전 8시 30분에 만료된 데이터가 삭제됨
    public void deleteExpiredData() {
        List<Candidate> candidates = candidateRepo.findByExpireDateBefore(LocalDateTime.now());
        candidateRepo.deleteAll(candidates);
    }

    public Campus findCampus(Major major) {
        EnumSet<Major> majors = EnumSet.allOf(Major.class);
        List<Major> majorList = new ArrayList<>();
        majorList.addAll(majors);

        if (majorList.indexOf(major) < majorList.indexOf(Major.건설환경공학부)) {
            return Campus.명륜;
        } else {
            return Campus.율전;
        }
    }

    public List<AppUser> orderByCampus(List<AppUser> userList, Campus campus) {
        List<AppUser> result = new ArrayList<>();
        List<AppUser> differentCampus = new ArrayList<>();

        for (AppUser user : userList) {
            if (findCampus(user.getMajor()).equals(campus)) {
                result.add(user);
            } else {
                differentCampus.add(user);
            }
        }
        result.addAll(differentCampus);
        return result;
    }
}
