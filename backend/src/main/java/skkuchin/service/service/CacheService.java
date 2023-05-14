package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Map.Category;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CacheService {
    private final RedisTemplate redisTemplate;
    private final PlaceService placeService;

    @Transactional
    @Scheduled(cron = "0 30 4 * * ?")
    public void renewCache() {
        clearCache();
        caching();
    }

    @Transactional
    public void clearCache() {
        System.out.println("Clearing cache");
        redisTemplate.getConnectionFactory().getConnection().flushAll();
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
