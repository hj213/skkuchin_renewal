import theme from "../theme/theme"
import Image from "next/image"
import {Grid, CssBaseline, ThemeProvider, Stack} from '@mui/material'

// Icons
import back from '../image/arrow_back_ios.png';
import close from '../image/close.png';
import tag1 from '../image/태그/리뷰등록_off/tag_맛집.png';
import tag1on from '../image/태그/리뷰등록_on/tag_맛집.png'
import tag2 from '../image/태그/리뷰등록_off/tag_간단한한끼.png';
import tag2on from '../image/태그/리뷰등록_on/tag_간단한한끼.png';
import tag3 from '../image/태그/리뷰등록_off/tag_분위기좋은.png';
import tag3on from '../image/태그/리뷰등록_on/tag_분위기좋은.png';
import tag4 from '../image/태그/리뷰등록_off/tag_가성비.png';
import tag4on from '../image/태그/리뷰등록_on/tag_가성비.png';
import tag5 from '../image/태그/리뷰등록_off/tag_친절.png';
import tag5on from '../image/태그/리뷰등록_on/tag_친절.png';
import tag6 from '../image/태그/리뷰등록_off/tag_청결도.png';
import tag6on from '../image/태그/리뷰등록_on/tag_청결도.png';
import tag7 from '../image/태그/리뷰등록_off/tag_둘이가요.png';
import tag7on from '../image/태그/리뷰등록_on/tag_둘이가요.png';

export const reviewTagImage = (keyword) => {
    switch(keyword){
        case "맛집":
            return <Image id={"맛집"} src={mapTagOn1} width={88} height={36}/>
        case "간단한한끼":
            return <Image id={"간단한한끼"} src={mapTagOn2} width={76} height={36}/>
        case "분위기좋은":
            return <Image id={"분위기좋은"} src={mapTagOn3} width={64} height={36}/>
        case "분위기좋은":
            return <Image id={"분위기좋은"} src={mapTagOn4} width={64} height={36}/>
        case "가성비":
            return <Image id={"가성비"} src={mapTagOn5} width={64} height={36}/>
        case "친절":
            return <Image id={"친절"} src={mapTagOn6} width={64} height={36}/>
        case "청결도":
            return <Image id={"청결도"} src={mapTagOn7} width={64} height={36}/>
        case "돌아가요":
            return <Image id={"돌아가요"} src={mapTagOn8} width={132} height={36}/>
        default:
            return null;
    }
}

const ReviewTag = ({keyword, onTagClick}) => {
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid sx={{width: '100%'}}
                        onTagClick={(e) => {
                            e.preventDefault();
                            let target = e.target;
                            while (target && target.tagName !== 'IMG') {
                                target = target.parentNode
                            }
                            if (target) {
                                onTagClick(target.id);
                            }
                            }}>

                <div style={{margin: '-20px -20px 0', padding: '13px 0px 10px 0px',borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
                <Grid container style={{margin: '13px 0px 11px 0px',  justifyContent: 'center'}}>
                    <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }}>
                        <Grid item>
                        { (keyword == "맛집") ? <Image id={"맛집"} src={tag1on} width={77} height={34}/>
                        : <Image id={"맛집"} src={tag1} width={77} height={34}/> }
                        </Grid>
                        <Grid item>
                        { (keyword == "간단한한끼") ? <Image id={"간단한한끼"} src={tag2on} width={131} height={34}/>
                        : <Image id={"간단한한끼"} src={tag2} width={131} height={34}/> }
                        </Grid>
                    </Stack>
                    <Stack direction="row" spacing={5}>
                    <Grid item>
                        { (keyword == "분위기좋은") ? <Image id={"분위기좋은"} src={tag3on} width={88} height={34}/>
                        : <Image id={"분위기좋은"} src={tag3} width={88} height={34}/> }
                        </Grid>
                        <Grid item>
                        { (keyword == "가성비") ? <Image id={"가성비"} src={tag4on} width={92} height={34}/>
                        : <Image id={"가성비"} src={tag4} width={92} height={34}/> }
                        </Grid>
                        <Grid item>
                        { (keyword == "친절") ? <Image id={"친절"} src={tag5on} width={109} height={34}/>
                        : <Image id={"친절"} src={tag5} width={109} height={34}/> }
                        </Grid>
                    </Stack>
                    <Stack direction="row" spacing={5}>
                    <Grid item>
                        { (keyword == "청결도") ? <Image id={"청결도"} src={tag6on} width={77} height={34}/>
                        : <Image id={"청결도"} src={tag6} width={77} height={34}/> }
                        </Grid>
                        <Grid item>
                        { (keyword == "둘이가요") ? <Image id={"둘이가요"} src={tag7on} width={77} height={34}/>
                        : <Image id={"둘이가요"} src={tag7} width={77} height={34}/> }
                        </Grid>
                    </Stack>
                </Grid>
                </div>
            </Grid>
        </ThemeProvider>
    )
}

export default ReviewTag;