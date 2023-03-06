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
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.ChatMessageRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {
    private final ChatRoomRepo chatRoomRepo;
    private final ChatMessageRepo chatMessageRepo;
    private final UserRepo userRepo;
    private final ChatMessageService chatMessageService;
    private final UserService userService;

    //채팅방의 메시지들 조회
    public void updateReadStatus(ChatRoom chatRoom, String sender){
        List<ChatMessage> chatMessages = chatMessageRepo.findByChatRoom(chatRoom);
        for (ChatMessage chatMessage : chatMessages) {
            if(chatMessage.isReadStatus() == false && !chatMessage.getSender().equals(sender)){
                chatMessage.setReadStatus(true);
            }
        }
        chatMessageRepo.saveAll(chatMessages);
    }

    @Transactional
    public void makeRoom(AppUser user, ChatRoomDto.RoomRequest dto){
        ChatRoom chatRoom = dto.toEntity(user);
        String id = UUID.randomUUID().toString();
        AppUser user2 = userRepo.findByUsername(dto.getUsername());
        chatRoom.setRoomId(id);
        chatRoom.setUser2(user2);
        chatRoom.setResponse(ResponseType.HOLD);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void user2Accept(String roomId,AppUser user, ResponseType responseType){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if (!chatRoom.getUser2().equals(user)) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        chatRoom.setResponse(responseType);
        chatRoomRepo.save(chatRoom);
    }


    @Transactional
    public ChatRoom findChatRoom(String roomId){
        return chatRoomRepo.findByRoomId(roomId);
    }

    @Transactional
    public ChatRoom findChatById(Long id){
        return chatRoomRepo.findById(id).orElseThrow();
    }

    @Transactional
    public void blockUser(String roomId, AppUser appUser, Boolean isTrue){

        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);

        if (!appUser.equals(chatRoom.getUser1()) && !appUser.equals(chatRoom.getUser2())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        if(appUser.getId().equals(chatRoom.getUser1().getId())){
            chatRoom.setUser2Blocked(isTrue);
            chatRoomRepo.save(chatRoom);
        }
        else {
            chatRoom.setUser1Blocked(isTrue);
            chatRoomRepo.save(chatRoom);
        }
    }

    @Transactional
    public void setAlarm(String roomId, AppUser appUser, Boolean isTrue){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);

        if (!appUser.equals(chatRoom.getUser1()) && !appUser.equals(chatRoom.getUser2())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        if(appUser.getId().equals(chatRoom.getUser1().getId())){
            chatRoom.setUser1AlarmOn(isTrue);
            chatRoomRepo.save(chatRoom);
        }

        else  {
            chatRoom.setUSer2AlarmOn(isTrue);
            chatRoomRepo.save(chatRoom);
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
            if(chatRooms.get(i).getResponse().equals(ResponseType.HOLD)){
                chatRoomRepo.delete(chatRooms.get(i));
            }
        }
    }

    public ChatRoomDto.settingResponse getSettingResponse(ChatRoom chatRoom){
        return new ChatRoomDto.settingResponse(chatRoom);
    }

    public ChatRoomDto.userResponse getUserRoomDto(ChatRoom chatRoom){
        return new ChatRoomDto.userResponse(chatRoom);
    }

    public DebeziumDto.UserChatInfo getUserChatInfo(String username){
        UserDto.chatRoomResponse userInfo = userService.getChatRoomUser(username);
        List<ChatRoomDto.Response> userChatMessages = chatMessageService.getChatList(username);
        DebeziumDto.UserChatInfo userChatInfo = new DebeziumDto.UserChatInfo(userInfo,userChatMessages);
        return userChatInfo;
    }

}

