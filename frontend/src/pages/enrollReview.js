import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_places } from "../actions/place/place";
import { load_favorite } from "../actions/favorite/favorite";
import { load_menu }  from "../actions/menu/menu";
import { load_review } from "../actions/review/review";
import { load_reviews } from "../actions/review/review";
import { enroll_review } from "../actions/review/review";

import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';

import ReviewTag from "../components/ReviewTag";
import { reviewTagImage } from "../components/ReviewTag";

// Icons
import back from '../image/arrow_back_ios.png';
import close from '../image/close.png';
import tag1 from '../image/태그/리뷰등록_off/review_맛집.png';
import tag1on from '../image/태그/리뷰등록_on/review_맛집Y.png'
import tag2 from '../image/태그/리뷰등록_off/review_간단한한끼.png';
import tag2on from '../image/태그/리뷰등록_on/review_간단한한끼Y.png';
import tag3 from '../image/태그/리뷰등록_off/review_분위기좋은.png';
import tag3on from '../image/태그/리뷰등록_on/review_분위기좋은Y.png';
import tag4 from '../image/태그/리뷰등록_off/review_가성비.png';
import tag4on from '../image/태그/리뷰등록_on/review_가성비Y.png';
import tag5 from '../image/태그/리뷰등록_off/review_친절.png';
import tag5on from '../image/태그/리뷰등록_on/review_친절Y.png';
import tag6 from '../image/태그/리뷰등록_off/review_청결도.png';
import tag6on from '../image/태그/리뷰등록_on/review_청결도Y.png';
import tag7 from '../image/태그/리뷰등록_off/review_둘이가요.png';
import tag7on from '../image/태그/리뷰등록_on/review_둘이가요Y.png';
import image from '../image/사진 더보기-1.png';


import emptyStar from '../image/Star border-1.png';
import filledStar from '../image/Star-1.png';
import halfStar from '../image/Star half.png'
import character from '../image/character.png';

import TextField from '@mui/material/TextField';
import ReviewStar from "../components/ReviewStar";



