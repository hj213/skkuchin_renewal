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

import content from '../image/magazine/magazine/content.png';
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
        id: 10,
        name:'이유식당',
        category: '백반, 가정식',
        place: '명륜/대학로',
        reviews: [
            '정성이 느껴지는 맛이었어요',
            '든든한 집밥 먹고 싶을 때 가는 곳!'
        ],
        images: [
            content1_1, content1_2
        ]
    },{
        id: 108,
        name:'청년밥상',
        category: '쌈밥',
        place: '율전/쪽문',
        reviews: [
            '율전에서 젤 유명한 갓성비 한식집',
            '친구랑 둘이 다녀왔는데 맛있게 잘 먹었습니다!'
        ],
        images: [
            content2_1, content2_2
        ]
    },{
        id: 288,
        name:'다발김치찌개 대학로점',
        category: '찌개, 전골',
        place: '명륜/정문',
        reviews: [
            '성대 근처 김치찌개 집 1티어 중 하나임',
            '수업 끝나구 다같이 가서 먹기 좋아용 ㅎㅎ'
        ],
        images: [
            content3_1, content3_2
        ]
    },{
        id: 153,
        name:'성대밥상',
        category: '한식',
        place: '율전/쪽문',
        reviews: [
            '혼밥하기 좋음. 갠적으로 비빔밥이 젤 맛있다',
            '반찬 셀프라 넉넉히 먹을 수 있고 혼밥하기도 좋음'
        ],
        images: [
            content4_1, content4_2
        ]
    },{
        id: 28,
        name:'삼삼오오',
        category: '한식',
        place: '명륜/쪽문',
        reviews: [
            '밥약하러 많이 갔었는데 맛있어요!',
            '쪽문의 갓성비. 오삼비빔밥 혼밥이 국룰'
        ],
        images: [
            content5_1, content5_2
        ]
    },{
        id: 172,
        name:'우리집밥',
        category: '한식',
        place: '율전/쪽문',
        reviews: [
            '진짜 우리 집밥 먹는 느낌의 맛집',
            '요즘 보기 힘든 가성비 맛집. 혼밥하러 가기 너무 좋음'
        ],
        images: [
            content6_1, content6_2
        ]
    },{
        id: 250,
        name:'제순식당',
        category: '한식',
        place: '명륜/대학로',
        reviews: [
            '불맛이 살아있어용 제육볶음 좋아하신다면 추천!',
            '정말 맛있어요! 2천원 추가하면 된찌도 줍니다'
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
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>엄마 손맛이 그리워</Typography>
                            <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">집밥 같은 성대 맛집 7곳</Typography>
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