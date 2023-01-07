package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.ReviewKeywordDto;
import skkuchin.service.domain.Map.ReviewKeyword;
import skkuchin.service.repo.ReviewKeywordRepo;

import javax.transaction.Transactional;
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
}
