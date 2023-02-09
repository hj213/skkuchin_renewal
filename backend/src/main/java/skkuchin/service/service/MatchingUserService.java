package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.MatchingUserDto;
import skkuchin.service.domain.Matching.Keyword;
import skkuchin.service.domain.Matching.UserKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.KeywordRepo;
import skkuchin.service.repo.UserKeywordRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MatchingUserService {

    private final UserKeywordRepo userKeywordRepo;
    private final UserRepo userRepo;
    private final KeywordRepo keywordRepo;

    @Transactional
    public void addInfo(Long userId, MatchingUserDto.Request dto) {
        AppUser existingUser = userRepo.findById(userId).orElseThrow();
        existingUser.setGender(dto.getGender());
        existingUser.setIntroduction(dto.getIntroduction());
        existingUser.setMbti(dto.getMbti());
        existingUser.setImage(dto.getImage());
        existingUser.setMatching(true);
        userRepo.save(existingUser);

        List<UserKeyword> userKeywords = dto.getKeywords()
                .stream()
                .map(k -> {
                    Keyword keyword = keywordRepo.findByName(k);
                    return dto.toUserKeywordEntity(existingUser, keyword);
                })
                .collect(Collectors.toList());
        userKeywordRepo.saveAll(userKeywords);
    }

    @Transactional
    public MatchingUserDto.Response getMyInfo(AppUser user) {
        List<UserKeyword> keywords = userKeywordRepo.findByUser(user);
        return new MatchingUserDto.Response(user, keywords);
    }

    @Transactional
    public MatchingUserDto.Response getUserInfo(Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        List<UserKeyword> keywords = userKeywordRepo.findByUser(user);
        return new MatchingUserDto.Response(user, keywords);
    }

    @Transactional
    public void updateMatchingStatus(Long userId, Boolean matching) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        user.setMatching(matching);
        userRepo.save(user);
    }

    @Transactional
    public void updateInfo(Long userId, MatchingUserDto.Request dto) {
        AppUser user = userRepo.findById(userId).orElseThrow();
        user.setGender(dto.getGender());
        user.setIntroduction(dto.getIntroduction());
        user.setMbti(dto.getMbti());
        user.setImage(dto.getImage());
        userRepo.save(user);

        List<UserKeyword> existingKeywords = userKeywordRepo.findByUser(user);

        // 새로운 키워드 리스트에 없는 기존의 키워드는 삭제
        for (int i = 0; i < existingKeywords.size(); i++) {
            if (!dto.getKeywords().contains(existingKeywords.get(i).getKeyword().getName()))
                userKeywordRepo.delete(existingKeywords.get(i));
        }
        // 기존의 키워드 리스트에 없는 새로운 키워드는 추가
        for (int i = 0; i < dto.getKeywords().size(); i++) {
            if (!existingKeywords.stream().map(object ->
                    object.getKeyword().getName()).collect(Collectors.toList())
                    .contains(dto.getKeywords().get(i))) {
                Keyword keyword = keywordRepo.findByName(dto.getKeywords().get(i));
                userKeywordRepo.save(dto.toUserKeywordEntity(user, keyword));
            }
        }
    }
}
