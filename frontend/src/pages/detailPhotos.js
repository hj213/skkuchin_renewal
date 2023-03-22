import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; 

import { load_reviews } from "../actions/review/review";
import { load_place } from "../actions/place/place";

import {styled} from '@mui/material/styles';
import { IconButton, MenuItem, Menu,Select, Modal, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import close from '../image/close.png';
import next from '../image/photo_next.png';
import prev from '../image/photo_prev.png';
import morePic from '../image/photo_more.png';
import dynamic from 'next/dynamic';

const DetailPhotos = () => {

    const dispatch = useDispatch();

    // 뒤로가기
    const handleOnclick = (event) =>{
        router.back();
    };  

    // 뒤로가기
    const handleOnExitclick = (event) =>{
        router.push({
            pathname: '/place',
            query: { id: place_id, fullScreen: true  },
        });
    };  

    const router = useRouter();
    const { id, img } = router.query;

    // place, 가게 정보 (place API)
    
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const [image, setImage] = img != null? useState(img) : useState('');

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

    // '나' 뱃지 customize
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
        right: 3,
        top: 33,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '1px 3px 0',
        backgroundColor:'#FFCE00',
        color:'white',
        fontSize:'10px',
        fontWeight:'700',
        marginRight:'2px'
        },
    }));

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
            {/* 전체 틀 */}
            <div style={{ width:'100%'}}>  

            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                        <Card elevation={0}
                        style={{
                            position: 'fixed',
                            top: '0px',
                            width: '100%',
                            height: '80px',
                            zIndex: '4',
                            borderRadius:'0px',
                        }}>
                            <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid style={{padding: '0px 10px 0px 0px', marginTop:'6px'}}>
                                    <Image src={back} width={12} height={22} name='back' onClick={handleOnclick} layout='fixed' />
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
                                    <Image src={close} width={37} height={37} layout='fixed' name='close' onClick={handleOnExitclick}/>
                                </Grid> 
                            </Grid>
                        </Card>
            </Container>
            
            {/* 사진 콘텐츠 */}
            <Grid container style={{padding: '90px 0 0px'}}>
                {isFromSelectedPlace? 
                <div style={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                        <div style={{ 
                            width: '100%',
                            height: '100%',
                            marginTop: ' 5px', 
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}> 
                            <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <Image onClick={handlePrevClick} src={prev} width={33} height={33} layout='fixed' />
                            </div>
                            <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                <Image onClick={handleNextClick} src={next} width={33} height={33} layout='fixed' />
                            </div>
                            <div style={{ position: 'absolute', bottom: '13px', right: '10px', zIndex: '10', display: 'flex', alignItems: 'center'}}>
                                <Typography sx={{color: '#FFE885', fontSize: '13px', fontWeight: '700', pr: '7px'}}>{`${currentIndex+1}/${selectedPlace.images.length}`}</Typography>
                                <Image src={morePic} width={22} height={22} layout='fixed' />
                            </div>
                            <Image
                                sizes='250px'
                                width='100%'
                                height={1900}
                                src={selectedPlace.images[currentIndex]}
                                alt={`image`}
                                layout='fill'
                                objectFit='contain'
                                placeholder="blur" 
                                blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                            />
                        </div>
                    </div>
                </div>
                : ( review &&
                    <div style={{ display: 'flex', flexDirection: 'column', width:'100%'  }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <div style={{ 
                                    width: '100%',
                                    height: '100%',
                                    marginTop: ' 5px', 
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}> 
                                    <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                        <Image onClick={handlePrevClick} src={prev} width={33} height={33} layout='fixed' />
                                    </div>
                                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', zIndex: '10' }}>
                                        <Image onClick={handleNextClick} src={next} width={33} height={33} layout='fixed' />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '13px', right: '10px', zIndex: '10', display: 'flex', alignItems: 'center'}}>
                                        <Typography sx={{color: '#FFE885', fontSize: '13px', fontWeight: '700', pr: '7px'}}>{`${currentIndex+1}/${review.images.length}`}</Typography>
                                        <Image src={morePic} width={22} height={22}/>
                                    </div>
                                    <Image
                                        sizes='250px'
                                        width='100%'
                                        height={1900}
                                        src={review.images[currentIndex]}
                                        alt={`image`}
                                        layout='fill'
                                        objectFit='contain'
                                        placeholder="blur" 
                                        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                    />
                                </div>
                        </div>
                    </div>
                )
                }
            </Grid>
            <Grid container >
                {reviews && review ? 
                    <Grid container sx={{
                        p: '0 20px',
                        position: 'absolute',
                        bottom: 30,
                        left: 0,
                        right: 0,
                    }}>
                    <Grid item xs={2}>
                        { review && user && review.user_id === user.id ?
                            <StyledBadge badgeContent={"나"} color="secondary">
                                <Avatar alt="" src={ user.image} />
                            </StyledBadge> : <Avatar alt="" src={review.user_image} />}
    
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
                <Grid
                    container
                    sx={{
                        p: '0 20px',
                        position: 'absolute',
                        bottom: 30,
                        left: 0,
                        right: 0,
                    }}
                    >
                    <Grid item xs={2}>
                        <Avatar alt="" />
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
        </ThemeProvider>
        
    )
}

export default dynamic(() => Promise.resolve(DetailPhotos), {
    ssr: false,
});
