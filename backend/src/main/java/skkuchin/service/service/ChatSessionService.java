package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ChatSession;
import skkuchin.service.repo.ChatSessionRepo;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatSessionService {

    private final ChatSessionRepo chatSessionRepo;
    public ChatSession findSession(String senderSessionId){
        ChatSession chatSession = chatSessionRepo.findBySessionId(senderSessionId);
        return chatSession;

    }


    public void setSessionId(ChatRoom chatRoom,String sessionId, String sender){

        ChatSession chatSession = new ChatSession() ;
        chatSession.setSessionId(sessionId);
        chatSession.setChatRoom(chatRoom);
        chatSession.setSender(sender);
        chatSessionRepo.save(chatSession);




    }

    public void deleteSession(String sessionId){

        ChatSession chatSession = chatSessionRepo.findBySessionId(sessionId) ;
        chatSessionRepo.delete(chatSession);
    }
}
