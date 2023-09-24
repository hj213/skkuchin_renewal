import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Card,styled, Button, TextField, Typography, Link, FormControl, InputLabel, Select, Container, Grid, Autocomplete } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/close.png';
import check from '../image/check_circle.png';
import { change_user, check_nickname } from '../actions/auth/auth';
import dynamic from 'next/dynamic';
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";


// const EditProfileImage = dynamic(() => import('../components/MyPage/EditProfileImage'));

const editNickname = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const [validNickname, setValidNickname] = useState(false);
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [isCorrect, setIsCorrect] = useState("none");
    const [isNickFocused, setIsNickFocused] = useState(false);
    const [isNumFocused, setIsNumFocused] = useState(false);
    const [isMajorFocused, setIsMajorFocused] = useState(false);

    const [dialogOpen,setDialogOpen] = useState(false);

 
    const [image, setImage] = useState("");
    const [nickname, setNickname] = useState("");
    const [major, setMajor] = useState("");
    const [studentId, setStudentId] = useState("");

    const majorList = [
        '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공', '소비자학과',
        '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
        '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
        '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
        '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
        '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
        '사회복지학과', '사회학과', '심리학과',
        '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
        '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
        '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
        '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과', '컴퓨터공학과',
        '인문과학계열', '사회과학계열', '자연과학계열', '공학계열'
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
        
        // Promise.resolve().then(() => {
        //     checkNickname(e.target.value);
        //   });
    }

    const checkNickname = (e) => {
        check_nickname(e)
        .then((message) => {
          setValidNickname(true);
          setNicknameMsg(message);
        //   setIsCorrect("correct");
        })
        .catch((error) => {
          setValidNickname(false);
          setNicknameMsg(error);
          setIsCorrect("wrong");
        })
    }

    const handleNextStep = () => {
        let finalMajor = major;
        if (major == '화학공학/고분자공학부') {
            finalMajor = '화학공학_고분자공학부'
        }
        check_nickname(nickname)
        .then((message) => {
          setValidNickname(true);
          setNicknameMsg(message);
          dispatch(change_user(nickname, finalMajor, image, studentId.slice(0, 2)))
            .then(() => {
                setDialogOpen(true);
                setTimeout(() => {
                    router.push('/myPage');
                  }, 1000); 
            })
            .catch((error) => {
                console.log(error);
            });
        //   setIsCorrect("correct");
        })
        .catch((error) => {
          setValidNickname(false);
          setNicknameMsg(error);
          setIsCorrect("wrong");
        })

        
    }

    useEffect(() => {
        if (user) {
            setImage(user.image);
            setNickname(user.nickname);
            user.major == '화학공학_고분자공학부' ? setMajor('화학공학/고분자공학부') : setMajor(user.major);
            setStudentId(user.student_id + "학번");
        }
    }, [user])

    const CustomTextField = styled((props) => (
        <TextField
          {...props}
          value={props.value}
          onChange={props.onChange}
        />
      ))(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E2E2E2',
            borderRadius:'10px'
          },
        },
      }));
      
    const NewDialogContent = styled(Dialog)(({theme}) => ({
        borderRadius:"10px"
    })) 

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
            <Grid container>
                <Grid item style={{margin:'0px 0px 0px 25px', visibility:'none'}}>
                    <Image src={back} width={25} height={25} name='back' onClick={handleArrowClick} layout='fixed'/>
                </Grid>
                <Grid item style={{marginLeft:'25%'}}>
                    <Typography style={{margin:'0px 0px 0px 10px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>닉네임 변경</Typography>
                </Grid>
                <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                {(nickname != '' && majorList.indexOf(major) != -1 && studentIdList.indexOf(studentId) != -1) ?
                    <Button onClick={handleNextStep} style={{padding:'0', right:'0'}}>
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
        {user && 
        <Box
            sx={{
            margin: '45px 10px 16px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <form style={{ width: '100%'}}>
        <div style={{margin: '0 20px 20px'}}>
            <div style={{display:'flex'}}><Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#777777', fontWeight:'700'}}>닉네임&nbsp;</Typography> <Typography style={{fontSize:'14px', color:'#BABABA'}}>(최대 10자)</Typography></div>
            <TextField
                color={isCorrect}
                variant="outlined"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={handleNicknameChange}
                style={{width: '100%',}}
                required
                // InputProps={{
                //     endAdornment: (validNickname) && (nickname != '') ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                // }}
                InputProps={{
                    style: {
                      backgroundColor: isNickFocused ? 'white' : '#F2F2F2',
                      borderRadius:'10px',
                      
                    },
                    onFocus: () => {
                      setIsNickFocused(true);
                    },
                    onBlur: () => {
                      setIsNickFocused(false);
                    },
                  }}
            />
            {/* 중복확인 메소드 추가 */}
            {nickname !== user.nickname ? 
            <div key={validNickname} style={{display:'flex', margin: '0px 0 0 3px'}}>
                {/* <Button variant="contained" onClick={checkNickname} style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '15px', width: '47px', height: '20px', fontSize: '9px', padding: '3px 4px', margin: '4px 0px', boxShadow: 'none'}}>중복확인</Button> */}
                {/* {validNickname && nickname != "" && <Typography sx={{fontSize: '9px', fontWeight: '500', color:`${theme.palette.correct.main}` }} >사용 가능한 닉네임입니다</Typography>} */}
                {validNickname == false &&  <Typography sx={{fontSize: '9px', fontWeight: '500', color:`${theme.palette.wrong.main}`}}>이미 사용중인 닉네임입니다</Typography>}
            </div> :
            null}
            
        </div>
        <div style={{display:'flex'}}>
            <div style={{margin: '0 10px 0 20px', width:'30%'}}>
                <FormControl variant="standard" style={{width: '100%'}}>
                    <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#777777', fontWeight:'700'}}>학번</Typography>
                    <Autocomplete
                    freeSolo
                    value={studentId}
                    onChange={(e, value) => setStudentId(value)}
                    onFocus={()=>{setIsNumFocused(true)}}
                    onBlur = {()=>{setIsNumFocused(false)}}
                    sx={{ borderRadius: 1, }}
                    options={studentIdList}
                    renderInput={(params) => <TextField {...params} variant="outlined" style={{
                        fontSize: '12px',
                        borderRadius: '10px',
                        background: isNumFocused ? 'white' : '#F2F2F2',
                        
                    }}/>} 
                    />
                </FormControl>
            </div>
            <div style={{margin: '0 20px 0 0px', width:'60%'}}>
                <FormControl variant="standard" style={{width: '100%', borderRadius:'10px'}}>
                <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#777777', fontWeight:'700'}}>학부/학과</Typography>
                <Autocomplete
                    freeSolo
                    value={major}
                    onChange={(e, value) => setMajor(value)}
                    onFocus={()=>{setIsMajorFocused(true)}}
                    onBlur={()=>{setIsMajorFocused(false)}}
                    options={majorList.sort()}
                    sx={{ borderRadius: 1 }}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => <TextField {...params} variant="outlined" style={{
                        fontSize: '12px',
                        borderRadius: '10px',
                        background: isMajorFocused ? 'white' : '#F2F2F2',
                        color: isMajorFocused ? 'white' : '#F2F2F2',
                    }}
                    />} 
                />
                </FormControl>
            </div>
        </div>
        
        
        
        </form>
        </Box>}
        <Dialog open={dialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>저장이 완료되었습니다.</Typography></DialogContent></Dialog>

        {/* {editImage && <EditProfileImage image={image} setImage={setImage} setEditImage={setEditImage} />} */}
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(editNickname), {
    ssr: false,
});