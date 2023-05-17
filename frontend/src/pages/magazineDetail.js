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

import content from '../image/magazine/magazine/content2_1.png';
import content1_1 from '../image/magazine/magazine/content1_1.png';
import content1_2 from '../image/magazine/magazine/content1_2.png';
import content2_1 from '../image/magazine/magazine/content2_1.png';
import content2_2 from '../image/magazine/magazine/content2_2.png';
import content3_1 from '../image/magazine/magazine/content3_1.png';
import content3_2 from '../image/magazine/magazine/content3_2.png';
import content4_1 from '../image/magazine/magazine/content4_1.png';
import content4_2 from '../image/magazine/magazine/content4_2.png';
import content5_1 from '../image/magazine/magazine/content5_1.png';
import content5_2 from '../image/magazine/magazine/content5_2.png';
import content6_1 from '../image/magazine/magazine/content6_1.png';
import content6_2 from '../image/magazine/magazine/content6_2.png';
import content7_1 from '../image/magazine/magazine/content7_1.png';
import content7_2 from '../image/magazine/magazine/content7_2.png';

const contentList = [
    {
        id: 62,
        name:'혜화시장',
        category: '요리주점',
        place: '명륜/대학로',
        reviews: [
            '혜화 1티어 술집!',
            '매운사태짐, 한우튀김 국룰이에요'
        ],
        images: [
            content1_1, content1_2
        ]
    },{
        id: 81,
        name:'주량 성대직영점',
        category: '요리주점',
        place: '율전/후문',
        reviews: [
            '술 종류 많아서 좋았어요! 분위기 좋아서 또 갈 예정!',
            '샤브샤브 칼칼하고 담백함 핫플이라 웨이팅 있음'
        ],
        images: [
            content2_1, content2_2
        ]
    },{
        id: 64,
        name:'서피동파',
        category: '한식',
        place: '명륜/대학로',
        reviews: [
            '막걸리 종류가 진짜 많음 전도 맛있음',
            '혜화 술집 꼽으라 한다면 무조건 여기 추천'
        ],
        images: [
            content3_1, content3_2
        ]
    },{
        id: 66,
        name:'센꼬치',
        category: '이자카야',
        place: '명륜/대학로',
        reviews: [
            '크림파스타 불닭+주먹밥 꼭 드세요ㅜㅜ 너무 맛있어요',
            '꼬치랑 하이볼 조합 미침'
        ],
        images: [
            content4_1, content4_2
        ]
    },{
        id: 73,
        name:'동화',
        category: '요리주점',
        place: '명륜/대학로',
        reviews: [
            '안주도 다 맛도링!!! 근데 사람 많아서 기다려야해용',
            '예약하는 걸 추천합니다. 데이터하기 좋은듯합니다'
        ],
        images: [
            content5_1, content5_2
        ]
    },{
        id: 208,
        name:'아무술집 성대직영점',
        category: '맥주, 호프',
        place: '율전/후문',
        reviews: [
            '가성비 좋고 음식도 맛있는데 좀 시끄러워요 ㅎㅎ',
            '안주 뿌시고 왔어요 맛있어요'
        ],
        images: [
            content6_1, content6_2
        ]
    },{
        id: 209,
        name:'옛날사람',
        category: '요리주점',
        place: '율전/후문',
        reviews: [
            '친구들와서 데려갔는데 안주 맛있고 맥주도 맛있어요!',
            '가성비 좋아요!! 음식도 맛있고 안주도 다양해요~~!'
        ],
        images: [
            content7_1, content7_2
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
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>5월엔 친구들과 술 한잔!</Typography>
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">안주가 맛있는 성대 술집 7곳</Typography>
                        </div>
                        <div style={{position:'relative', width:'100%', height:'100%'}}>
                            <Image 
                                src={content} 
                                height={400}
                                width={431}
                                layout='fixed'
                                objectFit='cover'
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
        </MagazineDetailContainer>
    )
} 

export default dynamic(() => Promise.resolve(MagazineDetail), {
    ssr: false,
});