package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.api.dto.FavoriteDto;
import skkuchin.service.api.dto.ReviewDto;
import skkuchin.service.domain.Map.*;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.repo.FavoriteRepo;
import skkuchin.service.repo.ReviewRepo;
import skkuchin.service.repo.ReviewTagRepo;
import skkuchin.service.repo.TagRepo;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FavoriteSetUp {

    @Autowired
    private FavoriteRepo favoriteRepo;

    private Place place;
    private AppUser user;

    public Long saveFavorite(FavoriteDto.PostRequest dto, AppUser user, Place place){

        Favorite favorite = dto.toEntity(user,place);
        Long favoriteId = favoriteRepo.save(favorite).getId();
        return favoriteId;
    }

}
