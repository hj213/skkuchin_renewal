package skkuchin.service.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.MenuDto;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.repo.MenuRepo;
import skkuchin.service.repo.PlaceRepo;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {
    private final PlaceRepo placeRepo;
    private final MenuRepo menuRepo;

    @Transactional
    public void write(MenuDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
        Menu menu = dto.toEntity(place);
        menuRepo.save(menu);
    }


    @Transactional
    public List<MenuDto.Response> getPlaceReview(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();
        return menuRepo.findByPlace(place)
                .stream().map(menu -> new MenuDto.Response(menu)).collect(Collectors.toList());
    }



}
