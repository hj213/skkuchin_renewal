package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public void add(PlaceDto.PostRequest dto) {
        Place place = dto.toEntity();
        placeRepo.save(place);
    }

    @Transactional
    public void update(Long placeId, PlaceDto.PutRequest dto) {
        Place existingPlace = placeRepo.findById(placeId).orElseThrow();

        existingPlace.setName(dto.getName());
        existingPlace.setDetail_category(dto.getDetail_category());
        existingPlace.setLocation(dto.getLocation());
        existingPlace.setAddress(dto.getAddress());
        existingPlace.setX_coordinate(dto.getX_coordinate());
        existingPlace.setY_coordinate(dto.getY_coordinate());
        existingPlace.setService_time(dto.getService_time());
        existingPlace.setBreak_time(dto.getBreak_time());
        existingPlace.setDiscount_availability(dto.getDiscount_availability());
        existingPlace.setDiscount_content(dto.getDiscount_content());
        existingPlace.setCampus(dto.getCampus());

        placeRepo.save(existingPlace);
    }

    @Transactional
    public void delete(Long placeId) {
        placeRepo.deleteById(placeId);
    }
}
