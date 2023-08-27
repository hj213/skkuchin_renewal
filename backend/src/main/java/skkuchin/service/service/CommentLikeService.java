package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.scope.ScopedObject;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.Forum.CommentLike;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleLikeDto;
import skkuchin.service.dto.CommentLikeDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.CommentLikeRepo;
import skkuchin.service.repo.CommentRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentLikeService {

    private  final CommentRepo commentRepo;
    private final CommentLikeRepo commentLikeRepo;


    @Transactional
    public void addCommentLike(AppUser user, CommentLikeDto.PostRequest dto) {
        Comment comment = commentRepo.findById(dto.getCommentId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 댓글 입니다"));
        CommentLike commentLike = dto.toEntity(user, comment);
        commentLikeRepo.save(commentLike);
    }

    @Transactional
    public void delete(Long commentLikeId, AppUser appUser) {
        CommentLike commentLike = commentLikeRepo.findById(commentLikeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 댓글 입니다"));
        canHandleArticle(commentLike.getUser(),appUser);
        commentLikeRepo.delete(commentLike);
    }

    private void canHandleArticle(AppUser articleUser, AppUser user) {
        if (!(articleUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("댓글 작성자 또는 관리자가 아닙니다.");
    }
}
