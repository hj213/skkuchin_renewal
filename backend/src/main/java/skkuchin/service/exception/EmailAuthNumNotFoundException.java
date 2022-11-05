package skkuchin.service.exception;

public class EmailAuthNumNotFoundException extends RuntimeException{
    public EmailAuthNumNotFoundException() {

    }
    public EmailAuthNumNotFoundException(String message) {
        super(message);
    }
}
