import { useState } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, Container, Grid, Autocomplete} from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import Image from 'next/image';
import theme from '../../theme/theme';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth/auth';
import { add_new_matching_info } from '../../actions/matchingUser/matchingUser';

const SignUpStep4 = (props) => {
    const dispatch = useDispatch();
    const [gender, setGender] = useState(null);
    const [mbtiChoose, setMbtiChoose] = useState({
        'E': null,
        'I': null,
        'N': null,
        'S': null,
        'F': null,
        'T': null,
        'P': null,
        'J': null
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
    const [introduction, setIntroduction] = useState('');
    const [keywordNum, setKeywordNum] = useState(0);
    const [remainWidth, setRemainWidth] = useState(window.innerWidth - 84 + "px")

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleGenderClick = (e) => {
        setGender(e.target.value)
    }
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

    return (
    <div>
    <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                {/* <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography> */}
                            </Grid>
                        </Grid>
    </Container>
    <Box
        sx={{
        margin: '35px 0px 15px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >

    <form style={{width: '100%'}}>
        <div style={{margin: '0 24px'}}>
        <Grid container>
            <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
            <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
            <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
            <Typography style={{fontSize: '26px', color: '#9E9E9E', marginRight: '7px'}}>&bull;</Typography>
        </Grid>
        <Typography style={{fontSize:'24px', textAlign:'left', margin:'0px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>매칭 프로필 작성</Typography>
        <Typography style={{fontSize:'12px', textAlign:'left', margin:'12px 0px 36px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>AI매칭 활성화를 위해 프로필을 작성해 주세요.</Typography>

        {/* 성별 */}
        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>성별</Typography>
        <Grid container style={{marginBottom: '16px'}}>
            <Button value="남성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '8px 0 0 8px', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '남성' ? '#FFFCE4' : '#fff'}}>남</Button>
            <Button value="여성" onClick={handleGenderClick} style={{width: '50%', border: '1px solid #E2E2E2', borderRadius: '0 8px 8px 0', height: '48px', color: '#3C3C3C', fontSize: '16px', backgroundColor: gender == '여성' ? '#FFFCE4' : '#fff'}}>여</Button>
        </Grid>

        {/* MBTI */}
        <Typography style={{fontSize: '12px', fontWeight: '900', marginBottom: '8px', marginLeft: '4px', color: '#3C3C3C'}}>MBTI</Typography>
        <Grid container style={{marginBottom: '16px'}}>
            <div style={{width: '22%'}}>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.E == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>E</Button>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.E == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>I</Button>
            </div>
            <div style={{width: '4%'}}></div>
            <div style={{width: '22%'}}>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.N == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>N</Button>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.N == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>S</Button>
            </div>
            <div style={{width: '4%'}}></div>
            <div style={{width: '22%'}}>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.F == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>F</Button>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.F == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>T</Button>
            </div>
            <div style={{width: '4%'}}></div>
            <div style={{width: '22%'}}>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.P == true ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '8px 8px 0 0', color: '#3C3C3C', width: '100%'}}>P</Button>
                <Button onClick={handleMbtiClick} style={{backgroundColor: mbtiChoose.P == false ? "#FFFCE4" : "#fff", border: '1px solid #E2E2E2', borderRadius: '0 0 8px 8px', color: '#3C3C3C', width: '100%'}}>J</Button>
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
        <Typography style={{fontSize: '16px', marginTop: '60px', marginBottom: '8px', color: '#3C3C3C'}} fontWeight={theme.typography.h1}>관심사</Typography>
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

    <div style={{width: '100%'}}>
            <div style={{margin: '60px 24px 12px'}}>
                {gender && introduction != '' ?
                        <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            다음
                        </Button>
                        :
                        <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                            다음
                        </Button>
                }
            </div>
            </div>
    </Box>
    </div>
    )

}

export default SignUpStep4;