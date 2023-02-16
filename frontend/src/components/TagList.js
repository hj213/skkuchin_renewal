import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, CssBaseline, ThemeProvider} from '@mui/material';

// 지도 태그
import mapTag1 from '../image/태그/지도_off/top_학생할인.png';
import mapTag2 from '../image/태그/지도_off/top_스페셜.png';
import mapTag3 from '../image/태그/지도_off/top_한식.png';
import mapTag4 from '../image/태그/지도_off/top_중식.png';
import mapTag5 from '../image/태그/지도_off/top_일식.png';
import mapTag6 from '../image/태그/지도_off/top_양식.png';
import mapTag7 from '../image/태그/지도_off/top_기타.png';
import mapTag8 from '../image/태그/지도_off/top_간단한한끼.png';
import mapTag9 from '../image/태그/지도_off/top_분위기좋은.png';
import mapTag10 from '../image/태그/지도_off/top_맛집.png';
import mapTag11 from '../image/태그/지도_off/top_친절.png';
import mapTag12 from '../image/태그/지도_off/top_가성비.png';
import mapTag13 from '../image/태그/지도_off/top_청결도.png';
import mapTag14 from '../image/태그/지도_off/top_둘이가요.png';

import mapTagOn1 from '../image/태그/지도_on/top_학생할인Y.png';
import mapTagOn2 from '../image/태그/지도_on/top_스페셜Y.png';
import mapTagOn3 from '../image/태그/지도_on/top_한식Y.png';
import mapTagOn4 from '../image/태그/지도_on/top_중식Y.png';
import mapTagOn5 from '../image/태그/지도_on/top_일식Y.png';
import mapTagOn6 from '../image/태그/지도_on/top_양식Y.png';
import mapTagOn7 from '../image/태그/지도_on/top_기타Y.png';
import mapTagOn8 from '../image/태그/지도_on/top_간단한한끼Y.png';
import mapTagOn9 from '../image/태그/지도_on/top_분위기좋은Y.png';
import mapTagOn10 from '../image/태그/지도_on/top_맛집Y.png';
import mapTagOn11 from '../image/태그/지도_on/top_친절Y.png';
import mapTagOn12 from '../image/태그/지도_on/top_가성비Y.png';
import mapTagOn13 from '../image/태그/지도_on/top_청결도Y.png';
import mapTagOn14 from '../image/태그/지도_on/top_둘이가요Y.png';

// 리뷰 태그
import reviewTag01 from '../image/태그/mini태그/mini_맛집.png';
import reviewTag02 from '../image/태그/mini태그/mini_가성비.png';
import reviewTag03 from '../image/태그/mini태그/mini_친절.png';
import reviewTag04 from '../image/태그/mini태그/mini_둘이가요.png';
import reviewTag05 from '../image/태그/mini태그/mini_청결도.png';
import reviewTag06 from '../image/태그/mini태그/mini_간단한한끼.png';
import reviewTag07 from '../image/태그/mini태그/mini_분위기좋은.png';

import reviewBigTag01 from '../image/태그/리뷰등록_on/review_맛집Y.png';
import reviewBigTag02 from '../image/태그/리뷰등록_on/review_가성비Y.png';
import reviewBigTag03 from '../image/태그/리뷰등록_on/review_친절Y.png';
import reviewBigTag04 from '../image/태그/리뷰등록_on/review_둘이가요Y.png';
import reviewBigTag05 from '../image/태그/리뷰등록_on/review_청결도Y.png';
import reviewBigTag06 from '../image/태그/리뷰등록_on/review_간단한한끼Y.png';
import reviewBigTag07 from '../image/태그/리뷰등록_on/review_분위기좋은Y.png';

export const displayTagImage = (tags) => {
    const displayTags = tags.slice(0,2);
    return (
        <Grid container spacing={1}>
            {displayTags.map ((tag) => {
            switch(tag) {
                case "학생 할인":
                    return <Grid item key={tag}><Image id={"학생 할인"} src={mapTagOn1} width={88} height={36}/></Grid>
                case "스페셜":
                    return <Grid item key={tag}><Image id={"스페셜"} src={mapTagOn2} width={76} height={36}/></Grid>
                case "한식":
                    return <Grid item key={tag}><Image id={"한식"} src={mapTagOn3} width={64} height={36}/></Grid>
                case "중식":
                    return <Grid item key={tag}><Image id={"중식"} src={mapTagOn4} width={64} height={36}/></Grid>
                case "일식":
                    return <Grid item key={tag}><Image id={"일식"} src={mapTagOn5} width={64} height={36}/></Grid>
                case "양식":
                    return <Grid item key={tag}><Image id={"양식"} src={mapTagOn6} width={64} height={36}/></Grid>
                case "기타":
                    return <Grid item key={tag}><Image id={"기타"} src={mapTagOn7} width={64} height={36} /></Grid>
                case "간단한 한 끼":
                    return <Grid item key={tag}><Image id={"간단한 한 끼"} src={mapTagOn8} width={107} height={36}/></Grid>
                case "분위기 좋은":
                    return <Grid item key={tag}><Image id={"분위기 좋은"} src={mapTagOn9} width={104} height={36} /></Grid>
                case "맛집":
                    return <Grid item key={tag}><Image id={"맛집"} src={mapTagOn10} width={65} height={36}/></Grid>
                case "친절":
                    return <Grid item key={tag}><Image id={"친절"} src={mapTagOn11} width={65} height={36} /></Grid>
                case "가성비":
                    return <Grid item key={tag}><Image id={"가성비"} src={mapTagOn12} width={75} height={36}/></Grid>
                case "청결도":
                    return <Grid item key={tag}><Image id={"청결도"} src={mapTagOn13} width={78} height={36} /></Grid>
                case "둘이 가요":
                    return <Grid item key={tag}><Image id={"둘이 가요"} src={mapTagOn14} width={93} height={36} /></Grid>
                default:
                    return null;
        }
    })}
    </Grid>
    );
}

