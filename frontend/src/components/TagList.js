import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, CssBaseline, ThemeProvider} from '@mui/material';

// map tags
import mapTag1 from '../image/tags/map_off/top_dc.png';
import mapTag2 from '../image/tags/map_off/top_special.png';
import mapTag3 from '../image/tags/map_off/top_korea.png';
import mapTag4 from '../image/tags/map_off/top_china.png';
import mapTag5 from '../image/tags/map_off/top_japan.png';
import mapTag6 from '../image/tags/map_off/top_west.png';
import mapTag7 from '../image/tags/map_off/top_etc.png';
import mapTag8 from '../image/tags/map_off/top_simple.png';
import mapTag9 from '../image/tags/map_off/top_mood.png';
import mapTag10 from '../image/tags/map_off/top_taste.png';
import mapTag11 from '../image/tags/map_off/top_kind.png';
import mapTag12 from '../image/tags/map_off/top_money.png';
import mapTag13 from '../image/tags/map_off/top_clean.png';
import mapTag14 from '../image/tags/map_off/top_two.png';

import mapTagOn1 from '../image/tags/map_on/top_dcY.png';
import mapTagOn2 from '../image/tags/map_on/top_specialY.png';
import mapTagOn3 from '../image/tags/map_on/top_koreaY.png';
import mapTagOn4 from '../image/tags/map_on/top_chinaY.png';
import mapTagOn5 from '../image/tags/map_on/top_japanY.png';
import mapTagOn6 from '../image/tags/map_on/top_westY.png';
import mapTagOn7 from '../image/tags/map_on/top_etcY.png';
import mapTagOn8 from '../image/tags/map_on/top_simpleY.png';
import mapTagOn9 from '../image/tags/map_on/top_moodY.png';
import mapTagOn10 from '../image/tags/map_on/top_tasteY.png';
import mapTagOn11 from '../image/tags/map_on/top_kindY.png';
import mapTagOn12 from '../image/tags/map_on/top_moneyY.png';
import mapTagOn13 from '../image/tags/map_on/top_cleanY.png';
import mapTagOn14 from '../image/tags/map_on/top_twoY.png';

// 리뷰 tags
import reviewTag01 from '../image/tags/mini/mini_taste.png';
import reviewTag02 from '../image/tags/mini/mini_money.png';
import reviewTag03 from '../image/tags/mini/mini_kind.png';
import reviewTag04 from '../image/tags/mini/mini_two.png';
import reviewTag05 from '../image/tags/mini/mini_clean.png';
import reviewTag06 from '../image/tags/mini/mini_simple.png';
import reviewTag07 from '../image/tags/mini/mini_mood.png';

import reviewBigTag01 from '../image/tags/review_on/review_tasteY.png';
import reviewBigTag02 from '../image/tags/review_on/review_moneyY.png';
import reviewBigTag03 from '../image/tags/review_on/review_kindY.png';
import reviewBigTag04 from '../image/tags/review_on/review_twoY.png';
import reviewBigTag05 from '../image/tags/review_on/review_cleanY.png';
import reviewBigTag06 from '../image/tags/review_on/review_simpleY.png';
import reviewBigTag07 from '../image/tags/review_on/review_moodY.png';

import reviewTagOff1 from '../image/tags/review_off/review_taste.png';
import reviewTagOff2 from '../image/tags/review_off/review_money.png';
import reviewTagOff3 from '../image/tags/review_off/review_kind.png';
import reviewTagOff4 from '../image/tags/review_off/review_two.png';
import reviewTagOff5 from '../image/tags/review_off/review_clean.png';
import reviewTagOff6 from '../image/tags/review_off/review_simple.png';
import reviewTagOff7 from '../image/tags/review_off/review_mood.png'

