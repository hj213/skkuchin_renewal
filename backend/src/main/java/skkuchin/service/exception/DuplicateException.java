package skkuchin.service.exception;

import org.springframework.dao.DataIntegrityViolationException;

public class DuplicateException extends DataIntegrityViolationException {
    public DuplicateException(String msg) {
        super(msg);
    }
}
