package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.Profile;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Major;
import skkuchin.service.domain.User.Report;
import skkuchin.service.domain.User.ReportType;

import javax.validation.constraints.NotNull;

public class ReportDto {

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotNull
        private ReportType reportType;
        private String content;
        @JsonProperty
        private String chatRoomId;
        @JsonProperty
        private Long reviewId;

        public Report toEntity(AppUser user, ChatRoom chatRoom, Review review) {
            return Report.builder()
                    .reportType(this.reportType)
                    .content(this.content)
                    .user(user)
                    .chatRoom(chatRoom)
                    .review(review)
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
