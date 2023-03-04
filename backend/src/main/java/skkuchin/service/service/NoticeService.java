package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.NoticeDto;
import skkuchin.service.domain.Notice.Notice;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.NoticeRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    private final NoticeRepo noticeRepo;

    public List<NoticeDto.Response> getAll() {

        return noticeRepo.findAll()
                .stream()
                .map(notice -> new NoticeDto.Response(notice))
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

}
