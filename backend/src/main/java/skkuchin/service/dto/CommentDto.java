package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import skkuchin.service.domain.Forum.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Profile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

public class CommentDto {

    @Getter
    @AllArgsConstructor
    @RequiredArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotBlank
        private String content;

        @NotNull
        @JsonProperty
        @Setter
        private Long articleId;

        public Comment toEntity(AppUser user, Article article) {
            Comment comment = Comment.builder()
                    .user(user)
                    .article(article)
                    .content(content)
                    .date(LocalDateTime.now())
                    .build();

            return comment;


        }

    }
        @Getter
        @AllArgsConstructor
        @RequiredArgsConstructor
        @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
        public static class PostReplyRequest {
            @NotBlank
            private String content;

            @NotNull
            @JsonProperty
            private Long articleId;

            public Comment toEntity(AppUser user, Article article,Comment comment) {
                return Comment.builder()
                        .user(user)
                        .article(article)
                        .parent(comment)
                        .content(content)
                        .date(LocalDateTime.now())
                        .build();
            }


        }

        @Getter
        @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
        public static class Response {

            private Long id;
            private String content;
            @JsonProperty
            private Long userId;

            private String nickname;

            @JsonProperty
            private Profile userImage;
            @JsonProperty
            private String displayTime;
            @JsonProperty
            private Long commentLikes;
            @JsonProperty
            private boolean myComment;

            private boolean writer;

            private List<CommentDto.ReplyResponse> reply;




            public Response(Comment comment, List<CommentLike> commentLikes, AppUser user) {
                this.id = comment.getId();
                this.content = comment.getContent();
                this.userId = comment.getUser().getId();
                this.nickname = comment.getUser().getNickname();
                this.userImage = comment.getUser().getImage();
                this.displayTime = formatDate(comment.getDate());
                this.commentLikes = commentLikes.stream().count();
                this.myComment = user.getId().equals(comment.getUser().getId());
                this.writer = comment.getArticle().getUser().getId().equals(comment.getUser().getId());
                if(comment.getChildren()!= null){
                    this.reply = comment.getChildren().stream().map(c-> new CommentDto.ReplyResponse(c,commentLikes,user)).collect(Collectors.toList());
                }

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


    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class ReplyResponse {

        private Long id;
        private String content;
        @JsonProperty
        private Long userId;

        private String nickname;

        @JsonProperty
        private Profile userImage;
        @JsonProperty
        private String displayTime;
        @JsonProperty
        private Long commentLikes;
        @JsonProperty
        private boolean myComment;

        private boolean writer;


        public ReplyResponse(Comment comment, List<CommentLike> commentLikes, AppUser user) {
            this.id = comment.getId();
            this.content = comment.getContent();
            this.userId = comment.getUser().getId();
            this.nickname = comment.getUser().getNickname();
            this.userImage = comment.getUser().getImage();
            this.displayTime = formatDate(comment.getDate());
            this.commentLikes = commentLikes.stream().count();
            this.myComment = user.getId().equals(comment.getUser().getId());
            this.writer = comment.getArticle().getUser().getId().equals(comment.getUser().getId());
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

