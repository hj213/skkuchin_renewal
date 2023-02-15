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
import skkuchin.service.api.controller.BlockController;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.RequestStatus;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Block;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepo chatRoomRepository;
    private final ChatRepo chatRepository;
    private final UserRepo userRepo;
    private final BlockService blockService;

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
        chatRoomRepository.save(chatRoom);

    }

    //상대방 정보
    public void receiverAccept(ChatRoom chatRoom,AppUser user){

        ChatRoom chatRoom1 = chatRoomRepository.findByRoomId(chatRoom.getRoomId());
        System.out.println("chatRoom.getRoomName() = " + chatRoom.getRoomName());
        chatRoom1.setUser1(user);
        chatRoom1.setReceiverRequestStatus(RequestStatus.ACCEPT);
        chatRoom1.setLatestMessageTime(LocalDateTime.now());

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


    public List<ChatRoomDto.Response> getSenderChatRoom(AppUser appuser){

        List<Block> block = blockService.getBlockedUserList(appuser);
        List<ChatRoom> chatRooms;

        Long[] name = new Long[block.size()];

        for (int i = 0; i < block.size(); i++) {
            name[i] = block.get(i).getBlockedUser().getId();
            System.out.println("name[i] = " + name[i]);

        }

        if(block.size() == 0){
            chatRooms = chatRoomRepository.findByNormalSenderId(appuser.getId());
        }
        else{
            chatRooms = chatRoomRepository.findBySenderId(appuser.getId(),name);
        }



        return chatRooms
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }


    public List<ChatRoomDto.Response> getReceiverChatRoom(AppUser appuser){
        List<Block> block = blockService.getBlockedUserList(appuser);

        Long[] name = new Long[block.size()];
        List<ChatRoom> chatRooms;

        for (int i = 0; i < block.size(); i++) {
            name[i] = block.get(i).getBlockedUser().getId();
            System.out.println("name[i] = " + name[i]);

        }
        if(block.size() == 0){
            chatRooms =chatRoomRepository.findByNormalReceiverId(appuser.getId());
        }

        else{
            chatRooms = chatRoomRepository.findByReceiverId(appuser.getId(),name);
        }



        return chatRooms
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());
    }
    public void blockUser(ChatRoom chatRoom, AppUser appUser){
        if(appUser.getId() == chatRoom.getUser().getId()){
            chatRoom.setReceiverBlocked(true);
            chatRoomRepository.save(chatRoom);
        }
        else if(appUser.getId() == chatRoom.getUser1().getId()){
            chatRoom.setSenderBlocked(true);
            chatRoomRepository.save(chatRoom);
        }
    }

    public void removeBlockedUser(ChatRoom chatRoom, AppUser appUser){
        if(appUser.getId() == chatRoom.getUser().getId()){
            chatRoom.setReceiverBlocked(false);
            chatRoomRepository.save(chatRoom);
        }
        else if(appUser.getId() == chatRoom.getUser1().getId()){
            chatRoom.setSenderBlocked(false);
            chatRoomRepository.save(chatRoom);
        }
    }





    @Scheduled(cron = "* 0 * * * ?") //정각에 만료된 데이터가 삭제됨
    public void deleteExpiredData() {
        List<ChatRoom> chatRooms = chatRoomRepository.findByExpireDateBefore(LocalDateTime.now());
        for (int i = 0; i < chatRooms.size(); i++) {
            if(!chatRooms.get(i).getReceiverRequestStatus().equals(RequestStatus.ACCEPT)){
                chatRoomRepository.delete(chatRooms.get(i));
            }

        }
    }


    @Scheduled(cron = "* 0 0 * * ?") //자정에 display 시간 변경*/
    /*@Scheduled(cron = "10 * * * * ?")*/
    public void setDisplayDateTime() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAll();
        LocalDateTime dateTimeNow = LocalDateTime.now();
        LocalDate dateNow = dateTimeNow.toLocalDate();
        for (int i = 0; i < chatRooms.size(); i++) {
            LocalDateTime recordedDateTime = chatRooms.get(i).getLatestMessageTime();
            LocalDate recordedDate = recordedDateTime.toLocalDate();
            Period diff = Period.between(recordedDate, dateNow);
            if(diff.getDays() == 1  && diff.getMonths() ==0 && diff.getYears() ==0) {
                chatRooms.get(i).setDisplayMessageTime("어제");
                chatRoomRepository.save(chatRooms.get(i));
            }
            else if(diff.getDays() == 0  && diff.getMonths() ==0 && diff.getYears() ==0){
                chatRooms.get(i).setDisplayMessageTime(recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "a h:mm")));
                chatRoomRepository.save(chatRooms.get(i));
            }
            else{
                chatRooms.get(i).setDisplayMessageTime(recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "yyyy-MM-dd")));
                chatRoomRepository.save(chatRooms.get(i));
            }


        }
    }

    //방
    public List<ChatMessageDto.Response> getLatestMessages(ChatRoom chatRoom){
        return chatRepository.findByLatestMessageTime(chatRoom.getRoomId())
                .stream()
                .map(message -> new ChatMessageDto.Response(message))
                .collect(Collectors.toList());
    }

    public ChatMessageDto.Response getLatestMessage(ChatRoom chatRoom){
        ChatMessage chatMessage = chatRepository.findByLatestMessageTime(chatRoom.getRoomId()).get(0);
        return new ChatMessageDto.Response(chatMessage);
    }

    public void insertData(String path) throws IOException, ParseException {
        if (chatRoomRepository.count() < 0) { //db가 비어있을 때만 실행

            FileInputStream ins = new FileInputStream(path + "chatroom.json");
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject)parser.parse(
                    new InputStreamReader(ins, "UTF-8")
            );
            JSONArray jsonArray = (JSONArray) jsonObject.get("chatroom");
            Gson gson = new Gson();


            List<AppUser> users = userRepo.findAll();


            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject temp = (JSONObject) jsonArray.get(i);
                ChatRoomDto.TestPostRequest dto = gson.fromJson(temp.toString(), ChatRoomDto.TestPostRequest.class);
               chatRoomRepository.save(dto.toEntity(users.get(i%2)));


            }
        }
    }



}

