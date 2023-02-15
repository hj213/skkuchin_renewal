import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change_matching_info, load_matching_info } from "../actions/matchingUser/matchingUser";
import { useRouter } from "next/router";
import { load_user } from "../actions/auth/auth";
import {ThemeProvider, CssBaseline, Typography, Button, Container, Grid, TextField} from '@mui/material';
import Image from 'next/image';
import theme from "../theme/theme";
import back from '../image/arrow_back_ios.png';
import womanCheck from '../image/성별/여성_체크.png';
import woman from '../image/성별/여성.png';
import man from '../image/성별/남성.png';
import manCheck from '../image/성별/남성_체크.png'; 
import textForm from '../image/mbti/프로필/한줄소개.png';
import submitOk from '../image/확인_노랑.png';
import submit from '../image/확인_회색.png';

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
import ICheck from '../image/mbti/I_yellow.png';
import SCheck from '../image/mbti/S_yellow.png';
import TCheck from '../image/mbti/T_yellow.png';
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

//mbti프로필
import profile1 from '../image/mbti/프로필/기본.png';
import profile2 from '../image/mbti/프로필/식사.png';
import profile3 from '../image/mbti/프로필/ENFJ.png';
import profile4 from '../image/mbti/프로필/ENTP.png';
import profile5 from '../image/mbti/프로필/INFP.png';
import profile6 from '../image/mbti/프로필/ENFP.png';
import profile7 from '../image/mbti/프로필/ISTJ.png';
import profile8 from '../image/mbti/프로필/ISTP.png';
import profile9 from '../image/mbti/프로필/ISFP.png';
import profile10 from '../image/mbti/프로필/INTP.png';
import profile11 from '../image/mbti/프로필/ESTJ.png';
import profile12 from '../image/mbti/프로필/INFJ.png';
import profile13 from '../image/mbti/프로필/ENTJ.png';
import profile14 from '../image/mbti/프로필/ESTP.png';
import profile15 from '../image/mbti/프로필/ESFJ.png';
import profile16 from '../image/mbti/프로필/INTJ.png';
import profile17 from '../image/mbti/프로필/ISFJ.png';
import profile18 from '../image/mbti/프로필/ESFP.png';

import profile1On from '../image/mbti/프로필/MBTI 선택 01.png';
import profile2On from '../image/mbti/프로필/MBTI 선택 02.png';
import profile3On from '../image/mbti/프로필/MBTI 선택 03.png';
import profile4On from '../image/mbti/프로필/MBTI 선택 04.png';
import profile5On from '../image/mbti/프로필/MBTI 선택 05.png';
import profile6On from '../image/mbti/프로필/MBTI 선택 06.png';
import profile7On from '../image/mbti/프로필/MBTI 선택 07.png';
import profile8On from '../image/mbti/프로필/MBTI 선택 08.png';
import profile9On from '../image/mbti/프로필/MBTI 선택 09.png';
import profile10On from '../image/mbti/프로필/MBTI 선택 10.png';
import profile11On from '../image/mbti/프로필/MBTI 선택 11.png';
import profile12On from '../image/mbti/프로필/MBTI 선택 12.png';
import profile13On from '../image/mbti/프로필/MBTI 선택 13.png';
import profile14On from '../image/mbti/프로필/MBTI 선택 14.png';
import profile15On from '../image/mbti/프로필/MBTI 선택 15.png';
import profile16On from '../image/mbti/프로필/MBTI 선택 16.png';
import profile17On from '../image/mbti/프로필/MBTI 선택 17.png';
import profile18On from '../image/mbti/프로필/MBTI 선택 18.png';

