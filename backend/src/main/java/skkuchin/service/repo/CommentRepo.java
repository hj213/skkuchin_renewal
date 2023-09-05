package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentRepo extends JpaRepository<Comment, Long> {

    List<Comment> findByArticle(Article article);

    @Query("SELECT DISTINCT c FROM Comment c\n" +
        "LEFT JOIN FETCH c.parent\n" +
        "WHERE c.article.id = :articleId AND c.parent IS NULL\n" +
        "ORDER BY c.date ASC")
    List<Comment> findByLatestCommentTime(@Param("articleId") Long articleId);



//    @Query("SELECT a FROM Comment a WHERE a.article.id = :articleId ORDER BY a.groupId ASC NULLS FIRST, a.date ASC")
}

