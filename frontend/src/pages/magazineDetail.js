import { CardContent, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import styled from '@emotion/styled';
import { useDispatch, useSelector } from "react-redux";


import character from '../image/login_enheng.png';
import arrowPrev from '../image/arrow_forward.png';
import arrowNext from '../image/arrow_forward2.png';
import dynamic from 'next/dynamic';
import position from '../../public/markers/기본_yellow.png';
import filledStar from '../image/Star-1.png';
import back from '../image/leftbtn.png';
import share from '../image/rightbtn.png';
import naver from '../image/Map_Service_Icon.png';


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

import {  load_magazine } from '../actions/magazine/magazine';

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


    const dispatch = useDispatch();
    const router = useRouter();
    const magazine = useSelector(state => state.magazine.magazine);
    const rank = useSelector(state => state.rank.rank);
    const { id } = router.query;

    useEffect(()=>{
        dispatch(load_magazine(id));
    },[id]);


    const handleArrowClick = () => {
        router.push('/magazine');
    }

    let gateWidth = 0;
    let color = '#FFFCE4';
    let fontColor = '#FFAC0B';
    
    if(magazine){
        gateWidth = `${magazine.gate.length * 20}px`;

        if (magazine.gate === '후문' || magazine.gate === '대운동장' || magazine.gate === "기타") {
            color = '#DCF8DB';
            fontColor = '#58C85A'; 
        }   
    }


    return(

        <MagazineDetailContainer>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container style={{padding:'0px', alignItems: 'center', paddingTop: '45px', position:'fixed', height:'100px', background:'white',zIndex:'300'}}>
                <Grid container>
                    <Grid item style={{margin:'0px 0px 0px 25px', visibility:'none'}}>
                        <Image src={back} width={40} height={40} name='back' onClick={handleArrowClick} layout='fixed'/>
                    </Grid>
                    <Grid item style={{marginLeft:'25%'}}>
                        <Typography style={{margin:'5px 0px 0px 10px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>매거진</Typography>
                    </Grid>
                    <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'25px'}}>
                        <Image src={share} width={80} height={43} name='share' onClick={handleArrowClick} layout='fixed'/>
                    </Grid>
                </Grid>
            </Container>
            {magazine ? 
            <Box style={{paddingTop:'100px'}}>
            <div style={{overflowX:'hidden', display:'flex'}}>
                <div style={{width:'100%', height:'350px', overflow:'hidden'}}>
                    <Image src={content}/><Image src={content}/><Image src={content}/>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
                <Typography sx={{width: gateWidth, height: '24px', border: "1px solid", borderColor: color, borderRadius:'10px', textAlign:'center', fontSize: '12px',  fontWeight:'700', p: '2px 4px 0px 4px', color: fontColor, backgroundColor: color, margin:'20px 0px 0px 5px'}}>
                    {magazine.gate}</Typography>
                <Typography sx={{fontSize:'24px', margin:"10px 0 0 5px", color:'#3C3C3C', fontWeight:'800'}}>{magazine.title}</Typography>
                <div style={{width:'25px', height:'5px', background:"#3C3C3C", margin:'30px 0'}}></div>
                <div style={{margin:'0 20px',wordBreak: 'break-all' }}>
                    <Typography sx={{fontSize:'16px'}}>{magazine.content}</Typography>
                </div>
            </div>
            
            <Link href={magazine.link}>
            <div style={{borderRadius:'10px', background:'#F2F2F2', height:'64px', margin:'20px', display:'flex'}}>
                <div style={{width:'60px', display: 'flex', justifyContent:'center', alignItems: 'center',}}>
                    <Image src={naver} width={40} height={40}></Image>
                </div>
                <div style={{marginTop:'10px'}}>
                    <Typography sx={{fontSize:'14px', color:'#3C3C3C', fontWeight:'700'}}>가게 이름</Typography>
                    <Typography sx={{fontSize:'14px', color:'#9E9E9E', fontWeight:'700'}}>가게 위치</Typography>
                </div>
            </div>
            </Link>
                
                {/* 식당TOP5 */}
                <div className='top' style={{height:'270px'}}>
                    <div style={{ display: "flex", margin:'21px 0px 15px 15px' }}>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'800' }} color="#2E2E2E">다른 맛집도 보실래요?</Typography>
                    </div>
                
                    <div style={{margin:'0px 0px 0px 15px'}}>
                        <Grid container style={{  position: 'absolute', zIndex: '3', overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', width: window.innerWidth <= 375 ? 360 : window.innerWidth <= 400  ? 375 :  400, }}>
                            {rank && rank.map((item, index) => (
                                <Grid item style={{display:'inline-block', flexShrink: 0, paddingRight: '9px'}} onClick={()=>{router.push(`/place?id=${item.place_id}`)}} >
                                    <div >
                                        {/* 식당이미지 */}
                                        <div style={{display: 'flex', margin:'9px 0px 0px 9px', paddingTop:'2px',position:'absolute',zIndex:'3', alignItems: 'center', justifyContent: 'center', width: '23px', height: '21.41px', borderRadius: '50%', backgroundColor: index === 3 || index === 4 ? 'rgba(186, 186, 186, 0.7)' : 'rgba(255, 206, 0, 0.7)', color:'#fff', fontSize: '13px', fontWeight: 'bold'}}>
                                            {index+1}
                                        </div>
                                        <Image 
                                            src={item.image ? item.image : food}
                                            width={155} 
                                            height={155} 
                                            layout='fixed' 
                                            placeholder='blur' 
                                            blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                            style={{borderRadius:'20px', position:'relative'}}>
                                        </Image>
                                        {/* 식당이름 */}
                                        <Typography style={{fontSize:'15px', fontWeight:'700'}} color="#2E2E2E">{item.place_name}</Typography>
                                        {/* 식당평점 */}
                                        <div style={{ display: "flex"}}>
                                            <Typography style={{fontSize:'10px', fontWeight:'400'}} color="#2E2E2E">스꾸친 평점: &nbsp;</Typography>
                                            <Image src={filledStar} width={15} height={15} style={{margin:''}}/>
                                            <Typography style={{fontSize:'10px', fontWeight:'700'}} color="#2E2E2E">&nbsp; {item.rate}</Typography>
                                            <Typography style={{fontSize:'10px', fontWeight:'400'}} color="#2E2E2E">&nbsp;/ 5</Typography>
                                        </div>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    
                </div>
                </Box>
                :<></>}
            </ThemeProvider>
        </MagazineDetailContainer>
    )
} 

export default dynamic(() => Promise.resolve(MagazineDetail), {
    ssr: false,
});