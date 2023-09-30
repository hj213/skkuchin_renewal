package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleReport;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleReportDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.*;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ArticleReportService {

    private final ArticleReportRepo articleReportRepo;
    private final CommentRepo commentRepo;
    private final ArticleRepo articleRepo;

    @Transactional
    public void reportArticle(AppUser user, ArticleReportDto.Request dto) {
        if (dto.getArticleId() == null && dto.getCommentId() == null) {
            throw new CustomRuntimeException("댓글이나 게시글이 특정되지 않았습니다.");
        }

        if ((dto.getContent() == null || dto.getContent().isBlank()) && dto.getReportType().getCode().equals("기타")) {
            throw new CustomRuntimeException("내용을 작성해주시기 바랍니다.");
        }

        if (dto.getContent() != null && !dto.getReportType().getCode().equals("기타")) {
            throw new CustomRuntimeException("신고 사유가 기타인 경우에만 내용을 적을 수 있습니다");
        }

        Article article = null;
        Comment comment = null;

        if (dto.getArticleId() !=null){
            article = articleRepo.findById(dto.getArticleId()).orElseThrow(()->
                    new CustomValidationApiException("존재하지 않는 게시글입니다."));
        }

        if (dto.getCommentId()!=null){
            comment = commentRepo.findById(dto.getCommentId()).orElseThrow(()->
                    new CustomValidationApiException("존재하지 않는 댓글입니다."));
        }

        ArticleReport articleReport = dto.toEntity(user,article,comment);
        articleReportRepo.save(articleReport);

    }

}
