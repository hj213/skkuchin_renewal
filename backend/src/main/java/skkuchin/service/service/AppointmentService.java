package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.AppointmentDto;
import skkuchin.service.domain.Chat.Appointment;
import skkuchin.service.domain.Chat.ChatRoom;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.AppointmentRepo;
import skkuchin.service.repo.ChatRoomRepo;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AppointmentService {
    private final AppointmentRepo appointmentRepo;
    private final ChatRoomRepo chatRoomRepo;

    @Transactional
    public void makeAppointment(AppointmentDto.Request dto) {
        if (dto.getPlace() == null && dto.getDateTime() == null) {
            throw new CustomRuntimeException("장소나 시간이 정해지지 않았습니다");
        }
        ChatRoom chatRoom = chatRoomRepo.findById(dto.getChatRoomId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 채팅방입니다"));
        Appointment appointment = dto.toEntity(chatRoom);
        appointmentRepo.save(appointment);
    }

    @Transactional
    public void changeAppointment(Long appointmentId, AppointmentDto.Request dto) {
        Appointment existingAppointment = appointmentRepo.findById(appointmentId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 약속입니다"));

        if (dto.getPlace() == null && dto.getDateTime() == null) {
            throw new CustomRuntimeException("장소나 시간이 정해지지 않았습니다");
        }
        existingAppointment.setDateTime(dto.getDateTime());
        existingAppointment.setPlace(dto.getPlace());
        appointmentRepo.save(existingAppointment);
    }
}
