package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        if (comment.isAnonymous() == true) {
            System.out.println("들어옴");
            List<Comment> anonymousComments = commentRepo.findAnonymous(article.getId());

            Long maxAnonymousIdx = 0L;
            for (Comment comments : anonymousComments) {
                Long currentAnonymousIdx = comments.getAnonymousIdx();
                if (currentAnonymousIdx > maxAnonymousIdx) {
                    maxAnonymousIdx = currentAnonymousIdx;
                }
            }

            Long targetUserId = comment.getUser().getId();

            Long idx = 0L;

            for (Comment anonymousComment : anonymousComments) {
                if (anonymousComment.getUser().getId().equals(targetUserId)) {
                    idx = anonymousComment.getAnonymousIdx();
                }
            }

            if (idx == 0L) {
                comment.setAnonymousIdx(maxAnonymousIdx + 1);
            } else {
                comment.setAnonymousIdx(idx);
            }
        }
        commentRepo.save(comment);
    }


    @Transactional
    public void addReply(AppUser appUser, CommentDto.PostReplyRequest dto, Long commentId){

        Article article = articleRepo.findById(dto.getArticleId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글 입니다."));
        Comment originalComment = commentRepo.findById(commentId).orElseThrow(()-> new CustomValidationApiException("댓글이 존재하지 않습니다"));
        Comment comment = dto.toEntity(appUser,article,originalComment);
        if (comment.isAnonymous() == true) {
            System.out.println("들어옴");
            List<Comment> anonymousComments = commentRepo.findAnonymous(article.getId());

            Long maxAnonymousIdx = 0L;
            for (Comment comments : anonymousComments) {
                Long currentAnonymousIdx = comments.getAnonymousIdx();
                if (currentAnonymousIdx > maxAnonymousIdx) {
                    maxAnonymousIdx = currentAnonymousIdx;
                }
            }

            Long targetUserId = comment.getUser().getId();

            Long idx = 0L;

            for (Comment anonymousComment : anonymousComments) {
                if (anonymousComment.getUser().getId().equals(targetUserId)) {
                    idx = anonymousComment.getAnonymousIdx();
                }
            }

            if (idx == 0L) {
                comment.setAnonymousIdx(maxAnonymousIdx + 1);
            } else {
                comment.setAnonymousIdx(idx);
            }
        }
        originalComment.getChildren().add(comment);
        commentRepo.save(originalComment);
        commentRepo.save(comment);
    }

    @Transactional
    public List<CommentDto.Response> getComment(AppUser appUser, Long articleId){
        Article article = articleRepo.findById(articleId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글 입니다"));
        return commentRepo.findByLatestCommentTime(articleId)
                .stream()
                .map(comment -> new CommentDto.Response(
                        comment,
                        commentLikeRepo.findByArticle(article),
                        appUser
                )).collect(Collectors.toList());

    }

    @Transactional
    public void deleteComment(Long commentId, AppUser appUser){
        Comment comment = commentRepo.findById(commentId).orElseThrow(()-> new CustomValidationApiException("존재하지 않는 댓글입니다."));
        canHandleArticle(comment.getUser(),appUser);
        comment.setDeleted(true);
        commentRepo.save(comment);
    }

    private void canHandleArticle(AppUser articleUser, AppUser user) {
        if (!(articleUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("댓글 작성자 또는 관리자가 아닙니다.");
    }
}
