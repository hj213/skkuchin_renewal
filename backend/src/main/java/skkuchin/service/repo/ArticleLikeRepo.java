package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.User.AppUser;

import java.util.List;

public interface ArticleLikeRepo extends JpaRepository<ArticleLike,Long> {

    List<ArticleLike> findByArticle(Article article);
    List<ArticleLike> findByUser(AppUser appUser);
}
