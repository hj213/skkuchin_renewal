package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface ArticleLikeRepo extends JpaRepository<ArticleLike,Long> {

    @Query("SELECT a FROM ArticleLike a WHERE a.article.id = :articleId ORDER BY a.article.date DESC")
    List<ArticleLike> findByArticle(@Param("articleId") Long articleId);
    @Query("SELECT a FROM ArticleLike a WHERE a.article.user.id = :userId ORDER BY a.article.date DESC")
    List<ArticleLike> findByUser(@Param("userId") Long userId);
}
