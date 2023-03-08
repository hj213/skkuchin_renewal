package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.PlaceDto;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.ChatMessageRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {
    private final ChatRoomRepo chatRoomRepo;
    private final ChatMessageRepo chatMessageRepo;
    private final UserRepo userRepo;

    @Transactional
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
        if (user.getUsername().equals(dto.getUsername())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }
        ChatRoom chatRoom = dto.toEntity(user);
        String id = UUID.randomUUID().toString();
        AppUser user2 = userRepo.findByUsername(dto.getUsername());
        chatRoom.setRoomId(id);
        chatRoom.setUser2(user2);
        chatRoom.setResponse(ResponseType.HOLD);
        chatRoom.setUser1AlarmOn(true);
        chatRoom.setUSer2AlarmOn(true);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void user2Accept(String roomId, AppUser user, ResponseType responseType){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if (chatRoom.getUser2().getId() != user.getId()) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        chatRoom.setResponse(responseType);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public List<ChatRoomDto.Response> getChatRoomList(String username){
        AppUser user = userRepo.findByUsername(username);
        List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(user.getId());

        if (chatRooms.size() > 0) {
            List<ChatRoomDto.Response> chatRoomDtos = chatRooms
                    .stream()
                    .map(chatRoom -> new ChatRoomDto.Response(
                            chatRoom,
                            getLatestMessage(chatRoom),
                            unReadMessage(chatRoom.getRoomId(), username),
                            getOtherUser(chatRoom, username)
                    ))
                    .collect(Collectors.toList());
            Collections.sort(chatRoomDtos,new DateComparator().reversed());

            return chatRoomDtos;
        }
        List<ChatRoomDto.Response> chatRoomDto = new ArrayList<>();
        return chatRoomDto;
    }

    @Transactional
    public List<ChatRoomDto.userResponse> getAlarmList(String username){
        AppUser user = userRepo.findByUsername(username);
        List<ChatRoom> chatRooms = chatRoomRepo.findRequestByUserId(user.getId());
        List<ChatRoomDto.userResponse> chatRoomDto = chatRooms
                .stream()
                .map(chatRoom -> new ChatRoomDto.userResponse(chatRoom))
                .collect(Collectors.toList());
        Collections.sort(chatRoomDto, new AlarmListDateComparator().reversed());
        return chatRoomDto;
    }

    private AppUser getOtherUser(ChatRoom chatRoom, String username){
        AppUser user = userRepo.findByUsername(username);
        if (chatRoom.getUser1().equals(user)) {
            return chatRoom.getUser2();
        } else {
            return chatRoom.getUser1();
        }
    }

    private int unReadMessage(String roomId, String username){
        return chatMessageRepo.countByReadStatus(roomId, username);
    }

    private ChatMessage getLatestMessage(ChatRoom chatRoom){
        List<ChatMessage> chatMessages = chatMessageRepo.findByLatestTime(chatRoom.getRoomId());
        ChatMessage chatMessage = new ChatMessage();
        if (chatMessages.size() == 0) {
            chatMessage.setMessage("새로운 채팅방이 개설되었습니다");
            chatMessage.setDate(chatRoom.getExpireDate().minusDays(2));
            return chatMessage;
        }
        chatMessage = chatMessages.get(0);
        return chatMessage;
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

    @Transactional
    public ChatRoomDto.settingResponse getSettingResponse(ChatRoom chatRoom){
        return new ChatRoomDto.settingResponse(chatRoom);
    }

    private class DateComparator implements Comparator<ChatRoomDto.Response> {
        @Override
        public int compare(ChatRoomDto.Response f1, ChatRoomDto.Response f2) {
            if (f1.getMessageTime().isAfter(f2.getMessageTime()) ) {
                return 1;
            } else  {
                return -1;
            }
        }
    }

    private class AlarmListDateComparator implements Comparator<ChatRoomDto.userResponse> {
        @Override
        public int compare(ChatRoomDto.userResponse f1, ChatRoomDto.userResponse f2) {
            if (f1.getCreatedDate().isAfter(f2.getCreatedDate()) ) {
                return 1;
            } else  {
                return -1;
            }
        }
    }

    public void insertData() throws IOException, ParseException {
        AppUser adminUser = userRepo.findById(1L).orElseThrow();
        AppUser testUser = userRepo.findById(2L).orElseThrow();
        AppUser test1USer = userRepo.findById(3L).orElseThrow();
        AppUser test2USer = userRepo.findById(4L).orElseThrow();
        AppUser test3USer = userRepo.findById(5L).orElseThrow();
        AppUser test4USer = userRepo.findById(6L).orElseThrow();
        ChatRoomDto.RoomRequest dto = new ChatRoomDto.RoomRequest("test");
        makeRoom(adminUser, dto);
        makeRoom(test1USer, dto);
        makeRoom(test2USer, dto);
        makeRoom(test3USer, dto);
        makeRoom(test4USer, dto);

        List<ChatRoom> chatRooms = chatRoomRepo.findRequestByUserId(2L);

        for (int i = 0; i < 3; i++) {
            user2Accept(chatRooms.get(i).getRoomId() ,testUser, ResponseType.ACCEPT);
        }
        setAlarm(chatRooms.get(0).getRoomId() ,testUser, true);
        setAlarm(chatRooms.get(1).getRoomId() ,testUser, true);
    }

}

