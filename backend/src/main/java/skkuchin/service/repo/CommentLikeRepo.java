package skkuchin.service.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.Forum.CommentLike;

import java.util.List;

public interface CommentLikeRepo extends JpaRepository<CommentLike,Long> {

    List<CommentLike> findByComment(Comment comment);

}
