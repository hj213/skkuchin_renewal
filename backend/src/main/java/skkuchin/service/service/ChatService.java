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
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.api.dto.ChatRoomDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Chat.RequestStatus;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.r2dbcRepo.ChatRepo;
import skkuchin.service.r2dbcRepo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import org.springframework.transaction.annotation.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepo chatRoomRepo;
    private final ChatRepo chatRepo;
    private final UserRepo userRepo;


    //전체 채팅방 조회
   /* public List<ChatRoomDto.Response> getAllRoom(){
        return chatRoomRepo.findAll()
                .stream()
                .map(chatroom -> new ChatRoomDto.Response(
                        chatroom))
                .collect(Collectors.toList());

    }*/

    //채팅방의 메시지들 조회
    @Transactional("r2dbcTransactionManager")
    public Flux<ChatMessageDto.Response> getAllMessage(ChatRoom chatRoom) {
        return chatRepo.findByRoomId(chatRoom.getRoomId())
                .map(message -> new ChatMessageDto.Response(message));
    }


    //상대가 읽은 메시지 카운트 0으로 바꿈
    @Transactional("r2dbcTransactionManager")
    public Flux<ChatMessage> getAllMessage1(ChatRoom chatRoom, String sender) {
        return chatRepo.findByRoomId(chatRoom.getRoomId())
                .flatMap(chatMessage -> {
                    if (chatMessage.getUserCount() > 0 && !chatMessage.getSender().equals(sender)) {
                        chatMessage.setUserCount(0);
                    }
                    return chatRepo.save(chatMessage);
                });
    }

    //채팅방 개설
    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> makeRoom(AppUser user, ChatRoomDto.PostRequest dto) {
        ChatRoom chatRoom = dto.toEntity(user);
        chatRoom.setRoomId(UUID.randomUUID().toString());
        return chatRoomRepo.save(chatRoom);
    }

    //상대방 정보
    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> receiverAccept(String roomId, AppUser user) {
        return chatRoomRepo.findByRoomId(roomId)
                .flatMap(chatRoom1 -> {
                    chatRoom1.setUser1Id(user.getId());
                    chatRoom1.setReceiverRequestStatus(RequestStatus.ACCEPT);
                    return chatRoomRepo.save(chatRoom1);
                });
    }


    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> receiverHold(String roomId, AppUser user) {
        return chatRoomRepo.findByRoomId(roomId)
                .flatMap(chatRoom1 -> {
                    chatRoom1.setUser1Id(user.getId());
                    chatRoom1.setReceiverRequestStatus(RequestStatus.HOLD);
                    return chatRoomRepo.save(chatRoom1);
                });
    }

    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> receiverRefuse(String roomId, AppUser user) {
        return chatRoomRepo.findByRoomId(roomId)
                .flatMap(chatRoom1 -> {
                    chatRoom1.setUser1Id(user.getId());
                    chatRoom1.setReceiverRequestStatus(RequestStatus.REFUSE);
                    return chatRoomRepo.save(chatRoom1);
                });
    }


    //채팅방 인원 조정
    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> updateCount(ChatRoom chatRoom) {
        chatRoom.setUserCount(chatRoom.getUserCount() + 1);
        return chatRoomRepo.save(chatRoom);
    }

    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> minusCount(ChatRoom chatRoom) {
        chatRoom.setUserCount(chatRoom.getUserCount() - 1);
        return chatRoomRepo.save(chatRoom);
    }

    // 특정 룸 아이디로 채팅방 찾기
    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> findChatroom(String roomId){
        return chatRoomRepo.findByRoomId(roomId);
    }

    @Transactional("r2dbcTransactionManager")
    public Flux<ChatRoomDto.Response> getSenderChatRoom(AppUser appuser) {
        return chatRoomRepo.findByNormalSenderId(appuser.getId())
                .flatMap(chatroom -> getLatestMessage1(chatroom.getRoomId())
                        .map(latestMessage -> new ChatRoomDto.Response(chatroom, latestMessage))
                );
    }

    @Transactional("r2dbcTransactionManager")
    public Flux<ChatRoomDto.Response> getReceiverChatRoom(AppUser appuser) {
        return chatRoomRepo.findByNormalReceiverId(appuser.getId())
                .flatMap(chatroom -> getLatestMessage1(chatroom.getRoomId())
                        .map(chatMessage -> new ChatRoomDto.Response(chatroom, chatMessage))
                );
    }

    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> blockUser(String roomId, AppUser appUser){
        Mono<ChatRoom> chatRoomMono = chatRoomRepo.findByRoomId(roomId);
        return chatRoomMono.flatMap(chatRoom -> {
                    if (appUser.getId() == chatRoom.getUserId()){
                        chatRoom.setReceiverBlocked(true);
                    }
                    else if (appUser.getId() == chatRoom.getUser1Id()){
                        chatRoom.setSenderBlocked(true);
                    }
                    return chatRoomRepo.save(chatRoom);
                });
    }

    @Transactional("r2dbcTransactionManager")
    public Mono<ChatRoom> removeBlockedUser(String roomId, AppUser appUser){
        Mono<ChatRoom> chatRoomMono = chatRoomRepo.findByRoomId(roomId);
        return chatRoomMono.flatMap(chatRoom -> {
            if (appUser.getId() == chatRoom.getUserId()){
                chatRoom.setReceiverBlocked(false);
            }
            else if (appUser.getId() == chatRoom.getUser1Id()){
                chatRoom.setSenderBlocked(false);
            }
            return chatRoomRepo.save(chatRoom);
        });
    }

    @Transactional("r2dbcTransactionManager")
    @Scheduled(cron = "* 0 * * * ?")
    public void deleteExpiredData() {
        chatRoomRepo.findByExpireDateBefore(LocalDateTime.now())
                .filter(chatRoom -> !chatRoom.getReceiverRequestStatus().equals(RequestStatus.ACCEPT))
                .flatMap(chatRoomRepo::delete)
                .doOnError(error -> {
                    // This block will be executed if there is an error during the database operation
                    System.err.println("Error saving room: " + error.getMessage());
                })
                .subscribe();
    }


   /* @Scheduled(cron = "* 0 0 * * ?")*/ //자정에 display 시간 변경*/
    /*@Scheduled(cron = "10 * * * * ?")*/
   /* public void setDisplayDateTime() {
        List<ChatRoom> chatRooms = chatRoomRepo.findAll();
        LocalDateTime dateTimeNow = LocalDateTime.now();
        LocalDate dateNow = dateTimeNow.toLocalDate();
        for (int i = 0; i < chatRooms.size(); i++) {
            LocalDateTime recordedDateTime = chatRooms.get(i).getLatestMessageTime();
            LocalDate recordedDate = recordedDateTime.toLocalDate();
            Period diff = Period.between(recordedDate, dateNow);
            if(diff.getDays() == 1  && diff.getMonths() ==0 && diff.getYears() ==0) {
                chatRooms.get(i).setDisplayMessageTime("어제");
                chatRoomRepo.save(chatRooms.get(i));
            }
            else if(diff.getDays() == 0  && diff.getMonths() ==0 && diff.getYears() ==0){
                chatRooms.get(i).setDisplayMessageTime(recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "a h:mm")));
                chatRoomRepo.save(chatRooms.get(i));
            }
            else{
                chatRooms.get(i).setDisplayMessageTime(recordedDateTime.format(DateTimeFormatter.ofPattern("" +
                        "yyyy-MM-dd")));
                chatRoomRepo.save(chatRooms.get(i));
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
    @Transactional("r2dbcTransactionManager")
    public Flux<ChatMessageDto.Response> getLatestMessages(String roomId) {
        return chatRepo.findByLatestMessageTime(roomId)
                .map(ChatMessageDto.Response::new);
    }

    @Transactional("r2dbcTransactionManager")
    public Mono<ChatMessageDto.Response> getLatestMessage(String roomId) {
        return chatRepo.findByLatestMessageTime(roomId)
                .elementAt(0)
                .map(ChatMessageDto.Response::new);
    }

    @Transactional("r2dbcTransactionManager")
    public Mono<ChatMessage> getLatestMessage1(String roomId) {
        System.out.println(roomId);
        return chatRepo.findFirstByRoomIdOrderByDateDesc(roomId)
                .defaultIfEmpty(new ChatMessage())
                .map(chatMessage -> {
                    if (chatMessage.getDate() == null) {
                        chatMessage.setDate(LocalDateTime.now());
                    }
                    return chatMessage;
                });
    }


    public void insertData(String path) throws IOException, ParseException {

        if (chatRoomRepo.count().defaultIfEmpty(0L).block() < 1) { //db가 비어있을 때만 실행


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
               chatRoomRepo.save(dto.toEntity(users.get(i%2))).block();
            }
        }
    }



}

