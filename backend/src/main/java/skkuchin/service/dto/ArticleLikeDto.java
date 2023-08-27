package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.User.AppUser;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;

public class ArticleLikeDto {


    @AllArgsConstructor
    @Getter
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest{
        @JsonProperty
        private Long articleId;

        public ArticleLike toEntity(AppUser user, Article article){
            return ArticleLike
                    .builder()
                    .user(user)
                    .article(article)
                    .build();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response{

        @JsonProperty
        private Long articleId;
        private String title;
        private String content;
        private String date;

        @JsonProperty
        private Long commentCounts;
        @JsonProperty
        private Long articleLikeCounts;

        public Response(ArticleLike articleLike, List<ArticleLike> articleLikes, List<Comment> comments){
            this.articleId = articleLike.getArticle().getId();
            this.title = articleLike.getArticle().getTitle();
            this.content = articleLike.getArticle().getContent();
            this.date = formatDate(articleLike.getArticle().getDate());
            this.commentCounts = comments.stream().count();
            this.articleLikeCounts =articleLikes.stream().count();
        }
        private String formatDate(LocalDateTime date) {
            LocalDateTime now = LocalDateTime.now();
            long diff = ChronoUnit.MINUTES.between(date, now);
            if (diff < 1) {
                return "방금 전";
            } else if (diff < 60) {
                return diff + "분 전";
            } else if (diff < 1440) {
                return (diff / 60) + "시간 전";
            } else if (diff < 2880) {
                return "어제";
            } else if (date.getYear() == now.getYear()) {
                return date.format(DateTimeFormatter.ofPattern("M월 d일", Locale.KOREAN));
            } else {
                return date.format(DateTimeFormatter.ofPattern("yyyy. M. d.", Locale.KOREAN));
            }
        }
    }


}
