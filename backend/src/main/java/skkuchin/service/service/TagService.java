package skkuchin.service.service;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.TagDto;
import skkuchin.service.domain.Map.Tag;
import skkuchin.service.repo.TagRepo;

import javax.transaction.Transactional;
import java.io.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepo tagRepo;

    @Transactional
    public List<TagDto.Response> getAll() {
        return tagRepo.findAll()
                .stream()
                .map(tag -> new TagDto.Response(tag))
                .collect(Collectors.toList());
    }

    @Transactional
    public void add(TagDto.Request dto) {
        Tag tag = dto.toEntity();
        tagRepo.save(tag);
    }

    @Transactional
    public void update(Long tagId, TagDto.Request dto) {
        Tag existingTag = tagRepo.findById(tagId).orElseThrow();
        existingTag.setName(dto.getName());
        tagRepo.save(existingTag);
    }

    @Transactional
    public void delete(Long tagId) {
        tagRepo.deleteById(tagId);
    }

    public void insertData(String path) throws IOException, ParseException {
        if (tagRepo.count() < 1) { //db가 비어있을 때만 실행

            FileInputStream ins = new FileInputStream(path + "tag.json");
            JSONParser parser = new JSONParser();
            JSONObject jsonObject = (JSONObject)parser.parse(
                    new InputStreamReader(ins, "UTF-8")
            );
            JSONArray jsonArray = (JSONArray) jsonObject.get("tag");
            Gson gson = new Gson();

            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject temp = (JSONObject) jsonArray.get(i);
                TagDto.Request dto = gson.fromJson(temp.toString(), TagDto.Request.class);
                tagRepo.save(dto.toEntity());
            }
        }
    }
}
