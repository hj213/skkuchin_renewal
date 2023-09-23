package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Map.PlaceRequest;
import skkuchin.service.dto.PlaceRequestDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.PlaceRequestRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceRequestService {
    private final PlaceRequestRepo requestRepo;

    @Transactional
    public List<PlaceRequestDto.Response> getAll() {
        return requestRepo.findAll()
                .stream()
                .map(request -> new PlaceRequestDto.Response(
                        request
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public PlaceRequestDto.Response getDetail(Long requestId) {
        PlaceRequest request = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        return new PlaceRequestDto.Response(request);
    }

    @Transactional
    public void add(PlaceRequestDto.PostRequest dto) {
        PlaceRequest request = dto.toEntity();
        requestRepo.save(request);
    }

    @Transactional
    public void update(Long requestId, PlaceRequestDto.PutRequest dto) {
        PlaceRequest existingRequest = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        existingRequest.setCampus(dto.getCampus());
        existingRequest.setName(dto.getName());
        existingRequest.setReason(dto.getReason());

        requestRepo.save(existingRequest);
    }

    @Transactional
    public void delete(Long requestId) {
        PlaceRequest request = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        requestRepo.delete(request);
    }

    @Transactional
    public void updateCheck(Long requestId, Boolean isChecked) {
        PlaceRequest request = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        request.setIsChecked(isChecked);
        requestRepo.save(request);
    }
}
