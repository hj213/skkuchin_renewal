import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_reviews, delete_review, modify_review } from "../actions/review/review";
import { load_place } from "../actions/place/place";

import {BadgeProps} from '@mui/material/Badge'
import {styled} from '@mui/material/styles';
import { IconButton, MenuItem, Menu,Select, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import ReviewItem from "../components/ReviewItem";

const ReviewsPage = () => {

    const dispatch = useDispatch();

    // 뒤로가기
    const handleOnclick = (event) =>{
        router.push({
            pathname: '/place',
            query: { id: place_id }
        });
    };  

    const router = useRouter();
    const { id } = router.query;

    // place, 가게 정보 (place API)
    
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.searchplace);
    const selectedPlace = useSelector(state => state.place.place);

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined && place_id!='' && id!='') {
            setPlaceId(id);
            dispatch(load_reviews(place_id));
            dispatch(load_place(place_id));
        }
    }, [id]);

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


    const handleEdit = (reviewId) => {
        const review = reviews.find(item => item.id == reviewId);
        if (review.user_id == user.id) {
          router.push({
            pathname: '/modifyReview',
            query: { id: place_id, review_id: reviewId }
          });
        }
    }

    const handleDelete = (reviewId) =>{
        alert("다음을 삭제할 것. "+ reviewId);
        dispatch(delete_review(reviewId, ([result, message])=>{
            if(result){
                alert("Delete 요청 result: " + result);     
                dispatch(load_reviews(place_id));        
            } else {
                alert("실패!: " +message);
            }
        }));
    } 

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                            {places ? places.filter(item => item.id == place_id).map((item,index) => (
                                <Grid key={index} style={{flexDirection: 'row'}}>
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
                            <>
                            <Grid container style={{margin:'10px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                    <Typography sx={{fontSize: '24px', fontWeight: '700', color: '#FFCE00', lineHeight:'215%', paddingRight:'0px'}} component="div">
                                        {selectedPlace && selectedPlace.rate}점
                                    </Typography>
                                </Grid>
                                <Grid>
                                <Box component="fieldset" borderColor="transparent">
                                    <Rating name="read-only" size="large" value={selectedPlace && selectedPlace.rate} readOnly precision={0.1} />
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
                                        {selectedPlace && selectedPlace.review_count}
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
                            <ul style={{listStyle:"none",paddingLeft:"0px"}}>
                                {places ? places.filter(item => item.id == place_id).map((item, index) =>(
                                    <li key={item.id} data={item}>
                                        <>
                                            {reviews && sortedReviews.map((review, index)=>(
                                                <ReviewItem key={index} review={review} user={user} handleDelete={handleDelete} handleEdit={handleEdit}/>
                                            ))}
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
