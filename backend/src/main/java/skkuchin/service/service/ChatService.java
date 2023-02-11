package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepository;
import skkuchin.service.repo.ChatRoomRepository;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRepository chatRepository;

    //전체 채팅방 조회
    public List<ChatRoomDto.Response> getAllRoom(){
        return chatRoomRepository.findAll()
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());

    }

    //채팅방의 메시지들 조회
    public List<ChatMessageDto.Response> getAllMessage(ChatRoom chatRoom){
        return chatRepository.findByRoomId(chatRoom.getRoomId())
                .stream()
                .map(message -> new ChatMessageDto.Response(message))
                .collect(Collectors.toList());
    }

    public void getAllMessage1(ChatRoom chatRoom, String sender){
        List<ChatMessage> chatMessages = chatRepository.findByRoomId(chatRoom.getRoomId());
        for (int i = 0; i<chatMessages.size(); i++) {
            if(chatMessages.get(i).getUserCount() >0 && sender != chatMessages.get(i).getSender())
                 chatMessages.get(i).setUserCount(0);

        }
        chatRepository.saveAll(chatMessages);
    }


    //채팅방 개설
    public void makeRoom(AppUser user, ChatRoomDto.PostRequest dto){

        ChatRoom chatRoom = dto.toEntity(user);
        chatRoomRepository.save(chatRoom);

    }

    //상대방 정보
    public void update(ChatRoom chatRoom,AppUser user){

        ChatRoom chatRoom1 = chatRoomRepository.findByRoomId(chatRoom.getRoomId());
        System.out.println("chatRoom.getRoomName() = " + chatRoom.getRoomName());
        chatRoom1.setUser1(user);
        chatRoom1.setReceiverAccepted(true);

        chatRoomRepository.save(chatRoom1);

    }

    public void deleteSession(ChatRoom chatRoom, String sessionId){
        if(chatRoom.getSenderSessionId().equals(sessionId)){
            chatRoom.setSenderSessionId("");
        }
        else if(chatRoom.getReceiverSessionId().equals(sessionId)){
            chatRoom.setReceiverSessionId("");
        }





    }

    public void setSessionId(ChatRoom chatRoom,String sessionId){

            chatRoom.setSenderSessionId(sessionId);
            chatRoomRepository.save(chatRoom);




    }

    public ChatRoom findSession(String senderSessionId){
        ChatRoom chatRoom = chatRoomRepository.findBySenderSessionId(senderSessionId);
        return chatRoom;

    }

   public ChatRoom findSession1(String receiverSessionId){
        ChatRoom chatRoom = chatRoomRepository.findByReceiverSessionId(receiverSessionId);
        return chatRoom;


    }
    //채팅방 인원 조정
    public void updateCount(ChatRoom chatRoom){

        chatRoom.setUserCount(chatRoom.getUserCount()+1);

        chatRoomRepository.save(chatRoom);


    }

    public void minusCount(ChatRoom chatRoom){

        chatRoom.setUserCount(chatRoom.getUserCount()-1);

        chatRoomRepository.save(chatRoom);

    }


    // 특정 룸 아이디로 채팅방 찾기
    public ChatRoom findChatroom(String roomId){

        ChatRoom chatroom = chatRoomRepository.findByRoomId(roomId);
        return chatroom;
    }

    // 채팅방 개설자 아이디로 채팅방 찾기
    public List<ChatRoomDto.Response> findSenderChatRoom(AppUser appuser){


        return chatRoomRepository.findByUserAndSenderAcceptedAndReceiverAccepted(appuser, true,true)
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }

    // 상대방 아이디로 채팅방 찾기
    public List<ChatRoomDto.Response> findReceiverChatRoom(AppUser appuser){


        return chatRoomRepository.findByUser1AndSenderAcceptedAndReceiverAccepted(appuser, true,true)
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }

       /* private Map<String, ChatRoom> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }


    public List<ChatRoom> findAllRoom() {
        List<ChatRoom> result = new ArrayList<>(chatRooms.values());
        Collections.reverse(result);

        return result;
    }


    public ChatRoom findById(String roomId) {
        return chatRooms.get(roomId);
    }*/

     /*   //채팅방 생성
    public ChatRoom createRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
        chatRooms.put(chatRoom.getRoomId(), chatRoom);
        chatRoomRepository.save(chatRoom);
        return chatRoom;
    }*/

}

