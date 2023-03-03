package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatService {
    private final ChatRoomRepo chatRoomRepository;
    private final ChatRepo chatRepository;
    private final UserRepo userRepo;
    private final ChatMessageService chatMessageService;


    //채팅방의 메시지들 조회
    public List<ChatMessageDto.Response> getAllMessage(ChatRoom chatRoom){
        return chatRepository.findByChatRoom(chatRoom)
                .stream()
                .map(message -> new ChatMessageDto.Response(message))
                .collect(Collectors.toList());
    }


    public void updateReadStatus(ChatRoom chatRoom, String sender){
        List<ChatMessage> chatMessages = chatRepository.findByChatRoom(chatRoom);
        for (int i = 0; i<chatMessages.size(); i++) {
            if(chatMessages.get(i).isReadStatus() == false && !chatMessages.get(i).getSender().equals(sender)){
                chatMessages.get(i).setReadStatus(true);
            }
        }
        chatRepository.saveAll(chatMessages);
    }


    @Transactional
    public void makeRoom(AppUser user, ChatRoomDto.PostRequest dto){
        ChatRoom chatRoom = dto.toEntity(user);
        String id = UUID.randomUUID().toString();
        AppUser user1 = userRepo.findByUsername(dto.getUserName());
        chatRoom.setRoomId(id);
        chatRoom.setUser2(user1);
        chatRoomRepository.save(chatRoom);
    }

    @Transactional
    public void user2Accept(ChatRoom chatRoom,AppUser user, String status){
        if(status.equals("ACCEPT")){
            chatRoom.setResponse(ResponseType.ACCEPT);
            chatRoomRepository.save(chatRoom);
        }
        else if(status.equals("REFUSE") ){
            chatRoom.setResponse(ResponseType.REFUSE);
            chatRoomRepository.save(chatRoom);
        }
        else if(status.equals("HOLD")){
            chatRoom.setResponse(ResponseType.HOLD);
            chatRoomRepository.save(chatRoom);
        }
    }


    @Transactional
    public ChatRoom findChatroom(String roomId){
        ChatRoom chatroom = chatRoomRepository.findByRoomId(roomId);
        return chatroom;
    }

    @Transactional
    public ChatRoom findChatById(Long id){
        ChatRoom chatroom = chatRoomRepository.findById(id).orElseThrow();
        return chatroom;
    }



    @Transactional
    public void blockUser(ChatRoom chatRoom, AppUser appUser){
        if(appUser.getId() == chatRoom.getUser1().getId()){
            chatRoom.setUser1Blocked(true);
            chatRoomRepository.save(chatRoom);
        }
        else if(appUser.getId() == chatRoom.getUser2().getId()){
            chatRoom.setUser2Blocked(true);
            chatRoomRepository.save(chatRoom);
        }
    }


    @Transactional
    public void removeBlockedUser(ChatRoom chatRoom, AppUser appUser){
        if(appUser.getId() == chatRoom.getUser1().getId()){
            chatRoom.setUser1Blocked(false);
            chatRoomRepository.save(chatRoom);
        }
        else if(appUser.getId() == chatRoom.getUser2().getId()){
            chatRoom.setUser2Blocked(false);
            chatRoomRepository.save(chatRoom);
        }
    }
    @Transactional
    public void setAlarm(ChatRoom chatRoom, AppUser appUser){
        if(appUser.getId() == chatRoom.getUser1().getId()){
            chatRoom.setUser1AlarmOn(true);
            chatRoomRepository.save(chatRoom);
        }
        else if(appUser.getId() == chatRoom.getUser2().getId()){
            chatRoom.setUSer2AlarmOn(true);
            chatRoomRepository.save(chatRoom);
        }
    }

    @Transactional
    public void disableAlarm(ChatRoom chatRoom, AppUser appUser){
        if(appUser.getId() == chatRoom.getUser1().getId()){
            chatRoom.setUser1AlarmOn(false);
            chatRoomRepository.save(chatRoom);
        }
        else if(appUser.getId() == chatRoom.getUser2().getId()){
            chatRoom.setUSer2AlarmOn(false);
            chatRoomRepository.save(chatRoom);
        }
    }

    @Transactional
    public void exitRoom(String roomId, AppUser appUser){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        if(appUser.getId().equals(chatRoom.getUser1().getId())){
            chatRoom.setUser1(null);
            chatRoomRepository.save(chatRoom);
        }

        else if(appUser.getId().equals(chatRoom.getUser2().getId())){
            chatRoom.setUser2(null);
            chatRoomRepository.save(chatRoom);
        }

    }





    @Transactional
    @Scheduled(cron = "* 0 * * * ?") //정각에 만료된 데이터가 삭제됨
    public void deleteExpiredData() {
        List<ChatRoom> chatRooms = chatRoomRepository.findByExpireDateBefore(LocalDateTime.now());
        for (int i = 0; i < chatRooms.size(); i++) {
            if(!chatRooms.get(i).getResponse().equals(ResponseType.ACCEPT)){
                chatRoomRepository.delete(chatRooms.get(i));
            }

        }
    }


    @Transactional
    public List<ChatMessageDto.Response> getLatestMessage(ChatRoom chatRoom){
        return chatRepository.findByLatestMessageTime(chatRoom.getRoomId())
                .stream()
                .map(message -> new ChatMessageDto.Response(message))
                .collect(Collectors.toList());
    }


    public ChatRoomDto.blockResponse getRoomDto(ChatRoom chatRoom){
        return new ChatRoomDto.blockResponse(chatRoom);
    }

    public ChatRoomDto.userResponse getUserRoomDto(ChatRoom chatRoom){
        return new ChatRoomDto.userResponse(chatRoom);
    }



    @Transactional
    public AppUser findUser1(ChatRoom chatRoom){
        AppUser user = userRepo.findById(chatRoom.getUser1().getId()).orElseThrow();
        return user;
    }

    @Transactional
    public AppUser findUser2(ChatRoom chatRoom){
        AppUser user = userRepo.findById(chatRoom.getUser2().getId()).orElseThrow();
        return user;
    }


}

