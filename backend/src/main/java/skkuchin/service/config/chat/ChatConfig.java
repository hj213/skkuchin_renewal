package skkuchin.service.config.chat;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.ChatSessionRepo;
import skkuchin.service.service.ChatService;
import skkuchin.service.service.ChatSessionService;

import java.util.ArrayList;
import java.util.List;


@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class ChatConfig implements WebSocketMessageBrokerConfigurer {


    private final ChatErrorHandler chatErrorHandler;
    private final ChatService chatService;
    private final ChatSessionService chatSessionService;
    private final ChatSessionRepo chatSessionRepo;
    private final ChatRoomRepo chatRoomRepo;
    private final ChatRepo chatRepository;
    private final RabbitTemplate template;
    private final static String CHAT_EXCHANGE_NAME = "chat.exchange";
    private final static String CHAT_QUEUE_NAME = "chat.queue";




    @Value("${rabbitmq.host}")
    private String host;
    @Value("${stomp.port}")
    private int port;
    @Value("${rabbitmq.username}")
    private String username;
    @Value("${rabbitmq.password}")
    private String password;


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat").setAllowedOriginPatterns("*").withSockJS()
                /*.setHeartbeatTime(1000)*/;
        ;

        //에러 핸들링
        registry.setErrorHandler(chatErrorHandler);
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        //registry.enableSimpleBroker("/queue", "/topic");
        registry.setPathMatcher(new AntPathMatcher("."));
        registry.setApplicationDestinationPrefixes("/app");
        registry.setPreservePublishOrder(true);
        registry.enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue")
                .setRelayHost(host)
                .setRelayPort(port)
                .setClientLogin(username)
                .setClientPasscode(password);

    }


    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {

             StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                System.out.println("accessor = " + accessor);
                //stomp.connect으로도 생각해 볼 수 있을것
                if(accessor.getCommand().equals(StompCommand.SEND)){
                    System.out.println("\"fuck\" = " + "fuck");
                    String sessionId = accessor.getSessionId();
                    ChatSession chatSession = chatSessionRepo.findBySessionId(sessionId);
                    if(chatSession.getChatRoom().isSenderBlocked() == true || chatSession.getChatRoom().isReceiverBlocked() == true){
                        throw new RuntimeException("차단된 유저입니다.");
                    }
                }


                else if(accessor.getCommand().equals(StompCommand.SUBSCRIBE)){
                    System.out.println("accessor.getDestination() = " + accessor.getDestination().substring(29));
                    String sessionId = accessor.getSessionId();
                    System.out.println("sessionId = " + sessionId);
                    String roomId = accessor.getDestination().substring(29);
                    System.out.println("accessor = " + accessor);
                  String token = accessor.getFirstNativeHeader("token");
                    System.out.println("token = " + token);
                    String sender = getUserNameFromJwt(token);
                    ChatRoom chatRoom = chatService.findChatroom(roomId);
                    String roomId1 = roomId +"1";
                    System.out.println("roomId1 = " + roomId1);

                  /*  ChatRoom chatRoom1 = chatRoomRepo.findByRoomId(roomId1);
                    System.out.println("chatRoom1.getRoomId() = " + chatRoom1.getRoomId());
*/

                    chatSessionService.setSessionId(chatRoom,sessionId,sender);
                   /* chatSessionService.setSessionId(chatRoom1,sessionId+"1",sender);*/


                    chatService.getAllMessage1(chatRoom,sender);
                    chatService.updateCount(chatRoom);
                 /*   chatService.updateCount(chatRoom1);*/
                    System.out.println("Subscribe");

                }

                else if(accessor.getCommand().equals(StompCommand.CONNECT)){
                    System.out.println("message = " + message);
                }

                else if(accessor.getCommand().equals(StompCommand.DISCONNECT)){
                    System.out.println(" disconnect");

                    String sessionId = (String) message.getHeaders().get("simpSessionId");
                    System.out.println("sessionId = " + sessionId);
                    ChatSession chatSession = chatSessionService.findSession(sessionId);
                    chatService.minusCount(chatSession.getChatRoom());
                    chatSessionService.deleteSession(sessionId);

                }
                System.out.println("message = " + message);
                System.out.println("accessor = " + accessor.getCommand());

                return message;
            }
        });
    }


    public String getUserNameFromJwt(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decodedJWT = verifier.verify(jwt);
        String username = decodedJWT.getSubject();
        return username;
    }

    public String tokenVerifier(String jwt){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();

        DecodedJWT decodedJWT = verifier.verify(jwt);
        System.out.println("decodedJWT = " + decodedJWT.getId());
        System.out.println("decodedJWT.getType() = " + decodedJWT.getType());

        return username;
    }



}

