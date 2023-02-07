import { useState } from "react";
import {ThemeProvider, CssBaseline, Typography, Button, Container, Grid} from '@mui/material';
import Image from 'next/image';
import theme from "../theme/theme";
import back from '../image/arrow_back_ios.png';
import womanCheck from '../image/성별/여성_체크.png';
import woman from '../image/성별/여성.png';
import man from '../image/성별/남성.png';
import manCheck from '../image/성별/남성_체크.png';

//mbti
import E from '../image/mbti/E-1.png';
import N from '../image/mbti/N-1.png';
import F from '../image/mbti/F-1.png';
import P from '../image/mbti/P-1.png';
import ECheck from '../image/mbti/E.png';
import NCheck from '../image/mbti/N.png';
import FCheck from '../image/mbti/F.png';
import PCheck from '../image/mbti/P.png';
import I from '../image/mbti/I-1.png';
import S from '../image/mbti/S-1.png';
import T from '../image/mbti/T-1.png';
import J from '../image/mbti/J-1.png';
import ICheck from '../image/mbti/I.png';
import SCheck from '../image/mbti/S.png';
import TCheck from '../image/mbti/T.png';
import JCheck from '../image/mbti/J.png';

//문화예술
import artTag1 from '../image/태그/태그_off/게임.png';
import artTag2 from '../image/태그/태그_off/노래방.png';
import artTag3 from '../image/태그/태그_off/덕질.png';
import artTag4 from '../image/태그/태그_off/만화.png';
import artTag5 from '../image/태그/태그_off/맛집.png';
import artTag6 from '../image/태그/태그_off/방탈출.png';
import artTag7 from '../image/태그/태그_off/반려동물.png';
import artTag8 from '../image/태그/태그_off/보드게임.png';
import artTag9 from '../image/태그/태그_off/요리.png';
import artTag10 from '../image/태그/태그_off/영화.png';
import artTag11 from '../image/태그/태그_off/음악.png';
import artTag12 from '../image/태그/태그_off/전시.png';
import artTag13 from '../image/태그/태그_off/여행.png';
import artTag14 from '../image/태그/태그_off/연극.png';

import artTag1ON from '../image/태그/태그_on/tag_게임.png';
import artTag2ON from '../image/태그/태그_on/tag_노래방.png';
import artTag3ON from '../image/태그/태그_on/tag_덕질.png';
import artTag4ON from '../image/태그/태그_on/tag_만화.png';
import artTag5ON from '../image/태그/태그_on/tag_맛집.png';
import artTag6ON from '../image/태그/태그_on/tag_방탈출.png';
import artTag7ON from '../image/태그/태그_on/tag_반려동물.png';
import artTag8ON from '../image/태그/태그_on/tag_보드게임.png';
import artTag9ON from '../image/태그/태그_on/tag_요리.png';
import artTag10ON from '../image/태그/태그_on/tag_영화.png';
import artTag11ON from '../image/태그/태그_on/tag_음악.png';
import artTag12ON from '../image/태그/태그_on/tag_전시.png';
import artTag13ON from '../image/태그/태그_on/tag_여행.png';
import artTag14ON from '../image/태그/태그_on/tag_연극.png';

//음식
import foodTag1 from '../image/태그/태그_off/빈 양식.png';
import foodTag2 from '../image/태그/태그_off/빈 일식.png';
import foodTag3 from '../image/태그/태그_off/빈 중식.png';
import foodTag4 from '../image/태그/태그_off/빈 카페.png';
import foodTag5 from '../image/태그/태그_off/빈 분식.png';
import foodTag6 from '../image/태그/태그_off/빈 남미음식.png';
import foodTag7 from '../image/태그/태그_off/빈 한식.png';
import foodTag8 from '../image/태그/태그_off/빈 아시아 음식.png';

