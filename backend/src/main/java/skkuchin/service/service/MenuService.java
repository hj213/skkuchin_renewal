package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.MenuDto;
import skkuchin.service.domain.Map.Menu;
import skkuchin.service.domain.Map.Place;
import skkuchin.service.repo.MenuRepo;
import skkuchin.service.repo.PlaceRepo;
import javax.transaction.Transactional;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
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
    public void addAll(List<MenuDto.PostRequest1> dto, Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();
        List<Menu> menus = dto.stream().map(menuDto -> menuDto.toEntity(place)).collect(Collectors.toList());
        menuRepo.saveAll(menus);
    }


    @Transactional
    public List<MenuDto.Response> getPlaceReview(Long placeId) {
        Place place = placeRepo.findById(placeId).orElseThrow();
        return menuRepo.findByPlace(place)
                .stream().map(menu -> new MenuDto.Response(menu)).collect(Collectors.toList());
    }

    public void insertData(String path) throws IOException, ParseException {
        if (menuRepo.count() < 1) { //db가 비어있을 때만 실행
            String[] campusNames = {"명륜", "율전"};

            for (String campusName : campusNames) {
                FileInputStream ins = new FileInputStream(path + "menu_" + campusName + ".json");
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject)parser.parse(
                        new InputStreamReader(ins, "UTF-8")
                );
                JSONArray jsonArray = (JSONArray) jsonObject.get("menu");
                Gson gson = new Gson();

                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject temp = (JSONObject) jsonArray.get(i);
                    MenuDto.PostRequest dto = gson.fromJson(temp.toString(), MenuDto.PostRequest.class);
                    Place place = placeRepo.findById(dto.getPlaceId()).orElseThrow();
                    menuRepo.save(dto.toEntity(place));
                }
            }
        }
    }

}
