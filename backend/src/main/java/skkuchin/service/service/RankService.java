package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import skkuchin.service.domain.Magazine.Ranks;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.dto.RankDto;
import skkuchin.service.repo.PlaceRepo;
import skkuchin.service.repo.RankRepo;
import skkuchin.service.repo.ReviewRepo;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankService {
    private final RankRepo rankRepo;
    private final PlaceRepo placeRepo;
    private final ReviewRepo reviewRepo;

    @Transactional
    public List<RankDto.Response> getRank(String campus) {
        Campus cp = campus.equals("명륜") ? Campus.명륜 : Campus.율전;
        List<Ranks> latestRanks = rankRepo.findLatestRanksByCampus(cp);

        List<RankDto.Response> ranks = new ArrayList<>();
        if (!latestRanks.isEmpty()) {
            Ranks latestRank = latestRanks.get(0);

            ranks.add(new RankDto.Response(latestRank.getPlace1(), reviewRepo.findAvgRateOfPlace(latestRank.getPlace1().getId())));
            ranks.add(new RankDto.Response(latestRank.getPlace2(), reviewRepo.findAvgRateOfPlace(latestRank.getPlace2().getId())));
            ranks.add(new RankDto.Response(latestRank.getPlace3(), reviewRepo.findAvgRateOfPlace(latestRank.getPlace3().getId())));
            ranks.add(new RankDto.Response(latestRank.getPlace4(), reviewRepo.findAvgRateOfPlace(latestRank.getPlace4().getId())));
            ranks.add(new RankDto.Response(latestRank.getPlace5(), reviewRepo.findAvgRateOfPlace(latestRank.getPlace5().getId())));
        }
        return ranks;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void addRank() {
        addToDb("명륜");
        addToDb("율전");

    }

    @Transactional
    public void addToDb(String campus) {
        Campus cp = campus.equals("명륜") ? Campus.명륜 : Campus.율전;
        List<Object[]> avgRateList = reviewRepo.findReviewCountPerPlace(cp).subList(0, 10);
        Collections.sort(avgRateList, (o1, o2) -> {
            Double avgRate1 = (Double) o1[1];
            Double avgRate2 = (Double) o2[1];
            return avgRate2.compareTo(avgRate1);
        });

        Ranks ranks = Ranks.builder()
                .place1(placeRepo.findById((Long) avgRateList.get(0)[0]).orElseThrow())
                .place2(placeRepo.findById((Long) avgRateList.get(1)[0]).orElseThrow())
                .place3(placeRepo.findById((Long) avgRateList.get(2)[0]).orElseThrow())
                .place4(placeRepo.findById((Long) avgRateList.get(3)[0]).orElseThrow())
                .place5(placeRepo.findById((Long) avgRateList.get(4)[0]).orElseThrow())
                .campus(cp)
                .build();
        rankRepo.save(ranks);
    }

    public void deleteRank(Long rankId) {
        Ranks ranks = rankRepo.findById(rankId).orElseThrow();
        rankRepo.delete(ranks);
    }
}
