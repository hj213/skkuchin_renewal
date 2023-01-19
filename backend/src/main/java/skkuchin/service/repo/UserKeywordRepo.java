package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Keyword;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.UserKeyword;

import java.util.List;

public interface UserKeywordRepo extends JpaRepository<UserKeyword, Long> {
    List<UserKeyword> findByUser(AppUser user);

    @Query("SELECT uk.keyword.id FROM UserKeyword uk WHERE uk.user.id = :userId")
    List<Long> findKeywordIdsByUserId(@Param("userId") Long userId);

    //겹치는 키워드가 많은 순의 userId 리스트
    //candidate table에 저장되어 있는 유저 제외
    //matching = false인 유저 제외
    @Query("SELECT uk.user FROM UserKeyword uk " +
            "WHERE uk.user.matching IS NULL " + //나중엔 matching = true
            "AND uk.keyword.id IN :keywordIds " +
            "AND uk.user.id NOT IN :userIds " +
            "GROUP BY uk.user.id " +
            "ORDER BY COUNT(uk.user.id) DESC, CASE uk.user.major WHEN :major THEN 0 ELSE 1 END") //겹치는 키워드가 많은 순, 같은 키워드 개수에선 학과가 같은 유저 우선
    List<AppUser> findUsersByKeywordIds(@Param("keywordIds") List<Long> keywordIds, @Param("userIds") List<Long> userIds, @Param("major") String major);

    @Query("SELECT uk.keyword.category FROM UserKeyword uk WHERE uk.user.id = :userId GROUP BY uk.keyword.category")
    List<String> findCategoryNamesByUserId(@Param("userId") Long userId);

    //겹치는 카테고리가 많은 순
    //candidate table에 저장되어 있는 유저 제외
    //matching = false인 유저 제외
    @Query("SELECT uk.user FROM UserKeyword uk " +
            "WHERE uk.user.matching IS NULL " +
            "AND uk.user.id NOT IN :userIds " +
            "AND uk.keyword.category IN :categories " +
            "GROUP BY uk.user.id " +
            "ORDER BY COUNT(uk.user.id) DESC, CASE uk.user.major WHEN :major THEN 0 ELSE 1 END")
    List<AppUser> findUsersByCategoryNames(@Param("categories") List<String> categories, @Param("userIds") List<Long> userIds, @Param("major") String major);

    @Query("SELECT uk.user FROM UserKeyword uk " +
            "WHERE uk.user.matching IS NULL " +
            "AND uk.user.id NOT IN :userIds " +
            "GROUP BY uk.user.id " +
            "ORDER BY COUNT(uk.user.id) DESC, CASE uk.user.major WHEN :major THEN 0 ELSE 1 END")
    List<AppUser> findRemainUsers(@Param("userIds") List<Long> userIds, @Param("major") String major);
}
