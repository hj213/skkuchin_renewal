import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, MenuItem, Button, TextField, Typography, Link, FormControl, InputLabel, Select, Container, Grid, Autocomplete } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/arrow_back_ios.png';
import check from '../image/check_circle.png';
import { displayProfile } from '../components/MyPage/ProfileList';
import { change_user, check_nickname, load_user } from '../actions/auth/auth';
import EditProfileImage from '../components/MyPage/EditProfileImage';

export default function editProfile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const [validNickname, setValidNickname] = useState(false);
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [showCheck, setShowCheck] = useState(false);

    const [image, setImage] = useState("");
    const [nickname, setNickname] = useState("");
    const [major, setMajor] = useState("");
    const [studentId, setStudentId] = useState("");

    const [editImage, setEditImage] = useState(false);

    const majorList = [
        '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공',
        '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
        '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
        '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
        '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
        '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
        '사회복지학과', '사회학과', '심리학과',
        '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
        '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
        '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
        '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과'
    ];
    const studentIdList = [
        '23학번', '22학번', '21학번', '20학번', '19학번', '18학번', '17학번', '16학번', '15학번', '14학번', '13학번', '12학번', '11학번', '10학번'
    ]

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNicknameChange = (e) => {
        if (validNickname != null) {
            setValidNickname(null);
        }
        setNickname(e.target.value);
    }

    const checkNickname = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(check_nickname(nickname, ([result, message]) => {
                setValidNickname(result);
                setNicknameMsg(message);
            }))
        }
    }

    const handleNextStep = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(change_user(nickname, major, image, studentId.slice(0, 2), ([result, message]) => {
                if (result) {
                    router.push('/myPage');
                }
            }))
        }
    }

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_user());
        }
    }, [dispatch])

    useEffect(() => {
        if (user) {
            setImage(user.image);
            setNickname(user.nickname);
            setMajor(user.major);
            setStudentId(user.student_id + "학번");
        }
    }, [user])

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />

        {!editImage && <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleArrowClick}  placeholder="blur" layout='fixed'/>
                            </Grid>
                            <Grid item style={{marginLeft:'30%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>프로필 수정</Typography>
                            </Grid>
                        </Grid>
        </Container>}
        {user && !editImage && 
        <Box
            sx={{
            margin: '45px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        {/* 상단 */}
        {/*<header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '55px'}}>
            <Image width={11} height={18} src={back} onClick={handleArrowClick} placeholder="blur" layout='fixed' />
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>프로필 수정</Typography>
        </header> */}

        {/* 프로필 이미지 */}
        {displayProfile(image, 107, 107)}
        <Link component="button" onClick={() => setEditImage(true)} color="#505050" sx={{fontSize: '13px', mt: '17px', mb: '45px'}}>프로필 이미지 변경하기</Link>
        
        <form style={{ width: '100%'}}>
        <div style={{margin: '0 36px 19px'}}>
            <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>닉네임*</Typography>
        <TextField
            variant="standard"
            //label="닉네임"
            value={nickname}
            onChange={handleNicknameChange}
            style={{width: '100%'}}
            required
            InputProps={{
                endAdornment: (validNickname) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} placeholder="blur" layout='fixed' /> : null 
            }}
            />
            {/* 중복확인 메소드 추가 */}
            {nickname !== user.nickname ? 
            <div style={{display:'flex'}}>
                <Button variant="contained" onClick={checkNickname} style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '15px', width: '47px', height: '20px', fontSize: '9px', padding: '3px 4px', margin: '4px 0px', boxShadow: 'none'}}>중복확인</Button>
                {validNickname && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', margin: '7px 0 0 5px'}}>{nicknameMsg}</Typography>}
                {validNickname == false && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', margin: '7px 0 0 5px'}}>{nicknameMsg}</Typography>}
            </div> :
            <div style={{height: '20px'}}></div>}
        </div>
        <div style={{margin: '0 36px 39px'}}>
            <FormControl variant="standard" style={{width: '100%'}}>
            <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>학부/학과*</Typography>
            <Autocomplete
              clearOnEscape
              value={major}
              onChange={(e, value) => setMajor(value)}
              options={majorList.sort()}
              renderInput={(params) => <TextField {...params} variant="standard" style={{fontSize: '12px'}} />} 
            />
            </FormControl>
        </div>
        <div style={{margin: '0 36px 44px'}}>
            <FormControl variant="standard" style={{width: '100%'}}>
                <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>학번*</Typography>
                <Autocomplete
                clearOnEscape
                value={studentId}
                onChange={(e, value) => setStudentId(value)}
                options={studentIdList}
                renderInput={(params) => <TextField {...params} variant="standard" style={{fontSize: '12px'}} />} 
                />
            </FormControl>
        </div>
        <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', margin: '0 36px 50px 36px'}}>
            {(nickname === user.nickname || validNickname) && (nickname != '' && majorList.indexOf(major) != -1 && studentIdList.indexOf(studentId) != -1) ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        확인
                    </Button>
                    :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        확인
                    </Button>
            }
        </div>
        </form>
        </Box>}

        {editImage && <EditProfileImage image={image} setImage={setImage} setEditImage={setEditImage} />}
        </ThemeProvider>
    )
}
