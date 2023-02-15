package skkuchin.service.config.chat;

import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.StompSubProtocolErrorHandler;

import java.nio.charset.StandardCharsets;

@Component
public class ChatErrorHandler extends StompSubProtocolErrorHandler {

    @Override
    public Message<byte[]> handleClientMessageProcessingError(Message<byte[]>clientMessage, Throwable ex)
    {
/*
        System.out.println("ex.getCause().getMessage() = " + ex.getCause().getMessage());
*/
        if(!ex.getCause().getMessage().isEmpty()){
            if(ex.getCause().getMessage() == "차단된 유저입니다."){
                return blockException();
            }
            else{
                System.out.println("ex.getCause().getMessage() = " + ex.getCause().getMessage());
                return handleJwtException();
            }

        }

        return super.handleClientMessageProcessingError(clientMessage, ex);
    }


    private Message<byte[]> handleJwtException(){

        return prepareErrorMessage(JwtErrorCode.ACCESS_TOKEN_EXPIRATION);
    }
    private Message<byte[]> blockException(){

        return prepareErrorMessage(JwtErrorCode.BLOCKED_USER);
    }



    private Message<byte[]> prepareErrorMessage(ResponseCode responseCode)
    {
        String code = String.valueOf(responseCode.getMessage());
        //에러 생성
        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);
        //해당 메시지 출력
        accessor.setMessage(String.valueOf(responseCode.getCode()));
        accessor.setLeaveMutable(true);
        return MessageBuilder.createMessage(code.getBytes(StandardCharsets.UTF_8), accessor.getMessageHeaders());

    }


}