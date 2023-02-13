package skkuchin.service.domain.User;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import skkuchin.service.util.EnumMapperType;

@RequiredArgsConstructor
public enum ReportType implements EnumMapperType {
    관련_없는_주제_허위사실("관련 없는 주제/허위사실"),
    욕설_비하("욕설/비하"),
    음란_선정성("음란/선정성"),
    영리목적_홍보성("영리목적/홍보성"),
    정당_정치인_비하_및_선거운동("정당/정치인 비하 및 선거운동"),
    비매너_사용자("비매너 사용자"),
    사칭_사기("사칭/사기"),
    기타("기타 (기타 신고 사유를 입력하세요.)");

    @Getter
    private final String title;

    @Override
    public String getCode() {
        return name();
    }
}
