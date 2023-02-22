import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_reviews } from "../actions/review/review";
import { load_review} from "../actions/review/review"
import { load_favorite } from "../actions/favorite/favorite";
import { load_menu }  from "../actions/menu/menu";

import {BadgeProps} from '@mui/material/Badge'
import {styled} from '@mui/material/styles';
import { MenuItem, Select, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png'
import close from '../image/close.png'
import profile from '../image/profile.png'

import { displayReviewTag, reviewsTags } from "../components/TagList";


const ReviewsPage = () => {

    const dispatch = useDispatch();

    // 뒤로가기
    const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            router.back();
        } 
    };  

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            dispatch(load_reviews(place_id));
        }
    }, [dispatch, id]);

    // place, 가게 정보 (place API)
    
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.searchplace);

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);
    const [filter, setFilter] = useState('Latest'); // 디폴트 필터는 'Latest'

    useEffect(() => {
        if(reviews != null) {
            if (filter === 'Latest') {
                setSortedReviews([...reviews].reverse()); // 최신순으로 정렬
                } else if (filter === 'Rating') {
                setSortedReviews([...reviews].sort((a, b) => b.rate - a.rate)); // 평점이 높은 순으로 정렬
                } else if (filter === 'Oldest') {
                setSortedReviews([...reviews]); // 오래된 순으로 정렬 (기본값)
             }
        }
    }, [filter, reviews]);
    
    const [sortedReviews, setSortedReviews] = useState(reviews ? [...reviews] : []);

    const handleFilterChange = (event) => {
      setFilter(event.target.value);
    };

    // 유저정보
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
            <Container component="main" style={{listStyleType: "none"}}>
                <Grid container sx={{pt:8}} style={{justifyContent:'center'}} >
                    <Grid style={{width:'100%'}}>
                        <CardContent>
                        {places ? places.filter(item => item.id == place_id).map(item => (
                            <>
                            <Grid container style={{margin:'10px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                    <Typography sx={{fontSize: '24px', fontWeight: '700', color: '#FFCE00', lineHeight:'215%', paddingRight:'0px'}} component="div">
                                        {item.rate}점
                                    </Typography>
                                </Grid>
                                <Grid>
                                <Box component="fieldset" borderColor="transparent">
                                    <Rating name="read-only" size="large" value={item.rate} readOnly precision={0.1} />
                                </Box>

                                </Grid>
                            </Grid>

                            <Grid container style={{margin:'25px auto 10px', justifyContent:'space-between'}}>
                                <Grid item  >
                                    <Typography xs={2} sx={{fontSize: '17px', fontWeight:'700', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                        스꾸리뷰
                                    </Typography>
                                </Grid>
                                <Grid item >
                                    <Typography xs={8}  sx={{fontSize: '17px', fontWeight:'700', lineHeight: '97%', verticalAlign: 'top', paddingRight:'120px'}} color="#FFCE00" align="left">
                                        {item.review_count}
                                    </Typography>
                                </Grid>
                                <Grid item > 
                                    <Select
                                        xs={2}
                                        sx={{ fontSize: '14px', lineHeight: '200%', width: '100px', height: '30px', marginTop: '-30px', border: 'none' }}
                                        value={filter}
                                        onChange={handleFilterChange}
                                    >
                                        <MenuItem value='Latest'>최신순</MenuItem>
                                        <MenuItem value='Oldest'>오래된순</MenuItem>
                                        <MenuItem value='Rating'>평점순</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            </>
                            )) : null }
                        <ul style={{listStyle:"none",paddingLeft:"0px"}}>
                            {places ? places.filter(item => item.id == place_id).map(item =>(
                                <li key={item.id} data={item}>
                                    <>
                                    {reviews ? sortedReviews.map((review, index)=>(
                                        <Grid container key={index} style={{margin:"0 0 20px 0"}}>
                                            <Grid container style={{margin:'20px 0px 0px', justifyContent:'left'}}>
                                                <Grid item xs={2}>
                                                    { review.user_id === user.id ?
                                                        <Badge badgeContent={"나"} color="secondary">
                                                            <Avatar alt="" src={user.image} />
                                                        </Badge> : <Avatar alt="" src={user.image} />}
                                                        
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Stack direction="column" spacing={1}>
                                                        <Typography sx={{fontSize: '12px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                                                            {review.nickname}
                                                        </Typography>
                                                        <Grid style={{display:'flex'}}>
                                                            <Typography sx={{fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                                                                {review.major} {review.student_id}학번
                                                            </Typography>
                                                            <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '0%', paddingLeft:'5px'}} color="#a1a1a1" component="div" align="center">
                                                                | {review.create_date.slice(0,10)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid style={{margin:'10px 0 0 -3px'}}>
                                                        <Rating name="read-only" size="small" value={review.rate} readOnly precision={1} />
                                                        </Grid>
                                                    </Stack>
                                                </Grid>
                                            </Grid>

                                            <Grid container style={{margin:'5px 0px 0px', justifyContent:'left'}}>
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

                                            <Grid container style={{margin:'15px 0px 0px', justifyContent:'left'}}>
                                                {review.images && review.images.length > 0 ? (
                                                    <div style={{ display: 'flex', overflow: 'auto' }}>
                                                        {review.images.map((image, index) => (
                                                            <div key={index} style={{ marginRight: '10px' }}>
                                                                <Image
                                                                    width={150}
                                                                    height={150}
                                                                    src={image}
                                                                    alt={`image-${index}`}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </Grid>
                            </Grid>
                            )): null}
                            </>
                            </li> 
                        )): null}
                        </ul>



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