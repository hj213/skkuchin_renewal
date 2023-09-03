package skkuchin.service.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Magazine.Magazine;
import skkuchin.service.domain.Magazine.RelatePlace;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleDto;
import skkuchin.service.dto.MagazineDto;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.MagazineRepo;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.RelatedPlaceRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MagazineService {

    private final MagazineRepo magazineRepo;
    private final RelatedPlaceRepo relatedPlaceRepo;
    private final PlaceRepo placeRepo;


    public void addMagazine(AppUser appUser, MagazineDto.PostRequest dto){
        Magazine magazine = dto.toEntity(appUser);
        Magazine newMagazine = magazineRepo.save(magazine);
        System.out.println("magazine = " + newMagazine.getId());
        List<Long> placeIds = dto.getPlaceId();
        System.out.println("placeIds = " + placeIds);
        while (!placeIds.isEmpty()) {
            // 리스트가 비어있지 않은 동안 실행할 코드
            Long placeId = placeIds.remove(0); // 리스트에서 첫 번째 요소를 제거하고 가져옵니다.
            System.out.println("placeId = " + placeId);
            Place place = placeRepo.findById(placeId).orElseThrow(() -> new CustomValidationApiException("없는 식당 Id"));
            System.out.println(place.getName());
            // placeId를 사용한 작업 수행
            RelatePlace relatedPlace = RelatePlace.builder().place(place).magazine(newMagazine).build();
            relatedPlaceRepo.save(relatedPlace);
        }

    }

    public List<MagazineDto.Response> getMagazine(){
        return magazineRepo.findAll()
                .stream()
                .map(magazine -> new MagazineDto.Response(
                        magazine,
                        relatedPlaceRepo.findByMagazine(magazine)
                )).collect(Collectors.toList());
        }

}
