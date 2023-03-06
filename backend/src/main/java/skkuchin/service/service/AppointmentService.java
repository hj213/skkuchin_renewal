package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.AppointmentDto;
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
    public AppointmentDto.Response getAppointment(String roomId) {
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        Appointment appointment = appointmentRepo.findByChatRoom(chatRoom);
        return new AppointmentDto.Response(appointment);
    }

    @Transactional
    public void makeAppointment(String roomId, AppointmentDto.Request dto) {
        if (dto.getPlace() == null && dto.getDateTime() == null) {
            throw new CustomRuntimeException("장소나 시간이 정해지지 않았습니다");
        }
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        Appointment appointment = dto.toEntity(chatRoom);
        appointmentRepo.save(appointment);
    }

    @Transactional
    public void changeAppointment(String roomId, AppointmentDto.Request dto) {
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        Appointment existingAppointment = appointmentRepo.findByChatRoom(chatRoom);

        if (dto.getPlace() == null && dto.getDateTime() == null) {
            cancelAppointment(roomId);
        } else {
            existingAppointment.setDateTime(dto.getDateTime());
            existingAppointment.setPlace(dto.getPlace());
            appointmentRepo.save(existingAppointment);
        }
    }

    @Transactional
    public void cancelAppointment(String roomId) {
        ChatRoom chatRoom = chatRoomRepo.findByRoomId(roomId);
        appointmentRepo.deleteByChatRoom(chatRoom);
    }
}
