package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.Matching.Keyword;
import skkuchin.service.domain.Matching.UserKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.CandidateRepo;
import skkuchin.service.repo.KeywordRepo;
import skkuchin.service.repo.UserKeywordRepo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CandidateSetUp {
    @Autowired
    private CandidateRepo candidateRepo;
    @Autowired
    private UserKeywordRepo userKeywordRepo;
    @Autowired
    private KeywordRepo keywordRepo;

    public void saveCandidate(AppUser user, AppUser user1, AppUser user2, AppUser user3) {
        Candidate candidate = Candidate.builder()
                .user(user)
                .candidate1(user1)
                .candidate2(user2)
                .candidate3(user3)
                .build();
        candidateRepo.save(candidate);
    }

    public void saveCandidateExpireDate(AppUser user, AppUser user1, LocalDateTime date) {
        Candidate candidate = Candidate.builder()
                .user(user)
                .candidate1(user1)
                .expireDate(date)
                .build();
    }

    public void saveUserKeyword(AppUser user, List<String> keywords) {
        List<UserKeyword> userKeywords = keywords.stream()
                .map(k -> {
                    Keyword keyword = keywordRepo.findByName(k);
                    return UserKeyword.builder().keyword(keyword).user(user).build();
                })
                .collect(Collectors.toList());
        userKeywordRepo.saveAll(userKeywords);
    }
}
