import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  TextField, Button, Typography, Box, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import back from '../image/close.png';
import logo from '../image/character_tear2.png'
import checkbox from '../image/checkedCheck_circle.png'
import checkbox_empty from '../image/emptyCheck_circle.png'
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
            margin: '80px 22px 50px 22px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={140} height={121} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '800', mb: '10px', color:'#3C3C3C'}}>정말 탈퇴하실 건가요?</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '700', mb: '60px', color: '#9E9E9E', marginTop: '10px'}}>
                계정을 삭제하면 회원님의 저장 목록, 리뷰, 채팅 등 <br/> 모든 활동 정보가 삭제됩니다.
            </Typography>
            </div>

            <form style={{ width: '100%'}}>
                <Typography  sx={{fontSize: '14px', fontWeight: '700', mb: '10px',  color: '#9E9E9E'}}>탈퇴 사유</Typography>
                <textarea placeholder='탈퇴 사유를 입력해주세요.' onChange={(e) => setReason(e.target.value)} style={{padding: '15px', borderRadius: '12px', borderColor: '#E2E2E2', fontSize: '16px', width: '100%', height: '200px', resize: 'none', outline: 'none', fontFamily: 'NanumSquareRound, sans-serif'}} />
                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
                {/* <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)}/> */}
                {agreement ? <Image width={24} height={24} src={checkbox} onClick={() => setAgreement(false)} />
                : <Image width={24} height={24} src={checkbox_empty} onClick={() => setAgreement(true)} />}
                <label style={{fontSize: '12px', paddingLeft: '5px', color:'#9E9E9E', fontWeight:"700"}}>유의사항을 모두 확인하였으며, 회원탈퇴 시 모든 활동 정보 삭제에 동의합니다.</label>
                </div>

                <div style={{margin: '0px 18px 0px'}}>
                {reason.length >= 10 && agreement ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', marginTop: '80px', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        탈퇴하기
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', marginTop: '80px', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
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