package skkuchin.service.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.PushTokenDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.PushToken;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.PushTokenRepo;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PushTokenService {
    @Value("${vapid.public.key}")
    private String publicKey;
    @Value("${vapid.private.key}")
    private String privateKey;

    private final PushTokenRepo pushTokenRepo;
    private PushService pushService;

    @PostConstruct
    private void init() {
        try {
            Security.addProvider(new BouncyCastleProvider());
            pushService = new PushService(publicKey, privateKey);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void sendNotification(Subscription subscription, String title, String body) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String messageJson = objectMapper.writeValueAsString(Map.of("title", title, "body", body));
            pushService.send(new Notification(subscription, messageJson));
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException
                 | InterruptedException e) {
            throw new CustomRuntimeException("푸시 알림 중 오류가 발생했습니다", e.getMessage());
        }
    }

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
