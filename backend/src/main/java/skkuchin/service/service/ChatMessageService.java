package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ChatMessageDto;
import skkuchin.service.domain.Chat.ChatMessage;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.ChatRepo;
import skkuchin.service.repo.ChatRoomRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMessageService {

    private final ChatRoomRepo chatRoomRepo;
    private final ChatRepo chatRepo;
    @Transactional
    public void write(AppUser user, ChatMessageDto.PostRequest dto){

        ChatRoom chatRoom = chatRoomRepo.findById(dto.getChatRoomId()).orElseThrow();
        ChatMessage chatMessage = dto.toEntity(chatRoom,user);
        chatRepo.save(chatMessage);


    }
}
