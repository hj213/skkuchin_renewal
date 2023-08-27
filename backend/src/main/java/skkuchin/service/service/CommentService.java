package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.CommentDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ArticleRepo;
import skkuchin.service.repo.CommentLikeRepo;
import skkuchin.service.repo.CommentRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {

    private final CommentRepo commentRepo;
    private final ArticleRepo articleRepo;
    private final CommentLikeRepo commentLikeRepo;

    @Transactional
    public void addComment(AppUser appUser, CommentDto.PostRequest dto){

       Article article = articleRepo.findById(dto.getArticleId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글 입니다."));

        Comment comment = dto.toEntity(appUser,article);
        commentRepo.save(comment);
    }

    @Transactional
    public List<CommentDto.Response> getComment(AppUser appUser, Long articleId){

        return commentRepo.findByLatestCommentTime(articleId)
                .stream()
                .map(comment -> new CommentDto.Response(
                        comment,
                        commentLikeRepo.findByComment(comment),
                        appUser
                )).collect(Collectors.toList());

    }

    @Transactional
    public void deleteComment(Long commentId, AppUser appUser){
        Comment comment = commentRepo.findById(commentId).orElseThrow(()-> new CustomValidationApiException("존재하지 않는 댓글입니다."));
        canHandleArticle(comment.getUser(),appUser);
        commentRepo.delete(comment);
    }

    private void canHandleArticle(AppUser articleUser, AppUser user) {
        if (!(articleUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("댓글 작성자 또는 관리자가 아닙니다.");
    }
}
