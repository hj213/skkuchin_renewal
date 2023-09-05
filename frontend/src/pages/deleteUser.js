import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  TextField, Button, Typography, Box, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import back from '../image/close.png';
import logo from '../image/character_tear2.png'
import checkbox from '../image/checkbox.png'
import checkbox_empty from '../image/checkbox_empty.png'
import Image from 'next/image';
import theme from '../theme/theme';
import { delete_user, logout } from '../actions/auth/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const deleteUser = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [reason, setReason] = useState("");
    const [agreement, setAgreement] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const chatAlarmSubscription = useSelector(state => state.chatAlarm.chatAlarmSubscription);
    const noticeAlarmSubscription = useSelector(state => state.noticeAlarm.noticeAlarmSubscription);

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNextStep = () => {
        dispatch(delete_user(([result, message]) => {
            if (result) {
                let username = localStorage.getItem("username");
                if (username != null) {
                    localStorage.removeItem("username");
                }
                if (chatAlarmSubscription) {
                    chatAlarmSubscription.unsubscribe();
                }
                if (noticeAlarmSubscription) {
                    noticeAlarmSubscription.unsubscribe();
                }
                dispatch(logout());
            }
        }));
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{marginLeft:'43%'}}>
                                <Typography style={{margin:'5px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>탈퇴하기</Typography>
                            </Grid>
                            <Grid item style={{marginLeft:'auto', marginRight:'20px', visibility:'none'}}>
                                <Image src={back} width={25} height={25} name='back' onClick={handleArrowClick} layout='fixed' />
                            </Grid>
                    
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '135px 22px 50px 22px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={151} height={131} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '700', mb: '22px'}}>정말 탈퇴하실 건가요?</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', mb: '2px', color: '#BABABA', marginTop: '22px'}}>
                계정을 삭제하면 회원님의 저장 목록, 리뷰, 채팅 등
            </Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', mb: '42px',  color: '#BABABA'}}>
                모든 활동 정보가 삭제됩니다.
            </Typography>
            </div>

            <form style={{ width: '100%'}}>
                <Typography  sx={{fontSize: '14px', fontWeight: '500', mb: '10px',  color: '#BABABA'}}>탈퇴 사유</Typography>
                <textarea placeholder='탈퇴 사유를 입력해주세요.' onChange={(e) => setReason(e.target.value)} style={{padding: '10px', borderRadius: '5px', borderColor: '#BABABA', fontSize: '12px', width: '100%', height: '125px', resize: 'none', outline: 'none', fontFamily: 'NanumSquareRound, sans-serif'}} />
                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
                {/* <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)}/> */}
                {agreement ? <Image width={16} height={16} src={checkbox} onClick={() => setAgreement(false)} />
                : <Image width={16} height={16} src={checkbox_empty} onClick={() => setAgreement(true)} />}
                <label style={{fontSize: '9px', paddingLeft: '5px'}}>유의사항을 모두 확인하였으며, 회원탈퇴 시 모든 활동 정보 삭제에 동의합니다.</label>
                </div>

                <div style={{margin: '53px 18px 12px'}}>
                {reason.length >= 10 && agreement ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', marginTop: '100px', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        탈퇴하기
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', marginTop: '100px', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        탈퇴하기
                    </Button>
                }
                </div>
            </form>
        </Box>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(deleteUser), {
    ssr: false,
});