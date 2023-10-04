import { Avatar, CssBaseline, Box, ThemeProvider, Typography, Grid, Container, Stack, useScrollTrigger, Button,} from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"; 
import { clear_search_results } from "../actions/place/place";
import { load_rank } from '../actions/rank/rank';
import styled from '@emotion/styled';

import arrow from '../image/arrow.png';
import arrowY from '../image/arrowY.png';
import arrowL from '../image/arrowLeft.png'
import arrowR from '../image/arrowRight.png'
import emptyStar from '../image/Star_border-1.png';
import filledStar from '../image/Star-1.png';
import dynamic from 'next/dynamic';

import content from '../image/magazine/magazine/content1_1.png';
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

import { load_all_magazine, } from '../actions/magazine/magazine';

const reviewM = [
    {
        src: review4_mr,
        text: '여기 옛날 소친친 있던 자리인데, 바뀌고 처음와봤네요! 타코랑 퀘사디아 존맛탱. 가격대는 좀 있지만 매우 만족',
        user: '경도/경영학과',
        id: 42,
        rating: 5,
    },{
        src: review1_mr,
        text: '성대 근처 김치찌개 집 1티어 중 하나임. 먹어보시길',
        user: '강아지는 도그/경영학과',
        id: 288,
        rating: 5,
    },{
        src: review3_mr,
        text: '제육볶음을 좋아하신다면 꼭 추천드립니다! 불맛🔥이 살아있어용☺️ 순찌도 맛있습니다👍',
        user: '😚/컬처앤테크놀로지융합전공',
        id: 250,
        rating: 5,
    },{
        src: review2_mr,
        text: '인테리어도 이쁘고 사장님, 알바생도 친절하셔요🙂 이층은 카공하기 좋고, 일층은 수다떨기 좋은 분위기!! 낫컴플에 가면 당연히 크로플 하나씩은 먹어야해요...!',
        user: '효효/컬처앤테크놀로지융합전공',
        id: 369,
        rating: 5,
    },{
        src: review5_mr,
        text: '조용해서 좋아요! 혜화 쌀국수 파는 곳 중 가장 맛있어요',
        user: '예진_/데이터사이언스융합전공',
        id: 57,
        rating: 5,
    },
];

const reviewY = [
    {
        src: review3_yj,
        text: '튀김수육, 뭐 언제까지 맛있어? 내년에도 맛있어? 후년에도 맛있을거니?',
        user: '박연진/식품생명공학과',
        id: 207,
        rating: 4,
    },{
        src: review5_yj,
        text: '초밥 땡길 때 자주 가는 곳입니다 회전초밥집이라 원하는것만 골라먹을 수 있어서 좋아요 맛도 좋아요',
        user: '세미나시러/화학공학_고분자공학부',
        id: 102,
        rating: 5,
    },{
        src: review2_yj,
        text: '진짜 거의 맨날 가요 😌🥐💻\n'
        +'율전 카공 일티어..!',
        user: '진/컬처앤테크놀로지융합전공',
        id: 375,
        rating: 5,
    },{
        src: review4_yj,
        text: '도래창 홍창 다 맛있고 볶음밥 꼭 드세요! ',
        user: '100M/스포츠과학과',
        id: 97,
        rating: 5,
    },{
        src: review1_yj,
        text: '엄청난 양.. 맵도리탕도 다들 드셔보세요! 엄청난 술안주 겸 식사메뉴 입니다',
        user: '성대러문김진주/러시아어문학과',
        id: 135,
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
    const allMagazine = useSelector(state => state.magazine.allMagazine);

    const [reviewNum, setReviewNum] = useState(0);
    const [toggleInfo, setToggleInfo] = useState(null);

    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.auth.toggle_for_not_user);
    const rank = useSelector(state => state.rank.rank);
    const height = window.innerHeight;
    const width= window.innerWidth;

    useEffect(()=>{
        dispatch(clear_search_results());
        dispatch(load_all_magazine());
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

    const [title, setTitle] = useState('');
    const [gate, setGate] = useState('');
    const [contents, setContent] = useState('');
    const [link, setLink] = useState('');

    // const handleSubmit = () =>{
    //     dispatch(add_magazine(title, gate, contents, link, [] ,([result, message]) => {
    //         if (result) {
    //             console.log("매거진 추가 완료")
    //             dispatch(load_all_magazine());
    //         } else {
    //             alert("매거진 작성 오류" + message);
    //         }
    //     }));
    //     setTitle('');
    //     setGate('');
    //     setContent('');
    //     setLink('');

    // }
    // console.log(allMagazine);



    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar />
            <Grid style={{overflowX:'hidden', overflowY:'scroll', height:height, maxWidth:'420px',}}>
                <div style={{margin:'30px 0 20px 20px',}}>
                    <Typography style={{fontSize:'32px', fontWeight:'800'}}>제목제목제목제목</Typography>
                </div>
                
                { allMagazine && allMagazine.map((item)=>
                {
                    const gateWidth = `${item.gate.length * 20}px`;
                    let color = '#FFFCE4';
                    let fontColor = '#FFAC0B';

                    if (item.gate === '후문' || item.gate === '대운동장' || item.gate === "기타") {
                        color = '#DCF8DB';
                        fontColor = '#58C85A'; 
                    }                  

                    return(
                        <Link 
                            href={{
                                pathname: '/magazineDetail',
                                query: {
                                    id: item.id
                                }
                            }}
                            key={item.id}
                        >
                        <div style={{padding:'0 20px', position: 'relative', marginBottom:'10px'}}>
                            <div style={{ width: '100%', height: '230px', overflow: 'hidden', border: '1px solid transparent', borderRadius: '10px' }}>
                                <Image src={content} style={{ objectFit: 'cover', width: '100%', height: '100%'}} />
                            </div>
                            <div style={{ zIndex:'3', position: 'absolute', bottom: '20px', left: '40px', right: '0'}}>
                                <Typography sx={{
                                width: gateWidth, height: '24px', border: "1px solid", borderColor: color, borderRadius:'10px', textAlign:'center', fontSize: '12px',  fontWeight:'800',p: '2px 4px 0px 4px', color:fontColor, backgroundColor: color, margin:'-2px 0px 0px 5px'
                                }}>{item.gate}</Typography>
                                <Typography sx={{fontSize:'24px', margin:"10px 0 0 5px", color:'white', fontWeight:'700'}}>{item.title}</Typography>
                            </div>
                        </div>
                        </Link>
                )})}

                {/* <div>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    <input value={gate} onChange={(e) => setGate(e.target.value)}></input>
                    <input value={contents} onChange={(e) => setContent(e.target.value)}></input>
                    <input value={link} onChange={(e) => setLink(e.target.value)}></input>
                    <Button onClick={handleSubmit}>등록</Button>

                </div> */}

            </Grid> 
        </ThemeProvider>
    )
} 

export default dynamic(() => Promise.resolve(Magazine), {
    ssr: false,
});