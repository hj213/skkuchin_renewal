package skkuchin.service.domain.Map;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.util.EnumMapperType;

@RequiredArgsConstructor
public enum Category implements EnumMapperType {
    한식("음식점"),
    일식("음식점"),
    중식("음식점"),
    양식("음식점"),
    남미음식("음식점"),
    분식("음식점"),
    아시아음식("음식점"),
    기타("음식점"),
    퓨전("음식점"),
    카페("카페"),
    술집("술집"),
    금잔디("금잔디"),
    일반("일반");

    @Getter
    private final String title;

    @Override
    public String getCode() {
        return name();
    }
}
