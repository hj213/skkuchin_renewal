package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.MatchingUserDto;
import skkuchin.service.api.dto.UserDto;
import skkuchin.service.domain.Matching.Keyword;
import skkuchin.service.domain.Matching.UserKeyword;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.UserRole;
import skkuchin.service.exception.CustomValidationApiException;
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
        AppUser existingUser = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        existingUser.setGender(dto.getGender());
        existingUser.setIntroduction(dto.getIntroduction());
        existingUser.setMbti(dto.getMbti());
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
    public void addNewInfo(String username, MatchingUserDto.Request dto) {
        AppUser existingUser = userRepo.findByUsername(username);
        if (existingUser == null) {
            throw new CustomValidationApiException("존재하지 않는 유저입니다");
        }
        existingUser.setGender(dto.getGender());
        existingUser.setIntroduction(dto.getIntroduction());
        existingUser.setMbti(dto.getMbti());
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
        if (user.getMatching() == null) {
            throw new CustomValidationApiException("AI 매칭 기능을 이용하시려면\n" +
                    "매칭 프로필이 필요해요️ \uD83E\uDD7A");
        }
        List<UserKeyword> keywords = userKeywordRepo.findByUser(user);
        return new MatchingUserDto.Response(user, keywords);
    }

    @Transactional
    public MatchingUserDto.Response getUserInfo(Long userId) {
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        List<UserKeyword> keywords = userKeywordRepo.findByUser(user);
        return new MatchingUserDto.Response(user, keywords);
    }

    @Transactional
    public void updateMatchingStatus(Long userId, Boolean matching) {
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        user.setMatching(matching);
        userRepo.save(user);
    }

    @Transactional
    public void updateInfo(Long userId, MatchingUserDto.Request dto) {
        AppUser user = userRepo.findById(userId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        user.setGender(dto.getGender());
        user.setIntroduction(dto.getIntroduction());
        user.setMbti(dto.getMbti());
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
