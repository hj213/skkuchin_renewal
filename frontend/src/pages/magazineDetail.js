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

import content from '../image/magazine/magazine/content1_1.png';
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
        id: 43,
        name:'정돈',
        category: '돈가스',
        place: '명륜/대학로',
        reviews: [
            '웨이팅이 조금 길긴 하지만 혜화에서 먹을만한 돈까스',
            '카레 맛있으니 카레도 추가해서 드세요!'
        ],
        images: [
            content1_1, content1_2
        ]
    },{
        id: 234,
        name:'혼가츠',
        category: '돈가스',
        place: '명륜/대학로',
        reviews: [
            '개인적으로 정돈보다 더 좋음. 특히 치즈가츠',
            '1학년때 맨날 갔던,, 매운 돈까스 강추합니당'
        ],
        images: [
            content2_1, content2_2
        ]
    },{
        id: 16,
        name:'포보',
        category: '국수',
        place: '명륜/정문',
        reviews: [
            '양도 엄청 많고 친절하고 혼밥하기 좋아요',
            '자타공인 명륜동 최고 맛집! 가성비도 최고'
        ],
        images: [
            content3_1, content3_2
        ]
    },{
        id: 139,
        name:'본찌돈까스 성대점',
        category: '돈가스',
        place: '율전/쪽문',
        reviews: [
            "가게가 조금 좁은 것 빼고는 완벽해요!",
            "율전동 돈까스 1티어 \'본찌돈가스\'"
        ],
        images: [
            content4_1, content4_2
        ]
    },{
        id: 128,
        name:'카츠요이',
        category: '돈가스',
        place: '율전/정문',
        reviews: [
            '웨이팅이 있지만, 기다릴만한 맛집입니다 혼밥 개추',
            '맛있으면멍: 멍멍!!!!!!!'
        ],
        images: [
            content5_1, content5_2
        ]
    },{
        id: 154,
        name:'명동돈까스',
        category: '돈가스',
        place: '율전/쪽문',
        reviews: [
            '코돈브루 + 요구르트 조합은 ㄹㅇ 극락이다.',
            '요즘 물가에 이런 돈까스집은 더 없는 행복이다.'
        ],
        images: [
            content6_1, content6_2
        ]
    },{
        id: 180,
        name:'최고당돈가스 율전점',
        category: '돈가스',
        place: '율전/후문',
        reviews: [
            '사장님도 친절하시고 돈까스도 맛있어서 너무 좋음',
            '세트 메뉴도 있어서 든든하게 먹고 싶을때 가도 좋음'
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
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>스꾸친 마케터 pick</Typography>
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">성대 돈가스 맛집 리스트</Typography>
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