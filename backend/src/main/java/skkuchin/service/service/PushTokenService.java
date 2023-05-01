package skkuchin.service.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.PushTokenDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.PushToken;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.repo.PushTokenRepo;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class PushTokenService {
    private static final Pattern PHONE_PATTERN = Pattern.compile("^010[0-9]{8}$");
    @Value("${vapid.public.key}")
    private String publicKey;
    @Value("${vapid.private.key}")
    private String privateKey;
    @Value("${phone.appkey}")
    private String appKey;
    @Value("${phone.xsecretkey}")
    private String xSecretKey;
    @Value("${phone.sendno}")
    private String sendNo;

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
    public void sendNotification(Subscription subscription, String title, String message) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String messageJson = objectMapper.writeValueAsString(Map.of("title", title, "message", message));
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
            pushToken.setPhone(existingToken.getPhone());
            pushToken.setInfoAlarm(existingToken.isInfoAlarm());
            pushToken.setChatAlarm(existingToken.isChatAlarm());
            pushTokenRepo.delete(existingToken);
        }
        pushTokenRepo.save(pushToken);
    }

    @Transactional
    public void uploadPhone(AppUser user, PushTokenDto.PhoneRequest dto) {
        if (dto.getPhone() != null && !PHONE_PATTERN.matcher(dto.getPhone()).matches()) {
            throw new CustomRuntimeException("전화번호가 올바르지 않습니다");
        }

        PushToken existingToken = pushTokenRepo.findByUser(user);
        PushToken pushToken = dto.toEntity(user);
        if (existingToken != null) {
            pushToken.setAuth(existingToken.getAuth());
            pushToken.setEndpoint(existingToken.getEndpoint());
            pushToken.setP256dh(existingToken.getP256dh());
            pushToken.setInfoAlarm(existingToken.isInfoAlarm());
            pushToken.setChatAlarm(existingToken.isChatAlarm());
            pushTokenRepo.delete(existingToken);
        }

        if (pushToken.getPhone() != null || pushToken.getAuth() != null) {
            pushTokenRepo.save(pushToken);
        }
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

    @Transactional
    public Subscription toSubscription(AppUser user, String type) {
        if (user == null) {
            return null;
        }

        PushToken pushToken = pushTokenRepo.findByUser(user);

        if (pushToken == null) {
            return null;
        }
        if (type.equals("chat") && !pushToken.isChatAlarm()) {
            return null;
        }
        if (type.equals("info") && !pushToken.isInfoAlarm()) {
            return null;
        }
        if (type.equals("info") && pushToken.getAuth() == null) {
            return null;
        }

        Subscription subscription;

        if (type.equals("chat") && pushToken.getPhone() != null) {
            Subscription.Keys keys = new Subscription.Keys(null, null);
            subscription = new Subscription(pushToken.getPhone(), keys);
        } else {
            Subscription.Keys keys = new Subscription.Keys(pushToken.getP256dh(), pushToken.getAuth());
            subscription = new Subscription(pushToken.getEndpoint(), keys);
        }

        return subscription;
    }

    @Transactional
    public void sendSMS(String phone, String content) {
        try {
            String targetUrl = "https://api-sms.cloud.toast.com/sms/v3.0/appKeys/" + appKey + "/sender/sms";
            URL url = new URL(targetUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("X-Secret-Key", xSecretKey);

            conn.setConnectTimeout(5000);
            conn.setReadTimeout(5000);
            conn.setDoOutput(true);

            JSONObject requestBody = new JSONObject();
            requestBody.put("body", content);
            requestBody.put("sendNo", sendNo);
            JSONArray recipientList = new JSONArray();
            JSONObject recipient = new JSONObject();
            recipient.put("recipientNo", phone);
            recipientList.add(recipient);
            requestBody.put("recipientList", recipientList);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            bw.write(requestBody.toJSONString());
            bw.flush();
            bw.close();

            Charset charset = Charset.forName("UTF-8");
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset));

            String inputLine;
            StringBuilder sb = new StringBuilder();
            while ((inputLine = br.readLine()) != null) {
                sb.append(inputLine);
            }
            br.close();

            System.out.println(sb);

        } catch (MalformedURLException e) {
            System.err.println("Invalid URL: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("Error reading HTTP response: " + e.getMessage());
        } catch (RuntimeException e) {
            System.err.println("Unexpected error: " + e.getMessage());
        }
    }
}
