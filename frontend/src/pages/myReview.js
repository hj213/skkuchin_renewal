import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_review, load_reviews, delete_review, modify_review} from "../actions/review/review"
import { load_places } from "../actions/place/place";

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
import ReviewItem from "../components/ReviewItem";
import more from '../image/more_vert.png';

// 야매임, 수정 필요
const MyReviewPage = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    // 유저정보
    const user = useSelector(state => state.auth.user);
    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);
 
    const allPlaces = useSelector(state => state.place.allplaces);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined ) {
            dispatch(load_review());
        }
    }, [dispatch]);

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_places());
        }
    }, []);

    const [selectedReviewId, setSelectedReviewId] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMoreClick = (event, id) => {
      setAnchorEl(event.currentTarget);
      setSelectedReviewId(id);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
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
        // const review = reviews.find(item => item.id == reviewId);
        // if (review.user_id == user.id) {
        //   router.push({
        //     pathname: '/modifyReview',
        //     query: { id: review.place_id, review_id: review.id }
        //   });
        // }
    }

    const handleDelete = (reviewId) =>{
        // alert("다음을 삭제할 것. "+ reviewId);
        // dispatch(delete_review(reviewId, ([result, message])=>{
        //     if(result){
        //         alert("Delete 요청 result: " + result);            
        //     } else {
        //         alert("실패!: " +message);
        //     }
        // }));
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
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid>
                                <Grid container>
                                    <Grid item xs style={{marginTop:'4px'}} >
                                        <Image src={star} width={20} height={20} placeholder="blur" layout='fixed' />
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{margin:'0px 0px 0px 5px', fontSize:'20px'}}>나의 리뷰</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid >
                                <Image src={closeIcon} width={31} height={31} name='close' onClick={handleIconOnclick} placeholder="blur" layout='fixed' />
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
            </div>
            <Grid item sx={{paddingTop: '90px', textAlign: 'right', pr: '20px'}}> 
                    <Select
                        xs={2}
                        sx={{ fontSize: '14px', lineHeight: '200%', width: 'wrapContent', border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                        }, height: '30px', marginTop: '-30px', marginRight: '-15px',border: 'none', p: '5px', textAlign: 'right', color: '#A1A1A1'}}
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value='Latest'>최신순</MenuItem>
                        <MenuItem value='Oldest'>오래된순</MenuItem>
                        <MenuItem value='Names'>이름순</MenuItem>
                    </Select>                        
            </Grid>
            
            {/* Content */}
            <Container sx={{listStyle: 'none', pl: '35px'}}>
                {sortedReviews && sortedReviews.map((review,index)=>(
                    <li key={review.id}>
                        <>
                            <Grid container>
                                <Grid container style={{margin:'20px 0px 0px'}}>
                                    <Grid item xs={12}>
                                        <Stack direction="column" spacing={1}>
                                            <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                                                <Typography sx={{fontSize: '17px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                                                    {allPlaces && allPlaces.find(place => place.id === review.place_id)?.name || `unknown place (place_id=${review.place_id})`}
                                                </Typography>
                                                <Grid item>
                                                    <IconButton onClick={(event) => handleMoreClick(event, review.id)}>
                                                        <Image src={more} width={4.33} height={17.33} placeholder="blur" layout='fixed' />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                        PaperProps={{
                                                            style: {
                                                            boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.02)",
                                                            },
                                                        }}
                                                        >
                                                        <MenuItem sx={{fontSize: '15px', color: '#FFCE00'}} onClick={()=>handleEdit(sortedReviews[index].id)}>
                                                            수정 {review.id} vs {sortedReviews[index].id}
                                                        </MenuItem>
                                                        <MenuItem sx={{fontSize: '15px'}} onClick={()=> {handleDelete(review.id); handleMenuClose();}}>삭제{review.id}</MenuItem>
                                                    </Menu>
                                                </Grid>
                                            </Grid>
                                            <Grid style={{display:'flex'}}>
                                                <Rating name="read-only" size="small" value={review.rate} readOnly precision={1} />
                                                <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '180%', paddingLeft:'5px'}} color="#a1a1a1" component="div" align="center">
                                                    | {review.create_date.slice(0,10)}
                                                </Typography>
                                            </Grid>
                                        </Stack>
                                    </Grid>
                                    <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                                        <Card style={{
                                            borderRadius: '0px 15px 15px 15px',
                                            backgroundColor:'#FFE885'
                                        }}>
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
                                            <Grid key={index}>
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
                                                            placeholder="blur" 
                                                            blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                                            layout='fixed'
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </>
                    </li>
                ))}
            </Container>  
                                    {/* <li  >
                                        <>
                                            {reviews && sortedReviews.map((review, index)=>(
                                                <ReviewItem key={index} review={review} user={user} handleDelete={handleDelete} handleEdit={handleEdit}/>
                                            ))}
                                        </>
                                    </li>  */}
        </div>
        </ThemeProvider>
        
    )
}

export default MyReviewPage;
