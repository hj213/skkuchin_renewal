import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_review } from "../actions/review/review";
import { load_reviews } from "../actions/review/review";
import { modify_review } from "../actions/review/review";

import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';

// Icons
import close from '../image/close.png';
import tag1 from '../image/tags/review_off/review_taste.png';
import tag1on from '../image/tags/review_on/review_tasteY.png'
import tag2 from '../image/tags/review_off/review_simple.png';
import tag2on from '../image/tags/review_on/review_simpleY.png';
import tag3 from '../image/tags/review_off/review_mood.png';
import tag3on from '../image/tags/review_on/review_moodY.png';
import tag4 from '../image/tags/review_off/review_money.png';
import tag4on from '../image/tags/review_on/review_moneyY.png';
import tag5 from '../image/tags/review_off/review_kind.png';
import tag5on from '../image/tags/review_on/review_kindY.png';
import tag6 from '../image/tags/review_off/review_clean.png';
import tag6on from '../image/tags/review_on/review_cleanY.png';
import tag7 from '../image/tags/review_off/review_two.png';
import tag7on from '../image/tags/review_on/review_twoY.png';
import image from '../image/morePicY.png';


import emptyStar from '../image/Star_border-1.png';
import filledStar from '../image/Star-1.png';

import TextField from '@mui/material/TextField';

const ModifyReview = () => {

    const handleOnclick = (event) =>{
        if(event.target.name == 'close' ){
            router.back();
        } 
    };  

    const router = useRouter();

    // place.js에서 전달 받은 id 값 받아오기
    const id = router.query.id;
    // const reviewId = router.query.review_id;

    // Part 1) place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    // const [review_id, setReviewId] = reviewId != null ? useState(reviewId) : useState('');
    const places = useSelector(state => state.place.searchplace);

    // rating
    const [rating, setRating] = useState(0);

    // 리뷰 (텍스트)
    const [textReview, setTextReview] = useState('');

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
            dispatch(load_reviews(id));
            dispatch(load_review());
        }
    }, [dispatch, id]);

    //리뷰 정보 전달
    const [tagList, setTagList] = useState();
    const [tagChoose, setTagChoose] = useState({
        '맛집':false,
        '간단한 한 끼':false,
        '분위기 좋은':false,
        '가성비':false,
        '친절':false,
        '청결도':false,
        '둘이 가요':false
    })

    // 태그 관련
    useEffect(()=>{
        const newTags = [tagChoose];
        const allTags = newTags.reduce((acc, current)=>{
            return acc.concat(Object.entries(current));
        }, [])
            .filter(([, value]) => value)
            .map(([key]) => key);

        if(allTags.length <= 3){
            setTagList(allTags);
        }
    }, [tagChoose]);

    // 태그 클릭 시
    const handleTagClick =(event)=>{
        if(tagList.length == 3){
            setTagChoose({
                ...tagChoose
            })
            if(tagChoose[event.target.id]){
                setTagChoose({
                    ...tagChoose,
                    [event.target.id]:false
                })
            }
        }
        else if(tagChoose[event.target.id]){
            setTagChoose({
                ...tagChoose,
                [event.target.id]:false
            })
        } else{
            setTagChoose({
                ...tagChoose,
                [event.target.id]:true
            })
        }
    }

        // 이미지 URL 배열화
        const [images, setImages] = useState([]);
    
        const onChangeImages = (e) => {
            setImages(Array.from(e.target.files));
            // console.log("setImage : "+ Array.from(e.target.files));
        };
    

    // 등록 클릭 시
    const handleModifyClick = (event) =>{
        event.preventDefault();
        const review_id = router.query.review_id;
        dispatch(modify_review(review_id, rating, textReview, images, tagList, ([result, message])=>{
            if(result){
                alert("PUT 요청 result: " + result)
                router.push({
                    pathname: '/reviews',
                    query: { id: place_id }
                });                  
            } else {
                alert("PUT 실패!: " +message);
            }
        }));
    }




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
                            <a>
                            <Image src={close} width={37} height={37} name='close' onClick={handleOnclick}/>
                            </a>
                        </Grid>
                    
                        <Grid onClick={handleModifyClick}>
                            <Typography sx={{fontSize:'18px', fontWeight:'700'}} color="#FFCE00">
                                수정
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
                                            src={tagChoose['맛집'] ? tag1on : tag1}
                                            width= {77}
                                            height= {34}
                                            alt="tag1"
                                            onClick={handleTagClick}
                                            id='맛집'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose['간단한 한 끼'] ? tag2on : tag2}
                                            width= {131}
                                            height= {34}
                                            alt="tag2"
                                            onClick={handleTagClick}
                                            id='간단한 한 끼'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose['분위기 좋은'] ? tag3on : tag3}
                                            width= {124}
                                            height= {34}
                                            alt="tag3"
                                            onClick={handleTagClick}
                                            id='분위기 좋은'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose['가성비'] ? tag4on : tag4}
                                            width= {88}
                                            height= {34}
                                            alt="tag4"
                                            onClick={handleTagClick}
                                            id='가성비'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose['친절'] ? tag5on : tag5}
                                            width= {77}
                                            height= {34}
                                            alt="tag5"
                                            onClick={handleTagClick}
                                            id='친절'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose.청결도 ? tag6on : tag6}
                                            width= {92}
                                            height= {34}
                                            alt="tag6"
                                            onClick={handleTagClick}
                                            id='청결도'
                                        />
                                    </Grid>
                                    <Grid style={{marginRight:'5px'}}>
                                        <Image
                                            src={tagChoose['둘이 가요'] ? tag7on : tag7}
                                            width= {109}
                                            height= {34}
                                            alt="tag7"
                                            onClick={handleTagClick}
                                            id='둘이 가요'
                                        />
                                    </Grid>
                                </Grid>
                                </div>
                            </Grid>

                            <Grid container sx={{overFlowX:'auto', flexWrap:'nowrap'}}>
                                <Grid item>
                                    
                                </Grid>
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
                                    sx={{'& .MuiTextField-root': { m: 1, width: '34ch' }, justifyContent:'center', alignItems:'center'}}>
                                        <TextField
                                        id="outlined-multiline-statiic"
                                        multiline
                                        rows={7}
                                        label="솔직한 리뷰를 써주세요 :)"
                                        value={textReview}
                                        onChange={(e)=>{setTextReview(e.target.value)}}
                                        maxLength={60}
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

export default ModifyReview;