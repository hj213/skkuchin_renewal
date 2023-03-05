package skkuchin.service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import skkuchin.service.dto.MenuDto;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.repo.MenuRepo;

@Component
public class MenuSetUp {

    @Autowired
    private MenuRepo menuRepo;

    private Place place;

    public void saveMenu(MenuDto.PostRequest dto, Place place){

        Menu menu = dto.toEntity(place);
        menuRepo.save(menu);


    }

}
