package skkuchin.service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class DiscordException extends RuntimeException{
    public DiscordException(String message) {
        super(message);
    }
}
