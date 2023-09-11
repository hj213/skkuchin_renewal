package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleDto;
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
public class ArticleService {
    private  final ArticleRepo articleRepo;
    private final CommentRepo commentRepo;
    private final ArticleLikeRepo articleLikeRepo;
    @Transactional
    public void addArticle(AppUser appUser, ArticleDto.PostRequest dto){
        Article article = dto.toEntity(appUser);
        articleRepo.save(article);
    }

    @Transactional
    public List<ArticleDto.Response> searchArticle(AppUser appUser){

        return articleRepo.findAllByOrderByDateDesc()
                .stream()
                .map(article -> new ArticleDto.Response(
                       article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId())
                        ,appUser
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ArticleDto.Response> getMyArticle(AppUser appUser){
        return articleRepo.findByUserOrderByDateDesc(appUser)
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId())
                        ,appUser
                ))
                .collect(Collectors.toList());

    }

    @Transactional
    public List<ArticleDto.Response> getSpecificArticle(Long articleId,AppUser appUser){
        return articleRepo.findByArticleId(articleId)
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId())
                        ,appUser
                ))
                .collect(Collectors.toList());

    }

    @Transactional
    public void deleteArticle(Long articleId, AppUser appUser){
        Article article = articleRepo.findById(articleId).orElseThrow(()-> new CustomValidationApiException("존재하지 않는 게시글입니다."));
        canHandleArticle(article.getUser(),appUser);
        articleRepo.delete(article);
    }

    @Transactional
    public void updateArticle(Long articleId,AppUser appUser,ArticleDto.PutRequest dto){

        Article beforeArticle = articleRepo.findById(articleId).orElseThrow(()-> new CustomValidationApiException("존재하지 않는 게시글입니다."));
        canHandleArticle(beforeArticle.getUser(),appUser);
        BeanUtils.copyProperties(dto,beforeArticle);
        articleRepo.save(beforeArticle);


    }

//    @Transactional
//    public List<ArticleDto.Response> getArticleByType(AppUser appUser){
//
//
//    }
    @Transactional
    public List<ArticleDto.Response> searchKeyword(String keyword,AppUser appUser) {
        List<Article> matchingArticles = articleRepo.findByTitleContainingOrContentContainingOrderByDateDesc(keyword, keyword);

        return matchingArticles
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId())
                        ,appUser
                ))
                .collect(Collectors.toList());
    }



    @Transactional
    public List<ArticleDto.Response> getSpecificArticle(ArticleType articleType,AppUser appUser) {
        return articleRepo.findByArticleType(articleType)
                .stream()
                .map(article -> new ArticleDto.Response(
                        article,
                        commentRepo.findByArticle(article),
                        articleLikeRepo.findByArticle(article.getId())
                        ,appUser
                ))
                .collect(Collectors.toList());
    }

    private void canHandleArticle(AppUser articleUser, AppUser user) {
        if (!(articleUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("게시글 작성자 또는 관리자가 아닙니다.");
    }
}
