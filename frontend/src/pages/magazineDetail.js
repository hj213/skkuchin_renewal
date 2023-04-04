import { CardContent, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';
import { useRouter } from "next/router";

import character from '../image/login_enheng.png';
import arrowPrev from '../image/arrow_forward.png';
import arrowNext from '../image/arrow_forward2.png';
import dynamic from 'next/dynamic';
import position from '../../public/markers/기본_yellow.png';

import content1_1 from '../image/magazine/content1_1.png';
import content1_2 from '../image/magazine/content1_2.png';
import content2_1 from '../image/magazine/content2_1.png';
import content2_2 from '../image/magazine/content2_2.png';
import content3_1 from '../image/magazine/content3_1.png';
import content3_2 from '../image/magazine/content3_2.png';
import content4_1 from '../image/magazine/content4_1.png';
import content4_2 from '../image/magazine/content4_2.png';
import content5_1 from '../image/magazine/content5_1.png';
import content5_2 from '../image/magazine/content5_2.png';
import content6_1 from '../image/magazine/content6_1.png';
import content6_2 from '../image/magazine/content6_2.png';

const contentList = [
    {
        id: 70,
        name:'두두',
        category: '요리주점',
        place: '명륜/대학로',
        reviews: [
            '맛있는 막걸리 집이에요. 양은 막 많지는 않았어요',
            '가격대가 좀 있지만 맛있어요! 막걸리 종류도 많은듯'
        ],
        images: [
            content1_1, content1_2
        ]
    },{
        id: 206,
        name:'옥집',
        category: '요리주점',
        place: '율전/후문',
        reviews: [
            '소주 3500원. 그깟 푼돈으로 방금 내가 쟤 하늘이 됐어',
            '이 근방 최고의 가성비. 단체로 가기도 좋아요!!'
        ],
        images: [
            content2_1, content2_2
        ]
    },{
        id: 78,
        name:'맥덕스',
        category: '맥주,호프',
        place: '명륜/정문',
        reviews: [
            '2층이 완전히 분리되어 있어서 친구들끼리 편하게 시간 보내기 좋은 것 같아요! '
            + '다만 주문하려면 전화를 걸어야하는 게 살짝 불편하긴 하지만,, '
            + '나름 낭만 있고 좋았어요 피자도 맛있습니다!!!!!'
        ],
        images: [
            content3_1, content3_2
        ]
    },{
        id: 204,
        name:'합 성대직영점',
        category: '요리주점',
        place: '율전/후문',
        reviews: [
            '수육튀김 부드러워서 먹기 편해요. 닭발도 맛있어요',
            '맛있어요!! 닭 목 요리 꼭 드셔보세요 ㅎㅎ'
        ],
        images: [
            content4_1, content4_2
        ]
    },{
        id: 63,
        name:'프루츠',
        category: '맥주,호프',
        place: '명륜/대학로',
        reviews: [
            '과일주들이 증말 맛있음',
            '가성비 좋음 단체로 술 마시기 좋음'
        ],
        images: [
            content5_1, content5_2
        ]
    },{
        id: 115,
        name:'깡우동 성대점',
        category: '우동,소바',
        place: '율전/후문',
        reviews: [
            '진짜 둘이 갔다가 한명 없어져도 모르고 나올 수 있는 곳',
            '우동이 너무 맛있어서 술이 계속 들어가더라고요...'
        ],
        images: [
            content6_1, content6_2
        ]
    }
]

const UpperBar = dynamic(() => import('../components/UpperBar'));

const MagazineDetail = () => {

    const router = useRouter();

    return(
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
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>화려한 축제가 끝나고</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">가기 좋은 성대 술집 6곳</Typography>
                    </div>
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        <Image 
                            src={content4_1} 
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
                                    <Grid item key={index} style={{ display: 'inline-block', flexShrink: 0, paddingRight: '5px', position: 'relative'}} >
                                        <Image 
                                            key={index} 
                                            height={230} 
                                            width={230} 
                                            src={image} 
                                            alt="contentImg" 
                                            layout='fixed' 
                                            placeholder='blur'
                                            objectFit='cover'
                                            style={{ 
                                                objectFit: 'cover', 
                                                objectPosition: 'center center',
                                                borderRadius:'10px',
                                            }} 
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            
                            <Grid container sx={{ mt: "15px", alignItems: "flex-start"}}>
                                <Grid item xs={2}>
                                    <Image src={character} width={50} height={36} layout='fixed' placeholder='blur' ></Image>
                                </Grid>
                                <Grid item xs={10} sx={{ display: "flex", flexDirection: "column", mt: '14px'}}>
                                    {item.reviews.map((review, index) => (
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
                                </Grid>
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
    )
} 

export default dynamic(() => Promise.resolve(MagazineDetail), {
    ssr: false,
});