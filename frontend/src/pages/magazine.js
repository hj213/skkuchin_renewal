import { Avatar, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, Badge, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 


import star from '../image/star3.png';
import circles from '../image/frames.png';
import arrow from '../image/arrow.png';
import arrowY from '../image/arrowY.png';
import arrowL from '../image/arrowLeft.png'
import arrowR from '../image/arrowRight.png'
import emptyStar from '../image/Star_border-1.png';
import filledStar from '../image/Star-1.png';
import dynamic from 'next/dynamic';


// Top 음식 사진
import food from '../image/exam.png' 
import content from '../image/content.png'
import review1 from '../image/burg.png'
import review2 from '../image/ramen.png'
import review3 from '../image/sam.png'

const top5M = [{
    id: 1,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 2,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 3,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 4,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 5,
    src: food,
    name:'기꾸스시',
    rating:4.5,
}
]

const top5Y = [{
    id: 1,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 2,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 3,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 4,
    src: food,
    name:'기꾸스시',
    rating:4.5,
},{
    id: 5,
    src: food,
    name:'기꾸스시',
    rating:4.5,
}
]

const reviewY = [{
    src: review1,
    text: '',
    user: '낭만파/컬처앤테크놀로지융합전공',
    id: 11,
    rating:4.5,
    
},{
    src: review2,
    text: '존맛탱',
    user: '낭만파/컬처앤테크놀로지융합전공',
    id: 11,
    rating:4.5,
},{
    src: review3,
    text: '',
    user: '낭만파/컬처앤테크놀로지융합전공',
    id: 11,
    rating:4.5,
},
];

const reviewM = [{
    src: review1,
    text: '이렇게 맛있는 버거는 처음 먹어봄... 육즙이 흐르는데 이거 진짜...',
    user: '낭만파/컬처앤테크놀로지융합전공',
    id: 11,
    rating:4,
},{
    src: review2,
    text: '존맛탱',
    user: '낭만파/컬처앤테크놀로지융합전공',
    id: 11,
    rating:5,
},{
    src: review3,
    text: '',
    user: '낭만파/컬처앤테크놀로지융합전공',
    id: 11,
    rating:5,
},
]; 

const UpperBar = dynamic(() => import('../components/UpperBar'));

const Magazine = () => {

    const router = useRouter();

    const [reviewNum, setReviewNum] = useState(0);
    const [toggleInfo, setToggleInfo] = useState('');

    const user = useSelector(state => state.auth.user);

    useEffect(()=>{
        if(user && user.toggle == '명륜'){
            setToggleInfo(true)
        } else {
            setToggleInfo(false)
        }
    },[])
    
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
            <Grid style={{marginTop:'20px'}}>

                {/* 식당TOP5 */}
                <div className='top' style={{height:'270px'}}>
                    <div style={{ display: "flex", margin:'21px 0px 0px 15px' }}>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color="#2E2E2E">3월 4주차 식당</Typography>
                        <Typography style={{ marginRight: "8px", fontSize:'16px',  fontWeight:'700' }} color={theme.palette.primary.main}>TOP 5</Typography>
                        <Typography>🔥</Typography>
                    </div>
                    <div style={{margin:'5px 0px 21px 15px'}}>
                        <Typography color={theme.palette.fontColor.light} style={{fontSize:'11px'}}>일주일마다 업데이트 돼요!</Typography>
                    </div>
                    <div style={{margin:'0px 0px 0px 15px'}}>
                        
                    <Grid container style={{  position: 'absolute', zIndex: '3', overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap', width: window.innerWidth <= 375 ? 360 : window.innerWidth <= 400  ? 375 :  400, }}>
                        {toggleInfo? top5M.map((item) => (
                        <Grid item style={{display:'inline-block', flexShrink: 0, paddingRight: '9px'}}>
                        <div >
                            {/* 식당이미지 */}
                            <div style={{display: 'flex', margin:'9px 0px 0px 9px', paddingTop:'2px',position:'absolute',zIndex:'3', alignItems: 'center', justifyContent: 'center', width: '23px', height: '21.41px', borderRadius: '50%', backgroundColor: item.id === 4 || item.id === 5 ? 'rgba(186, 186, 186, 0.7)' : 'rgba(255, 206, 0, 0.7)', color:'#fff', fontSize: '13px', fontWeight: 'bold'}}>{item.id}</div>
                            <Image src={item.src} width={155} height={155} style={{borderRadius:'20px', position:'relative'}}></Image>
                            {/* 식당이름 */}
                            <Typography style={{fontSize:'15px', fontWeight:'700'}} color="#2E2E2E">{item.name}</Typography>
                            {/* 식당평점 */}
                            <div style={{ display: "flex"}}>
                                <Typography style={{fontSize:'10px', fontWeight:'400'}} color="#2E2E2E">스꾸친 평점: &nbsp;</Typography>
                                <Image src={star} width={15} height={3} style={{margin:''}}/>
                                <Typography style={{fontSize:'10px', fontWeight:'700'}} color="#2E2E2E">&nbsp; {item.rating}</Typography>
                                <Typography style={{fontSize:'10px', fontWeight:'400'}} color="#2E2E2E">&nbsp;/ 5</Typography>
                            </div>
                        </div>
                        </Grid>
                    )):
                    top5Y.map((item) => (
                        <Grid item style={{display:'inline-block', flexShrink: 0}}>
                        {/* 1 */}
                    <div style={{ marginRight: '9px'}}>
                            {/* 식당이미지 */}
                            <div style={{display: 'flex', margin:'9px 0px 0px 9px', paddingTop:'2px',position:'absolute',zIndex:'3', alignItems: 'center', justifyContent: 'center', width: '23px', height: '21.41px', borderRadius: '50%', backgroundColor: item.id === 4 || item.id === 5 ? 'rgba(186, 186, 186, 0.7)' : 'rgba(255, 206, 0, 0.7)', color:'#fff', fontSize: '13px', fontWeight: 'bold'}}>{item.id}</div>
                            <Image src={item.src} width={155} height={155} style={{borderRadius:'20px', position:'relative'}}></Image>
                            {/* 식당이름 */}
                            <Typography style={{fontSize:'15px', fontWeight:'700'}} color="#2E2E2E">{item.name}</Typography>
                            {/* 식당평점 */}
                            <div style={{ display: "flex"}}>
                                <Typography style={{fontSize:'10px', fontWeight:'400'}} color="#2E2E2E">스꾸친 평점: &nbsp;</Typography>
                                <Image src={star} width={15} height={3} style={{margin:''}}/>
                                <Typography style={{fontSize:'10px', fontWeight:'700'}} color="#2E2E2E">&nbsp; {item.rating}</Typography>
                                <Typography style={{fontSize:'10px', fontWeight:'400'}} color="#2E2E2E">&nbsp;/ 5</Typography>
                            </div>
                        </div>
                        </Grid>
                    ))
                    }
                    </Grid>
                    </div>
                    
                </div>

                {/* 맛집 콘텐츠 */}
                <div style={{margin:'45px 0px 0px 0px', position:'relative'}}>
                    <div style={{position:'absolute',zIndex:'3'}}>
                        {/* 안에 자유롭게 수정가능 */}
                        <Typography fontSize='12px' fontWeight='700' style={{margin:'23px 0px 0px 15px'}} color="white">스꾸친 마케터의 특별한 맛집 가이드</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color={theme.palette.primary.main}>화려한 축제가 끝나고</Typography>
                        <Typography fontSize='25px' fontWeight='700' style={{margin:'0px 0px 0px 15px'}} color="white">가기 좋은 성대 술집 5곳</Typography>
                    </div>
                    <div>
                        <div style={{position:'absolute',zIndex:'3', bottom:'8%', right: '3%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Button style={{margin:'', fontSize:'12px', color:'white'}} onClick={()=>{router.push('/magazineDetail')}}>콘텐츠 보러가기&nbsp;&nbsp; <Image src={arrow} width={15.57} height={15}/></Button>
                        </div>
                        <div style={{position:'absolute',zIndex:'3', bottom:'6%', left: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                            <Image src={circles} width={50} height={6} />
                        </div>
                    </div>
                    <div style={{position:'relative', width:'100%', height:'100%'}}>
                        <Image src={content}/>
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
                                <Typography fontSize='16px' fontWeight='700' style={{margin:'15px 0px 0px 0px'}} color="white" maxWidth={237}>"{toggleInfo ? reviewM[reviewNum].text: reviewY[reviewNum].text}"</Typography>
                                <Typography fontSize='12px' fontWeight='400' style={{margin:'15px 0px 0px 0px'}} color="white" maxWidth={237}>{toggleInfo? reviewM[reviewNum].user :  reviewY[reviewNum].user}</Typography>
                            </div>
                        </div>

                        <div>
                            <div style={{position:'absolute',zIndex:'3', bottom: '6%', right: '3%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                                <Button style={{margin:'', fontSize:'12px'}} onClick={()=>{toggleInfo? router.push(`/place?id=${reviewM[reviewNum].id}`) : router.push(`/place?id=${reviewY[reviewNum].id}`)}}>이 식당 어디일까?&nbsp;&nbsp; <Image src={arrowY} width={15.57} height={15}/></Button>
                            </div>
                        </div>
                        <div>
                            <div style={{position:'absolute',zIndex:'3', display: 'flex', alignItems: 'center', justifyContent: 'center', left: "0%", top: '50%', transform: 'translateY(-50%)'}}>
                                <Button onClick={handlePrev}><Image src={arrowL} width={10.29} height={18.48} /></Button>
                            </div>
                        </div>
                        <div>
                            <div style={{position:'absolute',zIndex:'3', display: 'flex', justifyContent: 'center', alignItems: 'center', right: "0%",top: '50%', transform: 'translateY(-50%)'}}>
                                <Button onClick={handleNext}><Image src={arrowR} width={10.29} height={18.48} /></Button>
                            </div>
                        </div>
                        <div style={{position:'relative', width:'100%', height:'100%'}}>
                            <Image src={toggleInfo? reviewM[reviewNum].src : reviewY[reviewNum].src}/>
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