import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change_matching_info, load_matching_info } from "../actions/matchingUser/matchingUser";
import { useRouter } from "next/router";
import {ThemeProvider, CssBaseline,Dialog,DialogContent, Typography, Button, Container, Grid, TextField, Alert} from '@mui/material';
import Image from 'next/image';
import theme from "../theme/theme";
import back from '../image/arrow_back_ios.png';
import womanCheck from '../image/gender/femaleY.png';
import woman from '../image/gender/female.png';
import man from '../image/gender/male.png';
import manCheck from '../image/gender/maleY.png'; 
import textForm from '../image/mbti/profile/intro.png';
import submitOk from '../image/checkY.png';
import submit from '../image/checkG.png';
import dynamic from 'next/dynamic';

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
import artTag1 from '../image/tags/tag_off/game.png';
import artTag2 from '../image/tags/tag_off/sing.png';
import artTag3 from '../image/tags/tag_off/fan.png';
import artTag4 from '../image/tags/tag_off/cartoon.png';
import artTag5 from '../image/tags/tag_off/taste.png';
import artTag6 from '../image/tags/tag_off/escape.png';
import artTag7 from '../image/tags/tag_off/pet.png';
import artTag8 from '../image/tags/tag_off/boardgame.png';
import artTag9 from '../image/tags/tag_off/cook.png';
import artTag10 from '../image/tags/tag_off/movie.png';
import artTag11 from '../image/tags/tag_off/music.png';
import artTag12 from '../image/tags/tag_off/exhibit.png';
import artTag13 from '../image/tags/tag_off/travel.png';
import artTag14 from '../image/tags/tag_off/theater.png';

import artTag1ON from '../image/tags/tag_on/gameY.png';
import artTag2ON from '../image/tags/tag_on/singY.png';
import artTag3ON from '../image/tags/tag_on/fanY.png';
import artTag4ON from '../image/tags/tag_on/cartoonY.png';
import artTag5ON from '../image/tags/tag_on/tasteY.png';
import artTag6ON from '../image/tags/tag_on/escapeY.png';
import artTag7ON from '../image/tags/tag_on/petY.png';
import artTag8ON from '../image/tags/tag_on/boardgameY.png';
import artTag9ON from '../image/tags/tag_on/cookY.png';
import artTag10ON from '../image/tags/tag_on/movieY.png';
import artTag11ON from '../image/tags/tag_on/musicY.png';
import artTag12ON from '../image/tags/tag_on/exhibitY.png';
import artTag13ON from '../image/tags/tag_on/travelY.png';
import artTag14ON from '../image/tags/tag_on/theaterY.png';

//음식
import foodTag1 from '../image/tags/tag_off/west.png';
import foodTag2 from '../image/tags/tag_off/japan.png';
import foodTag3 from '../image/tags/tag_off/china.png';
import foodTag4 from '../image/tags/tag_off/cafe.png';
import foodTag5 from '../image/tags/tag_off/snack.png';
import foodTag6 from '../image/tags/tag_off/southAmerican.png';
import foodTag7 from '../image/tags/tag_off/korea.png';
import foodTag8 from '../image/tags/tag_off/asia.png';

import foodTag1On from '../image/tags/tag_on/westY.png';
import foodTag2On from '../image/tags/tag_on/japanY.png';
import foodTag3On from '../image/tags/tag_on/chinaY.png';
import foodTag4On from '../image/tags/tag_on/cafeY.png';
import foodTag5On from '../image/tags/tag_on/snackY.png';
import foodTag6On from '../image/tags/tag_on/southAmericanY.png';
import foodTag7On from '../image/tags/tag_on/koreaY.png';
import foodTag8On from '../image/tags/tag_on/asiaY.png';

//운동
import exeTag1 from '../image/tags/tag_off/billiards.png';
import exeTag2 from '../image/tags/tag_off/climbing.png';
import exeTag3 from '../image/tags/tag_off/running.png';
import exeTag4 from '../image/tags/tag_off/badminton.png';
import exeTag5 from '../image/tags/tag_off/surfing.png';
import exeTag6 from '../image/tags/tag_off/ski.png';
import exeTag7 from '../image/tags/tag_off/sports.png';
import exeTag8 from '../image/tags/tag_off/baseball.png';
import exeTag9 from '../image/tags/tag_off/jiujitsu.png';
import exeTag10 from '../image/tags/tag_off/soccer.png';
import exeTag11 from '../image/tags/tag_off/tennis.png';
import exeTag12 from '../image/tags/tag_off/health.png';
import exeTag13 from '../image/tags/tag_off/dance.png';
import exeTag14 from '../image/tags/tag_off/golf.png';
import exeTag15 from '../image/tags/tag_off/basketball.png';
import exeTag16 from '../image/tags/tag_off/bowling.png';