import foodTag1On from '../image/태그/태그_on/tag_양식.png';
import foodTag2On from '../image/태그/태그_on/tag_일식.png';
import foodTag3On from '../image/태그/태그_on/tag_중식.png';
import foodTag4On from '../image/태그/태그_on/tag_카페.png';
import foodTag5On from '../image/태그/태그_on/tag_분식.png';
import foodTag6On from '../image/태그/태그_on/tag_남미음식.png';
import foodTag7On from '../image/태그/태그_on/tag_한식.png';
import foodTag8On from '../image/태그/태그_on/tag_아시아음식.png';

//운동
import exeTag1 from '../image/태그/태그_off/빈 당구.png';
import exeTag2 from '../image/태그/태그_off/빈 등산.png';
import exeTag3 from '../image/태그/태그_off/빈 러닝.png';
import exeTag4 from '../image/태그/태그_off/빈 배드민턴.png';
import exeTag5 from '../image/태그/태그_off/빈 서핑.png';
import exeTag6 from '../image/태그/태그_off/빈 보드스키.png';
import exeTag7 from '../image/태그/태그_off/빈 스포츠관람.png';
import exeTag8 from '../image/태그/태그_off/빈 야구.png';
import exeTag9 from '../image/태그/태그_off/빈 주짓수.png';
import exeTag10 from '../image/태그/태그_off/빈 축구.png';
import exeTag11 from '../image/태그/태그_off/빈 테니스.png';
import exeTag12 from '../image/태그/태그_off/빈 헬스.png';
import exeTag13 from '../image/태그/태그_off/빈 댄스.png';
import exeTag14 from '../image/태그/태그_off/골프.png';
import exeTag15 from '../image/태그/태그_off/농구.png';
import exeTag16 from '../image/태그/태그_off/빈 볼링.png';

import exeTag1On from '../image/태그/태그_on/tag_당구.png';
import exeTag2On from '../image/태그/태그_on/tag_등산.png';
import exeTag3On from '../image/태그/태그_on/tag_러닝.png';
import exeTag4On from '../image/태그/태그_on/tag_배드민턴.png';
import exeTag5On from '../image/태그/태그_on/tag_서핑.png';
import exeTag6On from '../image/태그/태그_on/tag_보드스키.png';
import exeTag7On from '../image/태그/태그_on/tag_스포츠관람.png';
import exeTag8On from '../image/태그/태그_on/tag_야구.png';
import exeTag9On from '../image/태그/태그_on/tag_주짓수.png';
import exeTag10On from '../image/태그/태그_on/tag_축구.png';
import exeTag11On from '../image/태그/태그_on/tag_테니스.png';
import exeTag12On from '../image/태그/태그_on/tag_헬스.png';
import exeTag13On from '../image/태그/태그_on/tag_댄스.png';
import exeTag14On from '../image/태그/태그_on/tag_골프.png';
import exeTag15On from '../image/태그/태그_on/tag_농구.png';
import exeTag16On from '../image/태그/태그_on/tag_볼링.png';

//학술
import stuTag1 from '../image/태그/학술_off/학술01.png';
import stuTag2 from '../image/태그/학술_off/학술02.png';
import stuTag3 from '../image/태그/학술_off/학술03.png';
import stuTag4 from '../image/태그/학술_off/학술04.png';
import stuTag5 from '../image/태그/학술_off/학술05.png';
import stuTag6 from '../image/태그/학술_off/학술06.png';
import stuTag7 from '../image/태그/학술_off/학술07.png';
import stuTag8 from '../image/태그/학술_off/학술08.png';
import stuTag9 from '../image/태그/학술_off/학술09.png';
import stuTag10 from '../image/태그/학술_off/학술10.png';
import stuTag11 from '../image/태그/학술_off/학술11.png';
import stuTag12 from '../image/태그/학술_off/학술12.png';
import stuTag13 from '../image/태그/학술_off/학술13.png';
import stuTag14 from '../image/태그/학술_off/학술14.png';
import stuTag15 from '../image/태그/학술_off/학술15.png';

