package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleDto;
import skkuchin.service.dto.ArticleLikeDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ArticleLikeRepo;
import skkuchin.service.repo.ArticleRepo;
import skkuchin.service.repo.CommentRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleLikeService {

    private final ArticleLikeRepo articleLikeRepo;
    private final ArticleRepo articleRepo;
    private final CommentRepo commentRepo;
    @Transactional
    public void addArticleLike(AppUser user, ArticleLikeDto.PostRequest dto) {
        Article article = articleRepo.findById(dto.getArticleId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글 입니다"));
        ArticleLike articleLike = dto.toEntity(user, article);
        articleLikeRepo.save(articleLike);
    }


    @Transactional
    public List<ArticleDto.Response> getMyArticleLikes(AppUser user) {

        return articleLikeRepo.findByUser(user.getId())
                .stream()
                .map(articleLike -> new ArticleDto.Response(
                        articleLike.getArticle(),
                        commentRepo.findByArticle(articleLike.getArticle()),
                        articleLikeRepo.findByArticle(articleLike.getArticle().getId()),
                        user
                )).collect(Collectors.toList());
    }


    @Transactional
    public void delete(Long articleLikeId, AppUser appUser) {
        ArticleLike articlelike = articleLikeRepo.findById(articleLikeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 게시글 입니다"));
        canHandleArticle(articlelike.getUser(),appUser);
        articleLikeRepo.delete(articlelike);
    }

    private void canHandleArticle(AppUser articleUser, AppUser user) {
        if (!(articleUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("게시글 작성자 또는 관리자가 아닙니다.");
    }

}
