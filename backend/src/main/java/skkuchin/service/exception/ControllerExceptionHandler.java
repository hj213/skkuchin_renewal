package skkuchin.service.exception;

import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import skkuchin.service.api.dto.CMRespDto;

import java.util.HashMap;
import java.util.Map;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {
    @ExceptionHandler(CustomValidationApiException.class)
    public ResponseEntity<?> validationException(CustomValidationApiException e) {
        return new ResponseEntity<>(new CMRespDto<>(-1, e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CustomRuntimeException.class)
    public ResponseEntity<?> runtimeException(CustomRuntimeException e) {
        return new ResponseEntity<>(new CMRespDto<>(-1, e.getMessage(), e.getContent()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleMessageNotReadableException(HttpMessageNotReadableException ex) {
        Map<String, String> errorMap = new HashMap<>();

        Throwable cause = ex.getCause();
        if (cause instanceof MismatchedInputException) {
            MismatchedInputException mismatchedInputException = (MismatchedInputException) cause;

            if (mismatchedInputException.getTargetType().isEnum()) {
                String path = mismatchedInputException.getPath().toString();
                String fieldWithError = path.substring(path.lastIndexOf(".") + 1);
                String field = fieldWithError.substring(fieldWithError.indexOf("[") + 2, fieldWithError.length() - 3);

                String fieldName = "";
                String particle = "";

                switch (field) {
                    case "major":
                        fieldName = "전공";
                        particle = "을";
                        break;
                    case "mbti":
                        fieldName = "MBTI";
                        particle = "를";
                        break;
                    case "gender":
                        fieldName = "성별";
                        particle = "을";
                        break;
                    case "profile":
                        fieldName = "프로필 이미지";
                        particle = "를";
                        break;
                    default:
                        fieldName = field;
                        particle = "을/를";
                        break;
                }
                errorMap.put(field, "유효하지 않은 " + fieldName + "입니다");
                return new ResponseEntity<>(new CMRespDto<>(-1, fieldName + particle +" 선택해주시기 바랍니다", errorMap), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new CMRespDto<>(-1, "요청 처리에 실패했습니다", cause), HttpStatus.BAD_REQUEST);
    }

}
