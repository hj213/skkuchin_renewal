import { Avatar, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; 
import { clear_search_results } from "../actions/place/place";
import { load_rank } from '../actions/rank/rank';
import styled from '@emotion/styled';

import food from '../image/food.png';
// import circles from '../image/frames.png';
import arrow from '../image/arrow.png';
import arrowY from '../image/arrowY.png';
import arrowL from '../image/arrowLeft.png'
import arrowR from '../image/arrowRight.png'
import emptyStar from '../image/Star_border-1.png';
import filledStar from '../image/Star-1.png';
import dynamic from 'next/dynamic';

import content from '../image/magazine/magazine2/content1_1.png';
import review1_mr from '../image/magazine/review1_mr.png';
import review2_mr from '../image/magazine/review2_mr.png';
import review3_mr from '../image/magazine/review3_mr.png';
import review4_mr from '../image/magazine/review4_mr.png';
import review5_mr from '../image/magazine/review5_mr.png';

import review1_yj from '../image/magazine/review1_yj.png';
import review2_yj from '../image/magazine/review2_yj.png';
import review3_yj from '../image/magazine/review3_yj.png';
import review4_yj from '../image/magazine/review4_yj.png';
import review5_yj from '../image/magazine/review5_yj.png';

const reviewY = [
    {
        src: review1_yj,
        text: '깡우동 떡볶이 먹고 싶어 죽는 줄 ㅋ\n알아들었으면 끄덕여.',
        user: '박연진/식품생명공학과',
        id: 115,
        rating: 5,
        
    },{
        src: review2_yj,
        text: '양 진짜 많은데다 맛도 좋아요 국물 깔끔하고 겉절이도 너무 맛있었습니다 이 가격에 이 정도 퀄리티면 정말...👍👍',
        user: '식은떡/자연과학계열',
        id: 181,
        rating: 4,
    },{
        src: review3_yj,
        text: '낭만 있네요 수육튀김은 언제 먹어도 진짜 존맛 ㅠ 피치하이볼도 맛있어요!! 시그니처 하이볼은 생각보다 쎄네욥 ..',
        user: '낭만파/컬처앤테크놀로지융합전공',
        id: 204,
        rating: 5,
    },{
        src: review4_yj,
        text: '진짜 이정도 가격에 이정도 퀄리티를 먹을 수 있는 게 너무 좋아요!! 다만 아침 9시에 전화해서 예약을 해야한다는 점…',
        user: '에너자이져/화학과',
        id: 90,
        rating: 5,
    },{
        src: review5_yj,
        text: '기본으로 주시는 라면이 너무 맛있어요.\n저희는 3명에서 유린기랑 떡볶이 시켰는데\n가격도 합리적이고 맛도 있었어요. 추천!!',
        user: 'Bakbak/경영학과',
        id: 209,
        rating: 5,
    },
];

const reviewM = [
    {
        src: review1_mr,
        text: '몇번씩 갈 정도로 맛있어요!\n특히 치킨 리조또는 함께 간 사람들 모두 칭찬할 정도였답니당.... 정문 바로 앞에 있어서 위치도 최고예욤ෆ◡̈ෆ',
        user: '도리/글로벌경영학과',
        id: 323,
        rating: 5,
    },{
        src: review2_mr,
        text: '모든 메뉴가 맛있어요!!!! 차돌 들기름 국수, 명란 순두부찌개 추천합니당',
        user: '포키조니/문헌정보학과',
        id: 8,
        rating: 5,
    },{
        src: review3_mr,
        text: '소바 맛있어요. 차슈 추가해서 드세요!!\n혼밥 할 수 있는 자리가 따로 있으닌 참고하시면 좋을 거 같아요',
        user: 'Bakbak/컬처앤테크놀로지융합전공',
        id: 2,
        rating: 4,
    },{
        src: review4_mr,
        text: '술을 안 시킬수 없는 메뉴와 맛\n이 식당은 좋은 기억밖에 없다👍🏻',
        user: 'qoxit_/경영학과',
        id: 49,
        rating: 5,
    },{
        src: review5_mr,
        text: '너무너무 맛있어요 어디서 먹어본 적 없는 색다른 맛😆 회식하기에도 넘 좋아요 ㅎㅎ',
        user: '감자빵빵/글로벌리더학부',
        id: 261,
        rating: 5,
    },
]; 

const MagazineContainer = styled.div`
  /* 데스크톱에서 스크롤 바를 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 모바일에서 스크롤 바를 숨김 */
  *::-webkit-scrollbar {
    display: none;
  }
`;

const UpperBar = dynamic(() => import('../components/UpperBar'));

const Magazine = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [reviewNum, setReviewNum] = useState(0);
    const [toggleInfo, setToggleInfo] = useState(null);

    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.auth.toggle_for_not_user);
    const rank = useSelector(state => state.rank.rank);

    useEffect(()=>{
        dispatch(clear_search_results());
    },[])

    useEffect(() => {
        if (user) {
            dispatch(load_rank(user.toggle));
            setToggleInfo(user.toggle);
        } else if (toggle) {
            dispatch(load_rank(toggle));
            setToggleInfo(toggle);
        }
    },[user, toggle])
    
    const handlePrev = () => {
        setReviewNum((prevIndex) =>
        prevIndex === 0 ? reviewM.length - 1 : prevIndex - 1
        );
    };
    
    const handleNext = () => {
        setReviewNum((prevIndex) =>
        prevIndex === reviewM.length - 1 ? 0 : prevIndex + 1
        );
    };

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar />
            <Grid style={{overflowX:'hidden'}}>

                {/* 식당TOP5 */}
                <div className='top' style={{height:'270px'}}>
                    <div style={{ display: "flex", margin:'21px 0px 0px 15px' }}>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color="#2E2E2E">4월 1주차 식당</Typography>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color={theme.palette.primary.main}>TOP 5</Typography>
                        <Typography>🔥</Typography>
                    </div>
                    <div style={{margin:'5px 0px 21px 15px'}}>
                        <Typography color={theme.palette.fontColor.light} style={{fontSize:'11px'}}>일주일마다 업데이트 돼요!</Typography>
                    </div>
                    <MagazineContainer>
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
                    </MagazineContainer>
                </div>

                {/* 맛집 콘텐츠 */}
                <div style={{margin:'45px 0px 0px 0px', position:'relative'}}>
                    <div style={{position:'absolute',zIndex:'3'}}>
                        {/* 안에 자유롭게 수정가능 */}
                        <Typography fontSize='12px' fontWeight='700' style={{margin:'23px 0px 0px 15px'}} color="white">스꾸친 마케터의 특별한 맛집 가이드</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>바쁘다 바빠, 시간 없을 때</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">간단하게 먹기 좋은 8곳</Typography>
                    </div>
                    <div>
                        <div style={{position:'absolute',zIndex:'3', bottom:'8%', right: '3%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Button style={{margin:'', fontSize:'12px', color:'white'}} onClick={()=>{router.push('/magazineDetail')}}>콘텐츠 보러가기&nbsp;&nbsp; <Image src={arrow} width={15.57} height={15} layout='fixed'/></Button>
                        </div>
                        {/* <div style={{position:'absolute',zIndex:'3', bottom:'6%', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Image src={circles} width={50} height={6} layout='fixed' />
                        </div> */}
                    </div>
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        <Image 
                            src={content} 
                            height={400}
                            width={431}
                            layout='fixed'
                            objectFit='cover'
                            placeholder='blur'
                            style={{ filter: 'brightness(0.6)' }}
                        />
                    </div>
                </div>

                {/* 리뷰 */}
                <div style={{position:'relative', margin:'35px 0px 77px 0px' }}>
                    <div style={{ display: "flex",  margin:'0px 0px 0px 15px' }}>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color="#2E2E2E">성대생의</Typography>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color={theme.palette.primary.main}>리얼 리뷰</Typography>
                        <Typography>👀</Typography>
                    </div>
                    <div style={{margin:'16px 0px 0px 0px'}}>
                        <div style={{position:'absolute',zIndex:'3', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 0, left: 0, right: 0, bottom: 0}}>
                            <div style={{textAlign: 'center'}}>
                                <div style={{margin:'23px 0px 0px 0px'}}>
                                {[1, 2, 3, 4, 5].map((item, index) => {
                                    let starImage = emptyStar;
                                    if (index + 1 <= reviewM[reviewNum].rating) {
                                        starImage = filledStar;
                                    }
                                    return (
                                        <Image key={index} width={21.72} height={22.43} src={starImage} alt='star' layout='fixed' />
                                    );
                                })}
                                </div>
                                <Typography fontSize='16px' fontWeight='700' style={{margin:'15px 0px 0px 0px'}} color="white" maxWidth={237}>"{toggleInfo && toggleInfo === '명륜' ? reviewM[reviewNum].text: reviewY[reviewNum].text}"</Typography>
                                <Typography fontSize='12px' fontWeight='400' style={{margin:'15px 0px 0px 0px'}} color="white" maxWidth={237}>{toggleInfo && toggleInfo === '명륜'? reviewM[reviewNum].user :  reviewY[reviewNum].user}</Typography>
                            </div>
                        </div>

                        <div>
                            <div style={{position:'absolute',zIndex:'3', bottom: '6%', right: '3%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                                <Button style={{margin:'', fontSize:'12px'}} onClick={()=>{toggleInfo && toggleInfo === '명륜'? router.push(`/place?id=${reviewM[reviewNum].id}`) : router.push(`/place?id=${reviewY[reviewNum].id}`)}}>이 식당 어디일까?&nbsp;&nbsp; <Image src={arrowY} width={15.57} height={15}/></Button>
                            </div>
                        </div>
                        <div>
                            <div style={{position:'absolute',zIndex:'3', display: 'flex', alignItems: 'center', justifyContent: 'center', left: "0%", top: '50%', transform: 'translateY(-50%)'}}>
                                <Button onClick={handlePrev}><Image src={arrowL} width={10.29} height={18.48} layout='fixed' /></Button>
                            </div>
                        </div>
                        <div>
                            <div style={{position:'absolute',zIndex:'3', display: 'flex', justifyContent: 'center', alignItems: 'center', right: "0%",top: '50%', transform: 'translateY(-50%)'}}>
                                <Button onClick={handleNext}><Image src={arrowR} width={10.29} height={18.48} layout='fixed' /></Button>
                            </div>
                        </div>
                        <div style={{position:'relative', width:'100%', height:'100%'}}>
                            <Image 
                                src={toggleInfo && toggleInfo === '명륜'? reviewM[reviewNum].src : reviewY[reviewNum].src}
                                height={250}
                                width={431}
                                layout='fixed'
                                objectFit='cover'
                                placeholder='blur'
                                style={{ filter: 'brightness(0.6)' }}
                            />
                        </div>
                    </div>
                </div>
            </Grid>
        </ThemeProvider>
    )
} 

export default dynamic(() => Promise.resolve(Magazine), {
    ssr: false,
});