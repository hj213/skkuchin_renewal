package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import skkuchin.service.dto.KeywordDto;
import skkuchin.service.repo.KeywordRepo;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepo keywordRepo;

    public void insertData(String path) throws IOException, ParseException {
        if (keywordRepo.count() < 1) {

            FileInputStream ins = new FileInputStream(path + "keyword.json");
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject)parser.parse(
                    new InputStreamReader(ins, "UTF-8")
            );
            JSONArray jsonArray = (JSONArray) jsonObject.get("keyword");
            Gson gson = new Gson();

            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject temp = (JSONObject) jsonArray.get(i);
                KeywordDto.Request dto = gson.fromJson(temp.toString(), KeywordDto.Request.class);
                keywordRepo.save(dto.toEntity());
            }
        }
    }
}
