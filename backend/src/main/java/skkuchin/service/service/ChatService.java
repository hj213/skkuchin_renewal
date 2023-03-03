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
            if(chatMessages.get(i).isReadStatus() == false && !chatMessages.get(i).getSender().equals(sender)){
                chatMessages.get(i).setReadStatus(true);
            }


        }
        chatRepository.saveAll(chatMessages);
    }


    //채팅방 개설
    public void makeRoom(AppUser user, ChatRoomDto.PostRequest dto){

        ChatRoom chatRoom = dto.toEntity(user);
        String id = UUID.randomUUID().toString();
        AppUser user1 = userRepo.findByUsername(dto.getUserName());
        chatRoom.setRoomId(id);
        chatRoom.setUser2(user1);
        chatRoomRepository.save(chatRoom);


    }

    //상대방 정보
    public void receiverAccept(ChatRoom chatRoom,AppUser user, String status){
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
        List<ChatRoom> chatRooms;
        chatRooms = chatRoomRepository.findByNormalSenderId(appuser.getId());
        return chatRooms
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom,getLatestMessage1(chatroom)))
                .collect(Collectors.toList());
    }


    public List<ChatRoomDto.Response> getReceiverChatRoom(AppUser appuser){

        List<ChatRoom> chatRooms;
        chatRooms =chatRoomRepository.findByNormalReceiverId(appuser.getId());

        return chatRooms
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom, getLatestMessage1(chatroom)))
                .collect(Collectors.toList());
    }

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






    @Scheduled(cron = "* 0 * * * ?") //정각에 만료된 데이터가 삭제됨
    public void deleteExpiredData() {
        List<ChatRoom> chatRooms = chatRoomRepository.findByExpireDateBefore(LocalDateTime.now());
        for (int i = 0; i < chatRooms.size(); i++) {
            if(!chatRooms.get(i).getResponse().equals(ResponseType.ACCEPT)){
                chatRoomRepository.delete(chatRooms.get(i));
            }

        }
    }


   /* @Scheduled(cron = "* 0 0 * * ?")*/ //자정에 display 시간 변경*/
    /*@Scheduled(cron = "10 * * * * ?")*/
   /* public void setDisplayDateTime() {
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
    }*/

    /*@Scheduled(cron = "* 0 0 * * ?")*/ //자정에 display 시간 변경*/
    /*@Scheduled(cron = "10 * * * * ?")*/
   /* public void setDisplayDateTime1(ChatRoom chatRoom) {

        LocalDateTime dateTimeNow = LocalDateTime.now();
        LocalDate dateNow = dateTimeNow.toLocalDate();

        LocalDateTime recordedDateTime = chatRoom.getLatestMessageTime();
        LocalDate recordedDate = recordedDateTime.toLocalDate();
        Period diff = Period.between(recordedDate, dateNow);
        if(diff.getDays() == 1  && diff.getMonths() ==0 && diff.getYears() ==0) {
                chatRoom.setDisplayMessageTime("어제");

        }
        else if(diff.getDays() == 0  && diff.getMonths() ==0 && diff.getYears() ==0){
            chatRoom.setDisplayMessageTime(recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "a h:mm")));

            }
        else{
            chatRoom.setDisplayMessageTime(recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "yyyy-MM-dd")));

            }



    }*/

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

    public ChatRoomDto.blockResponse getRoomDto(ChatRoom chatRoom){
        return new ChatRoomDto.blockResponse(chatRoom);
    }

    public ChatRoomDto.userResponse getUserRoomDto(ChatRoom chatRoom){
        return new ChatRoomDto.userResponse(chatRoom);
    }

    public ChatMessage getLatestMessage1(ChatRoom chatRoom){

        ChatMessage chatMessage = new ChatMessage() ;
        if(chatRepository.findByLatestMessageTime(chatRoom.getRoomId()).size() == 0){
            chatMessage.setDate(LocalDateTime.now());
        }
        else{
            chatMessage = chatRepository.findByLatestMessageTime(chatRoom.getRoomId()).get(0);

        }
        return chatMessage;
    }


    @Transactional
    public AppUser findUser(ChatRoom chatRoom){

        AppUser user = userRepo.findById(chatRoom.getUser1().getId()).orElseThrow();
        return user;
    }

    @Transactional
    public AppUser findUser1(ChatRoom chatRoom){

        AppUser user = userRepo.findById(chatRoom.getUser2().getId()).orElseThrow();
        return user;
    }

    @Transactional
    public AppUser findUserById(Long id){

        AppUser user = userRepo.findById(id).orElseThrow();
        return user;
    }


}

