import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@mui/material';
import theme from '../theme/theme';
import next from '../image/arrow_next.png';
import { displayProfile } from '../components/MyPage/ProfileList';
import { logout } from '../actions/auth/auth';

// 스위치
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { load_token, set_chat_push, set_info_push } from '../actions/pushToken/pushToken';
import dynamic from 'next/dynamic';

const UpperBar = dynamic(() => import('../components/UpperBar'));

const myPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const pushToken = useSelector(state => state.pushToken.pushToken);
    const chatAlarmSubscription = useSelector(state => state.chatAlarm.chatAlarmSubscription);
    const noticeAlarmSubscription = useSelector(state => state.noticeAlarm.noticeAlarmSubscription);

    const [chatAlarm, setChatAlarm] = useState(false);
    const [infoAlarm, setInfoAlarm] = useState(false);
    
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    const [dialogOpen, setDialogOpen] = useState(false);
    

    const arrowClick = () => {
        router.push('/editProfile')
    }

    const handleLogout = () => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            if (chatAlarmSubscription) {
                chatAlarmSubscription.unsubscribe();
            }
            if (noticeAlarmSubscription) {
                noticeAlarmSubscription.unsubscribe();
            }
            dispatch(logout());
            setDialogOpen(false);
        }
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

    
    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_token(([result, message]) => {
                if (result) {
                } else {
                    setChatAlarm(false);
                    setInfoAlarm(false);
                }
            }));
        }
    }, [])

    useEffect(() => {
        if (pushToken) {
            setChatAlarm(pushToken.chat_alarm);
            setInfoAlarm(pushToken.info_alarm);
        }
    }, [pushToken])

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
            <div style={{display: 'grid', gridTemplateColumns: '72px 1fr 38px', alignItems: 'center', padding: '0 15px'}}>
                {displayProfile(user.image, 72, 72)}
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '9px'}}>
                    <Typography style={{fontSize: '15px', fontWeight: '700', marginBottom: '9px'}}>{user.nickname} 님</Typography>
                    {/* 캠퍼스, 학과, 학번 */}
                    <div style={{display: 'flex'}}>
                        <Typography sx={{height: '18px', border: "1px solid #BABABA", fontSize: '10px', p: '1px 6.5px', borderRadius: '17px', marginTop:"-2px"}} color={theme.palette.fontColor.main}>{user.campus}</Typography>
                        <Typography sx={{fontSize: '10px', p: '0px 3.5px'}} color={theme.palette.fontColor.main}>{user.major} / {user.student_id}학번 {user.gender && <span>/ {user.gender[0]}</span>}</Typography>
                    </div>
                </div>
                <div onClick={arrowClick}><Image width={38} height={38} src={next} onClick={arrowClick} style={{zIndex: '-1'}} layout='fixed' /></div>
            </div>
            
            {/* 사용자 설정 */}
            <Container style={{display: 'grid', borderBottom: '1px solid #DDDDDD', padding: '0 15px', marginTop: '30px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '25px'}}>사용자 설정</Typography>
                <div onClick={() => router.push('/changePassword')}><Button variant="text" style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px', color: '#000000', padding: '0', justifySelf: 'start', zIndex: '-1'}}>비밀번호 변경</Button></div>
            </Container>

            {/* 알림 설정 */}
            <Container style={{borderBottom: '1px solid #DDDDDD', padding: '0 15px', marginTop: '25px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '20px'}}>알림 설정</Typography>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 49px', alignItems: 'start', marginBottom: '13px'}}>
                    <Typography style={{fontSize: '16px', fontWeight: '500', alignSelf: 'center'}}>채팅 알림</Typography>
                    {/* 토글 스위치 */}
                    <FormControlLabel
                        style={{paddingTop:"2px", marginTop:'-5px'}}
                        control={<IOSSwitch sx={{ m: 1, marginLeft:"20px" }} onClick={handleChatToggle} />}
                    />
                </div>
                
                <div style={{display: 'grid', gridTemplateColumns: '1fr 49px', alignItems: 'start', marginBottom: '20px'}}>
                    <Typography style={{fontSize: '16px', fontWeight: '500', alignSelf: 'center'}}>스꾸친 공지/이벤트 알림</Typography>
                    {/* 토글 스위치 */}
                    <FormControlLabel
                        style={{paddingTop:"2px", marginTop:'-5px'}}
                        control={<IOSSwitch2 sx={{ m: 1, marginLeft:"20px" }} onClick={handleNoticeToggle} />}
                    />
                </div>
            </Container>

            {/* 기타 */}
            <Container style={{display: 'grid', padding: '0 15px', marginTop: '25px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '25px'}}>기타</Typography>
                <Typography onClick={handleDialogOpen} style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px'}}>로그아웃</Typography>
                <Typography onClick={() => window.open('http://pf.kakao.com/_xehRxmxj', '_blank')} style={{fontSize: '16px', fontWeight: '500'}}>문의하기</Typography>
            </Container>

            {/* 하단 */}
            <Container style={{width: '100%', display: 'grid', justifyItems: 'center', marginTop: '80px', marginBottom: '50px'}}>
                <div style={{display: 'flex', fontSize: '14px'}}>
                    <Button onClick={() => router.push('/deleteUser')} variant="text" style={{color: "#BABABA"}}>탈퇴하기</Button>
                    <Button onClick={() => router.push('/agreementList')} variant="text" style={{color: "#BABABA"}}>약관 및 정책</Button>
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
                            <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0', fontWeight: '700'}}>정말 로그아웃 하시겠어요?</DialogTitle>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{p:'0'}}>
                        <div style={{width: '100%', paddingBottom: '20px'}}>
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1', fontWeight: '700'}} onClick={handleDialogClose}>취소</Button>
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1', fontWeight: '700'}} onClick={handleLogout}>로그아웃</Button>
                        </div>
                    </DialogActions>
                </Dialog>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(myPage), {
    ssr: false,
});