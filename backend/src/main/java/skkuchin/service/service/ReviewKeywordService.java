package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ReviewKeywordDto;
import skkuchin.service.domain.Map.ReviewKeyword;
import skkuchin.service.repo.ReviewKeywordRepo;

import javax.transaction.Transactional;
import java.io.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewKeywordService {
    private final ReviewKeywordRepo reviewKeywordRepo;

    @Transactional
    public List<ReviewKeywordDto.Response> getAll() {
        return reviewKeywordRepo.findAll()
                .stream()
                .map(keyword -> new ReviewKeywordDto.Response(keyword))
                .collect(Collectors.toList());
    }

    @Transactional
    public void add(ReviewKeywordDto.Request dto) {
        ReviewKeyword keyword = dto.toEntity();
        reviewKeywordRepo.save(keyword);
    }

    @Transactional
    public void update(Long keywordId, ReviewKeywordDto.Request dto) {
        ReviewKeyword existingKeyword = reviewKeywordRepo.findById(keywordId).orElseThrow();
        existingKeyword.setName(dto.getName());
        reviewKeywordRepo.save(existingKeyword);
    }

    @Transactional
    public void delete(Long keywordId) {
        reviewKeywordRepo.deleteById(keywordId);
    }

    public void insertData(String path) throws IOException, ParseException {
        if (reviewKeywordRepo.count() < 1) { //db가 비어있을 때만 실행

            FileInputStream ins = new FileInputStream(path + "reviewKeyword.json");
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject)parser.parse(
                    new InputStreamReader(ins, "UTF-8")
            );
            JSONArray jsonArray = (JSONArray) jsonObject.get("reviewKeyword");
            Gson gson = new Gson();

            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject temp = (JSONObject) jsonArray.get(i);
                ReviewKeywordDto.Request dto = gson.fromJson(temp.toString(), ReviewKeywordDto.Request.class);
                reviewKeywordRepo.save(dto.toEntity());
            }
        }
    }
}
