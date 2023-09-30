package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Forum.ArticleReport;
import skkuchin.service.domain.Forum.Comment;
import skkuchin.service.domain.User.*;

import javax.validation.constraints.NotNull;

public class ArticleReportDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotNull
        private ReportType reportType;
        private String content;
        @JsonProperty
        private Long articleId;
        @JsonProperty
        private Long commentId;

        public ArticleReport toEntity(AppUser user, Article article, Comment comment) {
            return ArticleReport.builder()
                    .reportType(this.reportType)
                    .content(this.content)
                    .appUser(user)
                    .article(article)
                    .comment(comment)
                    .build();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Long reportId;
        private String nickname;
        private String username;
        @JsonProperty
        private int studentId;
        private Major major;
        private Profile image;

        public Response(Report report, AppUser reportedUser) {
            this.reportId = report.getId();
            this.nickname = reportedUser.getNickname() ;
            this.username = reportedUser.getUsername();
            this.studentId =  reportedUser.getStudentId();
            this.major = reportedUser.getMajor();
            this.image =  reportedUser.getImage();
        }
    }
}

