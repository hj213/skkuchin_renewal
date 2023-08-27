package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.Comment;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Long> {

    List<Comment> findByArticle(Article article);

    @Query("SELECT a FROM Comment a WHERE a.article.id = :articleId ORDER BY a.date ASC")
    List<Comment> findByLatestCommentTime(@Param("articleId") Long articleId);
}
