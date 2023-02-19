import Image from 'next/image';

// MBTI 캐릭터
import INTP from '../../image/mbti/프로필/INTP.png';
import INTJ from '../../image/mbti/프로필/INTJ.png';
import INFJ from '../../image/mbti/프로필/INFJ.png';
import INFP from '../../image/mbti/프로필/INFP.png';
import ISFJ from '../../image/mbti/프로필/ISFJ.png';
import ISFP from '../../image/mbti/프로필/ISFP.png';
import ISTJ from '../../image/mbti/프로필/ISTJ.png';
import ISTP from '../../image/mbti/프로필/ISTP.png';
import ESTJ from '../../image/mbti/프로필/ESTJ.png';
import ESTP from '../../image/mbti/프로필/ESTP.png';
import ESFJ from '../../image/mbti/프로필/ESFJ.png';
import ESFP from '../../image/mbti/프로필/ESFP.png';
import ENFJ from '../../image/mbti/프로필/ENFJ.png';
import ENFP from '../../image/mbti/프로필/ENFP.png';
import ENTJ from '../../image/mbti/프로필/ENTJ.png';
import ENTP from '../../image/mbti/프로필/ENTP.png';

export const displayMBTI= (mbti) => {
    const imageWidth = 140;
    const imageHeight = 140;

    switch(mbti) {
        case "INTP":
            return <Image id={"INTP"} src={INTP} width={140} height={140}/>
        case "INTJ":
            return <Image id={"INTJ"} src={INTJ} width={imageWidth} height={imageHeight}/>
        case "INFP":
            return <Image id={"INFP"} src={INFP} width={imageWidth} height={imageHeight}/>
        case "INFJ":
            return <Image id={"INFJ"} src={INFJ} width={imageWidth} height={imageHeight}/>
        case "ISFP":
            return <Image id={"ISFP"} src={ISFP} width={imageWidth} height={imageHeight}/>
        case "ISFJ":
            return <Image id={"ISFJ"} src={ISFJ} width={imageWidth} height={imageHeight}/>
        case "ISTP":
            return <Image id={"ISTP"} src={ISTP} width={imageWidth} height={imageHeight}/>
        case "ISTJ":
            return <Image id={"ISTJ"} src={ISTJ} width={imageWidth} height={imageHeight}/>
        case "ESTJ":
            return <Image id={"ESTJ"} src={ESTJ} width={imageWidth} height={imageHeight}/>
        case "ENTP":
            return <Image id={"ENTP"} src={ENTP} width={imageWidth} height={imageHeight}/>
        case "ENTJ":
            return <Image id={"ENTJ"} src={ENTJ} width={imageWidth} height={imageHeight}/>
        case "ENFP":
            return <Image id={"ENFP"} src={ENFP} width={imageWidth} height={imageHeight}/>
        case "ENFJ":
            return <Image id={"ENFJ"} src={ENFJ} width={imageWidth} height={imageHeight}/>
        case "ESFP":
            return <Image id={"ESFP"} src={ESFP} width={imageWidth} height={imageHeight}/>
        case "ESFJ":
            return <Image id={"ESFJ"} src={ESFJ} width={imageWidth} height={imageHeight}/>
        case "ESTP":
             return <Image id={"ESTP"} src={ESTP} width={imageWidth} height={imageHeight}/>
        case "ESTJ":
            return <Image id={"ESTJ"} src={ESTJ} width={imageWidth} height={imageHeight}/>
        default:
            return null;
    }
}
