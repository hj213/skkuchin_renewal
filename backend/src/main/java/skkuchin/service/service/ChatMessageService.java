package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ChatMessageRepo;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageService {
    private final ChatRoomRepo chatRoomRepo;
    private final ChatMessageRepo chatMessageRepo;
    private final UserRepo userRepo;

    @Transactional
    public void write(AppUser user, ChatMessageDto.Request dto){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(dto.getRoomId());
        if (chatRoom == null) {
            throw new CustomRuntimeException("올바르지 않은 접근입니다");
        }

//        if (!Objects.equals(chatRoom.getUser1().getId(), user.getId()) &&
//            !Objects.equals(chatRoom.getUser2().getId(), user.getId()) &&
//            !Objects.equals(user.getUsername(), "admin")
//        ) {
//            throw new CustomRuntimeException("올바르지 않은 접근입니다");
//        }
        ChatMessage chatMessage = dto.toEntity(chatRoom, user);

        if (Objects.equals(user.getUsername(), "admin")) {
            chatMessage.setReadStatus(true);
        }
        chatMessageRepo.save(chatMessage);
    }

    @Transactional
    public void readMessage(Long messageId, AppUser user, ChatMessageDto.BooleanRequest dto) {
        ChatMessage chatMessage = chatMessageRepo.findById(messageId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 메시지입니다"));

//        if (!Objects.equals(user, chatMessage.getChatRoom().getUser1()) && !Objects.equals(user, chatMessage.getChatRoom().getUser2())) {
//            throw new CustomRuntimeException("올바르지 않은 접근입니다");
//        }

        chatMessage.setReadStatus(dto.getRead());
        chatMessageRepo.save(chatMessage);
    }

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
    public List<ChatMessageDto.Response> getAllMessage(ChatRoom chatRoom){
        List<ChatMessageDto.Response> messages = chatMessageRepo.findByChatRoom(chatRoom)
                .stream()
                .map(message -> new ChatMessageDto.Response(message,chatRoom))
                .collect(Collectors.toList());
        Collections.sort(messages, new MessageDateComparator().reversed());
        return messages;
    }

    private class MessageDateComparator implements Comparator<ChatMessageDto.Response> {
        @Override
        public int compare(ChatMessageDto.Response f1, ChatMessageDto.Response f2) {
            if (f1.getTime().isAfter(f2.getTime()) ) {
                return 1;
            } else  {
                return -1;
            }
        }
    }

    public void insertData() throws IOException, ParseException {
        AppUser adminUser = userRepo.findById(1L).orElseThrow();
        AppUser testUser = userRepo.findById(2L).orElseThrow();
        List<ChatRoom> chatRooms = chatRoomRepo.findMyRoomList(2L);
        String chatRoomId1 = chatRooms.get(0).getRoomId();

        ChatMessageDto.Request dto = new ChatMessageDto.Request("하이요", chatRoomId1);
        write(adminUser, dto);
        ChatMessageDto.Request dto1 = new ChatMessageDto.Request("ㅎㅇ", chatRoomId1);
        write(testUser, dto1);
        ChatMessageDto.Request dto2 = new ChatMessageDto.Request("뭐해", chatRoomId1);
        write(adminUser, dto2);
        ChatMessageDto.Request dto3 = new ChatMessageDto.Request("코딩", chatRoomId1);
        write(testUser, dto3);
        ChatMessageDto.Request dto4 = new ChatMessageDto.Request("그렇구나", chatRoomId1);
        write(adminUser, dto4);
        ChatMessageDto.Request dto5 = new ChatMessageDto.Request("응", chatRoomId1);
        write(testUser, dto5);
    }

}