export const displayReviewTag = (keyword) => {
    switch(keyword) {
        case "맛집":
            return <Image id={"맛집"} src={reviewTag01} width={45} height={20}/>
        case "가성비":
            return <Image id={"가성비"} src={reviewTag02} width={52} height={20}/>
        case "친절":
            return <Image id={"친절"} src={reviewTag03} width={45} height={20}/>
        case "둘이 가요":
            return <Image id={"둘이 가요"} src={reviewTag04} width={65} height={20}/>
        case "청결도":
            return <Image id={"청결도"} src={reviewTag05} width={52} height={20}/>
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={reviewTag06} width={76} height={20}/>
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={reviewTag07} width={76} height={20}/>
        default:
            return null;
    }
}

export const displayBigReviewTag = (keyword) => {
    switch(keyword) {
        case "맛집":
            return <Image id={"맛집"} src={reviewBigTag01} width={54} height={25}/>
        case "가성비":
            return <Image id={"가성비"} src={reviewBigTag02} width={63} height={25}/>
        case "친절":
            return <Image id={"친절"} src={reviewBigTag03} width={54} height={25}/>
        case "둘이 가요":
            return <Image id={"둘이 가요"} src={reviewBigTag04} width={80} height={25}/>
        case "청결도":
            return <Image id={"청결도"} src={reviewBigTag05} width={63} height={25}/>
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={reviewBigTag06} width={95} height={25}/>
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={reviewBigTag07} width={95} height={25}/>
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
            style={{  position: 'absolute', top: '63.5px', zIndex: '2', overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', 
            scrollbarWidth: 'none', msOverflowStyle: 'none', "&::WebkitScrollbar": { display: "none"}, padding: "0 20px"}}
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
                    <Grid item style={{filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block', flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("학생 할인") ? <Image id={"학생 할인"} src={mapTagOn1} width={88} height={36}/>
                        : <Image id={"학생 할인"} src={mapTag1} width={88} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block',flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("스페셜") ? <Image id={"스페셜"} src={mapTagOn2} width={76} height={36}/>
                        : <Image id={"스페셜"} src={mapTag2} width={76} height={36}/>}
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block',flexShrink: 0, paddingRight: '5px'  }}>
                        { keyword.includes("한식") ? <Image id={"한식"} src={mapTagOn3} width={64} height={36}/>
                        : <Image id={"한식"} src={mapTag3} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("중식") ? <Image id={"중식"} src={mapTagOn4} width={64} height={36}/>
                        : <Image id={"중식"} src={mapTag4} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("일식") ? <Image id={"일식"} src={mapTagOn5} width={64} height={36}/>
                        : <Image id={"일식"} src={mapTag5} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("양식") ? <Image id={"양식"} src={mapTagOn6} width={64} height={36}/>
                        : <Image id={"양식"} src={mapTag6} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("기타") ? <Image id={"기타"} src={mapTagOn7} width={64} height={36}/>
                        : <Image id={"기타"} src={mapTag7} width={64} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("간단한 한 끼") ? <Image id={"간단한 한 끼"} src={mapTagOn8} width={107} height={36}/>
                        : <Image id={"간단한 한 끼"} src={mapTag8} width={107} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("분위기 좋은") ? <Image id={"분위기 좋은"} src={mapTagOn9} width={104} height={36}/>
                        : <Image id={"분위기 좋은"} src={mapTag9} width={104} height={36} /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("맛집") ? <Image id={"맛집"} src={mapTagOn10} width={65} height={36}/>
                        : <Image id={"맛집"} src={mapTag10} width={65} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px'  }}>
                        { keyword.includes("친절") ? <Image id={"친절"} src={mapTagOn11} width={65} height={36}/>
                        : <Image id={"친절"} src={mapTag11} width={65} height={36} /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("가성비") ? <Image id={"가성비"} src={mapTagOn12} width={75} height={36}/>
                        : <Image id={"가성비"} src={mapTag12} width={75} height={36}/> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("청결도") ? <Image id={"청결도"} src={mapTagOn13} width={78} height={36}/>
                        : <Image id={"청결도"} src={mapTag13} width={78} height={36} /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0 }}>
                        { keyword.includes("둘이 가요") ? <Image id={"둘이 가요"} src={mapTagOn14} width={93} height={36}/>
                        : <Image id={"둘이 가요"} src={mapTag14} width={93} height={36} /> }
                    </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default TagList;
