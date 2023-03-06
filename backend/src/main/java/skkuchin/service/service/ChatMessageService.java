package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.ChatMessageDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatMessageRepo;
import skkuchin.service.repo.ChatRoomRepo;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageService {
    private final ChatRoomRepo chatRoomRepo;
    private final ChatMessageRepo chatMessageRepo;

    @Transactional
    public void write(AppUser user, ChatMessageDto.Request dto){
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(dto.getRoomId());
        ChatMessage chatMessage = dto.toEntity(chatRoom,user);
        chatMessageRepo.save(chatMessage);
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
            if (f1.getDate().isAfter(f2.getDate()) ) {
                return 1;
            } else  {
                return -1;
            }
        }
    }

}