export default function makeProfile(){ 

    const dispatch = useDispatch();
    const router = useRouter();
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {

            dispatch(load_matching_info(([result, message]) => {
                if (result) {
                    alert(message);
                } else {
                    alert(message);
                }
            }));

        }

    }, [dispatch]);

    //for 초기값 받아오기
    useEffect(()=>{
        if(matchingUser){
            //성별
            const gender = matchingUser.gender;
            if(gender == '남성'){
                setManClick(true);
                setGender('남성');
            } else if(gender == '여성'){
                setWomanClick(true);
                setGender('여성');
            }

            //mbti
            const mbti = matchingUser.mbti;
            const newMbtiChoose = { ...mbtiChoose };
            for (let i = 0; mbti && i < mbti.length; i++) {
              newMbtiChoose[mbti[i]] = true;
            }
            setMbtiChoose(newMbtiChoose);

            //관심사
            const keyword = matchingUser.keywords;
            keyword.forEach(element => {
                if(food.hasOwnProperty(element)){
                    setFood(prevState => ({
                        ...prevState,
                        [element]: true
                      }))

                }
                if(sports.hasOwnProperty(element)){
                    setSports(prevState => ({
                        ...prevState,
                        [element]: true
                      }))
                }
                if(art.hasOwnProperty(element)){
                    setArt(prevState => ({
                        ...prevState,
                        [element]: true
                      }))
                }
                if(study.hasOwnProperty(element)){
                    setStudy(prevState => ({
                        ...prevState,
                        [element]: true
                      }))
                }
            });
            setKeyword(keyword);
            
            //프로필
            const image = matchingUser.image;
            setProfile({
                [image] : true
            });
            setImage(image);

            //한줄소개
            const introduction = matchingUser.introduction;
            setIntroduction(introduction);
        }
    }, [matchingUser]);

    const [womanClick, setWomanClick] = useState(false);
    const [manClick, setManClick] = useState(false);
    const [mbtiChoose, setMbtiChoose] = useState({
        'E': false,
        'I': false,
        'N': false,
        'S': false,
        'F': false,
        'T': false,
        'P': false,
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
        '연극뮤지컬': false,
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
        'CPA': false,
        '피트': false,
        '로스쿨': false,
        '행시': false,
    })
    const [profile, setProfile] = useState({
        'DEFAULT1': false,
        'DEFAULT2': false,
        'ENFJ': false,
        'ENTP': false,
        'INFP': false,
        'ENFP': false,
        'ISTJ': false,
        'ISTP': false,
        'ISFP': false,
        'INTP': false,
        'ESTJ': false,
        'INFJ': false,
        'ENTJ': false,
        'ESTP': false,
        'ESFJ': false,
        'INTJ': false,
        'ISFJ': false,
        'ESFP': false,
    })

    const [gender, setGender] = useState('');
    const [keyword, setKeyword] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [image, setImage] = useState('');
    const [mbti, setMbti] = useState('');
    const [condition, setCondition] = useState(false);

    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'back' ){
            
            router.back();
            
        } else if(event.target.name == '건너뛰기'){
            //웰컴페이지로 이동
        }
    };

    //성별클릭
    const handleGenderClick = (event) => {
        if(event.target.name == '여성'){
            if(womanClick){
                setWomanClick(false);
                setGender('');
            } else {
                setWomanClick(true);
                setManClick(false);
                setGender('여성');
            }
        } else if(event.target.name='남성'){
            if(manClick){
                setManClick(false);
                setGender('');
            } else {
                setManClick(true);
                setWomanClick(false);
                setGender('남성');
            }
        }
    }

    //mbti클릭
    const handleMbtiClick =(event) => {
        if(event.target.name == 'E'){
            if(mbtiChoose.E){
                setMbtiChoose({
                    ...mbtiChoose,
                    'E': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'E': true,
                    'I': false
                })
            }
        } else if(event.target.name == 'N'){
            if(mbtiChoose.N){
                setMbtiChoose({
                    ...mbtiChoose,
                    'N': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'N': true,
                    'S': false
                })
            }
        } else if(event.target.name == 'F'){
            if(mbtiChoose.F){
                setMbtiChoose({
                    ...mbtiChoose,
                    'F': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'F': true,
                    'T': false
                })
            }
        } else if(event.target.name == 'P'){
            if(mbtiChoose.P){
                setMbtiChoose({
                    ...mbtiChoose,
                    'P': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'P': true,
                    'J': false
                })
            }
        } else if(event.target.name == 'I'){
            if(mbtiChoose.I){
                setMbtiChoose({
                    ...mbtiChoose,
                    'I': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'I': true,
                    'E': false
                })
            }
        } else if(event.target.name == 'S'){
            if(mbtiChoose.S){
                setMbtiChoose({
                    ...mbtiChoose,
                    'S': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'S': true,
                    'N': false
                })
            }
        } else if(event.target.name == 'T'){
            if(mbtiChoose.T){
                setMbtiChoose({
                    ...mbtiChoose,
                    'T': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'T': true,
                    'F': false
                })
            }
        } else if(event.target.name == 'J'){
            if(mbtiChoose.J){
                setMbtiChoose({
                    ...mbtiChoose,
                    'J': false,
                })
            } else {
                setMbtiChoose({
                    ...mbtiChoose,
                    'J': true,
                    'P': false
                })
            }
        }
    }

    //음식클릭
    const handleFoodClick = (event) => {
        if(keyword.length == 8){
            setFood({
                ...food
            })
            if(food[event.target.name]){
                setFood({
                    ...food,
                    [event.target.name] : false
                })
            }
        }
         else if(food[event.target.name]){
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
        if(keyword.length == 8){
            setSports({
                ...sports
            })
            if(sports[event.target.name]){
                setSports({
                    ...sports,
                    [event.target.name] : false
                })
            }
        }
         else if(sports[event.target.name]){
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
        if(keyword.length == 8){
            setArt({
                ...art
            })
            if(art[event.target.name]){
                setArt({
                    ...art,
                    [event.target.name] : false
                })
            }
        }
         else if(art[event.target.name]){
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
        if(keyword.length == 8){
            setStudy({
                ...study
            })
            if(study[event.target.name]){
                setStudy({
                    ...study,
                    [event.target.name] : false
                })
            }
        }
         else if(study[event.target.name]){
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

    //프로필
    const handleProfileClick = (event) => {
        if(profile[event.target.name]){
            setProfile({
                ...profile,
                [event.target.name] : false
            })
            setImage('');
        } else{
            setProfile({
                ...profile,
                [event.target.name] : true,
                ...Object.keys(profile).reduce((acc, key) => {
                    if (key !== event.target.name) {
                      acc[key] = false;
                    }
                    return acc;
                  }, {}),
            })
            setImage(event.target.name);
        }
    }
    
    //확인
    const handleOnSubmit = (event) => {
        
        event.preventDefault();
        
        dispatch(change_matching_info(gender, keyword, introduction, mbti, image, ([result, message]) => {
                if (result) {
                    alert(message);
                    router.back();
                } else {
                    alert(message);
                }
            }));
            
    } 

    //데이터 전달하기 위하여
    useEffect(() => {

        const newMbti = Object.entries(mbtiChoose)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join('');
        if(newMbti.length==4){
            setMbti(newMbti);
        } else{
            setMbti('');
        }
        
        const newKeywords = [sports, food, art, study];

        const allKeywords = Array.from(new Set(
            newKeywords.reduce((acc, current) => {
              return acc.concat(Object.entries(current));
            }, [])
            .filter(([, value]) => value)
            .map(([key]) => key)
          ));
    
            if(allKeywords.length >= 3 ){
                
                setKeyword(allKeywords);
            } else {
                setKeyword('');
            }
      }, [mbtiChoose, food, study, art, sports]);

    //확인버튼 이미지 조건 반영 위해
    useEffect(()=>{
        if(gender && keyword && introduction != '' && mbti && image){
    
            setCondition(true);
        } else {
            setCondition(false);
        }
    }, [gender, keyword, introduction, mbti, image]);

    console.log(gender, keyword, introduction, mbti, image);
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container style={{padding:'0px', margin:'41px 0px 53px 0px', overflowX:'hidden'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick}/>
                            </Grid>
                            <Grid item style={{marginLeft:'29%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>프로필 수정하기</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <div name='성별' style={{textAlign:'center',display:'flex', justifyContent:'center'}}>
                        <div>
                        <Container style={{padding:'0px', margin:'41.7px 0px 0px 0px',}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>성별*</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Image src={manClick ? manCheck : man} width={270} height={35.74} onClick={handleGenderClick} name='남성'/>
                            </div>
                            <div>
                                <Image src={womanClick ? womanCheck : woman} width={270} height={35.74} onClick={handleGenderClick} name='여성'/>
                            </div>
                        </Container>
                        </div>
                    </div>
                    <div name='mbti' style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                        <div>
                        <Container  style={{padding:'0px', margin:'41.7px 0px 0px 56px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>MBTI*</Typography>
                            <div>
                                <Grid container maxWidth={340}>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.E ? ECheck : E} width={20} height={28} onClick={handleMbtiClick} name='E'/>
                                    </Grid>
                                    <Grid style={{marginRight:'60px'}}>
                                        <Image src={mbtiChoose.N ? NCheck : N} width={24} height={28} onClick={handleMbtiClick} name='N'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.F ? FCheck : F} width={19} height={28} onClick={handleMbtiClick} name='F'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.P ? PCheck : P} width={22} height={28} onClick={handleMbtiClick} name='P'/>
                                    </Grid>
                                </Grid>
                            </div>
                            <div style={{marginTop:'46px'}}>
                                <Grid container>
                                <Grid style={{marginRight:'63px', marginLeft:'4px', marginTop:'-1px'}}>
                                        <Image src={mbtiChoose.I ? ICheck : I} width={13} height={30} onClick={handleMbtiClick} name='I'/>
                                    </Grid>
                                    <Grid style={{marginRight:'58px', marginTop:'-1px'}}>
                                        <Image src={mbtiChoose.S ? SCheck : S} width={23} height={30} onClick={handleMbtiClick} name='S'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.T ? TCheck : T} width={21} height={28} onClick={handleMbtiClick} name='T'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.J ? JCheck : J} width={19} height={28} onClick={handleMbtiClick} name='J'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        </div>
                    </div>
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
                                        <Image src={art.연극뮤지컬 ? artTag14ON : artTag14} width={79} height={27} onClick={handleArtClick} name='연극뮤지컬'/>
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
                                        <Image src={study.CPA ? stuTag12On : stuTag12} width={36} height={27} onClick={handleStudyClick} name='CPA'/>
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
                    <div name='매칭 프로필 사진' style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                        <div>
                            <Container  style={{padding:'0px', margin:'41.7px 0px 0px 10px', justifyContent:'center'}}>
                                <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>매칭 프로필 사진*</Typography>
                                <Typography style={{fontSize:'12px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>1개의 이미지를 선택해주세요.</Typography>
                                <div style={{marginTop:'10px'}}>
                                    <Grid container style={{maxWidth:'340px'}}>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.DEFAULT1 ? profile1On : profile1} width={100} height={100} onClick={handleProfileClick} name='DEFAULT1'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.DEFAULT2 ? profile2On : profile2} width={100} height={100} onClick={handleProfileClick} name='DEFAULT2'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ENFJ ? profile3On : profile3} width={100} height={100} onClick={handleProfileClick} name='ENFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ENTP ? profile4On : profile4} width={100} height={100} onClick={handleProfileClick} name='ENTP'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.INFP ? profile5On : profile5} width={100} height={100} onClick={handleProfileClick} name='INFP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ENFP ? profile6On : profile6} width={100} height={100} onClick={handleProfileClick} name='ENFP'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ISTJ ? profile7On : profile7} width={100} height={100} onClick={handleProfileClick} name='ISTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ISTP ? profile8On : profile8} width={100} height={100} onClick={handleProfileClick} name='ISTP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ISFP ? profile9On : profile9} width={100} height={100} onClick={handleProfileClick} name='ISFP'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.INTP ? profile10On : profile10} width={100} height={100} onClick={handleProfileClick} name='INTP'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ESTJ ? profile11On : profile11} width={100} height={100} onClick={handleProfileClick} name='ESTJ'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.INFJ ? profile12On : profile12} width={100} height={100} onClick={handleProfileClick} name='INFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ENTJ ? profile13On : profile13} width={100} height={100} onClick={handleProfileClick} name='ENTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ESTP ? profile14On : profile14} width={100} height={100} onClick={handleProfileClick} name='ESTP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ESFJ ? profile15On : profile15} width={100} height={100} onClick={handleProfileClick} name='ESFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.INTJ ? profile16On : profile16} width={100} height={100} onClick={handleProfileClick} name='INTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ISFJ ? profile17On : profile17} width={100} height={100} onClick={handleProfileClick} name='ISFJ'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ESFP ? profile18On : profile18} width={100} height={100} onClick={handleProfileClick} name='ESFP'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div> 
                            </Container>
                        </div>
                    </div>
                    <div name='한줄소개' style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                        <div>
                        <Container style={{padding:'0px', margin:'41.7px 0px 0px 0px', justifyContent:'center'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>한 줄 자기소개*</Typography>
                            <div style={{margin:'10px 0px 0px 15px', zIndex:'2', textAlign:'center', position:'absolute'}}>
                                <textarea
                                value={introduction}
                                onChange={(e)=>{setIntroduction(e.target.value)}}
                                maxLength={30}
                                placeholder='e.g. 성대 NCT 팬이랑 같이 밥먹고 싶어요 :)'
                                style={{width:'310px', height:'70px', backgroundColor:'transparent', fontSize:'12px', border:'none', outline:'none', resize:'none', fontFamily:'inherit'}}
                                />
                            </div>
                            <div style={{position:'relative'}}>
                                <Image src={textForm} width={330} height={71}/>
                            </div>
                        </Container>
                        </div>
                    </div>
                    <Container name='확인' style={{padding:'0px', margin:'65px 0px 0px 0px', justifyContent:'center'}}>
                        <div style={{paddingBottom:'50px', textAlign:'center'}}>
                            <Image src={condition ? submitOk: submit} width={296} height={45} onClick={handleOnSubmit} name='확인'/>
                        </div>
                    </Container>
                </Container>
        </ThemeProvider>
    )
}