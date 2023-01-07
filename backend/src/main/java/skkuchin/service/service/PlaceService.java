package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.PlaceDto;
import skkuchin.service.domain.Map.Image;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.Map.Review;
import skkuchin.service.repo.ImageRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.ReviewRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlaceService {

    private final PlaceRepo placeRepo;
    private final ImageRepo imageRepo;
    private final ReviewRepo reviewRepo;

    @Transactional
    public List<PlaceDto.Response> getAll() {
        return placeRepo.findAll()
                .stream()
                .map(place -> new PlaceDto.Response(
                        place,
                        imageRepo.findByPlace(place).stream().collect(Collectors.toList()),
                        reviewRepo.findByPlace(place).stream().collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public PlaceDto.Response getDetail(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();

        List<Image> images = imageRepo.findByPlace(place)
                .stream().collect(Collectors.toList());

        List<Review> reviews = reviewRepo.findByPlace(place)
                .stream().collect(Collectors.toList());

        return new PlaceDto.Response(place, images, reviews);
    }

    @Transactional
    public void add(PlaceDto.Request dto) {
        Place place = dto.toEntity();
        placeRepo.save(place);
    }

    @Transactional
    public void update(Long placeId, PlaceDto.Request dto) {
        Place existingPlace = placeRepo.findById(placeId).orElseThrow();
        BeanUtils.copyProperties(dto, existingPlace);
        placeRepo.save(existingPlace);
    }

    @Transactional
    public void delete(Long placeId) {
        placeRepo.deleteById(placeId);
    }
}
