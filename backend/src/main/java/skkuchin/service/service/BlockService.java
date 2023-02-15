package skkuchin.service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import skkuchin.service.api.dto.BlockDto;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Block;
import skkuchin.service.exception.CustomRuntimeException;
import skkuchin.service.exception.CustomValidationApiException;
import skkuchin.service.repo.BlockRepo;
import skkuchin.service.repo.UserRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BlockService {
    private final BlockRepo blockRepo;
    private final UserRepo userRepo;

    @Transactional
    public List<BlockDto.Response> getBlockedUser(AppUser user) {
        return blockRepo.findByUser(user)
                .stream()
                .map((block) -> new BlockDto.Response(block, block.getBlockedUser()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void blockUser(AppUser user, BlockDto.Request dto) {
        AppUser blockedUser = userRepo.findById(dto.getBlockUserId()).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 유저입니다"));

        if (user.getId() == dto.getBlockUserId()) {
            throw new CustomRuntimeException("본인 계정은 차단할 수 없습니다");
        }

        Block block = dto.toEntity(user, blockedUser);
        blockRepo.save(block);
    }

    @Transactional
    public void unblockUser(AppUser user, Long blockId) {
        Block block = blockRepo.findById(blockId).orElseThrow(() -> new CustomValidationApiException("존재하지 않는 차단 목록입니다"));
        isMyBlockList(block.getUser().getId(), user.getId());
        blockRepo.delete(block);
    }

    public List<Block> getBlockedUserList(AppUser user) {
        List<Block> block = blockRepo.findByUser(user);
        return block;
    }

    public void isMyBlockList(Long blockUserId, Long userId) {
        if (blockUserId != userId) throw new CustomRuntimeException("내 차단 목록이 아닙니다.");
    }
}
