package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleLike;
import skkuchin.service.domain.Forum.ArticleType;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Profile;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;

public class ArticleDto {

    @Getter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class PostRequest{
        @NotBlank
        private String title;

        @NotNull
        @JsonProperty
        private ArticleType articleType;

        @NotBlank
        private String content;


        public Article toEntity(AppUser user){
            return Article.builder()
                    .user(user)
                    .content(content)
                    .title(title)
                    .articleType(articleType)
                    .date(LocalDateTime.now())
                    .build();
        }


    }

    @Getter
    @Setter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class PutRequest {

        @NotBlank
        private String title;

        @NotNull
        @JsonProperty
        private ArticleType articleType;

        @NotBlank
        private String content;



    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static  class Response {

        private Long id;
        private ArticleType articleType;
        private String tagType;
        private String title;
        private  String content;
        @JsonProperty
        private Long userId;

        private String nickname;

        @JsonProperty
        private Profile userImage;
        @JsonProperty
        private String displayTime;
        @JsonProperty
        private Long articleLikeCount;
        @JsonProperty
        private Long commentCount;

        @JsonProperty
        private boolean userLiked;


        public Response(Article article, List<Comment> comments, List<ArticleLike> articleLikes,AppUser appUser){
            this.id =article.getId();
            this.articleType = article.getArticleType();
            this.tagType = article.getArticleType().getLabel();
            this.title = article.getTitle();
            this.content = article.getContent();
            this.userId = article.getUser().getId();
            this.nickname = article.getUser().getNickname();
            this.userImage = article.getUser().getImage();
            this.displayTime = formatDate(article.getDate());
            this.commentCount = comments.stream().count();
            this.articleLikeCount = articleLikes.stream().count();
            this.userLiked = calculateUserLiked(articleLikes,appUser);

        }

        private boolean calculateUserLiked(List<ArticleLike> articleLikes, AppUser appUser){
            for (ArticleLike like: articleLikes){
                if (like.getUser().getId().equals(appUser.getId())){
                    return true;
                }
            }

            return  false;
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
