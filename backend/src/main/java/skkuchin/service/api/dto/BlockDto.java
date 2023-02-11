package skkuchin.service.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import skkuchin.service.domain.Matching.Profile;
import skkuchin.service.domain.User.AppUser;
import skkuchin.service.domain.User.Block;
import skkuchin.service.domain.User.Major;

import javax.validation.constraints.NotNull;

public class BlockDto {

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Request {
        @JsonProperty
        @NotNull
        private Long blockedUserId;

        public Block toEntity(AppUser user, AppUser blockedUser) {
            return Block.builder()
                    .user(user)
                    .blockedUser(blockedUser)
                    .build();
        }
    }

    @Getter
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Long blockId;
        private String nickname;
        private String username;
        @JsonProperty
        private int studentId;
        private Major major;
        private Profile image;

        public Response(Block block, AppUser blockedUser) {
            this.blockId = block.getId();
            this.nickname = blockedUser.getNickname() ;
            this.username = blockedUser.getUsername();
            this.studentId =  blockedUser.getStudentId();
            this.major = blockedUser.getMajor();
            this.image =  blockedUser.getImage();
        }
    }
}