const enrollReview = () => {

    const handleOnclick = (event) =>{
        if(event.target.name == 'close' ){
            // 뒤로가기 오류 수정
            router.back();
        } 
    };  

    const router = useRouter();

    // place.js에서 전달 받은 id 값 받아오기
    const { id } = router.query;
    
    // Part 1) place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.place);
    const place = useSelector(state => state.place.place);

    const [keyword, setKeyword] = useState('');

    const onTagClick = (id) => {
        setKeyword(id);
    }

    // rating
    const [rating, setRating] = useState(0);

    const handleTouch = (index) => {
        // setRating(index);
        if (index + 1 === rating) {
            setRating(0);
        } else {
            setRating(index + 1);
        }
    };

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            // callback 오류 수정
            dispatch(load_review());
            dispatch(load_reviews(place_id));
        }
    }, [dispatch, id]);

    //리뷰 정보 전달
    const [rate, setRate] = useState(false);
    const [tagChoose, setTagChoose] = useState({
        '맛집':false,
        '간단한한끼':false,
        '분위기좋은':false,
        '가성비':false,
        '친절':false,
        '청결도':false,
        '둘이가요':false
    })

    // 태그 클릭 시
    const handleTagClick =(event)=>{
        if(tagLimit.length == 8){
            setTagChoose({
                ...tagChoose
            })
            if(tagChoose[event.target.name]){
                setTagChoose({
                    ...tagChoose,
                    [event.target.name]:false
                })
            }
        }
        else if(tagChoose[event.target.name]){
            setTagChoose({
                ...tagChoose,
                [event.target.name]:false
            })
        } else{
            setTagChoose({
                ...tagChoose,
                [event.target.name]:true
            })
        }
    }

    // 등록 클릭 시
    const handleEnrollClick = (event) =>{
        event.preventDefault();

        dispatch(enroll_review(rate, tagChoose,([result, message])=>{
            if(result){
                router.push({
                    pathname: '/enrollReview',
                    query: {viewportHeight: window.innerHeight},
                    src: '리뷰등록'
                })
            } else {
                alert(message);
            }
        }))
    }

    const [tagLimit, setTagLimit] = useState('');

    // 이미지 미리보기
    const onChangeImages = (e) => {
        setImages(Array.from(e.target.files));
    };
    const [images, setImages] = useState([]);

    const addBtnClick = e => {
        e.preventDefault();
        alert('add button clicked! ' + place_id + "\n" + rate + "\n" + content + "\n" + images + "\n" + tags);

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(enroll_review(place_id, rate, content, images, tags));

        }

    };

    const user = useSelector(state => state.auth.user);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card elevation={0} style={{
                            position: 'fixed',
                            top: '0px',
                            width: '100%',
                            maxWidth: '600px',
                            height: '98px',
                            zIndex: '4',
                            border: 'none',
                            }}>
                    <Grid container style={{padding:'50px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 0px 0px 0px'}}>
                            <Image src={close} width={37} height={37} name='close' onClick={handleOnclick}/>
                        </Grid>
                    
                        <Grid onClick={()=> handleEnrollClick()}>
                            <Typography sx={{fontSize:'18px', fontWeight:'700'}} color="#FFCE00">
                                등록
                            </Typography>
                        </Grid> 
                    </Grid>
                </Card>
            </Container>
            
            {/* Content */}
            <Container component="main" maxWidth="xs" style={{listStyleType: "none"}}>
                <Grid container style={{padding: '10px 15px'}}>
                    <Grid style={{width:'100%'}}>
                        <CardContent>
                        { places ? places.filter(item => item.id == place_id).map(item => (
                            <Grid container sx={{mt:0, pt:11}} style={{ justifyContent:'center'}}>
                                <Grid>
                                    <Typography sx={{fontSize: '23px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                        {item.name}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '250%', paddingLeft: '4px'}} color="#a1a1a1" component="div" align="center">
                                        {item.detail_category}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )) : null }

                            <Grid sx={{width: '100%'}}>
                                <Grid>
                                <div style={{ textAlign: "center", margin: '-20px -20px 0', padding: '13px 0px 5px 0px', borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
                                    {[1, 2, 3, 4, 5].map((item, index) => {
                                        let starImage = emptyStar;
                                        if (index + 1 <= rating) {
                                        starImage = filledStar;
                                        }
                                        return (
                                            <Image key={index} width={40} height={40} src={starImage} onTouchStart={() => handleTouch(index)} alt='star' />
                                        );
                                    })}
                                    <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#FFCE00'}}>{`${rating}점`}</Typography>
                                </div>
                                </Grid>
                            </Grid>

                            <Grid container style={{margin:'30px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                <Typography xs={6} sx={{fontSize: '17px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                    어떤 점이 좋았나요?
                                </Typography>
                                </Grid>
                                <Grid>
                                    <Typography xs={6} sx={{fontSize: '13px', fontWeight: '500', lineHeight: '150%', paddingLeft: '4px'}} color="#a1a1a1" component="div" align="center">
                                        (최대 3개)
                                    </Typography>
                                </Grid>
                            </Grid>


                            <Grid sx={{width: '100%'}}>
                                <div style={{margin: '-20px -20px 0', padding: '13px 0px 10px 0px',borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
                                <Grid container style={{margin: '13px 0px 11px 0px',  justifyContent: 'center', maxWidth:'350px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image
                                            src={tagChoose.맛집 ? tag1on : tag1}
                                            width= {77}
                                            height= {34}
                                            alt="tag1"
                                            onClick={handleTagClick}
                                            name='맛집'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.간단한한끼 ? tag2on : tag2}
                                            width= {131}
                                            height= {34}
                                            alt="tag2"
                                            onClick={handleTagClick}
                                            name='간단한한끼'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.분위기좋은 ? tag3on : tag3}
                                            width= {124}
                                            height= {34}
                                            alt="tag3"
                                            onClick={handleTagClick}
                                            name='분위기좋은'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.가성비 ? tag4on : tag4}
                                            width= {88}
                                            height= {34}
                                            alt="tag4"
                                            onClick={handleTagClick}
                                            name='가성비'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.친절 ? tag5on : tag5}
                                            width= {77}
                                            height= {34}
                                            alt="tag5"
                                            onClick={handleTagClick}
                                            name='친절'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.청결도 ? tag6on : tag6}
                                            width= {92}
                                            height= {34}
                                            alt="tag6"
                                            onClick={handleTagClick}
                                            name='청결도'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.둘이가요 ? tag7on : tag7}
                                            width= {109}
                                            height= {34}
                                            alt="tag7"
                                            onClick={handleTagClick}
                                            name='둘이가요'
                                        />
                                    </Grid>
                                </Grid>
                                </div>
                            </Grid>

                            <Grid>
                                <div className='form-group'>
                                    <label className='form-label mt-3' htmlFor='image'>
                                        <strong>Image</strong>
                                    </label>
                                    <input 
                                        className='form-control' type = 'file' name='images' accept='image/*' multiple
                                        placeholder ='Image' onChange={e => onChangeImages(e)}
                                        />
                                </div>
                            </Grid>

                            <Grid container style={{margin:'10px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                    <Box
                                    component="form"
                                    noValidate
                                    autoCompelet="off"
                                    sx={{'& .MuiTextField-root': { m: 1, width: '34ch' }, justifyContent:'center', alignItems:'center'}}>
                                        <TextField
                                        id="outlined-multiline-statiic"
                                        multiline
                                        rows={7}
                                        label="솔직한 리뷰를 써주세요 :)"
                                        />
                                </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </Container>






        </div>
        </Layout>
        </ThemeProvider>
        
    )
}

export default enrollReview;