package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.Notice.Notice;
import skkuchin.service.domain.Notice.NoticeType;
import skkuchin.service.domain.User.*;

import javax.validation.constraints.NotNull;

public class NoticeDto {

    @Getter
    public static class Request {
        private NoticeType type;
        private String title;
        private String content;

        public Notice toEntity() {
            return Notice.builder()
                    .type(this.type)
                    .title(this.title)
                    .content(this.content)
                    .build();
        }
    }

    @Getter
    public static class Response {
        private Long id;
        private NoticeType type;
        private String title;
        private String content;

        public Response(Notice notice) {
            this.type = notice.getType();
            this.id = notice.getId();
            this.title = notice.getTitle();
            this.content = notice.getContent();
        }
    }
}
