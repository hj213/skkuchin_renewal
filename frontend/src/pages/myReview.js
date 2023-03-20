import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_review,  delete_review, modify_review, clear_my_review} from "../actions/review/review"
import { load_places, load_place } from "../actions/place/place";

import {BadgeProps} from '@mui/material/Badge'
import {styled} from '@mui/material/styles';
import { CssBaseline, IconButton, Rating, ThemeProvider, Select, Card, MenuItem, Menu, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png'
import star from '../image/Star-1.png'
import closeIcon from '../image/close.png';
import profile from '../image/profile.png'
import { displayReviewTag, reviewsTags } from "../components/TagList";
import MyReviewItem from "../components/MyReviewItem";
import more from '../image/more_vert.png';

const MyReviewPage = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.myReview);
 
    const allPlaces = useSelector(state => state.place.allplaces);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_places());
            dispatch(load_review());
        }
    }, []);

        //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'back' ){
            router.push({
                pathname: '/',
                query: { openID: true }
            });
                
        } else{
            router.push('/');
        }
    };

    const [filter, setFilter] = useState('Latest'); // 디폴트 필터는 'Latest'

    useEffect(() => {
        if(reviews != null) {
            if (filter === 'Latest') {
                setSortedReviews([...reviews].reverse()); // 최신순으로 정렬
            } else if (filter === 'Oldest') {
                setSortedReviews([...reviews]); // 오래된 순으로 정렬 (기본값)
            } else  {
                const sortedReviews = [...reviews].sort((a, b) => {
                    const aPlace = allPlaces.find(place => place.id === a.place_id);
                    const bPlace = allPlaces.find(place => place.id === b.place_id);
                    const aName = aPlace?.name || '';
                    const bName = bPlace?.name || '';
                    return aName.localeCompare(bName);
                });
                setSortedReviews(sortedReviews);
            }
        }
    }, [filter, reviews]);
    
    const [sortedReviews, setSortedReviews] = useState(reviews ? [...reviews] : []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleEdit = (reviewId) => {
        const review = reviews && reviews.find(item => item.id == reviewId);
        dispatch(load_place(review.place_id));
        router.push({
            pathname: '/modifyReview',
            query: { id: review.place_id, review_id: review.id }
        });
    }

    const handleDelete = (reviewId) =>{
        const review = reviews.find(item => item.id == reviewId);
        dispatch(delete_review(reviewId, ([result, message])=>{
            if(result){
                dispatch(load_review());
            } else {
            }
        }));
    } 


    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div name="상단" style={{width:'100%', height:'100%', position:'relative', marginTop:'0px'}}>
                <div style={{position: 'absolute'}}>
                <Container fixed style={{ position:'fixed', zIndex:'4', padding:'0px', overflow: "hidden", height:'87px', maxWidth:'600px'}} >
                <Card style={{
                            top: '0px',
                            width: '100%',
                            height: '120%',
                            zIndex: '4',
                            border: "1px solid transparent",
                            boxShadow: 'none',
                            paddingTop:'41px'
                        }}>
                        <Grid container style={{padding:'0px 13px 0px 15px', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Grid style={{padding: '2px 10px 0px 4px'}} >
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick} layout='fixed' />
                            </Grid>
                            <Grid>
                                <Grid container>
                                    <Grid item xs style={{marginTop:'4px'}} >
                                        <Image src={star} width={20} height={20} layout='fixed' />
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{margin:'0px 0px 0px 5px', fontSize:'20px'}}>나의 리뷰</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid >
                                <Image src={closeIcon} width={31} height={31} name='close' onClick={handleIconOnclick} layout='fixed' />
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
            </div>
            <Grid item sx={{paddingTop: '90px', textAlign: 'right', pr: '20px', pb:' 0'}}> 
                    <Select
                        xs={2}
                        sx={{ fontSize: '14px', lineHeight: '200%', width: 'wrapContent', border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                        }, height: '10px', marginRight: '-15px',border: 'none', p: '5px', textAlign: 'right', color: '#A1A1A1'}}
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value='Latest'>최신순</MenuItem>
                        <MenuItem value='Oldest'>오래된순</MenuItem>
                        <MenuItem value='Names'>이름순</MenuItem>
                    </Select>                        
            </Grid>
            <Grid item sx={{top: 0}}>
                <ul style={{listStyle:"none",paddingLeft:"0px"}}>
                    {reviews && sortedReviews.map((review, index)=>(
                        <MyReviewItem key={index} review={review} handleDelete={handleDelete} handleEdit={handleEdit}/>
                    ))}
                </ul>
            </Grid>

        </div>
        </ThemeProvider>
        
    )
}

export default MyReviewPage;
