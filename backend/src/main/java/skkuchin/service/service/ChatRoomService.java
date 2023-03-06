package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.DebeziumDto;
import skkuchin.service.dto.UserDto;
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
public class ChatRoomService {
    private final ChatRoomRepo chatRoomRepo;
    private final ChatRepo chatRepo;
    private final UserRepo userRepo;
    private final ChatMessageService chatMessageService;
    private final UserService userService;


    //채팅방의 메시지들 조회



    public void updateReadStatus(ChatRoom chatRoom, String sender){
        List<ChatMessage> chatMessages = chatRepo.findByChatRoom(chatRoom);
        for (int i = 0; i<chatMessages.size(); i++) {
            if(chatMessages.get(i).isReadStatus() == false && !chatMessages.get(i).getSender().equals(sender)){
                chatMessages.get(i).setReadStatus(true);
            }
        }
        chatRepo.saveAll(chatMessages);
    }


    @Transactional
    public void makeRoom(AppUser user, ChatRoomDto.RoomRequest dto){
        ChatRoom chatRoom = dto.toEntity(user);
        String id = UUID.randomUUID().toString();
        AppUser user2 = userRepo.findByUsername(dto.getUsername());
        chatRoom.setRoomId(id);
        chatRoom.setUser2(user2);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void user2Accept(ChatRoom chatRoom,AppUser user, ResponseType responseType){
        if(responseType.equals(ResponseType.ACCEPT)){
            chatRoom.setResponse(ResponseType.ACCEPT);
            chatRoomRepo.save(chatRoom);
        }
        else if(responseType.equals(ResponseType.REFUSE) ){
            chatRoom.setResponse(ResponseType.REFUSE);
            chatRoomRepo.save(chatRoom);
        }
        else if(responseType.equals(ResponseType.HOLD)){
            chatRoom.setResponse(ResponseType.HOLD);
            chatRoomRepo.save(chatRoom);
        }
    }


    @Transactional
    public ChatRoom findChatroom(String roomId){
        ChatRoom chatroom = chatRoomRepo.findByRoomId(roomId);
        return chatroom;
    }

    @Transactional
    public ChatRoom findChatById(Long id){
        ChatRoom chatroom = chatRoomRepo.findById(id).orElseThrow();
        return chatroom;
    }



    @Transactional
    public void blockUser(ChatRoom chatRoom, AppUser appUser, Boolean isTrue){
        if(isTrue.equals(true)){
            if(appUser.getId() == chatRoom.getUser1().getId()){
                chatRoom.setUser1Blocked(true);
                chatRoomRepo.save(chatRoom);
            }
            else if(appUser.getId() == chatRoom.getUser2().getId()){
                chatRoom.setUser2Blocked(true);
                chatRoomRepo.save(chatRoom);
            }
        }
        else{
            if(appUser.getId() == chatRoom.getUser1().getId()){
                chatRoom.setUser1Blocked(false);
                chatRoomRepo.save(chatRoom);
            }
            else if(appUser.getId() == chatRoom.getUser2().getId()){
                chatRoom.setUser2Blocked(false);
                chatRoomRepo.save(chatRoom);
            }

        }

    }


    @Transactional
    public void setAlarm(ChatRoom chatRoom, AppUser appUser, Boolean isTrue){
        if(isTrue.equals(true)){
            if(appUser.getId() == chatRoom.getUser1().getId()){
                chatRoom.setUser1AlarmOn(true);
                chatRoomRepo.save(chatRoom);
            }
            else if(appUser.getId() == chatRoom.getUser2().getId()){
                chatRoom.setUSer2AlarmOn(true);
                chatRoomRepo.save(chatRoom);
            }
        }
        else{
            if(appUser.getId() == chatRoom.getUser1().getId()){
                chatRoom.setUser1AlarmOn(false);
                chatRoomRepo.save(chatRoom);
            }
            else if(appUser.getId() == chatRoom.getUser2().getId()){
                chatRoom.setUSer2AlarmOn(false);
                chatRoomRepo.save(chatRoom);
            }
        }

    }


    @Transactional
    public void exitRoom(String roomId, AppUser appUser){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if(appUser.getId().equals(chatRoom.getUser1().getId())){
            chatRoom.setUser1(null);
            chatRoomRepo.save(chatRoom);
        }

        else if(appUser.getId().equals(chatRoom.getUser2().getId())){
            chatRoom.setUser2(null);
            chatRoomRepo.save(chatRoom);
        }

    }





    @Transactional
    @Scheduled(cron = "* 0 * * * ?") //정각에 만료된 데이터가 삭제됨
    public void deleteExpiredData() {
        List<ChatRoom> chatRooms = chatRoomRepo.findByExpireDateBefore(LocalDateTime.now());
        for (int i = 0; i < chatRooms.size(); i++) {
            if(!chatRooms.get(i).getResponse().equals(ResponseType.ACCEPT)){
                chatRoomRepo.delete(chatRooms.get(i));
            }

        }
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

    public DebeziumDto.UserChatInfo getUserChatInfo(String username){
        UserDto.chatRoomResponse userInfo = userService.getChatRoomUser(username);
        List<ChatRoomDto.Response> userChatMessages = chatMessageService.getChatList(username);
        DebeziumDto.UserChatInfo userChatInfo = new DebeziumDto.UserChatInfo(userInfo,userChatMessages);
        return userChatInfo;
    }






}

