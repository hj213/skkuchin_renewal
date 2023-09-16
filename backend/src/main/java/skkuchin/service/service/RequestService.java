package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Map.Request;
import skkuchin.service.dto.RequestDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.RequestRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepo requestRepo;

    @Transactional
    public List<RequestDto.Response> getAll() {
        return requestRepo.findAll()
                .stream()
                .map(request -> new RequestDto.Response(
                        request
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public RequestDto.Response getDetail(Long requestId) {
        Request request = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        return new RequestDto.Response(request);
    }

    @Transactional
    public void add(RequestDto.PostRequest dto) {
        Request request = dto.toEntity();
        requestRepo.save(request);
    }

    @Transactional
    public void update(Long requestId, RequestDto.PutRequest dto) {
        Request existingRequest = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        existingRequest.setCampus(dto.getCampus());
        existingRequest.setName(dto.getName());
        existingRequest.setReason(dto.getReason());

        requestRepo.save(existingRequest);
    }

    @Transactional
    public void delete(Long requestId) {
        Request request = requestRepo.findById(requestId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 추가 요청입니다."));
        requestRepo.delete(request);
    }
}
