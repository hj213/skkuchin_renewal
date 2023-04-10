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

import content1_1 from '../image/magazine/magazine2/content1_1.png';
import content1_2 from '../image/magazine/magazine2/content1_2.png';
import content2_1 from '../image/magazine/magazine2/content2_1.png';
import content2_2 from '../image/magazine/magazine2/content2_2.png';
import content3_1 from '../image/magazine/magazine2/content3_1.png';
import content3_2 from '../image/magazine/magazine2/content3_2.png';
import content4_1 from '../image/magazine/magazine2/content4_1.png';
import content4_2 from '../image/magazine/magazine2/content4_2.png';
import content5_1 from '../image/magazine/magazine2/content5_1.png';
import content5_2 from '../image/magazine/magazine2/content5_2.png';
import content6_1 from '../image/magazine/magazine2/content6_1.png';
import content6_2 from '../image/magazine/magazine2/content6_2.png';
import content7_1 from '../image/magazine/magazine2/content7_1.png';
import content7_2 from '../image/magazine/magazine2/content7_2.png';
import content8_1 from '../image/magazine/magazine2/content8_1.png';
import content8_2 from '../image/magazine/magazine2/content8_2.png';

const contentList = [
    {
        id: 1,
        name:'기꾸스시',
        category: '초밥,롤',
        place: '명륜/정문',
        reviews: [
            '스시 맛있어요 서비스로 주시는 연어도 맛있어요',
            '초밥 구성이 정말 좋아요!'
        ],
        images: [
            content1_1, content1_2
        ]
    },{
        id: 100,
        name:'미가라멘 성대본점',
        category: '일본식라면',
        place: '율전/후문',
        reviews: [
            '돈코츠라멘 약간매운맛! 맛있었습니당 공기밥은 무료!!',
            '맛있게 잘 먹었습니다~~ 해장하기 좋아요'
        ],
        images: [
            content2_1, content2_2
        ]
    },{
        id: 11,
        name:'벅벅',
        category: '햄버거',
        place: '명륜/쪽문',
        reviews: [
            '주기적으로 들리는 곳입니다! '
            + '장사의 신을 보고 처음 알게 되었는데 왜 극찬을 받고 있는지 맛을 보고 나서야 '
            + '깨달았어요 더블쿼파치 즐겨먹는 치즈버거돌이로서 벅벅은 제가 감히 보장합니다 :)'
        ],
        images: [
            content3_1, content3_2
        ]
    },{
        id: 139,
        name:'본찌돈가스 성대점',
        category: '돈가스',
        place: '율전/쪽문',
        reviews: [
            '돈까스는 여기서만 먹습니다..웨이팅만 없었으면 ㅠㅠ',
            '율전동 돈까스 1티어 \'본찌돈가스\''
        ],
        images: [
            content4_1, content4_2
        ]
    },{
        id: 26,
        name:'뽀글뚝배기냠냠비빔밥',
        category: '비빔밥',
        place: '명륜/쪽문',
        reviews: [
            '비빔밥 먹고 싶을 때 가요. 가성비 좋아요',
            '복학생이 부담없이 먹기 좋습니다'
        ],
        images: [
            content5_1, content5_2
        ]
    },{
        id: 140,
        name:'수해복마라탕 성대점',
        category: '중식당',
        place: '율전/후문',
        reviews: [
            '진짜 개맛도리 미친맛',
            '진짜 깨끗해서 늘 기분 좋게 먹어요! 존맛입니다 ㅎㅎ'
        ],
        images: [
            content6_1, content6_2
        ]
    },{
        id: 3,
        name:'쇼타돈부리',
        category: '일식당',
        place: '명륜/쪽문',
        reviews: [
            '간단하게 맛있는 한 끼 먹기 좋아요!',
            '카레 가라아게동 맛있음. 근데 쇼타는 사케동이 진리'
        ],
        images: [
            content7_1, content7_2
        ]
    },{
        id: 170,
        name:'소문난김밥',
        category: '김밥',
        place: '율전/후문',
        reviews: [
            '김밥도 맛있는데 비빔국수도 강추',
            '본가 집밥 생각나는 맛입니다. 집이 그리울 때 먹어요'
        ],
        images: [
            content8_1, content8_2
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
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>바쁘다 바빠, 시간 없을 때</Typography>
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">간단하게 먹기 좋은 8곳</Typography>
                        </div>
                        <div style={{position:'relative', width:'100%', height:'100%'}}>
                            <Image 
                                src={content1_1} 
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
        </MagazineDetailContainer>
    )
} 

export default dynamic(() => Promise.resolve(MagazineDetail), {
    ssr: false,
});