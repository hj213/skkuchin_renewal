import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_reviews, delete_review, modify_review } from "../actions/review/review";
import { load_place } from "../actions/place/place";

import {BadgeProps} from '@mui/material/Badge'
import {styled} from '@mui/material/styles';
import { IconButton, MenuItem, Menu,Select, Modal, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import ReviewItem from "../components/ReviewItem";
import close from '../image/close.png';
import next from '../image/photo_next.png';
import prev from '../image/photo_prev.png';
import morePic from '../image/photo_more.png';

const MorePhotos = () => {

    const dispatch = useDispatch();

    // 뒤로가기
    const handleOnclick = (event) =>{
        router.push({
            pathname: '/place',
            query: { id: place_id }
        });
    };  

    const router = useRouter();
    const { id, img } = router.query;

    // place, 가게 정보 (place API)
    
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const [image, setImage] = img != null? useState(img) : useState('');

    const places = useSelector(state => state.place.searchplace);
    const selectedPlace = useSelector(state => state.place.place);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined && place_id!='' && id!='') {
            setPlaceId(id);
            dispatch(load_reviews(place_id));
            dispatch(load_place(place_id));
        }
    }, [id]);

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);
    const totalImagesUrl = reviews && reviews.map(review => review.images).flatMap(imageArray => imageArray);

    const allImages = selectedPlace && selectedPlace.images.concat(totalImagesUrl);
    const [isFromSelectedPlace, setIsFromSelectedPlace] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const review = reviews && reviews.find(review => review.images.includes(image));

    useEffect(()=> {
        if (review) {
          const index = review.images.findIndex(img => img === image);
          setCurrentIndex(index);
        } else {
          const index = allImages.findIndex(img => img == image);
          setIsFromSelectedPlace(index < selectedPlace.images.length);
          setCurrentIndex(index);
        }
      },[]);


    const handleNextClick = () => {
        if(isFromSelectedPlace)
            setCurrentIndex(currentIndex === selectedPlace.images.length - 1 ? 0 : currentIndex + 1);
        else 
            setCurrentIndex(currentIndex === review.images.length - 1 ? 0 : currentIndex + 1);
    };

    const handlePrevClick = () => {
        if(isFromSelectedPlace)
            setCurrentIndex(currentIndex === 0 ? selectedPlace.images.length - 1 : currentIndex - 1);
        else
            setCurrentIndex(currentIndex === 0 ? review.images.length - 1 : currentIndex - 1);
    };

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout >
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                        <Card elevation={0}
                        style={{
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '80px',
                            zIndex: '4',
                            borderRadius:'0px',
                        }}>
                            <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid style={{padding: '0px 10px 0px 0px', marginTop:'6px'}}>
                                    <Image src={back} width={12} height={22} name='back' onClick={handleOnclick}/>
                                </Grid>

                                <Grid>
                                { selectedPlace &&
                                    <Grid style={{flexDirection: 'row'}}>
                                        <Typography sx={{fontSize: '26px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                            {selectedPlace.name}
                                        </Typography>
                                        <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="span" >
                                            {selectedPlace.detail_category}
                                        </Typography>
                                    </Grid>
                                }
                                </Grid>
                                <Grid>
                                    <Image src={close} width={37} height={37} name='close' onClick={handleOnclick}/>
                                </Grid> 
                            </Grid>
                        </Card>
            </Container>
            
            {/* 사진 콘텐츠 */}
            <Grid container style={{padding: '90px 0 0px'}}>
                {isFromSelectedPlace? 
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ 
                            width: '100%',
                            height: 'auto', 
                            margin: '5px', 
                            position: 'relative', 
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}> 
                            <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <Image onClick={handlePrevClick} src={prev} width={33} height={33}/>
                            </div>
                            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <Image onClick={handleNextClick} src={next} width={33} height={33}/>
                            </div>
                            <div style={{ position: 'absolute', bottom: '13px', right: '10px', zIndex: '10', display: 'flex', alignItems: 'center'}}>
                                <Typography sx={{color: '#FFE885', fontSize: '13px', fontWeight: '700', pr: '7px'}}>{`${currentIndex+1}/${selectedPlace.images.length}`}</Typography>
                                <Image src={morePic} width={22} height={22}/>
                            </div>
                           <Image
                                width={800}
                                height={1200}
                                src={selectedPlace.images[currentIndex]}
                                alt={`image`}
                             />
                        </div>
                    </div>
                </div>
                : ( review &&
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div style={{ 
                                    width: '100%',
                                    height: 'auto', 
                                    margin: '5px', 
                                    position: 'relative', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}> 
                                    <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                        <Image onClick={handlePrevClick} src={prev} width={33} height={33}/>
                                    </div>
                                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                        <Image onClick={handleNextClick} src={next} width={33} height={33}/>
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '13px', right: '10px', zIndex: '10', display: 'flex', alignItems: 'center'}}>
                                        <Typography sx={{color: '#FFE885', fontSize: '13px', fontWeight: '700', pr: '7px'}}>{`${currentIndex+1}/${review.images.length}`}</Typography>
                                        <Image src={morePic} width={22} height={22}/>
                                    </div>
                                    <Image
                                        width={800}
                                        height={1200}
                                        src={review.images[currentIndex]}
                                        alt={`image`}
                                        />
                                </div>
                        </div>
                    </div>
                )
                }
            </Grid>
            <Grid container >
                {reviews && review ? 
                    <Grid container style={{margin:'16px 15px 10px', justifyContent:'left'}}>
                    <Grid item xs={2}>
                        { review && review.user_id === user.id ?
                            <Badge badgeContent={"나"} color="secondary">
                                <Avatar alt="" src={ user.image} />
                            </Badge> : <Avatar alt="" src={user.image} />}
    
                    </Grid>
                    <Grid item xs={10}>
                    <Stack direction="column" spacing={1}>
                        <Grid container alignItems='center'>
                            <Grid item xs>
                            <Typography
                                sx={{
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '200%',
                                verticalAlign: 'top',
                                }}
                                align='left'
                            >
                                {review.nickname}
                            </Typography>
                            </Grid>

                        </Grid>
                            <Stack direction="row" alignItems="center">
                                <Typography
                                sx={{ fontSize: '12px', fontWeight: '500', lineHeight: '0%', verticalAlign: 'top' }}
                                align="left"
                                >
                                {review.major} {review.student_id}학번
                                </Typography>
                                <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    lineHeight: '0%',
                                    paddingLeft: '5px',
                                    color: '#a1a1a1',
                                }}
                                component="div"
                                align="left"
                                >
                                | {review.create_date.slice(0, 10)}
                                </Typography>
                            </Stack>
                            <Grid style={{margin:'10px 0 0 -3px'}}>
                                <Rating name="read-only" size="small" value={review.rate} readOnly precision={1} />
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>
                : 
                <Grid container sx={{p: '0 20px', mt: '15px'}}>
                    <Grid item xs={2}>
                       <Avatar alt="" src={user.image} />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography
                                sx={{
                                fontSize: '12px',
                                fontWeight: '700',
                                lineHeight: '24px',
                                verticalAlign: 'top'
                                }}
                                align='left'
                        >
                            {selectedPlace.name}
                        </Typography>
                        <Typography
                            sx={{ fontSize: '12px', fontWeight: '500',  verticalAlign: 'top'}}
                            align="left"
                        >
                        업체등록사진
                        </Typography>
                    </Grid>
                </Grid>
                }
            </Grid>
        </div>
        </Layout>
        </ThemeProvider>
        
    )
}

export default MorePhotos;
