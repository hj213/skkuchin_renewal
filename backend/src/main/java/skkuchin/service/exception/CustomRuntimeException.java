package skkuchin.service.exception;

public class CustomRuntimeException extends RuntimeException{
    private String content;

    public CustomRuntimeException(String message) {
        super(message);
    }

    public CustomRuntimeException(String message, String content) {
        super(message);
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
