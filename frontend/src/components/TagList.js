import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, CssBaseline, ThemeProvider} from '@mui/material';

// 지도 태그
import mapTag1 from '../image/태그/지도_off/학생할인.png';
import mapTag2 from '../image/태그/지도_off/스페셜.png';
import mapTag3 from '../image/태그/지도_off/한식.png';
import mapTag4 from '../image/태그/지도_off/중식.png';
import mapTag5 from '../image/태그/지도_off/일식.png';
import mapTag6 from '../image/태그/지도_off/양식.png';
import mapTag7 from '../image/태그/지도_off/기타.png';
import mapTag8 from '../image/태그/지도_off/간단한_한끼.png';
import mapTag9 from '../image/태그/지도_off/분위기_좋은.png';

import mapTagOn1 from '../image/태그/지도_on/tag_학생할인.png';
import mapTagOn2 from '../image/태그/지도_on/tag_스페셜.png';
import mapTagOn3 from '../image/태그/지도_on/tag_한식.png';
import mapTagOn4 from '../image/태그/지도_on/tag_중식.png';
import mapTagOn5 from '../image/태그/지도_on/tag_일식.png';
import mapTagOn6 from '../image/태그/지도_on/tag_양식.png';
import mapTagOn7 from '../image/태그/지도_on/tag_기타.png';
import mapTagOn8 from '../image/태그/지도_on/tag_간단.png';
import mapTagOn9 from '../image/태그/지도_on/tag_분위기.png';

// 리뷰 태그
import reviewTag01 from '../image/태그/리뷰/리뷰태그_맛집.png';
import reviewTag02 from '../image/태그/리뷰/리뷰태그_가성비.png';
import reviewTag03 from '../image/태그/리뷰/리뷰태그_친절.png';
import reviewTag04 from '../image/태그/리뷰/리뷰태그_둘.png';
import reviewTag05 from '../image/태그/리뷰/리뷰태그_청결도.png';
import reviewTag06 from '../image/태그/리뷰/리뷰태그_간단.png';
import reviewTag07 from '../image/태그/리뷰/리뷰태그_분위기.png';

export const displayTagImage = (keyword) => {
    switch(keyword) {
        case "학생 할인":
            return <Image id={"학생 할인"} src={mapTagOn1} width={88} height={36}/>
        case "스페셜":
            return <Image id={"스페셜"} src={mapTagOn2} width={76} height={36}/>
        case "한식":
            return <Image id={"한식"} src={mapTagOn3} width={64} height={36}/>
        case "중식":
            return <Image id={"중식"} src={mapTagOn4} width={64} height={36}/>
        case "일식":
            return <Image id={"일식"} src={mapTagOn5} width={64} height={36}/>
        case "양식":
            return <Image id={"양식"} src={mapTagOn6} width={64} height={36}/>
        case "기타":
            return <Image id={"기타"} src={mapTagOn7} width={64} height={36}/>
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={mapTagOn8} width={132} height={36}/>
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={mapTagOn9} width={128} height={36}/>
        default:
            return null;
    }
}
export const displayReviewTag = (keyword) => {
    switch(keyword) {
        case "맛집":
            return <Image id={"맛집"} src={reviewTag01} width={50} height={22}/>
        case "가성비":
            return <Image id={"가성비"} src={reviewTag02} width={57} height={22}/>
        case "친절":
            return <Image id={"친절"} src={reviewTag03} width={50} height={22}/>
        case "둘이 가요":
            return <Image id={"둘이 가요"} src={reviewTag04} width={71} height={22}/>
        case "청결도":
            return <Image id={"청결도"} src={reviewTag05} width={60} height={22}/>
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={reviewTag06} width={85} height={22}/>
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={reviewTag07} width={81} height={22}/>
        default:
            return null;
    }
}

const TagList = ({keyword, onTagClick}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* 태그 목록 */}
            <Grid container 
            style={{  position: 'absolute', top: '103px', zIndex: '2', overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', 
            scrollbarWidth: 'none', msOverflowStyle: 'none', "&::WebkitScrollbar": { display: "none"}, padding: "0 15px"}}
                onClick={(e) => {
                    e.preventDefault();
                    let target = e.target;
                    while (target && target.tagName !== 'IMG') {
                        target = target.parentNode
                    }
                    if (target) {
                        onTagClick(target.id);
                    }
                    }}>
                    <Grid item style={{filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block', flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "학생 할인") ? <Image id={"학생 할인"} src={mapTagOn1} width={88} height={36}/>
                        : <Image id={"학생 할인"} src={mapTag1} width={88} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block',flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "스페셜") ? <Image id={"스페셜"} src={mapTagOn2} width={76} height={36}/>
                        : <Image id={"스페셜"} src={mapTag2} width={76} height={36}/>}
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block',flexShrink: 0, paddingRight: '5px'  }}>
                        { (keyword == "한식") ? <Image id={"한식"} src={mapTagOn3} width={64} height={36}/>
                        : <Image id={"한식"} src={mapTag3} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "중식") ? <Image id={"중식"} src={mapTagOn4} width={64} height={36}/>
                        : <Image id={"중식"} src={mapTag4} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "일식") ? <Image id={"일식"} src={mapTagOn5} width={64} height={36}/>
                        : <Image id={"일식"} src={mapTag5} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "양식") ? <Image id={"양식"} src={mapTagOn6} width={64} height={36}/>
                        : <Image id={"양식"} src={mapTag6} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "기타") ? <Image id={"기타"} src={mapTagOn7} width={64} height={36}/>
                        : <Image id={"기타"} src={mapTag7} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { (keyword == "간단한 한 끼") ? <Image id={"간단한 한 끼"} src={mapTagOn8} width={132} height={36}/>
                        : <Image id={"간단한 한 끼"} src={mapTag8} width={132} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(3px 3px 8px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0 }}>
                        { (keyword == "분위기 좋은") ? <Image id={"분위기 좋은"} src={mapTagOn9} width={128} height={36}/>
                        : <Image id={"분위기 좋은"} src={mapTag9} width={128} height={36} /> }
                    </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default TagList;