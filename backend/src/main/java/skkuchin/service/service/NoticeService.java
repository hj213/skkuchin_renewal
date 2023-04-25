package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import nl.martijndwars.webpush.Subscription;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Notice.NoticeType;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.NoticeDto;
import skkuchin.service.domain.Notice.Notice;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.NoticeRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    private final NoticeRepo noticeRepo;
    private final UserRepo userRepo;
    private final PushTokenService pushTokenService;

    public List<NoticeDto.Response> getAll() {

        return noticeRepo.findAll()
                .stream()
                .map(NoticeDto.Response::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public NoticeDto.Response getDetail(Long noticeId) {
        Notice notice = noticeRepo.findById(noticeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 공지입니다"));
        return new NoticeDto.Response(notice);
    }

    @Transactional
    public void add(NoticeDto.Request dto) {
        Notice notice = dto.toEntity();

        if (!notice.getPushTitle().isBlank() && !notice.getPushContent().isBlank()) {
            List<AppUser> users = userRepo.findAll();
            for (AppUser user : users) {
                Subscription subscription = pushTokenService.toSubscription(user, "info");

                if (subscription != null) {
                    pushTokenService.sendNotification(subscription, notice.getPushTitle(), notice.getPushContent());
                }
            }
        }
        noticeRepo.save(notice);
    }

    @Transactional
    public void update(Long noticeId, NoticeDto.Request dto) {
        Notice existingNotice = noticeRepo.findById(noticeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 공지입니다"));
        BeanUtils.copyProperties(dto, existingNotice);
        noticeRepo.save(existingNotice);
    }

    @Transactional
    public void delete(Long noticeId) {
        noticeRepo.deleteById(noticeId);
    }

    @Transactional
    public void readNotice(AppUser user) {
        List<Notice> notices = noticeRepo.findAll();
        String username = user.getUsername();
        for (Notice notice : notices) {
            String readUsers = notice.getReadUsers();
            if (readUsers == null) {
                notice.setReadUsers(username);
            } else if (!readUsers.contains(username)) {
                notice.setReadUsers(readUsers + "," + user.getUsername());
            }
        }
    }

    @Transactional
    public void makePush(NoticeDto.DirectPush dto) {
        List<AppUser> users = userRepo.findAll();
        for (AppUser user : users) {
            Subscription subscription = pushTokenService.toSubscription(user, "info");

            if (subscription != null) {
                pushTokenService.sendNotification(subscription, dto.getTitle(), dto.getContent());
            }
        }
    }

    @Transactional
    public Boolean checkUnreadNotice(String username) {
        List<Notice> notices = noticeRepo.findAll();

        for (Notice notice : notices) {
            String readUsers = notice.getReadUsers();
            if (readUsers == null) {
                return true;
            }
            if (!readUsers.contains(username)) {
                return true;
            }
        }
        return false;
    }

    public void insertData() {
        NoticeDto.Request infoDto = new NoticeDto.Request(NoticeType.공지, "스꾸친 공지입니다!", "", "", "");
        NoticeDto.Request eventDto = new NoticeDto.Request(NoticeType.이벤트, "스꾸친 이벤트입니다!", "", "", "");
        add(infoDto);
        add(eventDto);
    }
}
