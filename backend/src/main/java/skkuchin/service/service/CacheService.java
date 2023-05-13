package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Caching;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Map.Category;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CacheService {
    private final PlaceService placeService;

    @Transactional
    @Scheduled(cron = "0 0 5 * * ?")
    @Caching(evict = {
            @CacheEvict(value = "placeDetail", allEntries = true),
            @CacheEvict(value = "placeSearchDiscount", allEntries = true),
            @CacheEvict(value = "placeSearchCategory", allEntries = true),
            @CacheEvict(value = "placeSearchTag", allEntries = true),
            @CacheEvict(value = "placeSearchKeyword", allEntries = true),
            @CacheEvict(value = "placeAll", allEntries = true)
    })
    public void renewCache() {
        caching();
    }

    @Transactional
    public void caching() {
        System.out.println("Keep Caching");
        placeService.getAll();
        placeService.searchDiscount();
        for (Category category : Category.values()) {
            placeService.searchCategory(category.name());
        }
        String[] tags = {"맛집", "간단한 한 끼", "분위기 좋은", "가성비", "친절", "청결도", "둘이 가요"};
        for (String tag: tags) {
            placeService.searchTag(tag);
        }
    }
}
