package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface ArticleRepo extends JpaRepository<Article,Long> {

//    @Query("SELECT a from Article a where a.user.id = userId ORDER BY a.date desc")
    List<Article> findByUserOrderByDateDesc(AppUser appUser);
    List<Article> findAllByOrderByDateDesc();
    @Query("SELECT a from Article a where a.articleType =: articleType ORDER BY a.date desc")
    List<Article> findByArticleType(@Param("articleType") ArticleType articleType);

    @Query("SELECT a FROM Article a WHERE a.id = :articleId")
    List<Article> findByArticleId(@Param("articleId") Long articleId);

    List<Article> findByTitleContainingOrContentContainingOrderByDateDesc(String title, String content);

}
