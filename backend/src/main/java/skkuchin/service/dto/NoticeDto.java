package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Notice.Notice;
import skkuchin.service.domain.Notice.NoticeType;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class NoticeDto {

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @NotNull
        private NoticeType type;
        @NotBlank
        private String title;
        @JsonProperty
        private String pushTitle;
        @JsonProperty
        private String pushContent;
        private String url;

        public Notice toEntity() {
            return Notice.builder()
                    .type(this.type)
                    .title(this.title)
                    .pushTitle(this.pushTitle)
                    .pushContent(this.pushContent)
                    .url(this.url)
                    .build();
        }
    }

    @Getter
    public static class DirectPush {
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        private NoticeType type;
        private String title;
        private String url;
        @JsonProperty
        private String readUsers;
        @JsonProperty
        private String createDate;

        public Response(Notice notice) {
            this.type = notice.getType();
            this.id = notice.getId();
            this.title = notice.getTitle();
            this.url = notice.getUrl();
            this.readUsers = notice.getReadUsers();
            this.createDate = formatDate(notice.getCreateDate());
        }

        private String formatDate(LocalDateTime date) {
            LocalDateTime now = LocalDateTime.now();
            if (date.getYear() == now.getYear()) {
                return date.format(DateTimeFormatter.ofPattern("M월 d일", Locale.KOREAN));
            } else {
                return date.format(DateTimeFormatter.ofPattern("yyyy년 M월 d일", Locale.KOREAN));
            }
        }
    }
}
