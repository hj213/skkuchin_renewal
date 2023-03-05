package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import skkuchin.service.domain.Chat.Appointment;
import skkuchin.service.domain.Chat.ChatRoom;

import java.time.LocalDateTime;

public class AppointmentDto {
    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @JsonProperty
        @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime dateTime;
        private String place;

        public Appointment toEntity(ChatRoom chatRoom) {
            return Appointment.builder()
                    .dateTime(this.dateTime)
                    .place(this.place)
                    .chatRoom(chatRoom)
                    .build();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        private Long id;
        @JsonProperty
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime dateTime;
        private String place;

        public Response(Appointment appointment) {
            this.id = appointment.getId();
            this.dateTime = appointment.getDateTime() ;
            this.place = appointment.getPlace();
        }
    }
}
