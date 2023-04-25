import { CardContent, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';
import { useRouter } from "next/router";
import styled from '@emotion/styled';

import character from '../image/login_enheng.png';
import arrowPrev from '../image/arrow_forward.png';
import arrowNext from '../image/arrow_forward2.png';
import dynamic from 'next/dynamic';
import position from '../../public/markers/기본_yellow.png';

import content1 from '../image/magazine/magazine4/content1.png';
import content2 from '../image/magazine/magazine4/content2.png';
import content3 from '../image/magazine/magazine4/content3.png';
import content4 from '../image/magazine/magazine4/content4.png';
import content5 from '../image/magazine/magazine4/content5.png';
import content6 from '../image/magazine/magazine4/content6.png';
import content7 from '../image/magazine/magazine4/content7.png';
import content8 from '../image/magazine/magazine4/content8.png';

const contentList = [
    {
        id: 8,
        name:'오이지',
        category: '한식',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content1
        ]
    },{
        id: 9,
        name:'호호식당',
        category: '일식당',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content2
        ]
    },{
        id: 5,
        name:'소친친',
        category: '퓨전음식',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content3
        ]
    },{
        id: 24,
        name:'파스타마켓',
        category: '스파게티,파스타전문',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content4
        ]
    },{
        id: 369,
        name:'낫컴플리트',
        category: '카페,디저트',
        place: '명륜/정문',
        // reviews: [
        // ],
        images: [
            content5
        ]
    },{
        id: 368,
        name:'칠린',
        category: '바(BAR)',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content6
        ]
    },{
        id: 389,
        name:'릴랙스 인 다운타운',
        category: '카페,디저트',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content7
        ]
    },{
        id: 68,
        name:'도리안그레이',
        category: '바(BAR)',
        place: '명륜/대학로',
        // reviews: [
        // ],
        images: [
            content8
        ]
    }
]

const UpperBar = dynamic(() => import('../components/UpperBar'));

const MagazineDetailContainer = styled.div`
  /* 데스크톱에서 스크롤 바를 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 모바일에서 스크롤 바를 숨김 */
  *::-webkit-scrollbar {
    display: none;
  }
`;

const MagazineDetail = () => {

    const router = useRouter();

    return(
        <MagazineDetailContainer>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <UpperBar />
                <Grid style={{overflowX:'hidden'}}>
                    <div style={{position:'relative'}}>
                        <div style={{position:'absolute',zIndex:'3', top:'15px', left: '15px'}} onClick={()=>{router.push('/magazine')}}>
                            <Image width={19} height={18} src={arrowPrev} layout='fixed' ></Image>
                        </div>
                        <div style={{position:'absolute',zIndex:'3', bottom: '35px'}}>
                            <Typography fontSize='12px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">스꾸친 마케터의 특별한 맛집 가이드</Typography>
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>없던 사랑도 꽃피는</Typography>
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">성대 데이트 코스 명륜편</Typography>
                        </div>
                        <div style={{position:'relative', width:'100%', height:'100%'}}>
                            <Image 
                                src={content5} 
                                height={400}
                                width={431}
                                layout='fixed'
                                objectFit='cover'
                                placeholder='blur'
                                style={{ filter: 'brightness(0.6)' }}
                            />
                        </div>
                    </div>
                    <div style={{position:'relative'}}>
                        {contentList.map((item, index) => (
                            <div style={{borderBottom: '2px solid rgba(186, 186, 186, 0.2)'}}>
                            <Grid key={index} sx={{mt: '30px', ml: '15px',color: '#2E2E2E'}}>
                                <Typography sx={{fontWeight: '700', fontSize: '18px'}}>{item.name}</Typography>
                                <Grid item sx={{display: 'flex' }}>
                                    <Image src={position} width={12} height={16} layout='fixed' ></Image>
                                    <Typography sx={{fontWeight: '500', fontSize: '13px', p: '0 4px'}}>{item.place}</Typography>
                                    <Typography sx={{fontWeight: '400', fontSize: '13px', color: '#BABABA'}}>{item.category}</Typography>
                                </Grid>

                                <Grid item style={{overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', marginTop:'20px'}}>
                                    {item.images.map((image, index) => (
                                        <Grid item key={index} style={{ display: 'inline-block', flexShrink: 0, paddingRight: '15px', position: 'relative'}} >
                                            <Image 
                                                key={index} 
                                                // height={230} 
                                                // width={230} 
                                                src={image} 
                                                alt="contentImg" 
                                                layout='intrinsic' 
                                                placeholder='blur'
                                                // objectFit='cover'
                                                style={{ 
                                                    // objectPosition: 'center center',
                                                    borderRadius:'10px',
                                                }} 
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                
                                <Grid container sx={{ mt: "15px", alignItems: "flex-start"}}>
                                    {/* <Grid item xs={2}>
                                        <Image src={character} width={50} height={36} layout='fixed' placeholder='blur' ></Image>
                                    </Grid> */}
                                    {/* <Grid item xs={10} sx={{ display: "flex", flexDirection: "column", mt: '14px'}}>
                                        {item.reviews?.map((review, index) => (
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
                                                {review}
                                                </Typography>
                                            </Card>
                                        </Box>
                                        ))}
                                        <Typography sx={{fontSize: '8px', fontWeight: '400', color: '#BABABA', textAlign: 'right', m: '5px 15px 25px 0'}}>*출처: 스꾸친 및 네이버 리뷰</Typography>
                                    </Grid> */}
                                    <Grid item sx={{display: 'flex', verticalAlign: 'center', justifyContent: 'flex-end',width: '100%', mr: '15px', pb: '18px'}} onClick={()=>{router.push(`/place?id=${item.id}`)}} >
                                        <Typography sx={{fontSize: '12px', fontWeight: '700', color: '#FFCE00', pr: '8px', pt: '2px'}} onClic>식당 정보를 더 알고 싶다면?</Typography>
                                        <Image src={arrowNext} width={20} height={14} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            </div>
                        ))}
                    </div>
                </Grid>
            </ThemeProvider>
        </MagazineDetailContainer>
    )
} 

export default dynamic(() => Promise.resolve(MagazineDetail), {
    ssr: false,
});