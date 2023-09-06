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
import java.util.List;
import java.util.Locale;
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

        private boolean anonymous;


        public Comment toEntity(AppUser user, Article article) {
            Comment comment = Comment.builder()
                    .user(user)
                    .article(article)
                    .content(content)
                    .date(LocalDateTime.now())
                    .anonymous(anonymous)
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

            private boolean anonymous;

            public Comment toEntity(AppUser user, Article article,Comment comment) {
                return Comment.builder()
                        .user(user)
                        .article(article)
                        .parent(comment)
                        .content(content)
                        .date(LocalDateTime.now())
                        .anonymous(anonymous)
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

            private boolean anonymous;
            private List<CommentDto.ReplyResponse> reply;




            public Response(Comment comment, List<CommentLike> commentLikes, AppUser user) {
                this.id = comment.getId();
                this.content = comment.getContent();
                this.userId = comment.getUser().getId();
                this.nickname = comment.getUser().getNickname();
                this.userImage = comment.getUser().getImage();
                this.displayTime = formatDate(comment.getDate());
                this.commentLikes = commentLikesForReply(comment,commentLikes).stream().count();
                this.myComment = user.getId().equals(comment.getUser().getId());
                this.writer = comment.getArticle().getUser().getId().equals(user.getId());
                this.anonymous = comment.isAnonymous();
                if(comment.getChildren()!= null){
                    this.reply = comment.getChildren().stream().map(c-> new CommentDto.ReplyResponse(c,commentLikesForReply(c,commentLikes),
                            c.getUser())).collect(Collectors.toList());
                }

            }

            private List<CommentLike> commentLikesForReply(Comment reply, List<CommentLike> allCommentLikes) {
                // 대댓글과 관련된 commentLikes 목록만 필터링하여 반환합니다.
                return allCommentLikes.stream()
                        .filter(like -> like.getComment().getId().equals(reply.getId()))
                        .collect(Collectors.toList());
            }

            private String formatDate(LocalDateTime date) {
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter dateFormatter;

                if (date.getYear() >= now.getYear()) {
                    dateFormatter = DateTimeFormatter.ofPattern("MM/dd HH:mm", Locale.KOREAN);
                } else {
                    dateFormatter = DateTimeFormatter.ofPattern("yyyy년 MM dd HH:mm", Locale.KOREAN);
                }
                return date.format(dateFormatter);
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

        private boolean anonymous;


        public ReplyResponse(Comment comment, List<CommentLike> commentLikes, AppUser user) {
            this.id = comment.getId();
            this.content = comment.getContent();
            this.userId = comment.getUser().getId();
            this.nickname = comment.getUser().getNickname();
            this.userImage = comment.getUser().getImage();
            this.displayTime = formatDate(comment.getDate());
            this.commentLikes = commentLikes.stream().count();
            this.myComment = user.getId().equals(comment.getUser().getId());
//            System.out.println("comment.getUser().getId() = " + comment.getUser().getId());
//            System.out.println("user.getId() = " + user.getId());
            this.writer = comment.getArticle().getUser().getId().equals(user.getId());
            this.anonymous = comment.isAnonymous();
        }



        private String formatDate(LocalDateTime date) {
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter dateFormatter;

            if (date.getYear() >= now.getYear()) {
                // 올해 이후 작성된 댓글
                dateFormatter = DateTimeFormatter.ofPattern("MM/dd HH:mm", Locale.KOREAN);
            } else {
                // 올해 이전 작성된 댓글
                dateFormatter = DateTimeFormatter.ofPattern("yyyy년 M월 d일 HH:mm", Locale.KOREAN);
            }
            return date.format(dateFormatter);
        }
    }
    }