import stuTag1On from '../image/태그/학술_on/tag_학회01.png';
import stuTag2On from '../image/태그/학술_on/tag_동아리02.png';
import stuTag3On from '../image/태그/학술_on/tag_교환학생03.png';
import stuTag4On from '../image/태그/학술_on/tag_봉사04.png';
import stuTag5On from '../image/태그/학술_on/tag_재테크05.png';
import stuTag6On from '../image/태그/학술_on/tag_빅데이터06.png';
import stuTag7On from '../image/태그/학술_on/tag_금융07.png';
import stuTag8On from '../image/태그/학술_on/tag_문학08.png';
import stuTag9On from '../image/태그/학술_on/tag_토론09.png';
import stuTag10On from '../image/태그/학술_on/tag_시사10.png';
import stuTag11On from '../image/태그/학술_on/tag_어학11.png';
import stuTag12On from '../image/태그/학술_on/tag_cpa12.png';
import stuTag13On from '../image/태그/학술_on/tag_피트13.png';
import stuTag14On from '../image/태그/학술_on/tag_로스쿨14.png';
import stuTag15On from '../image/태그/학술_on/tag_행시15.png';

export default function makeProfile(){ 

    const [womanClick, setWomanClick] = useState(false);
    const [manClick, setManClick] = useState(false);
    const [mbti, setMbti] = useState({
        'E': false,
        'N': false,
        'F': false,
        'P': false,
        'I': false,
        'S': false,
        'T': false,
        'J': false,
    }); 
    const [food, setFood] = useState({
        '한식': false,
        '일식': false,
        '중식': false,
        '양식': false,
        '남미음식': false,
        '분식': false,
        '아시아음식': false,
        '카페': false,
    });
    const [sports, setSports] = useState({
        '축구': false,
        '야구': false,
        '농구': false,
        '골프': false,
        '테니스': false,
        '당구': false,
        '헬스': false,
        '보드스키': false,
        '주짓수': false,
        '서핑': false,
        '등산': false,
        '러닝': false,
        '스포츠관람': false,
        '볼링': false,
        '배드민턴': false,
        '댄스': false,
    });
    const [art, setArt] = useState({
        '영화': false,
        '음악': false,
        '전시회': false,
        '연극': false,
        '덕질': false,
        '여행': false,
        '게임': false,
        '노래방': false,
        '방탈출': false,
        '보드게임': false,
        '반려동물': false,
        '요리': false,
        '맛집탐방': false,
        '만화': false,
    })
    const [study, setStudy] = useState({
        '학회': false,
        '동아리': false,
        '교환학생': false,
        '봉사': false,
        '재테크': false,
        '빅데이터': false,
        '금융': false,
        '문학': false,
        '토론': false,
        '시사': false,
        '어학': false,
        'cpa': false,
        '피트': false,
        '로스쿨': false,
        '행시': false,
    })

    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'back' ){
            
            // router.push({
            //     pathname: '/',
            //     query: { openID: true }
            //     });
            
        }
    };

    //성별클릭
    const handleSexClick = (event) => {
        if(event.target.name == '여성'){
            if(womanClick){
                setWomanClick(false);
            } else {
                setWomanClick(true);
                setManClick(false);
            }
        } else if(event.target.name='남성'){
            if(manClick){
                setManClick(false);
            } else {
                setManClick(true);
                setWomanClick(false);
            }
        }

    }

    //mbti클릭
    const handleMbtiClick =(event) => {
        if(event.target.name == 'E'){
            if(mbti.E){
                setMbti({
                    ...mbti,
                    'E': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'E': true,
                    'I': false
                })
            }
        } else if(event.target.name == 'N'){
            if(mbti.N){
                setMbti({
                    ...mbti,
                    'N': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'N': true,
                    'S': false
                })
            }
        } else if(event.target.name == 'F'){
            if(mbti.F){
                setMbti({
                    ...mbti,
                    'F': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'F': true,
                    'P': false
                })
            }
        } else if(event.target.name == 'P'){
            if(mbti.P){
                setMbti({
                    ...mbti,
                    'P': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'P': true,
                    'J': false
                })
            }
        } else if(event.target.name == 'I'){
            if(mbti.I){
                setMbti({
                    ...mbti,
                    'I': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'I': true,
                    'E': false
                })
            }
        } else if(event.target.name == 'S'){
            if(mbti.S){
                setMbti({
                    ...mbti,
                    'S': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'S': true,
                    'N': false
                })
            }
        } else if(event.target.name == 'T'){
            if(mbti.T){
                setMbti({
                    ...mbti,
                    'T': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'T': true,
                    'F': false
                })
            }
        } else if(event.target.name == 'J'){
            if(mbti.N){
                setMbti({
                    ...mbti,
                    'J': false,
                })
            } else {
                setMbti({
                    ...mbti,
                    'J': true,
                    'P': false
                })
            }
        }
    }

    //음식클릭
    const handleFoodClick = (event) => {
        if(food[event.target.name]){
            setFood({
                ...food,
                [event.target.name] : false
            })
        } else{
            setFood({
                ...food,
                [event.target.name] : true
            })
        }
    }

    //운동클릭
    const handleSportsClick = (event) => {
        if(sports[event.target.name]){
            setSports({
                ...sports,
                [event.target.name] : false
            })
        } else{
            setSports({
                ...sports,
                [event.target.name] : true
            })
        }
    }
    
    //문화예술
    const handleArtClick = (event) => {
        if(art[event.target.name]){
            setArt({
                ...art,
                [event.target.name] : false
            })
        } else{
            setArt({
                ...art,
                [event.target.name] : true
            })
        }
    }

    //학술
    const handleStudyClick = (event) => {
        if(study[event.target.name]){
            setStudy({
                ...study,
                [event.target.name] : false
            })
        } else{
            setStudy({
                ...study,
                [event.target.name] : true
            })
        }
    }

    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container style={{padding:'0px', margin:'41px 0px 53px 0px'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick}/>
                            </Grid>
                            <Grid item style={{marginLeft:'29%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>매칭 프로필 설정</Typography>
                            </Grid>
                            <Grid item style={{marginLeft:'20%'}}>
                                <Typography style={{margin:'3px 0px 0px 0px', textAlign:'center',fontSize:'12px'}} fontWeight={theme.typography.h2} color={theme.palette.fontColor.main}>건너뛰기</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Typography style={{fontSize:'12px', textAlign:'center', marginTop:'13px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>프로필을 완성하고 스꾸친 AI 매칭을 이용해보세요 😎</Typography>
                    <Container name='성별' style={{padding:'0px', margin:'41.7px 0px 0px 53px', justifyContent:'center'}}>
                        <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>성별*</Typography>
                        <div style={{marginBottom:'9px'}}>
                            <Image src={manClick ? manCheck : man} width={270} height={35.74} onClick={handleSexClick} name='남성'/>
                        </div>
                        <div>
                            <Image src={womanClick ? womanCheck : woman} width={270} height={35.74} onClick={handleSexClick} name='여성'/>
                        </div>
                    </Container>
                    <Container name='mbti' style={{padding:'0px', margin:'41.7px 0px 0px 56px'}}>
                        <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>MBTI*</Typography>
                        <div>
                            <Grid container>
                                <Grid style={{marginRight:'59px'}}>
                                    <Image src={mbti.E ? ECheck : E} width={20} height={28} onClick={handleMbtiClick} name='E'/>
                                </Grid>
                                <Grid style={{marginRight:'60px'}}>
                                    <Image src={mbti.N ? NCheck : N} width={24} height={28} onClick={handleMbtiClick} name='N'/>
                                </Grid>
                                <Grid style={{marginRight:'59px'}}>
                                    <Image src={mbti.F ? FCheck : F} width={19} height={28} onClick={handleMbtiClick} name='F'/>
                                </Grid>
                                <Grid style={{marginRight:'59px'}}>
                                    <Image src={mbti.P ? PCheck : P} width={22} height={28} onClick={handleMbtiClick} name='P'/>
                                </Grid>
                            </Grid>
                            
                        </div>
                        <div style={{marginTop:'46px'}}>
                            <Grid container>
                                <Grid style={{marginRight:'65px', marginLeft:'5px'}}>
                                    <Image src={mbti.I ? ICheck : I} width={11} height={28} onClick={handleMbtiClick} name='I'/>
                                </Grid>
                                <Grid style={{marginRight:'60px'}}>
                                    <Image src={mbti.S ? SCheck : S} width={20} height={28} onClick={handleMbtiClick} name='S'/>
                                </Grid>
                                <Grid style={{marginRight:'59px'}}>
                                    <Image src={mbti.T ? TCheck : T} width={20} height={28} onClick={handleMbtiClick} name='T'/>
                                </Grid>
                                <Grid style={{marginRight:'61px'}}>
                                    <Image src={mbti.J ? JCheck : J} width={19} height={28} onClick={handleMbtiClick} name='J'/>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                    <Container name='관심사' style={{padding:'0px', margin:'41.7px 0px 0px 25px', justifyContent:'center'}}>
                        <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>관심사*</Typography>
                        <Typography style={{fontSize:'12px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>최소 3개 이상의 태그를 선택해주세요.</Typography>
                        <Container name='음식' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>🍎 음식</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'350px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.한식 ? foodTag7On : foodTag7} width={36} height={27} onClick={handleFoodClick} name='한식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.일식 ? foodTag2On : foodTag2} width={36} height={27} onClick={handleFoodClick} name='일식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.중식 ? foodTag3On : foodTag3} width={36} height={27} onClick={handleFoodClick} name='중식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.양식 ? foodTag1On : foodTag1} width={36} height={27} onClick={handleFoodClick} name='양식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.남미음식 ? foodTag6On : foodTag6} width={58} height={27} onClick={handleFoodClick} name='남미음식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.분식 ? foodTag5On : foodTag5} width={36} height={27} onClick={handleFoodClick} name='분식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.아시아음식 ? foodTag8On : foodTag8} width={72} height={27} onClick={handleFoodClick} name='아시아음식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.카페 ? foodTag4On : foodTag4} width={36} height={27} onClick={handleFoodClick} name='카페'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container name='운동' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'35px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>🏀 운동</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'330px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.축구 ? exeTag10On : exeTag10} width={36} height={27} onClick={handleSportsClick} name='축구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.야구 ? exeTag8On : exeTag8} width={36} height={27} onClick={handleSportsClick} name='야구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.농구 ? exeTag15On : exeTag15} width={36} height={27} onClick={handleSportsClick} name='농구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.골프 ? exeTag14On : exeTag14} width={36} height={27} onClick={handleSportsClick} name='골프'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.테니스 ? exeTag11On : exeTag11} width={47} height={27} onClick={handleSportsClick} name='테니스'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.당구 ? exeTag1On : exeTag1} width={36} height={27} onClick={handleSportsClick} name='당구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.헬스 ? exeTag12On : exeTag12} width={36} height={27} onClick={handleSportsClick} name='헬스'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.보드스키 ? exeTag6On : exeTag6} width={72} height={27} onClick={handleSportsClick} name='보드스키'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.주짓수 ? exeTag9On : exeTag9} width={47} height={27} onClick={handleSportsClick} name='주짓수'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.서핑 ? exeTag5On : exeTag5} width={36} height={27} onClick={handleSportsClick} name='서핑'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.등산 ? exeTag2On : exeTag2} width={36} height={27} onClick={handleSportsClick} name='등산'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.러닝 ? exeTag3On : exeTag3} width={36} height={27} onClick={handleSportsClick} name='러닝'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.스포츠관람 ? exeTag7On : exeTag7} width={72} height={27} onClick={handleSportsClick} name='스포츠관람'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.볼링 ? exeTag16On : exeTag16} width={36} height={27} onClick={handleSportsClick} name='볼링'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.배드민턴 ? exeTag4On : exeTag4} width={58} height={27} onClick={handleSportsClick} name='배드민턴'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.댄스 ? exeTag13On : exeTag13} width={36} height={27} onClick={handleSportsClick} name='댄스'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container name='문화예술' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'35px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>🎵 문화예술</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'330px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.영화 ? artTag10ON : artTag10} width={36} height={27} onClick={handleArtClick} name='영화'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.음악 ? artTag11ON : artTag11} width={36} height={27} onClick={handleArtClick} name='음악'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.전시회 ? artTag12ON : artTag12} width={47} height={27} onClick={handleArtClick} name='전시회'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.연극 ? artTag14ON : artTag14} width={79} height={27} onClick={handleArtClick} name='연극'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.덕질 ? artTag3ON : artTag3} width={36} height={27} onClick={handleArtClick} name='덕질'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.여행 ? artTag13ON : artTag13} width={36} height={27} onClick={handleArtClick} name='여행'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.게임 ? artTag1ON : artTag1} width={36} height={27} onClick={handleArtClick} name='게임'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.노래방 ? artTag2ON : artTag2} width={47} height={27} onClick={handleArtClick} name='노래방'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.방탈출 ? artTag6ON : artTag6} width={47} height={27} onClick={handleArtClick} name='방탈출'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.보드게임 ? artTag8ON : artTag8} width={58} height={27} onClick={handleArtClick} name='보드게임'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.반려동물 ? artTag7ON : artTag7} width={58} height={27} onClick={handleArtClick} name='반려동물'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.요리 ? artTag9ON : artTag9} width={36} height={27} onClick={handleArtClick} name='요리'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.맛집탐방 ? artTag5ON : artTag5} width={61} height={27} onClick={handleArtClick} name='맛집탐방'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.만화 ? artTag4ON : artTag4} width={36} height={27} onClick={handleArtClick} name='만화'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container name='학술' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'35px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>📚 학술</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'330px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.학회 ? stuTag1On : stuTag1} width={36} height={27} onClick={handleStudyClick} name='학회'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.동아리 ? stuTag2On : stuTag2} width={47} height={27} onClick={handleStudyClick} name='동아리'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.교환학생 ? stuTag3On : stuTag3} width={61} height={27} onClick={handleStudyClick} name='교환학생'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.봉사 ? stuTag4On : stuTag4} width={36} height={27} onClick={handleStudyClick} name='봉사'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.재테크 ? stuTag5On : stuTag5} width={47} height={27} onClick={handleStudyClick} name='재테크'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.빅데이터 ? stuTag6On : stuTag6} width={58} height={27} onClick={handleStudyClick} name='빅데이터'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.금융 ? stuTag7On : stuTag7} width={36} height={27} onClick={handleStudyClick} name='금융'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.문학 ? stuTag8On : stuTag8} width={36} height={27} onClick={handleStudyClick} name='문학'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.토론 ? stuTag9On : stuTag9} width={36} height={27} onClick={handleStudyClick} name='토론'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.시사 ? stuTag10On : stuTag10} width={36} height={27} onClick={handleStudyClick} name='시사'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.어학 ? stuTag11On : stuTag11} width={36} height={27} onClick={handleStudyClick} name='어학'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.cpa ? stuTag12On : stuTag12} width={36} height={27} onClick={handleStudyClick} name='cpa'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.피트 ? stuTag13On : stuTag13} width={36} height={27} onClick={handleStudyClick} name='피트'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.로스쿨 ? stuTag14On : stuTag14} width={47} height={27} onClick={handleStudyClick} name='로스쿨'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.행시 ? stuTag15On : stuTag15} width={36} height={27} onClick={handleStudyClick} name='행시'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </Container>
                </Container>
        </ThemeProvider>
    )
}