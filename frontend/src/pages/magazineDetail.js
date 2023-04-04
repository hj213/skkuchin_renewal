import { CardContent, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';
import { useRouter } from "next/router";


import character from '../image/login_enheng.png';
import arrowPrev from '../image/arrow_forward.png';
import arrowNext from '../image/arrowY.png';
import dynamic from 'next/dynamic';
import position from '../../public/markers/기본_yellow.png';

// Top 음식 사진
import food from '../image/exam.png';
import content from '../image/content.png';
import review1 from '../image/burg.png';
import review2 from '../image/ramen.png';
import review3 from '../image/sam.png';

const contentList = [{
    id: 1,
    src: food,
    name:'두두',
    category: '요리주점',
    place: '명륜/대학로'

},{
    id: 2,
    src: food,
    name:'도스타코스',
    category: '요리주점',
    place: '명륜/대학로'
},{
    id: 3,
    src: food,
    name:'기꾸스시',
    category: '일식집',
    place: '명륜/대학로'
},{
    id: 4,
    src: food,
    name:'소친친',
    category: '요리주점',
    place: '명륜/대학로'
},{
    id: 5,
    src: food,
    name:'싸코스',
    category: '술집',
    place: '명륜/대학로'
}
]

const reviews = [{
        text: '맛있는 막걸리 집이에요. 양은 막 많지는 않아요. 맛있는 막걸리 집이에요. 양은 막 많지는 않아요',
        id: 1,
    },{
        text: '가격대가 있는데 맛있었어요! 막걸리 종류도 많은 듯',
        id: 2,
    },{
        text: '이렇게 맛있는 버거는 처음 먹어봄... 육즙이 흐르는데 이거 진짜...',
        id: 3,
    },{
        text: '존맛탱',
        id: 4,
    },
];

const contentImages = [
    review1,review2,review3
]

const UpperBar = dynamic(() => import('../components/UpperBar'));

const MagazineDetail = () => {

    const router = useRouter();

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar />
            <Grid>
                <div style={{position:'relative'}}>
                    <div style={{position:'absolute',zIndex:'3', top:'15px', left: '15px'}} onClick={()=>{router.push('/magazine')}}>
                        <Image width={29} height={29} src={arrowPrev} layout='fixed' ></Image>
                    </div>
                    <div style={{position:'absolute',zIndex:'3', bottom: '35px'}}>
                        <Typography fontSize='12px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">스꾸친 마케터의 특별한 맛집 가이드</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>화려한 축제가 끝나고</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">가기 좋은 성대 술집 6곳</Typography>
                    </div>
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        <Image src={content} placeholder='blur' />
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    {contentList.map((item, index) => (
                        <div style={{borderBottom: '2px solid rgba(186, 186, 186, 0.2)'}}>
                        <Grid key={index} sx={{mt: '30px', ml: '15px',color: '#2E2E2E'}}>
                            <Typography sx={{fontWeight: '700', fontSize: '18px'}}>{item.name}</Typography>
                            <Grid item sx={{display: 'flex' }}>
                                <Image src={position} width={13} height={14} layout='fixed' ></Image>
                                <Typography sx={{fontWeight: '500', fontSize: '13px', p: '0 4px'}}>{item.place}</Typography>
                                <Typography sx={{fontWeight: '400', fontSize: '13px', color: '#BABABA'}}>{item.category}</Typography>
                            </Grid>

                            <Grid item style={{overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', marginTop:'20px'}}>
                                {contentImages.map((contentImage, index) => (
                                    <Grid item key={index} style={{ display: 'inline-block', flexShrink: 0, paddingRight: '5px', position: 'relative'}} >
                                        <Image key={index} height={150} width={150} src={contentImage} alt="contentImg" layout='fixed' placeholder='blur'
                                        style={{ 
                                            objectFit: 'cover', 
                                            objectPosition: 'center center',
                                            borderRadius:'10px',
                                        }} />
                                    </Grid>
                                ))}
                            </Grid>
                            
                            <Grid container sx={{ mt: "15px", alignItems: "flex-start"}}>
                                <Grid item xs={2}>
                                    <Image src={character} width={50} height={42} layout='fixed' placeholder='blur' ></Image>
                                </Grid>
                                <Grid item xs={10} sx={{ display: "flex", flexDirection: "column", mt: '14px'}}>
                                    {reviews && reviews.slice(0, 2).map((item, index) => (
                                    <Box key={index} sx={{ mb: index === 0 ? "8px" : 0, p: '0' }}>
                                        <Card
                                        elevation={0}
                                        sx={{
                                            borderRadius: "0 10px 10px 10px",
                                            backgroundColor:'#FFE885',
                                            maxWidth: "95%",
                                            width: "fit-content",
                                            padding: '0'
                                        }}
                                        >
                                            <Typography
                                            style={{
                                                padding:'6px 11px',
                                                fontSize: "13px",
                                                wordWrap: "break-word",
                                                whiteSpace: 'pre-wrap',
                                                color: '#2E2E2E',
                                                fontWeight: '500'
                                            }}
                                            >
                                            {item.text}
                                            </Typography>
                                        </Card>
                                    </Box>
                                    ))}
                                    <Typography sx={{fontSize: '8px', fontWeight: '400', color: '#BABABA', textAlign: 'right', m: '5px 15px 25px 0'}}>*출처: 스꾸친 및 네이버 리뷰</Typography>
                                </Grid>
                                <Grid item sx={{display: 'flex', verticalAlign: 'center', justifyContent: 'flex-end',width: '100%', mr: '15px', pb: '18px'}}>
                                    <Typography sx={{fontSize: '12px', fontWeight: '700', color: '#FFCE00', pr: '8px', pt: '2px'}}>식당 정보를 더 알고 싶다면?</Typography>
                                    <Image src={arrowNext} width={15.57} height={15} onClick={()=>{alert('식당 정보 더보기')}} layout='fixed' />
                                </Grid>
                            </Grid>
                        </Grid>
                        </div>
                    ))}
                </div>
            </Grid>
        </ThemeProvider>
    )
} 

export default dynamic(() => Promise.resolve(MagazineDetail), {
    ssr: false,
});