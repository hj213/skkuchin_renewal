package skkuchin.service.config.chat;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageDeliveryException;
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
            System.out.println("ex.getCause().getMessage() = " + ex.getCause().getMessage());
            return handleJwtException();
        }


        return super.handleClientMessageProcessingError(clientMessage, ex);
    }


    // 권한 예외(해당 방에 접속하지 않았을 시)



    // JWT 예외
    private Message<byte[]> handleJwtException(){

        return prepareErrorMessage(JwtErrorCode.ACCESS_TOKEN_EXPIRATION);
    }


    // 메세지 생성
    private Message<byte[]> prepareErrorMessage(ResponseCode responseCode)
    {
        String code = String.valueOf(responseCode.getMessage());
        StompHeaderAccessor accessor = StompHeaderAccessor.create(StompCommand.ERROR);
        accessor.setMessage(String.valueOf(responseCode.getCode()));
        accessor.setLeaveMutable(true);

        return MessageBuilder.createMessage(code.getBytes(StandardCharsets.UTF_8), accessor.getMessageHeaders());

    }


}