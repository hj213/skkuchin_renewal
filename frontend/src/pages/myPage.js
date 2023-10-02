import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, ThemeProvider, Grid,Button, Container, Typography, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import theme from '../theme/theme';
import next from '../image/arrow_next.png';
import insta from '../image/insta.png';
import { displayProfile } from '../components/MyPage/ProfileList';
import { logout } from '../actions/auth/auth';

// 스위치
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { set_chat_push, set_info_push } from '../actions/pushToken/pushToken';
import dynamic from 'next/dynamic';
import { change_status_info } from '../actions/matchingUser/matchingUser';


const UpperBar = dynamic(() => import('../components/UpperBar'));

const myPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const userMatchInfo = useSelector(state => state.matchingUser.matchingUser);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const pushToken = useSelector(state => state.pushToken.pushToken);
    const chatAlarmSubscription = useSelector(state => state.chatAlarm.chatAlarmSubscription);
    const noticeAlarmSubscription = useSelector(state => state.noticeAlarm.noticeAlarmSubscription);

    const [chatAlarm, setChatAlarm] = useState(false);
    const [infoAlarm, setInfoAlarm] = useState(false);
    const [MatchChecked, setMatchChecked] = useState(false);
    
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    const [dialogOpen, setDialogOpen] = useState(false);
    

    const arrowClick = () => {
        router.push('/editNickname')
    }

    const handleLogout = () => {
        if (chatAlarmSubscription) {
            chatAlarmSubscription.unsubscribe();
        }
        if (noticeAlarmSubscription) {
            noticeAlarmSubscription.unsubscribe();
        }
        dispatch(logout());
        setDialogOpen(false);
    }
    const handleDialogOpen = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleChatToggle = (e) => {
        if (pushToken) {
            dispatch(set_chat_push(!chatAlarm))
        }
    }

    const handleNoticeToggle = (e) => {
        if (pushToken) {
            dispatch(set_info_push(!infoAlarm))
        }
    }

    const handleMatching = () => {
        dispatch(change_status_info(!MatchChecked));
        setMatchChecked(!MatchChecked);
    }

    useEffect(() => {
        if (pushToken) {
            setChatAlarm(pushToken.chat_alarm);
            setInfoAlarm(pushToken.info_alarm);
        }
    }, [pushToken])

    useEffect(()=>{
        if (userMatchInfo) {
            setMatchChecked(userMatchInfo.matching);
        }
    },[userMatchInfo])

    const CustomSwitch = styled((props)=>(<Switch disableRipple {...props} onClick={handleMatching} checked={MatchChecked}/>))(({ theme }) => ({
        '& .MuiSwitch-thumb': {
          backgroundColor: 'white',
        },
        '& .MuiSwitch-track': {
          backgroundColor: MatchChecked ? theme.palette.primary.main : 'gray',
          height: '12px',
          marginTop:'2px'
        },
        marginTop:"-10px",
        marginLeft:'auto'
      }));

    const CustomSwitch2 = styled((props)=>(<Switch disableRipple {...props} onClick={handleChatToggle}  checked={chatAlarm}/>))(({ theme }) => ({
        '& .MuiSwitch-thumb': {
          backgroundColor: 'white',
        },
        '& .MuiSwitch-track': {
          backgroundColor: chatAlarm ? theme.palette.primary.main : 'gray',
          height: '12px',
          marginTop:'2px'
        },
        marginTop:"-10px",
        marginLeft:'auto'
      }));

    const CustomSwitch3 = styled((props)=>(<Switch disableRipple {...props} onClick={handleNoticeToggle}   checked={infoAlarm}/>))(({ theme }) => ({
        '& .MuiSwitch-thumb': {
          backgroundColor: 'white',
        },
        '& .MuiSwitch-track': {
          backgroundColor: infoAlarm ? theme.palette.primary.main : 'gray',
          height: '12px',
          marginTop:'2px'
        },
        marginTop:"-10px",
        marginLeft:'auto'
      }));
    
    const CustomSwitch4 = styled((props)=>(<Switch disableRipple {...props} onClick={handleNoticeToggle}   checked={infoAlarm}/>))(({ theme }) => ({
    '& .MuiSwitch-thumb': {
        backgroundColor: 'white',
    },
    '& .MuiSwitch-track': {
        backgroundColor: infoAlarm ? theme.palette.primary.main : 'gray',
        height: '12px',
        marginTop:'2px'
    },
    marginTop:"-10px",
    marginLeft:'auto'
    }));     
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checked={chatAlarm} />
        ))(({ theme }) => ({
            width: 40,
            height: 22,
            padding: 0,

            '& .MuiSwitch-switchBase': {
            padding: 1,
            margin: 3,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FFCE00',
                opacity: 1,
                border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#FFCE00',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
            },
            '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 15,
            height: 15,
            },
            '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            },
    }));
    const IOSSwitch2 = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checked={infoAlarm} />
        ))(({ theme }) => ({
            width: 40,
            height: 22,
            padding: 0,

            '& .MuiSwitch-switchBase': {
            padding: 1,
            margin: 3,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FFCE00',
                opacity: 1,
                border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#FFCE00',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
            },
            '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 15,
            height: 15,
            },
            '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            },
    }));

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <UpperBar />
        {user && <div style={{marginTop: '30px'}}>
            {/* 상단 회원 정보 */}
            <div style={{display: 'flex', gridTemplateColumns: '72px 1fr 38px', alignItems: 'center', margin: '0 10px 15px 0px'}}>
                <div style={{width: '80px', height:'80px', margin:'0 15px', backgroundColor:'#FFF8D9', border:'0px solid transparent', borderRadius:'10px'}}>
                    {displayProfile(user.image, 80, 80)}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '0px'}}>
                    {/* 닉네임, 캠퍼스, 학과, 학번 */}
                    <div style={{display: 'flex'}}>
                        <Typography style={{fontSize: '15px', fontWeight: '700', marginBottom: '9px'}}>{user.nickname}</Typography>
                        {user.campus == "명륜" ? <Typography sx={{height: '24px', border: "1px solid #FFFCE4", borderRadius:'10px', fontSize: '12px',  fontWeight:'700',p: '2px 4px 0px 4px', color:'#FFAC0B', backgroundColor:'#FFFCE4', margin:'-2px 0px 0px 5px'}} >명륜</Typography> : <Typography sx={{height: '24px', border: "1px solid #DCF8DB", borderRadius:'10px', fontSize: '12px',  fontWeight:'700',p: '2px 4px 0px 4px', color:'#58C85A', backgroundColor:'#DCF8DB', margin:'-2px 0px 0px 5px'}} >율전</Typography>}
                    </div>
                    <Typography sx={{fontSize: '12px', p: '0px 3.5px 0px 0px', color:'#3C3C3C'}}>{user.major} / {user.student_id}학번 {user.gender && <span>/ {user.gender[0]}</span>}</Typography>

                </div>
            </div>
            <div style={{height:'5px',backgroundColor:"white"}}></div>
            
            {/* 사용자 설정 */}
            <Container style={{display: 'grid', padding: '0 15px', marginTop: '30px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '15px'}}>사용자 설정</Typography>
                <div onClick={() => router.push('/editNickname')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '5px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>내 정보 &nbsp; &nbsp; &nbsp;</Button></div>
                <div onClick={() => router.push('/changePassword')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '5px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>비밀번호 재설정</Button></div>
                <div onClick={() => router.push('/editProfileImage')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '25px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>프로필 이미지 변경</Button></div>
            </Container>
            <div style={{height:'1px', backgroundColor:'#E2E2E2', margin:'0 10px'}}></div>

            {/* 커뮤니티 */}
            <Container style={{display: 'grid', padding: '0 15px', marginTop: '30px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '15px'}}>커뮤니티</Typography>
                <div onClick={() => router.push('/myPost')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '5px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>내 게시글 &nbsp; &nbsp;</Button></div>
                <div onClick={() => router.push('/myFavPost')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '25px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>좋아요 누른 게시글</Button></div>
            </Container>
            <div style={{height:'1px', backgroundColor:'#E2E2E2', margin:'0 10px'}}></div>

            {/* 매칭 프로필 */}
            <Container style={{display: 'grid', padding: '0 15px', marginTop: '30px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '15px'}}>밥약 매칭 설정</Typography>
                <div onClick={() => router.push('/changeProfile')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '5px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>매칭 프로필 변경</Button></div>
                <div style={{display:'flex'}}><Typography variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '25px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>매칭 ON/OFF</Typography><CustomSwitch defaultChecked/></div>
            </Container>
            <div style={{height:'1px', backgroundColor:'#E2E2E2', margin:'0 10px'}}></div>

            {/* 알림 설정 */}
            <Container style={{padding: '0 15px', marginTop: '25px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '15px'}}>알림 설정</Typography>
                {/* <div onClick={() => router.push('/enrollSMS')} style={{display: 'grid', gridTemplateColumns: '1fr 49px', alignItems: 'start', marginBottom: '20px'}}>
                    <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>채팅 알림</Typography>
                </div>
                <div onClick={() => router.push('/enrollSMS')} style={{display: 'grid', gridTemplateColumns: '1fr 49px', alignItems: 'start', marginBottom: '20px'}}>
                    <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>공지/이벤트 알림</Typography>
                </div> */}
                {pushToken ?
                <>
                    <div style={{display:'flex', marginBottom:'5px'}}>
                        <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>채팅 알림</Typography>
                        {/* 토글 스위치 */}
                        <CustomSwitch2 defaultChecked/>
                    </div>

                    <div style={{display:'flex' , marginBottom:'5px'}}>
                        <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>SMS 알림</Typography>
                        {/* 토글 스위치 */}
                        <CustomSwitch4 defaultChecked/>
                    </div>
                 
                    <div style={{display:'flex' , marginBottom:'5px'}}>
                        <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>공지/이벤트 알림</Typography>
                        {/* 토글 스위치 */}
                        <CustomSwitch3 defaultChecked/>
                    </div>
                    
                    {/* <div onClick={() => router.push('/enrollSMS')} style={{display:'flex', marginBottom:'10px'}}>
                        <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>
                            {pushToken.phone ? 'SMS 알림 변경' : 'SMS 알림 등록'}
                        </Typography>
                    </div> */}
                    <div onClick={() => router.push('/editPhoneNumber')} style={{display: 'flex', marginBottom:'25px'}}>
                        <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>전화번호 변경</Typography>
                    </div>
                    
                </>
                :
                 <div onClick={() => router.push('/enrollSMS')} style={{display: 'flex', marginBottom:'25px'}}>
                    <Typography style={{fontSize: '14px', fontWeight: '400', alignSelf: 'center'}}>SMS 알림 등록</Typography>
                </div>
                } 
                

            </Container>
            <div style={{height:'1px', backgroundColor:'#E2E2E2', margin:'0 10px'}}></div>

            {/* 기타 */}
            <Container style={{display: 'grid', padding: '0 15px', marginTop: '25px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '25px'}}>기타</Typography>
                <div onClick={() => router.push('/requestPlace')}><Button variant="text" style={{fontSize: '14px', fontWeight: '400', marginBottom: '5px', color: '#3C3C3C', padding: '0', justifySelf: 'start'}}>식당 추가 요청</Button></div>
                <Typography onClick={() => window.open('http://pf.kakao.com/_xehRxmxj', '_blank')} style={{fontSize: '14px', fontWeight: '400',marginBottom: '5px', color: '#3C3C3C',}}>문의하기</Typography>
                <Typography onClick={handleDialogOpen} style={{fontSize: '14px', fontWeight: '400', marginBottom: '25px', color: '#3C3C3C'}}>로그아웃</Typography>
            </Container>

            {/* 하단 */}
            <Container style={{width: '100%', display: 'grid', justifyItems: 'center', marginTop: '20px', marginBottom: '50px'}}>
                <div style={{display: 'flex', fontSize: '14px'}}>
                    <Button onClick={() => router.push('/deleteUser')} variant="text" style={{color: "#BABABA"}}>탈퇴하기</Button>
                    <Button onClick={() => router.push('/agreementList')} variant="text" style={{color: "#BABABA"}}>약관 및 정책</Button>
                    {/* <Button onClick={() => router.push('/agreementList')} variant="text" style={{color: "#BABABA"}}><Image src={insta} width={20} height={20}></Image></Button> */}
                    <a href="https://www.instagram.com/skkuchin/" target="_blank" rel="noopener noreferrer">
                    <Button style={{ color: "#BABABA" }}>
                        <Image src={insta} width={20} height={20} />
                    </Button>
                    </a>
                </div>
            </Container>

        </div>}
        <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                PaperProps={{ style: { borderRadius: '10px' } }}
            >
                <DialogContent sx={{p: '20px 24px 13px'}}>
                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                        <DialogTitle sx={{color: '#000', fontSize: '15px', p: '25px 35px 25px', m: '0', fontWeight: '700'}}>정말 로그아웃 하시겠어요?</DialogTitle>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p:'0'}}>
                    <div style={{width: '100%', paddingBottom: '20px',  display: 'flex',justifyContent: 'space-between' }}>
                        <Button sx={{width: '43%', hegiht:'100px', p: '5', marginLeft:'15px', color: '#BABABA', borderRadius: '10px', border:'1px solid #F2F2F2', background:'#F2F2F2', fontWeight: '500'}} onClick={handleDialogClose}>아니요</Button>
                        <Button sx={{width: '43%', hegiht:'100px', p: '5', marginRight:'15px',color: 'white', borderRadius: '10px', border:'1px solid #FFCE00', background:'#FFCE00', fontWeight: '500'}} onClick={handleLogout}>확인</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(myPage), {
    ssr: false,
});