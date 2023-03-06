package skkuchin.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import skkuchin.service.domain.Map.Campus;
import skkuchin.service.domain.Matching.*;
import skkuchin.service.domain.User.*;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.stream.Collectors;

public class CandidateDto {

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class PostRequest {
        @NotNull
        @JsonProperty
        private Long userId;

        @JsonProperty
        private Long candidate1Id;

        @JsonProperty
        private Long candidate2Id;

        @JsonProperty
        private Long candidate3Id;

        public Candidate toEntity(AppUser user, AppUser candidate1, AppUser candidate2, AppUser candidate3) {
            return Candidate.builder()
                    .user(user)
                    .candidate1(candidate1)
                    .candidate2(candidate2)
                    .candidate3(candidate3)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
    public static class Response {
        @JsonProperty
        private Long id;
        private String nickname;
        private Profile image;
        private Major major;
        @JsonProperty
        private int studentId;
        private Mbti mbti;
        private Gender gender;
        private List<String> keywords;
        private String introduction;
        private Campus campus;

        public Response(AppUser user, List<UserKeyword> keywords) {
            this.id = user.getId();
            this.nickname = user.getNickname();
            this.image = user.getImage();
            this.major = user.getMajor();
            this.studentId = user.getStudentId();
            this.mbti = user.getMbti();
            this.gender = user.getGender();
            this.keywords = keywords.stream().map(keyword -> keyword.getKeyword().getName()).collect(Collectors.toList());
            this.introduction = user.getIntroduction();
            this.campus = findCampus(user.getMajor());
        }

        public Campus findCampus(Major major) {
            EnumSet<Major> majors = EnumSet.allOf(Major.class);
            List<Major> majorList = new ArrayList<>();
            majorList.addAll(majors);

            if (majorList.indexOf(major) < majorList.indexOf(Major.건설환경공학부)) {
                return Campus.명륜;
            } else {
                return Campus.율전;
            }
        }
    }
}
