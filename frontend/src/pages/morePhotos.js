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
    const totalImagesUrl = reviews && reviews.map(review => review.images).flatMap(imageArray => imageArray);

    const allImages = selectedPlace && selectedPlace.images.concat(totalImagesUrl);

    const handleImageClick = (image) => {
        // const index = allImages.findIndex(img => img === image);
        // const isFromSelectedPlace = index < selectedPlace.images.length;
        // if (isFromSelectedPlace) {
        //     console.log('가게 이미지 :', selectedPlace.images);
        // } else {
        //     const review = reviews.find(review => review.images.includes(image));
        //     console.log(review);
        //     console.log('Review :', review.images);
        // }
        router.push({
            pathname: '/detailPhotos',
            query: { id: place_id, img: image }
        })
      }

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
                            <Image src={close} width={37} height={37} name='close' onClick={handleOnclick}/>
                        </Grid> 
                    </Grid>
                </Card>
            </Container>
            
            {/* 사진 콘텐츠 */}
            <Grid container style={{paddingTop: '90px'}}>
                {allImages && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {allImages.map((image, index) => (
                                <div key={index} onClick={()=>handleImageClick(image)} style={{ width: 'calc(100% / 3 - 10px)', margin: '5px', position: 'relative' }}>
                                    <Image
                                    width={150}
                                    height={150}
                                    src={image}
                                    alt={`image-${index}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Grid>
        </div>
        </Layout>
        </ThemeProvider>
        
    )
}

export default MorePhotos;