import exeTag1On from '../image/tags/tag_on/billiardsY.png';
import exeTag2On from '../image/tags/tag_on/climbingY.png';
import exeTag3On from '../image/tags/tag_on/runningY.png';
import exeTag4On from '../image/tags/tag_on/badmintonY.png';
import exeTag5On from '../image/tags/tag_on/surfingY.png';
import exeTag6On from '../image/tags/tag_on/skiY.png';
import exeTag7On from '../image/tags/tag_on/sportsY.png';
import exeTag8On from '../image/tags/tag_on/baseballY.png';
import exeTag9On from '../image/tags/tag_on/jiujitsuY.png';
import exeTag10On from '../image/tags/tag_on/soccerY.png';
import exeTag11On from '../image/tags/tag_on/tennisY.png';
import exeTag12On from '../image/tags/tag_on/healthY.png';
import exeTag13On from '../image/tags/tag_on/danceY.png';
import exeTag14On from '../image/tags/tag_on/golfY.png';
import exeTag15On from '../image/tags/tag_on/basketballY.png';
import exeTag16On from '../image/tags/tag_on/bowlingY.png';

//interest
import stuTag1 from '../image/tags/interest_off/interest01.png';
import stuTag2 from '../image/tags/interest_off/interest02.png';
import stuTag3 from '../image/tags/interest_off/interest03.png';
import stuTag4 from '../image/tags/interest_off/interest04.png';
import stuTag5 from '../image/tags/interest_off/interest05.png';
import stuTag6 from '../image/tags/interest_off/interest06.png';
import stuTag7 from '../image/tags/interest_off/interest07.png';
import stuTag8 from '../image/tags/interest_off/interest08.png';
import stuTag9 from '../image/tags/interest_off/interest09.png';
import stuTag10 from '../image/tags/interest_off/interest10.png';
import stuTag11 from '../image/tags/interest_off/interest11.png';
import stuTag12 from '../image/tags/interest_off/interest12.png';
import stuTag13 from '../image/tags/interest_off/interest13.png';
import stuTag14 from '../image/tags/interest_off/interest14.png';
import stuTag15 from '../image/tags/interest_off/interest15.png';

import stuTag1On from '../image/tags/interest_on/interest01on.png';
import stuTag2On from '../image/tags/interest_on/interest02on.png';
import stuTag3On from '../image/tags/interest_on/interest03on.png';
import stuTag4On from '../image/tags/interest_on/interest04on.png';
import stuTag5On from '../image/tags/interest_on/interest05on.png';
import stuTag6On from '../image/tags/interest_on/interest06on.png';
import stuTag7On from '../image/tags/interest_on/interest07on.png';
import stuTag8On from '../image/tags/interest_on/interest08on.png';
import stuTag9On from '../image/tags/interest_on/interest09on.png';
import stuTag10On from '../image/tags/interest_on/interest10on.png';
import stuTag11On from '../image/tags/interest_on/interest11on.png';
import stuTag12On from '../image/tags/interest_on/interest12on.png';
import stuTag13On from '../image/tags/interest_on/interest13on.png';
import stuTag14On from '../image/tags/interest_on/interest14on.png';
import stuTag15On from '../image/tags/interest_on/interest15on.png';
import { match } from "assert";

const AlertMessage = dynamic(() => import('../components/Alert'));

