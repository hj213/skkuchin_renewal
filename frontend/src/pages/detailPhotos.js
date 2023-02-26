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
    const [review, setReview] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // useEffect(()=> {
    //     const index = allImages.findIndex(img => img === image);
    //     setIsFromSelectedPlace(index < selectedPlace.images.length);
    //     if (index < selectedPlace.images.length) {
    //         console.log('가게 이미지 :', selectedPlace.images);
    //     } else {
    //         setReview(reviews.find(review => review.images.includes(image)));
    //     }
    // },[])
    useEffect(()=> {
        const review = reviews.find(review => review.images.includes(image));
        if (review) {
          const index = review.images.findIndex(img => img === image);
          setCurrentIndex(index);
          setReview(review);
        } else {
          const index = allImages.findIndex(img => img === image);
          setIsFromSelectedPlace(index < selectedPlace.images.length);
          setCurrentIndex(index - selectedPlace.images.length);
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
            <Layout>
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card elevation={0} style={{
                    position: 'fixed',
                    top: '0px',
                    width: '100%',
                    zIndex: '4',
                    border: 'none',
                }}>
                    <Grid container style={{padding:'45px 15px 11px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 10px 0px 0px'}}>
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
                            <Image src={close} width={37} height={37} name='close' onClick={handleOnclick}/>
                        </Grid> 
                    </Grid>
                </Card>
            </Container>
            
            {/* 사진 콘텐츠 */}
            <Grid container style={{paddingTop: '90px'}}>
                {isFromSelectedPlace? 
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selectedPlace.images.map((image, index) => (
                        <div key={index} style={{ width: 'auto', height: '70vh', margin: '5px', position: 'relative', overflow: 'hidden'}}>
                            <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <button onClick={handlePrevClick}>이전</button>
                            </div>
                            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <button onClick={handleNextClick}>다음</button>
                            </div>
                             <Image
                             width={384}
                             height={616}
                             src={image}
                             alt={`image-${index}`}
                             style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                             />
                         </div>
                        ))}
                    </div>
                </div>
                : ( review &&
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {/* {review.images.map((image, index) => ( */}
                            {/* <div key={index} style={{ width: 'auto', height: '70vh', margin: '5px', position: 'relative',  overflow: 'hidden'}}> */}
                            <div style={{ width: 'auto', height: '70vh', margin: '5px', position: 'relative',  overflow: 'hidden'}}>
                               <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <button onClick={handlePrevClick}>이전</button>
                                </div>
                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                    <button onClick={handleNextClick}>다음</button>
                                </div>
                               <Image
                                width={384}
                                height={616}
                                src={review.images[currentIndex]}
                                alt={`image`}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </div>
                        {/* ))} */}
                    </div>
                </div>
                )
                }
            </Grid>
        </div>
        </Layout>
        </ThemeProvider>
        
    )
}

export default MorePhotos;
