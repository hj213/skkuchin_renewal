package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.PushTokenDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.PushToken;
import skkuchin.service.repo.PushTokenRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PushTokenService {
    private final PushTokenRepo pushTokenRepo;

    @Transactional
    public void upload(AppUser user, PushTokenDto.Request dto) {
        PushToken pushToken = dto.toEntity(user);
        pushTokenRepo.save(pushToken);
    }

    @Transactional
    public void update(AppUser user, PushTokenDto.Request dto) {
        PushToken existingToken = pushTokenRepo.findByUsername(user);
        existingToken.setToken(dto.getToken());
        existingToken.setChatAlarmOn(dto.getIsChatAlarmOn());
        existingToken.setInfoAlarmOn(dto.getIsInfoAlarmOn());
        pushTokenRepo.save(existingToken);
    }
}
