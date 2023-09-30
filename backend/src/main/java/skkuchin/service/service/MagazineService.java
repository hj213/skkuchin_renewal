package skkuchin.service.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Forum.Article;
import skkuchin.service.domain.Magazine.Magazine;
import skkuchin.service.domain.Magazine.RelatePlace;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.dto.ArticleDto;
import skkuchin.service.dto.MagazineDto;
import skkuchin.service.exception.CustomRuntimeException;
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
        List<Long> placeIds = dto.getPlaceId();
        while (!placeIds.isEmpty()) {
            Long placeId = placeIds.remove(0);
            Place place = placeRepo.findById(placeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 아이디 입니다."));
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

    public MagazineDto.Response getSpecificMagazine(Long magazineId){
        Magazine magazine = magazineRepo.findById(magazineId).orElseThrow(()->
                new CustomValidationApiException("존재하지 않는 매거진입니다."));
        MagazineDto.Response response= new MagazineDto.Response(magazine,relatedPlaceRepo.findByMagazine(magazine));
        return response;
    }

    public void deleteMagazine(AppUser appUser,Long magazineId){
        Magazine magazine = magazineRepo.findById(magazineId).orElseThrow(()->
                new CustomValidationApiException("존재하지 않는 매거진 입니다."));
        canHandleMagazine(magazine.getUser(),appUser);
        magazineRepo.delete(magazine);
    }

    public void updateMagazine(AppUser appUser, Long magazineId, MagazineDto.PutRequest dto){
        Magazine beforeMagazine = magazineRepo.findById(magazineId).orElseThrow(()->
                new CustomValidationApiException("존재하지 않는 매거진 입니다."));
        canHandleMagazine(beforeMagazine.getUser(),appUser);
        BeanUtils.copyProperties(dto,beforeMagazine);
        List<RelatePlace> relatePlaces = relatedPlaceRepo.findByMagazine(beforeMagazine);
        relatedPlaceRepo.deleteAll(relatePlaces);
        magazineRepo.save(beforeMagazine);
        List<Long> placeIds = dto.getPlaceId();
        while (!placeIds.isEmpty()) {
            Long placeId = placeIds.remove(0);
            Place place = placeRepo.findById(placeId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 식당 Id 입니다."));
            RelatePlace relatedPlace = RelatePlace.builder().place(place).magazine(beforeMagazine).build();
            relatedPlaceRepo.save(relatedPlace);
        }

    }

    private void canHandleMagazine(AppUser magazineUser, AppUser user) {
        if (!(magazineUser.getId().equals(user.getId()) || user.getUserRoles().stream().findFirst().get().getRole().getName().equals("ROLE_ADMIN")))
            throw new CustomRuntimeException("게시글 작성자 또는 관리자가 아닙니다.");
    }
}



