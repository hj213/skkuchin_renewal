package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.RequestStatus;
import skkuchin.service.domain.Matching.Candidate;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepo chatRoomRepository;
    private final ChatRepo chatRepository;

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

    //상대가 읽은 메시지 카운트 0으로 바꿈
    public void getAllMessage1(ChatRoom chatRoom, String sender){
        List<ChatMessage> chatMessages = chatRepository.findByRoomId(chatRoom.getRoomId());
        for (int i = 0; i<chatMessages.size(); i++) {

            //내 메시지를 상대방이 들어와서 읽었을 때만 0으로 바꿈
            if(chatMessages.get(i).getUserCount() >0 && !chatMessages.get(i).getSender().equals(sender)){
                chatMessages.get(i).setUserCount(0);
            }


        }
        chatRepository.saveAll(chatMessages);
    }


    //채팅방 개설
    public void makeRoom(AppUser user, ChatRoomDto.PostRequest dto){

        ChatRoom chatRoom = dto.toEntity(user);
        chatRoom.setSenderRequestStatus(RequestStatus.ACCEPT);
        chatRoom.setRoomId(UUID.randomUUID().toString());
        chatRoom.setSenderAccepted(true);
        chatRoomRepository.save(chatRoom);

    }

    //상대방 정보
    public void receiverAccept(ChatRoom chatRoom,AppUser user){

        ChatRoom chatRoom1 = chatRoomRepository.findByRoomId(chatRoom.getRoomId());
        System.out.println("chatRoom.getRoomName() = " + chatRoom.getRoomName());
        chatRoom1.setUser1(user);
        chatRoom1.setReceiverAccepted(true);
        chatRoom1.setReceiverRequestStatus(RequestStatus.ACCEPT);

        chatRoomRepository.save(chatRoom1);

    }

    public void receiverHold(ChatRoom chatRoom,AppUser user){

        ChatRoom chatRoom1 = chatRoomRepository.findByRoomId(chatRoom.getRoomId());
        chatRoom1.setUser1(user);
        chatRoom1.setReceiverRequestStatus(RequestStatus.HOLD);
        chatRoomRepository.save(chatRoom1);

    }
    public void receiverRefuse(ChatRoom chatRoom,AppUser user){

        ChatRoom chatRoom1 = chatRoomRepository.findByRoomId(chatRoom.getRoomId());
        chatRoom1.setUser1(user);
        chatRoom1.setReceiverRequestStatus(RequestStatus.REFUSE);
        chatRoomRepository.save(chatRoom1);

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
/*    public List<ChatRoomDto.Response> findSenderChatRoom(AppUser appuser){


        return chatRoomRepository.findByUserAndSenderAcceptedAndReceiverAccepted(appuser, true,true)
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }*/

    // 상대방 아이디로 채팅방 찾기
   /* public List<ChatRoomDto.Response> findReceiverChatRoom(AppUser appuser){


        return chatRoomRepository.findByUser1AndSenderAcceptedAndReceiverAccepted(appuser, true,true)
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }*/

    public List<ChatRoomDto.Response> findSenderChatRoom(AppUser appuser){


        return chatRoomRepository.findByUserAndSenderRequestStatusAndReceiverRequestStatus(appuser, RequestStatus.ACCEPT,RequestStatus.ACCEPT)
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }

    public List<ChatRoomDto.Response> findReceiverChatRoom(AppUser appuser){


        return chatRoomRepository.findByUser1AndSenderRequestStatusAndReceiverRequestStatus(appuser, RequestStatus.ACCEPT,RequestStatus.ACCEPT)
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }

    @Scheduled(cron = "10 * * * * ?") //매일 오전 9시에 만료된 데이터가 삭제됨
    public void deleteExpiredData() {
        List<ChatRoom> chatRooms = chatRoomRepository.findByExpireDateBefore(LocalDateTime.now());
        for (int i = 0; i < chatRooms.size(); i++) {
            if(!chatRooms.get(i).getReceiverRequestStatus().equals(RequestStatus.ACCEPT)){
                chatRoomRepository.delete(chatRooms.get(i));
            }

        }
    }

    public List<ChatMessageDto.Response> getLatestMessage(ChatRoom chatRoom){
        return chatRepository.findByLatestMessageTime(chatRoom.getRoomId())
                .stream()
                .map(message -> new ChatMessageDto.Response(message))
                .collect(Collectors.toList());
    }

    public ChatMessageDto.Response getLatestMessage1(ChatRoom chatRoom){
        ChatMessage chatMessage = chatRepository.findByLatestMessageTime(chatRoom.getRoomId()).get(0);
        return new ChatMessageDto.Response(chatMessage);
    }



}

