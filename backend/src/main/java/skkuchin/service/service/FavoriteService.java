package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.FavoriteDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.Map.Favorite;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.repo.FavoriteRepo;
import skkuchin.service.repo.PlaceRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class FavoriteService {
    private final FavoriteRepo favoriteRepo;
    private final PlaceRepo placeRepo;




    @Transactional
    public void write(AppUser user, FavoriteDto.PostRequest dto) {
        Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
        System.out.println("place.getId() = " + place.getId());
        Favorite favorite = dto.toEntity(user, place);
        favoriteRepo.save(favorite);
    }



    @Transactional
    public List<FavoriteDto.Response> getMyFavorite(AppUser user) {
        return favoriteRepo.findByUser(user)
                .stream().map(favorite -> new FavoriteDto.Response(favorite)).collect(Collectors.toList());
    }


    @Transactional
    public void delete(Long favoriteId, Long userId){
        Favorite favorite = favoriteRepo.findById(favoriteId).orElseThrow();
        favoriteRepo.delete(favorite);

    }



}

