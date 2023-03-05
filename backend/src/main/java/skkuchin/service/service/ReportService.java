package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.ReportDto;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Report;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.ChatRoomRepo;
import skkuchin.service.repo.ReportRepo;
import skkuchin.service.repo.ReviewRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReportService {

    private final ReportRepo reportRepo;
    private final ChatRoomRepo chatRoomRepo;
    private final ReviewRepo reviewRepo;

    @Transactional
    public void reportUser(AppUser user, ReportDto.Request dto) {
        if (dto.getChatRoomId() == null && dto.getReviewId() == null) {
            throw new CustomRuntimeException("리뷰나 채팅방이 특정되지 않았습니다");
        }
        if ((dto.getContent() == null || dto.getContent().isBlank()) && dto.getReportType().getCode().equals("기타")) {
            throw new CustomRuntimeException("내용을 작성해주시기 바랍니다");
        }
        if (dto.getContent() != null && !dto.getReportType().getCode().equals("기타")) {
            throw new CustomRuntimeException("신고 사유가 기타인 경우에만 내용을 적을 수 있습니다");
        }

        Review review = null;
        ChatRoom chatRoom = null;

        if (dto.getReviewId() != null) {
            review = reviewRepo.findById(dto.getReviewId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 리뷰입니다"));
        }
        if (dto.getChatRoomId() != null) {
            chatRoom = chatRoomRepo.findByRoomId(dto.getChatRoomId());
        }

        Report report = dto.toEntity(user, chatRoom, review);
        reportRepo.save(report);
    }
}
