package skkuchin.service.domain.User;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Major {
    BIZ("경영학과"),
    GBA("글로벌경영학과"),
    EPN("앙트레프레너십연계전공"),
    ECO("경제학과"),
    INT("국제통상학전공"),
    GEC("글로벌경제학과"),
    STA("통계학과"),
    CAL("건설환경공학부"),
    ADD("건축학과"),
    EME("기계공학부"),
    ENA("나노공학과"),
    ESM("시스템경영공학과"),
    EAM("신소재공학부"),
    ECH("화학공학/고분자공학부"),
    //IKS("한국학연계전공"),
    //COSCLA("고전학연계전공"),
    DKL("국어국문학과"),
    //글로컬문화콘텐츠전공
    GER("독어독문학과"),
    RUS("러시아어문학과"),
    LIS("문헌정보학과"),
    //미래인문학연계전공
    //비교문화전공
    HIS("사학과"),
    ENG("영어영문학과"),
    //융합언어학연계전공
    //일본학전공
    CHI("중어중문학과"),
    PHL("철학과"),
    FRE("프랑스어문학과"),
    KLC("한문학과"),
    EDU("교육학과"),
    MAE("수학교육과"),
    COM("컴퓨터교육과"),
    HAN("한문교육과"),
    //공익과법연계전공
    GLD("글로벌리더학부"),
    MCJ("미디어커뮤니케이션학과"),
    SWF("사회복지학과"),
    SOC("사회학과"),
    CON("소비자학과"),
    PSY("심리학과"),
    KID("아동청소년학과"),
    PSD("정치외교학과"),
    PAD("행정학과"),
    EBM("바이오메카트로닉스학과"),
    FBT("식품생명공학과"),
    IBT("융합생명공학과"),
    GBE("글로벌바이오메디컬공학과"),
    GCO("글로벌융합학부"),
    DSC("데이터사이언스융합전공"),
    SWE("소프트웨어학과");

    private String krMajor;
    Major(String krMajor) { this.krMajor = krMajor; }

    public String getKrMajor() { return krMajor; }
}
