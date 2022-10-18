package skkuchin.service.exception;

import org.springframework.transaction.TransactionSystemException;

public class BlankException extends TransactionSystemException {
    public BlankException(String msg) {
        super(msg);
    }
}
