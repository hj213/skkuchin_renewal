package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.dto.PlaceDto;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.repo.PlaceRepo;

@Component
public class PlaceSetUp {
    @Autowired
    private PlaceRepo placeRepo;

    public Long savePlace(PlaceDto.Request dto) {
        Place place = dto.toEntity();
        Long placeId = placeRepo.save(place).getId();
        return placeId;
    }
}
