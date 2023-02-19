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
import tag14 from '../image/태그/mini태그/mini_가성비.png'
import profile from '../image/profile.png'
import { displayReviewTag, reviewsTags } from "../components/TagList";

const MyReviewPage = () => {

    const router = useRouter();
    const { id } = router.query;

    // place, 가게 정보 (place API)
    
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.place);
    const place = useSelector(state => state.place.place);

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);

    // 유저정보
    const user = useSelector(state => state.auth.user);

    // 뒤로가기, 수정필요
    const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            router.back();
        } 
    };  


    const dispatch = useDispatch();

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            // dispatch(load_reviews(id));
            dispatch(load_review());
        }
    }, [dispatch, id]);


    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card elevation={0} style={{
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                    height: '98px',
                    zIndex: '4',
                    border: 'none',
                }}>
                    <Grid container style={{padding:'50px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 10px 0px 0px'}}>
                            <Image src={back} width={15} height={26} name='back' onClick={handleOnclick}/>
                        </Grid>
                
                        <Grid>
                            {places ? places.filter(item => item.id == place_id).map(item => (
                                <Grid style={{flexDirection: 'row'}}>
                                    <Typography sx={{fontSize: '26px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                        나의 리뷰
                                    </Typography>
                                    <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="span" >
                                        
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

                            <Grid container style={{margin:'30px auto 0px', justifyContent:'space-between'}}>
                                <Grid>
                                    <Typography xs={2} sx={{fontSize: '17px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                        나의 리뷰
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography xs={2} sx={{fontSize: '13px', fontWeight: '500', lineHeight: '150%'}} color="#a1a1a1" component="div" align="center">
                                        {/* 필터 버튼 */}
                                        최신순
                                    </Typography>
                                </Grid>
                            </Grid>
                            </>
                            )) : null }
                
                            {places ? places
                            .filter(item => item.id == place_id)
                            .map(item =>(
                                <li key={item.id} data={item}>
                                    <>
                                    {reviews ? reviews.map((review, index)=>(
                                        <Grid container key={index}>
                                            <Grid container style={{margin:'20px 0px 0px', justifyContent:'left'}}>
                                                
                                                <Grid item xs={6}>
                                                    <Stack direction="column" spacing={1}>
                                                        <Typography sx={{fontSize: '17px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                                                            place_id = {review.place_id}
                                                        </Typography>
                                                        <Grid style={{display:'flex'}}>
                                                            <Rating name="read-only" size="small" value={review.rate} readOnly precision={1} />
                                                            <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '180%', paddingLeft:'5px'}} color="#a1a1a1" component="div" align="center">
                                                                | {review.create_date.slice(0,10)}
                                                            </Typography>
                                                        </Grid>
                                                    </Stack>
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
                                                            padding:'10px 10px 8px 10px',
                                                            fontSize: '12px'
                                                        }}>
                                                        {review.content}
                                                    </Typography>
                                                </Card>

                                            </Grid>

                                            <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                                {review.tags.map((tag, index)=>(
                                                    <Grid>
                                                    <Stack direction="column" style={{marginRight:"6px", marginBottom:"6px"}} key={index}>
                                                        {reviewsTags(tag)}
                                                    </Stack>
                                                </Grid>
                                                ))}
                                            </Grid>

                                            {/* <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                            <ImageList sx={{ width: 300, height: 300 }} rows={1} rowHeight='auto'>
                                                {itemData.map((item) => (
                                                    <ImageListItem key={item.img}>
                                                    <img
                                                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                    </ImageListItem>
                                                ))}
                                            </ImageList>
                                            </Grid> */}
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

export default MyReviewPage;
