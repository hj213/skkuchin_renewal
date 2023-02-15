package skkuchin.service.config.chat;

public enum
JwtErrorCode implements ResponseCode{
    ACCESS_TOKEN_EXPIRATION(1, "엑세스 토큰이 만료되었습니다."),
    BLOCKED_USER(2, "차단된 유저입니다."),
    /*TOKEN_ERROR3(3, "토큰 에러 3."),*/

            ;

    private final int code;
    private final String message;

    JwtErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }



}
