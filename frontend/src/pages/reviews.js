import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_reviews } from "../actions/review/review";
import { load_review} from "../actions/review/review"
import { load_favorite } from "../actions/favorite/favorite";
import { load_menu }  from "../actions/menu/menu";

import {BadgeProps} from '@mui/material/Badge'
import {styled} from '@mui/material/styles';
import { CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png'
import close from '../image/close.png'
import tag16 from '../image/태그/리뷰등록_off/tag_가성비.png'
import tag17 from '../image/태그/리뷰등록_off/tag_간단한한끼.png'
import tag14 from '../image/태그/리뷰등록_off/tag_둘이가요.png'
import profile from '../image/profile.png'
import image from '../image/사진 더보기-1.png'



import emptyStar from '../image/Star border-1.png';
import filledStar from '../image/Star-1.png';
import character from '../image/character.png';

import TextField from '@mui/material/TextField';
import ReviewStar from "../components/ReviewStar";



const ReviewsPage = () => {

    // 전체화면 시, 헤더영역 아이콘 클릭 이벤트, 수정 필요
    const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            setHeight('32%');
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility: 'visible'
            })
        } 
    };  

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            // dispatch(load_favorite());
            // dispatch(load_menu(id));
            dispatch(load_reviews(place_id));
            // dispatch(load_review());
        }
    }, [dispatch, id]);

    // place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.place);

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);

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

    // const user = useSelector(state => state.auth.user);

    // 이미지
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
          },
          {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
          },
          {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
          },
          {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
          },
    ]



    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}

            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card style={{
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                    height: '98px',
                    zIndex: '4',
                }}>
                    <Grid container style={{padding:'50px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 10px 0px 0px'}}>
                            <Image src={back} width={15} height={26} name='back' onClick={handleOnclick}/>
                        </Grid>
                
                        <Grid>
                            {places ? places.filter(item => item.id == place_id).map(item => (
                                <Grid style={{flexDirection: 'row'}}>
                                    <Typography sx={{fontSize: '26px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="span" >
                                        {item.detail_category}
                                    </Typography>
                                </Grid>
                            )) : null }
                        </Grid>
                    
                        <Grid>
                        </Grid> 
                    </Grid>
                </Card>
            </Container>
            
            {/* Content */}
            <Container component="main" maxWidth="xs" style={{listStyleType: "none"}}>
                <Grid container sx={{pt:8}} style={{justifyContent:'center'}} >
                    <Grid style={{width:'100%'}}>
                        <CardContent>
                        {places ? places.filter(item => item.id == place_id).map(item => (
                            <>
                            <Grid container style={{margin:'30px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                    <Typography sx={{fontSize: '24px', fontWeight: '700', color: '#FFCE00', lineHeight:'190%', paddingRight:'10px'}} component="div">
                                        {item.rate}점
                                    </Typography>
                                </Grid>
                                <Grid>
                                <Box component="fieldset" borderColor="transparent">
                                    <Rating name="read-only" size="large" value={item.rate} readOnly precision={0.1} />
                                </Box>

                                </Grid>
                            </Grid>

                            <Grid container style={{margin:'30px auto 0px', justifyContent:'space-between'}}>
                                <Grid>
                                    <Typography xs={2} sx={{fontSize: '17px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                        스꾸리뷰
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography xs={8} sx={{fontSize: '17px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top', paddingRight:'200px'}} color="#FFCE00" align="center">
                                        {item.review_count}
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography xs={2} sx={{fontSize: '13px', fontWeight: '500', lineHeight: '150%'}} color="#a1a1a1" component="div" align="center">
                                        최신순
                                    </Typography>
                                </Grid>
                            </Grid>
                            </>
                            )) : null }
                
                            {places ? places. filter(item => item.id == place_id).map(item =>(
                                <li key={item.id} data={item}>
                                    <>
                                    {reviews ? reviews.map((review, index)=>(
                                        <Grid container key={index}>
                                            <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                                <Grid xs={2}>
                                                    <Badge badgeContent={"나"} color="secondary">
                                                        <Avatar alt="" src={profile} />
                                                    </Badge>
                                                </Grid>
                                                <Grid xs={6}>
                                                    <Stack direction="column" spacing={1}>
                                                        <Typography sx={{fontSize: '12px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                                                            양세형
                                                        </Typography>
                                                        <Typography sx={{fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                                                            컬쳐앤테크놀로지융합전공 14학번
                                                        </Typography>
                                                        <Grid style={{margin:'10px 0 0 -3px'}}>
                                                            {/* {[1, 2, 3, 4, 5].map((item, index) => {
                                                                let starImage = emptyStar;
                                                                if (index + 1 <= rating) {
                                                                starImage = filledStar;
                                                                }
                                                                return (
                                                                    <Image key={index} width={20} height={20} src={starImage} onTouchStart={() => handleTouch(index)} alt='star' />
                                                                );
                                                            })} */}
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                                <Grid xs={4} >
                                                    <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '550%', paddingLeft:'5px'}} color="#a1a1a1" component="div" align="center">
                                                        | 2022.10.22
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                                <Card style={{
                                                    borderRadius: '0px 15px 15px 15px',
                                                    backgroundColor:'#FFE885'
                                                }}
                                                >
                                                    <Typography
                                                        style={{
                                                            padding:'5px 10px',
                                                            fontSize: '12px'
                                                        }}>
                                                        {review.content}
                                                    </Typography>
                                                </Card>

                                            </Grid>

                                            <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                                <Grid>
                                                    <Stack direction="column" spacing={1}>
                                                        <Image
                                                                width= {50}
                                                                height= {34}
                                                                alt="tag"
                                                            src={tag14} />
                                                    </Stack>
                                                </Grid>
                                            </Grid>

                                            <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                            <ImageList sx={{ width: 300, height: 300 }} rows={1} rowHeight='auto'>
                                                {/* {itemData.map((item) => (
                                                    <ImageListItem key={item.img}>
                                                    <img
                                                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    </ImageListItem>
                                                ))} */}
                                            </ImageList>
                                            </Grid>
                            </Grid>
                            )): null}
                            </>
                            </li>
                        )): null}

                        </CardContent>
                    </Grid>
                </Grid>
            </Container>
        </div>
        </Layout>
        </ThemeProvider>
        
    )
}

export default ReviewsPage;