export const displayTagImage = (tags) => {
    const displayTags = tags.slice(0,2);
    return (
        <Grid container spacing={1}>
            {displayTags.map ((tag) => {
            switch(tag) {
                case "학생 할인":
                    return <Grid item key={tag}><Image id={"학생 할인"} src={mapTagOn1} width={88} height={36}/></Grid>
                // case "스페셜":
                //     return <Grid item key={tag}><Image id={"스페셜"} src={mapTagOn2} width={76} height={36}/></Grid>
                case "한식":
                    return <Grid item key={tag}><Image id={"한식"} src={mapTagOn3} width={64} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "중식":
                    return <Grid item key={tag}><Image id={"중식"} src={mapTagOn4} width={64} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "일식":
                    return <Grid item key={tag}><Image id={"일식"} src={mapTagOn5} width={64} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "양식":
                    return <Grid item key={tag}><Image id={"양식"} src={mapTagOn6} width={64} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "기타":
                    return <Grid item key={tag}><Image id={"기타"} src={mapTagOn7} width={64} height={36} placeholder="blur" layout='fixed'  /></Grid>
                case "간단한 한 끼":
                    return <Grid item key={tag}><Image id={"간단한 한 끼"} src={mapTagOn8} width={107} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "분위기 좋은":
                    return <Grid item key={tag}><Image id={"분위기 좋은"} src={mapTagOn9} width={104} height={36} placeholder="blur" layout='fixed'  /></Grid>
                case "맛집":
                    return <Grid item key={tag}><Image id={"맛집"} src={mapTagOn10} width={65} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "친절":
                    return <Grid item key={tag}><Image id={"친절"} src={mapTagOn11} width={65} height={36} placeholder="blur" layout='fixed'  /></Grid>
                case "가성비":
                    return <Grid item key={tag}><Image id={"가성비"} src={mapTagOn12} width={75} height={36} placeholder="blur" layout='fixed' /></Grid>
                case "청결도":
                    return <Grid item key={tag}><Image id={"청결도"} src={mapTagOn13} width={78} height={36} placeholder="blur" layout='fixed'  /></Grid>
                case "둘이 가요":
                    return <Grid item key={tag}><Image id={"둘이 가요"} src={mapTagOn14} width={93} height={36} placeholder="blur" layout='fixed'  /></Grid>
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
            return <Image id={"맛집"} src={reviewTag01} width={45} height={20} placeholder="blur" layout='fixed' />
        case "가성비":
            return <Image id={"가성비"} src={reviewTag02} width={52} height={20} placeholder="blur" layout='fixed' />
        case "친절":
            return <Image id={"친절"} src={reviewTag03} width={45} height={20} placeholder="blur" layout='fixed' />
        case "둘이 가요":
            return <Image id={"둘이 가요"} src={reviewTag04} width={65} height={20} placeholder="blur" layout='fixed' />
        case "청결도":
            return <Image id={"청결도"} src={reviewTag05} width={52} height={20} placeholder="blur" layout='fixed' />
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={reviewTag06} width={76} height={20} placeholder="blur" layout='fixed' />
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={reviewTag07} width={76} height={20} placeholder="blur" layout='fixed' />
        default:
            return null;
    }
}

export const displayBigReviewTag = (keyword) => {
    switch(keyword) {
        case "맛집":
            return <Image id={"맛집"} src={reviewBigTag01} width={54} height={25} placeholder="blur" layout='fixed' />
        case "가성비":
            return <Image id={"가성비"} src={reviewBigTag02} width={63} height={25} placeholder="blur" layout='fixed' />
        case "친절":
            return <Image id={"친절"} src={reviewBigTag03} width={54} height={25} placeholder="blur" layout='fixed' />
        case "둘이 가요":
            return <Image id={"둘이 가요"} src={reviewBigTag04} width={80} height={25} placeholder="blur" layout='fixed' />
        case "청결도":
            return <Image id={"청결도"} src={reviewBigTag05} width={63} height={25} placeholder="blur" layout='fixed' />
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={reviewBigTag06} width={95} height={25} placeholder="blur" layout='fixed' />
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={reviewBigTag07} width={95} height={25} placeholder="blur" layout='fixed' />
        default:
            return null;
    }
}

// review.js용 tags
export const reviewsTags = (keyword) => {
    switch(keyword) {
        case "맛집":
            return <Image id={"맛집"} src={reviewTagOff1} width={77} height={34} placeholder="blur" layout='fixed' />
        case "가성비":
            return <Image id={"가성비"} src={reviewTagOff2} width={88} height={34} placeholder="blur" layout='fixed' />
        case "친절":
            return <Image id={"친절"} src={reviewTagOff3} width={77} height={34} placeholder="blur" layout='fixed' />
        case "둘이 가요":
            return <Image id={"둘이 가요"} src={reviewTagOff4} width={109} height={34} placeholder="blur" layout='fixed' />
        case "청결도":
            return <Image id={"청결도"} src={reviewTagOff5} width={92} height={34} placeholder="blur" layout='fixed' />
        case "간단한 한 끼":
            return <Image id={"간단한 한 끼"} src={reviewTagOff6} width={131} height={34} placeholder="blur" layout='fixed' />
        case "분위기 좋은":
            return <Image id={"분위기 좋은"} src={reviewTagOff7} width={124} height={34} placeholder="blur" layout='fixed' />
        default:
            return null;
    }
}

const TagList = ({keyword, onTagClick}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* tags 목록 */}
            <Grid container 
            style={{  position: 'absolute', top: '0px', zIndex: '2', overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', 
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
                        { keyword.includes("학생 할인") ? <Image id={"학생 할인"} src={mapTagOn1} width={88} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"학생 할인"} src={mapTag1} width={88} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    {/* <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block',flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("스페셜") ? <Image id={"스페셜"} src={mapTagOn2} width={76} height={36}/>
                        : <Image id={"스페셜"} src={mapTag2} width={76} height={36}/>}
                    </Grid> */}
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block',flexShrink: 0, paddingRight: '5px'  }}>
                        { keyword.includes("한식") ? <Image id={"한식"} src={mapTagOn3} width={64} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"한식"} src={mapTag3} width={64} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("중식") ? <Image id={"중식"} src={mapTagOn4} width={64} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"중식"} src={mapTag4} width={64} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("일식") ? <Image id={"일식"} src={mapTagOn5} width={64} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"일식"} src={mapTag5} width={64} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("양식") ? <Image id={"양식"} src={mapTagOn6} width={64} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"양식"} src={mapTag6} width={64} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("기타") ? <Image id={"기타"} src={mapTagOn7} width={64} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"기타"} src={mapTag7} width={64} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("간단한 한 끼") ? <Image id={"간단한 한 끼"} src={mapTagOn8} width={107} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"간단한 한 끼"} src={mapTag8} width={107} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("분위기 좋은") ? <Image id={"분위기 좋은"} src={mapTagOn9} width={104} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"분위기 좋은"} src={mapTag9} width={104} height={36} placeholder="blur" layout='fixed'  /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("맛집") ? <Image id={"맛집"} src={mapTagOn10} width={65} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"맛집"} src={mapTag10} width={65} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px'  }}>
                        { keyword.includes("친절") ? <Image id={"친절"} src={mapTagOn11} width={65} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"친절"} src={mapTag11} width={65} height={36} placeholder="blur" layout='fixed'  /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("가성비") ? <Image id={"가성비"} src={mapTagOn12} width={75} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"가성비"} src={mapTag12} width={75} height={36} placeholder="blur" layout='fixed' /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0, paddingRight: '5px' }}>
                        { keyword.includes("청결도") ? <Image id={"청결도"} src={mapTagOn13} width={78} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"청결도"} src={mapTag13} width={78} height={36} placeholder="blur" layout='fixed'  /> }
                    </Grid>
                    <Grid item style={{pl: '5px', filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.25))", display:'inline-block' ,flexShrink: 0 }}>
                        { keyword.includes("둘이 가요") ? <Image id={"둘이 가요"} src={mapTagOn14} width={93} height={36} placeholder="blur" layout='fixed' />
                        : <Image id={"둘이 가요"} src={mapTag14} width={93} height={36} placeholder="blur" layout='fixed'  /> }
                    </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default TagList;