const makeProfile = () => { 

    const dispatch = useDispatch();
    const router = useRouter();
    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const user = useSelector(state => state.auth.user);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    useEffect(() => {
        dispatch(load_matching_info(([result, message]) => {
            if (result) {
            } else {
            }
        }));
    }, [dispatch]);

    //초기값 받아오기
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

            for (const key in keyword) {
                if (keyword.hasOwnProperty(key)) {
                  const elements = keyword[key];
                  elements.forEach((element) => {
                    if (key === '음식') {
                      setFood(prevState => ({
                        ...prevState,
                        [element]: true,
                    // 다른 카테고리에 대한 처리도 추가 가능
                     }))
                    }
                    if (key === '운동'){
                        setSports(prevState => ({
                            ...prevState,
                            [element]:true,
                        }))
                    }
                    if (key === '예술'){
                        setArt(prevState => ({
                            ...prevState,
                            [element]:true,
                        }))
                    }
                    if (key === '학술'){
                        setStudy(prevState => ({
                            ...prevState,
                            [element]:true,
                        }))
                    }

            })}}
            setKeyword(keyword);
            
    
            // keyword.forEach(element => {
            //     if(food.hasOwnProperty(element)){
            //         setFood(prevState => ({
            //             ...prevState,
            //             [element]: true
            //           }))

            //     }
            //     if(sports.hasOwnProperty(element)){
            //         setSports(prevState => ({
            //             ...prevState,
            //             [element]: true
            //           }))
            //     }
            //     if(art.hasOwnProperty(element)){
            //         setArt(prevState => ({
            //             ...prevState,
            //             [element]: true
            //           }))
            //     }
            //     if(study.hasOwnProperty(element)){
            //         setStudy(prevState => ({
            //             ...prevState,
            //             [element]: true
            //           }))
            //     }
            // });
            // setKeyword(keyword);


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

    const [gender, setGender] = useState('');
    const [keyword, setKeyword] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [image, setImage] = useState('');
    const [mbti, setMbti] = useState('');
    const [condition, setCondition] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [keywordNum, setKeywordNum] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);


    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'back' ){
            
            router.back();
            
        } else if(event.target.name == '건너뛰기'){
            //웰컴페이지로 이동
        }
    };

    //성별클릭
    // const handleGenderClick = (event) => {
    //     if(event.target.name == '여성'){
    //         if(womanClick){
    //             setWomanClick(false);
    //             setGender('');
    //         } else {
    //             setWomanClick(true);
    //             setManClick(false);
    //             setGender('여성');
    //         }
    //     } else if(event.target.name='남성'){
    //         if(manClick){
    //             setManClick(false);
    //             setGender('');
    //         } else {
    //             setManClick(true);
    //             setWomanClick(false);
    //             setGender('남성');
    //         }
    //     }
    // }


    const handleGenderClick = (e) => {
        setGender(e.target.value)
    }

    //mbti클릭
    // const handleMbtiClick =(event) => {
    //     if(event.target.name == 'E'){
    //         if(mbtiChoose.E){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'E': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'E': true,
    //                 'I': false
    //             })
    //         }
    //     } else if(event.target.name == 'N'){
    //         if(mbtiChoose.N){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'N': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'N': true,
    //                 'S': false
    //             })
    //         }
    //     } else if(event.target.name == 'F'){
    //         if(mbtiChoose.F){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'F': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'F': true,
    //                 'T': false
    //             })
    //         }
    //     } else if(event.target.name == 'P'){
    //         if(mbtiChoose.P){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'P': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'P': true,
    //                 'J': false
    //             })
    //         }
    //     } else if(event.target.name == 'I'){
    //         if(mbtiChoose.I){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'I': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'I': true,
    //                 'E': false
    //             })
    //         }
    //     } else if(event.target.name == 'S'){
    //         if(mbtiChoose.S){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'S': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'S': true,
    //                 'N': false
    //             })
    //         }
    //     } else if(event.target.name == 'T'){
    //         if(mbtiChoose.T){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'T': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'T': true,
    //                 'F': false
    //             })
    //         }
    //     } else if(event.target.name == 'J'){
    //         if(mbtiChoose.J){
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'J': false,
    //             })
    //         } else {
    //             setMbtiChoose({
    //                 ...mbtiChoose,
    //                 'J': true,
    //                 'P': false
    //             })
    //         }
    //     }
    // }

    const handleMbtiClick = (e) => {
        let chosen = e.target.innerText

        switch(chosen) {
            case 'E':
                setMbtiChoose({...mbtiChoose, 'E': true, 'I': false})
                break
            case 'I':
                setMbtiChoose({...mbtiChoose, 'E': false, 'I': true})
                break
            case 'N':
                setMbtiChoose({...mbtiChoose, 'N': true, 'S': false})
                break
            case 'S':
                setMbtiChoose({...mbtiChoose, 'N': false, 'S': true})
                break
            case 'F':
                setMbtiChoose({...mbtiChoose, 'F': true, 'T': false})
                break
            case 'T':
                setMbtiChoose({...mbtiChoose, 'F': false, 'T': true})
                break
            case 'P':
                setMbtiChoose({...mbtiChoose, 'P': true, 'J': false})
                break
            case 'J':
                setMbtiChoose({...mbtiChoose, 'P': false, 'J': true})
                break
            default:
                break
        }

    }

    //음식클릭
    // const handleFoodClick = (event) => {
    //     if(keyword.length == 8){
    //         setFood({
    //             ...food
    //         })
    //         if(food[event.target.name]){
    //             setFood({
    //                 ...food,
    //                 [event.target.name] : false
    //             })
    //         }
    //     }
    //      else if(food[event.target.name]){
    //         setFood({
    //             ...food,
    //             [event.target.name] : false
    //         })
    //     } else{
    //         setFood({
    //             ...food,
    //             [event.target.name] : true
    //         })
    //     }
    // }
    const handleFoodClick = (e) => {
        if(keywordNum == 8){
            setFood({
                ...food
            })
            if(food[e.target.innerText]){
                setFood({
                    ...food,
                    [e.target.innerText] : false
                })
                setKeywordNum(keywordNum-1)
            }
        } else if(food[e.target.innerText]){
            setFood({
                ...food,
                [e.target.innerText] : false
            })
            setKeywordNum(keywordNum-1)
        } else{
            setFood({
                ...food,
                [e.target.innerText] : true
            })
            setKeywordNum(keywordNum+1)
        }
    }

    //운동클릭
    // const handleSportsClick = (event) => {
    //     if(keyword.length == 8){
    //         setSports({
    //             ...sports
    //         })
    //         if(sports[event.target.name]){
    //             setSports({
    //                 ...sports,
    //                 [event.target.name] : false
    //             })
    //         }
    //     }
    //      else if(sports[event.target.name]){
    //         setSports({
    //             ...sports,
    //             [event.target.name] : false
    //         })
    //     } else{
    //         setSports({
    //             ...sports,
    //             [event.target.name] : true
    //         })
    //     }
    // }
    
    // //문화예술
    // const handleArtClick = (event) => {
    //     if(keyword.length == 8){
    //         setArt({
    //             ...art
    //         })
    //         if(art[event.target.name]){
    //             setArt({
    //                 ...art,
    //                 [event.target.name] : false
    //             })
    //         }
    //     }
    //      else if(art[event.target.name]){
    //         setArt({
    //             ...art,
    //             [event.target.name] : false
    //         })
    //     } else{
    //         setArt({
    //             ...art,
    //             [event.target.name] : true
    //         })
    //     }
    // }

    // //interest
    // const handleStudyClick = (event) => {
    //     if(keyword.length == 8){
    //         setStudy({
    //             ...study
    //         })
    //         if(study[event.target.name]){
    //             setStudy({
    //                 ...study,
    //                 [event.target.name] : false
    //             })
    //         }
    //     }
    //      else if(study[event.target.name]){
    //         setStudy({
    //             ...study,
    //             [event.target.name] : false
    //         })
    //     } else{
    //         setStudy({
    //             ...study,
    //             [event.target.name] : true
    //         })
    //     }
    // }
    const handleSportsClick = (e) => {
        if(keywordNum == 8){
            setSports({
                ...sports
            })
            if(sports[e.target.innerText]){
                setSports({
                    ...sports,
                    [e.target.innerText] : false
                })
                setKeywordNum(keywordNum-1)
            }
        } else if(sports[e.target.innerText]){
            setSports({
                ...sports,
                [e.target.innerText] : false
            })
            setKeywordNum(keywordNum-1)
        } else{
            setSports({
                ...sports,
                [e.target.innerText] : true
            })
            setKeywordNum(keywordNum+1)
        }
    }
    const handleArtClick = (e) => {
        if(keywordNum == 8){
            setArt({
                ...art
            })
            if(art[e.target.innerText]){
                setArt({
                    ...art,
                    [e.target.innerText] : false
                })
                setKeywordNum(keywordNum-1)
            }
        } else if(art[e.target.innerText]){
            setArt({
                ...art,
                [e.target.innerText] : false
            })
            setKeywordNum(keywordNum-1)
        } else{
            setArt({
                ...art,
                [e.target.innerText] : true
            })
            setKeywordNum(keywordNum+1)
        }
    }
    const handleStudyClick = (e) => {
        if(keywordNum == 8){
            setStudy({
                ...study
            })
            if(art[e.target.innerText]){
                setStudy({
                    ...study,
                    [e.target.innerText] : false
                })
                setKeywordNum(keywordNum-1)
            }
        } else if(study[e.target.innerText]){
            setStudy({
                ...study,
                [e.target.innerText] : false
            })
            setKeywordNum(keywordNum-1)
        } else{
            setStudy({
                ...study,
                [e.target.innerText] : true
            })
            setKeywordNum(keywordNum+1)
        }
    }

    const handleNextStep = () => {
        let data = props.data;
        let keywords = ["축구", "야구", "농구"]
        let mbti="ENFP"
        dispatch(register(data, ([result, message]) => {
            if (result) {
                props.handleNextStep();
            }}))
                /*dispatch(add_new_matching_info(data.username, gender, keywords, introduction, mbti, ([result, message]) => {
                    if (result) {
                        props.handleNextStep();
                    } else {
                        console.log(result, message)
                    }
                }))
            } else {
                console.log(result, message)
            }
        }));*/
    }

    // //프로필
    // const handleProfileClick = (event) => {
    //     if(profile[event.target.name]){
    //         setProfile({
    //             ...profile,
    //             [event.target.name] : false
    //         })
    //         setImage('');
    //     } else{
    //         setProfile({
    //             ...profile,
    //             [event.target.name] : true,
    //             ...Object.keys(profile).reduce((acc, key) => {
    //                 if (key !== event.target.name) {
    //                   acc[key] = false;
    //                 }
    //                 return acc;
    //               }, {}),
    //         })
    //         setImage(event.target.name);
    //     }
    // }
    
    //확인
    const handleOnSubmit = (event) => {
        
        event.preventDefault();
        
        dispatch(change_matching_info(gender, keyword, introduction, mbti, ([result, message]) => {
                if (result) {
                    setDialogOpen(true);
                    setTimeout(() => {
                        router.push('/myPage');
                    }, 1000); 
                } else {
                    setAlertOpen(true);
                    setAlertMessage(message);
                }
            }));
        setAlertOpen(false);
        setAlertMessage('');
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
                setKeyword([]);
            }
      }, [mbtiChoose, food, study, art, sports]);

    //확인버튼 이미지 조건 반영 위해
    useEffect(()=>{
        if(gender && keyword.length > 0 && introduction != '' && mbtiChoose){
            setCondition(true);
        } else {
            setCondition(false);
        }
    }, [gender, keyword, introduction, mbtiChoose]);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <div style={{height:'100%',maxWidth:'420px', marginTop:'820px', zIndex:'6', position:'absolute', left:'50%'}}>
                <AlertMessage alertOpen={alertOpen} alertMessage={alertMessage}/>
                </div>
                <Container style={{padding:'0px', margin:'41px 0px 53px 0px', overflowX:'hidden'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'29%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight:'700'}} >프로필 수정하기</Typography>
                            </Grid>
                            <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                                {condition ?
                                    <Button onClick={handleOnSubmit} style={{padding:'0', right:'0'}}>
                                        <Typography style={{margin:'0px 0px 0px 10px',color:'#FFCE00', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                                    </Button>
                                    :
                                    <Button style={{padding:'0', right:'0'}}>
                                        <Typography style={{margin:'0px 0px 0px 10px',color:'#BABABA', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                    {/* <div name='성별' style={{textAlign:'center',display:'flex', justifyContent:'center', width:'100%'}}>
                        <div>
                        <Container style={{padding:'0px', marginTop:'40px'}}>
                            
                            <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>성별</Typography>
                            <Grid container style={{marginBottom: '16px'}}>
                                <Button value="남성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FFFCE4' : '#fff'}}>남</Button>
                                <Button value="여성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FFFCE4' : '#fff'}}>여</Button>
                            </Grid>
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
                                        <Image src={mbtiChoose.E ? ECheck : E} width={20} height={28} onClick={handleMbtiClick} layout='fixed' name='E'/>
                                    </Grid>
                                    <Grid style={{marginRight:'60px'}}>
                                        <Image src={mbtiChoose.N ? NCheck : N} width={24} height={28} onClick={handleMbtiClick} layout='fixed' name='N'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.F ? FCheck : F} width={19} height={28} onClick={handleMbtiClick} layout='fixed' name='F'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.P ? PCheck : P} width={22} height={28} onClick={handleMbtiClick} layout='fixed' name='P'/>
                                    </Grid>
                                </Grid>
                            </div>
                            <div style={{marginTop:'46px'}}>
                                <Grid container>
                                <Grid style={{marginRight:'63px', marginLeft:'4px', marginTop:'-1px'}}>
                                        <Image src={mbtiChoose.I ? ICheck : I} width={13} height={30} onClick={handleMbtiClick} layout='fixed' name='I'/>
                                    </Grid>
                                    <Grid style={{marginRight:'58px', marginTop:'-1px'}}>
                                        <Image src={mbtiChoose.S ? SCheck : S} width={23} height={30} onClick={handleMbtiClick} layout='fixed' name='S'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.T ? TCheck : T} width={21} height={28} onClick={handleMbtiClick} layout='fixed' name='T'/>
                                    </Grid>
                                    <Grid style={{marginRight:'59px'}}>
                                        <Image src={mbtiChoose.J ? JCheck : J} width={19} height={28} onClick={handleMbtiClick} layout='fixed' name='J'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        </div>
                    </div>
                    <Container name='관심사' style={{padding:'0px', margin:'41.7px 0px 0px 25px', justifyContent:'center'}}>
                        <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>관심사*</Typography>
                        <Typography style={{fontSize:'12px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>3개 이상 8개 이하의 태그를 선택해주세요.</Typography>
                        <Container name='음식' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>🍎 음식</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'350px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.한식 ? foodTag7On : foodTag7} width={36} height={27} onClick={handleFoodClick} layout='fixed' name='한식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.일식 ? foodTag2On : foodTag2} width={36} height={27} onClick={handleFoodClick} layout='fixed' name='일식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.중식 ? foodTag3On : foodTag3} width={36} height={27} onClick={handleFoodClick} layout='fixed' name='중식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.양식 ? foodTag1On : foodTag1} width={36} height={27} onClick={handleFoodClick} layout='fixed' name='양식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.남미음식 ? foodTag6On : foodTag6} width={58} height={27} onClick={handleFoodClick} layout='fixed' name='남미음식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.분식 ? foodTag5On : foodTag5} width={36} height={27} onClick={handleFoodClick} layout='fixed' name='분식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.아시아음식 ? foodTag8On : foodTag8} width={72} height={27} onClick={handleFoodClick} layout='fixed' name='아시아음식'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={food.카페 ? foodTag4On : foodTag4} width={36} height={27} onClick={handleFoodClick} layout='fixed' name='카페'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container name='운동' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'35px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>🏀 운동</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'330px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.축구 ? exeTag10On : exeTag10} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='축구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.야구 ? exeTag8On : exeTag8} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='야구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.농구 ? exeTag15On : exeTag15} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='농구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.골프 ? exeTag14On : exeTag14} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='골프'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.테니스 ? exeTag11On : exeTag11} width={47} height={27} onClick={handleSportsClick} layout='fixed' name='테니스'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.당구 ? exeTag1On : exeTag1} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='당구'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.헬스 ? exeTag12On : exeTag12} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='헬스'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.보드스키 ? exeTag6On : exeTag6} width={72} height={27} onClick={handleSportsClick} layout='fixed' name='보드스키'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.주짓수 ? exeTag9On : exeTag9} width={47} height={27} onClick={handleSportsClick} layout='fixed' name='주짓수'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.서핑 ? exeTag5On : exeTag5} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='서핑'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.등산 ? exeTag2On : exeTag2} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='등산'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.러닝 ? exeTag3On : exeTag3} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='러닝'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.스포츠관람 ? exeTag7On : exeTag7} width={72} height={27} onClick={handleSportsClick} layout='fixed' name='스포츠관람'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.볼링 ? exeTag16On : exeTag16} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='볼링'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.배드민턴 ? exeTag4On : exeTag4} width={58} height={27} onClick={handleSportsClick} layout='fixed' name='배드민턴'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={sports.댄스 ? exeTag13On : exeTag13} width={36} height={27} onClick={handleSportsClick} layout='fixed' name='댄스'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container name='문화예술' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'35px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>🎵 문화예술</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'330px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.영화 ? artTag10ON : artTag10} width={36} height={27} onClick={handleArtClick} layout='fixed' name='영화'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.음악 ? artTag11ON : artTag11} width={36} height={27} onClick={handleArtClick} layout='fixed' name='음악'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.전시회 ? artTag12ON : artTag12} width={47} height={27} onClick={handleArtClick} layout='fixed' name='전시회'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.연극뮤지컬 ? artTag14ON : artTag14} width={79} height={27} onClick={handleArtClick} layout='fixed' name='연극뮤지컬'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.덕질 ? artTag3ON : artTag3} width={36} height={27} onClick={handleArtClick} layout='fixed' name='덕질'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.여행 ? artTag13ON : artTag13} width={36} height={27} onClick={handleArtClick} layout='fixed' name='여행'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.게임 ? artTag1ON : artTag1} width={36} height={27} onClick={handleArtClick} layout='fixed' name='게임'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.노래방 ? artTag2ON : artTag2} width={47} height={27} onClick={handleArtClick} layout='fixed' name='노래방'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.방탈출 ? artTag6ON : artTag6} width={47} height={27} onClick={handleArtClick} layout='fixed' name='방탈출'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.보드게임 ? artTag8ON : artTag8} width={58} height={27} onClick={handleArtClick} layout='fixed' name='보드게임'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.반려동물 ? artTag7ON : artTag7} width={58} height={27} onClick={handleArtClick} layout='fixed' name='반려동물'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.요리 ? artTag9ON : artTag9} width={36} height={27} onClick={handleArtClick} layout='fixed' name='요리'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.맛집탐방 ? artTag5ON : artTag5} width={61} height={27} onClick={handleArtClick} layout='fixed' name='맛집탐방'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={art.만화 ? artTag4ON : artTag4} width={36} height={27} onClick={handleArtClick} layout='fixed' name='만화'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                        <Container name='interest' style={{padding:'0px'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'35px 0px 8px 0px'}} color='black' fontWeight={theme.typography.h1}>📚 학술</Typography>
                            <div style={{marginBottom:'9px'}}>
                                <Grid container style={{maxWidth:'330px'}}>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.학회 ? stuTag1On : stuTag1} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='학회'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.동아리 ? stuTag2On : stuTag2} width={47} height={27} onClick={handleStudyClick} layout='fixed' name='동아리'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.교환학생 ? stuTag3On : stuTag3} width={61} height={27} onClick={handleStudyClick} layout='fixed' name='교환학생'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.봉사 ? stuTag4On : stuTag4} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='봉사'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.재테크 ? stuTag5On : stuTag5} width={47} height={27} onClick={handleStudyClick} layout='fixed' name='재테크'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.빅데이터 ? stuTag6On : stuTag6} width={58} height={27} onClick={handleStudyClick} layout='fixed' name='빅데이터'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.금융 ? stuTag7On : stuTag7} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='금융'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.문학 ? stuTag8On : stuTag8} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='문학'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.토론 ? stuTag9On : stuTag9} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='토론'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.시사 ? stuTag10On : stuTag10} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='시사'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.어학 ? stuTag11On : stuTag11} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='어학'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.CPA ? stuTag12On : stuTag12} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='CPA'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.피트 ? stuTag13On : stuTag13} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='피트'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.로스쿨 ? stuTag14On : stuTag14} width={47} height={27} onClick={handleStudyClick} layout='fixed' name='로스쿨'/>
                                    </Grid>
                                    <Grid style={{marginRight:'8px'}}>
                                        <Image src={study.행시 ? stuTag15On : stuTag15} width={36} height={27} onClick={handleStudyClick} layout='fixed' name='행시'/>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </Container>
                    
                    <div name='한줄소개' style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                        <div>
                        <Container style={{padding:'0px', margin:'41.7px 0px 0px 0px', justifyContent:'center'}}>
                            <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>한 줄 자기소개(30자 이내)*</Typography>
                            <div style={{margin:'15px 0px 0px 15px', zIndex:'2', textAlign:'center', position:'absolute'}}>
                                <textarea
                                value={introduction}
                                onChange={(e)=>{setIntroduction(e.target.value)}}
                                maxLength={30}
                                placeholder='e.g. 성대 NCT 팬이랑 같이 밥먹고 싶어요 :)'
                                style={{width:'300px', height:'70px', backgroundColor:'transparent', fontSize:'12px', border:'none', outline:'none', resize:'none', fontFamily:'inherit'}}
                                />
                            </div>
                            <div style={{position:'relative'}}>
                                <Image src={textForm} width={330} height={71} placeholder="blur" layout='fixed' />
                            </div>
                        </Container>
                        </div>
                    </div> */}
                    <form style={{width: '100%'}}>
                        <div style={{margin: '40px 24px'}}>
                
                        {/* 성별 */}
                        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>성별</Typography>
                        <Grid container style={{marginBottom: '16px'}}>
                            <Button value="남성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FFFCE4' : '#fff'}}>남</Button>
                            <Button value="여성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderLeftColor:'transparent', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FFFCE4' : '#fff'}}>여</Button>
                        </Grid>

                        {/* MBTI */}
                        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>MBTI</Typography>
                        <Grid container style={{marginBottom: '16px'}}>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.E == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>E</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.E == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderTopColor:'transparent',  borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>I</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.N == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>N</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.N == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>S</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.F == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>F</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.F == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2',borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>T</Button>
                            </div>
                            <div style={{width: '4%'}}></div>
                            <div style={{width: '22%'}}>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.P == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>P</Button>
                                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.P == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2',borderTopColor:'transparent', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>J</Button>
                            </div>
                        </Grid>

                        {/* 한 줄 자기소개 */}
                        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>한 줄 자기소개</Typography>
                        <div style={{width: '100%', border: '1px solid #E2E2E2', borderRadius: '8px'}}>
                        <textarea 
                        value={introduction}
                        onChange={(e)=> {setIntroduction(e.target.value)}}
                        maxLength={29}
                        placeholder='스꾸친에 오신 걸 환영합니다'
                        style={{width: '100%', outline: 'none', resize: 'none', fontSize: '16px', border: 'none', height: '60px', padding: '12px 18px', fontFamily: 'inherit'}}>
                        </textarea>
                        <div style={{width: '100%', height: '25px', display: 'flex', justifyContent: 'space-between'}}>
                            <div></div>
                            <Typography style={{padding: '0 18px 12px 0', color: '#FC9712', fontSize: '12px'}}>{introduction.length}/30자</Typography>
                        </div>
                        </div>

                        {/* 관심사 */}
                        <Typography style={{fontSize: '16px', marginTop: '60px', marginBottom: '8px', color: '#3C3C3C', fontWeight:'800'}} fontWeight={theme.typography.h1}>관심사</Typography>
                        <Typography style={{fontSize:'12px', textAlign:'left', margin:'8px 0px 20px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>3개 이상의 태그를 선택해주세요.</Typography>

                        {/* 음식 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#3C3C3C'}}>음식</Typography>
                        {Object.keys(food).map((a) => <Button onClick={handleFoodClick} style={{height: '32px', border: food[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: food[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 운동 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>운동</Typography>
                        {Object.keys(sports).map((a) => <Button onClick={handleSportsClick} style={{height: '32px', border: sports[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: sports[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 문화 예술 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>문화 예술</Typography>
                        {Object.keys(art).map((a) => <Button onClick={handleArtClick} style={{height: '32px', border: art[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: art[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}

                        {/* 학술 */}
                        <Typography style={{fontSize: '16px', fontWeight: '700', marginTop: '24px', marginBottom: '8px', color: '#3C3C3C'}}>학술</Typography>
                        {Object.keys(study).map((a) => <Button onClick={handleStudyClick} style={{height: '32px', border: study[a] ? '1px solid #FFCE00' : '1px solid #E2E2E2', borderRadius: '30px', backgroundColor: study[a] ? '#FFFCE4' : '#fff', margin: '0 8px 8px 0', color: '#3C3C3C', padding: '6px 10px'}}>{a}</Button>)}
                        </div>
                    </form>
                    {/* <Container name='확인' style={{padding:'0px', margin:'65px 0px 0px 0px', justifyContent:'center'}}>
                        <div style={{paddingBottom:'50px', textAlign:'center'}}>
                            <Image src={condition ? submitOk: submit} width={296} height={45} onClick={handleOnSubmit} name='확인' placeholder="blur" layout='fixed' />
                        </div>
                    </Container> */}
                <Dialog open={dialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>저장이 완료되었습니다.</Typography></DialogContent></Dialog>

                </Container>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(makeProfile), {
    ssr: false,
});