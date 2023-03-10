package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.PushTokenDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.PushToken;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.PushTokenRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PushTokenService {
    private final PushTokenRepo pushTokenRepo;

    @Transactional
    public PushTokenDto.Response get(AppUser user) {
        PushToken pushToken = pushTokenRepo.findByUser(user);
        if (pushToken == null) {
            throw new CustomRuntimeException("토큰이 존재하지 않습니다");
        }
        return new PushTokenDto.Response(pushToken);
    }

    @Transactional
    public void upload(AppUser user, PushTokenDto.PostRequest dto) {
        PushToken existingToken = pushTokenRepo.findByUser(user);
        PushToken pushToken = dto.toEntity(user);
        if (existingToken != null) {
            pushTokenRepo.delete(existingToken);
        } else {
            pushToken.setInfoAlarm(true);
            pushToken.setChatAlarm(true);
        }
        pushTokenRepo.save(pushToken);
    }

    @Transactional
    public void updateChatAlarm(AppUser user, Boolean status) {
        PushToken existingToken = pushTokenRepo.findByUser(user);
        if (existingToken == null) {
            throw new CustomRuntimeException("토큰이 존재하지 않습니다");
        }
        existingToken.setChatAlarm(status);
        pushTokenRepo.save(existingToken);
    }

    @Transactional
    public void updateChatInfo(AppUser user, Boolean status) {
        PushToken existingToken = pushTokenRepo.findByUser(user);
        if (existingToken == null) {
            throw new CustomRuntimeException("토큰이 존재하지 않습니다");
        }
        existingToken.setInfoAlarm(status);
        pushTokenRepo.save(existingToken);
    }
}
