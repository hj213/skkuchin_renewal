package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.ResponseType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ChatMessageRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatRoomService {
    private final ChatMessageService chatMessageService;
    private final ChatRoomRepo chatRoomRepo;
    private final ChatMessageRepo chatMessageRepo;
    private final UserRepo userRepo;

    @Transactional
    public void makeRoom(AppUser user, ChatRoomDto.RoomRequest dto){
        if (user.getId().equals(dto.getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        ChatRoom chatRoom = dto.toEntity(user);
        String roomId = UUID.randomUUID().toString();
        AppUser user2 = userRepo.findById(dto.getId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));
        chatRoom.setRoomId(roomId);
        chatRoom.setUser2(user2);
        chatRoom.setResponse(ResponseType.HOLD);
        chatRoom.setUser1Alarm(true);
        chatRoom.setUser2Alarm(true);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void makeAdminRoom(ChatRoomDto.AdminRoomRequest dto){
        AppUser user1 = userRepo.findById(dto.getUser1Id()).orElseThrow();
        AppUser user2 = userRepo.findById(dto.getUser2Id()).orElseThrow();

        ChatRoom chatRoom = dto.toEntity(user1, user2);
        String roomId = UUID.randomUUID().toString();

        chatRoom.setRoomId(roomId);
        chatRoom.setResponse(ResponseType.ACCEPT);
        chatRoom.setUser1Alarm(true);
        chatRoom.setUser2Alarm(true);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void user2Accept(String roomId, AppUser user, ResponseType responseType){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);

        if (!chatRoom.getResponse().equals(ResponseType.HOLD)) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        if (!Objects.equals(chatRoom.getUser2().getId(), user.getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        chatRoom.setExpireDate(LocalDateTime.now().plusDays(2));
        chatRoom.setResponse(responseType);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public List<Long> getRequestUser(AppUser user) {
        return chatRoomRepo.findMyRequest(user.getId());
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
        if (chatRoom.getUser1().getId().equals(user.getId())) {
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
        ChatMessage latestChatMessage = new ChatMessage();
        if (chatMessages.size() == 0) {
            latestChatMessage.setMessage("채팅방이 개설되었습니다");
            latestChatMessage.setDate(chatRoom.getExpireDate().minusDays(2));
            return latestChatMessage;
        }
        for (ChatMessage chatMessage : chatMessages) {
            if (!"admin".equals(chatMessage.getSender())) {
                latestChatMessage = chatMessage;
                break;
            }
        }
        return latestChatMessage;
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
    public void blockUser(String roomId, AppUser appUser, Boolean status){

        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);

        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        if(appUser.getId().equals(chatRoom.getUser1().getId())){
            chatRoom.setUser2Blocked(status);
            chatRoomRepo.save(chatRoom);
        }
        else {
            chatRoom.setUser1Blocked(status);
            chatRoomRepo.save(chatRoom);
        }
    }

    @Transactional
    public void setAlarm(String roomId, AppUser appUser, Boolean status){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);

        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

        if (appUser.getId().equals(chatRoom.getUser1().getId())) {
            chatRoom.setUser1Alarm(status);
            chatRoomRepo.save(chatRoom);
        } else  {
            chatRoom.setUser2Alarm(status);
            chatRoomRepo.save(chatRoom);
        }
    }

    @Transactional
    public void setMeetTime(String roomId, AppUser appUser, LocalDateTime time){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }
        chatRoom.setMeetTime(time);
        chatRoomRepo.save(chatRoom);

        AppUser admin = userRepo.findByUsername("admin");

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M월 d일 (E) HH:mm", Locale.KOREAN);
        String timeStr = time.format(formatter);

        String message = timeStr + "\n" +
                "약속을 만들었어요. 약속을 꼭 지켜주세요!";

        ChatMessageDto.Request dto = new ChatMessageDto.Request(message, roomId);
        chatMessageService.write(admin, dto);
    }

    @Transactional
    public void setMeetPlace(String roomId, AppUser appUser, String place){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }
        chatRoom.setMeetPlace(place);
        chatRoomRepo.save(chatRoom);

        AppUser admin = userRepo.findByUsername("admin");
        String message = "우리 ‘" + place + "’에서 만나요!";
        ChatMessageDto.Request dto = new ChatMessageDto.Request(message, roomId);
        chatMessageService.write(admin, dto);
    }

    @Transactional
    public void deleteMeetTime(String roomId, AppUser appUser) {
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }
        LocalDateTime time = chatRoom.getMeetTime();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M월 d일 (E) HH:mm", Locale.KOREAN);
        String timeStr = time.format(formatter);

        AppUser admin = userRepo.findByUsername("admin");
        String message = timeStr + " 약속이 취소되었습니다";

        ChatMessageDto.Request dto = new ChatMessageDto.Request(message, roomId);
        chatMessageService.write(admin, dto);

        chatRoom.setMeetTime(null);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void deleteMeetPlace(String roomId, AppUser appUser) {
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }
        String place = chatRoom.getMeetPlace();

        AppUser admin = userRepo.findByUsername("admin");
        String message = place + " 약속이 취소되었습니다";

        ChatMessageDto.Request dto = new ChatMessageDto.Request(message, roomId);
        chatMessageService.write(admin, dto);

        chatRoom.setMeetPlace(null);
        chatRoomRepo.save(chatRoom);
    }

    @Transactional
    public void exitRoom(String roomId, AppUser appUser){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);

        if (!appUser.getId().equals(chatRoom.getUser1().getId()) && !appUser.getId().equals(chatRoom.getUser2().getId())) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

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
        AppUser testUser = userRepo.findById(2L).orElseThrow();
        AppUser test1USer = userRepo.findById(3L).orElseThrow();
        AppUser test2USer = userRepo.findById(4L).orElseThrow();
        AppUser test3USer = userRepo.findById(5L).orElseThrow();
        AppUser test4USer = userRepo.findById(6L).orElseThrow();
        AppUser test5USer = userRepo.findById(7L).orElseThrow();
        ChatRoomDto.RoomRequest dto = new ChatRoomDto.RoomRequest(2L);
        makeRoom(test1USer, dto);
        makeRoom(test2USer, dto);
        makeRoom(test3USer, dto);
        makeRoom(test4USer, dto);
        makeRoom(test5USer, dto);

        List<ChatRoom> chatRooms = chatRoomRepo.findRequestByUserId(2L);

        for (int i = 0; i < 3; i++) {
            user2Accept(chatRooms.get(i).getRoomId() ,testUser, ResponseType.ACCEPT);
        }
    }

}

