package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.Forum.CommentLike;
import skkuchin.service.domain.User.AppUser;

public class CommentLikeDto {

    @Getter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest{


        @JsonProperty
        private Long commentId;

        @JsonProperty
        private Long articleId;

        public CommentLike toEntity(AppUser user, Comment comment, Article article){
            return CommentLike
                    .builder()
                    .user(user)
                    .article(article)
                    .comment(comment)
                    .build();
        }
    }


}
