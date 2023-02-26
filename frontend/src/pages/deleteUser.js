import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  TextField, Button, Typography, Box, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import back from '../image/arrow_back_ios.png';
import logo from '../image/character_tear.png'
import checkbox from '../image/checkbox.png'
import checkbox_empty from '../image/checkbox_empty.png'
import Image from 'next/image';
import theme from '../theme/theme';
import { change_password, delete_user, logout } from '../actions/auth/auth';
import { useRouter } from 'next/router';

export default function deleteUser() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [reason, setReason] = useState("");
    const [agreement, setAgreement] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNextStep = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(delete_user(([result, message]) => {
                if (result) {
                    let username = localStorage.getItem("username");
                    if (username != null) {
                        localStorage.removeItem("username");
                    }
                    dispatch(logout());
                }
            }));
        }
    }

    if(typeof window !== 'undefined' && !isAuthenticated){
        router.push('/login');
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleArrowClick}/>
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>탈퇴하기</Typography>
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
            <Image width={121} height={101} src={logo} />
            {/* <Typography sx={{fontSize: '22px', fontWeight: '500', mb: '22px'}}>너무 아쉬워요...</Typography> */}
            <Typography sx={{fontSize: '10px', fontWeight: '500', mb: '2px', color: '#BABABA', marginTop: '22px'}}>
                계정을 삭제하면 회원님의 저장 목록, 리뷰, 채팅 등
            </Typography>
            <Typography sx={{fontSize: '10px', fontWeight: '500', mb: '42px',  color: '#BABABA'}}>
                모든 활동 정보가 삭제됩니다.
            </Typography>
            </div>

            <form style={{ width: '100%'}}>
                <textarea placeholder='계정을 삭제하려는 이유를 작성해주세요.(10자 이상)' onChange={(e) => setReason(e.target.value)} style={{padding: '10px', borderRadius: '5px', borderColor: '#BABABA', fontSize: '12px', width: '100%', height: '125px', resize: 'none', outline: 'none', fontFamily: 'Noto Sans KR, sans-serif'}} />
                <div style={{display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
                {/* <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)}/> */}
                {agreement ? <Image width={16} height={16} src={checkbox} onClick={() => setAgreement(false)} />
                : <Image width={16} height={16} src={checkbox_empty} onClick={() => setAgreement(true)} />}
                <label style={{fontSize: '9px', paddingLeft: '5px'}}>유의사항을 모두 확인하였으며, 회원탈퇴 시 ~~~에 동의합니다.</label>
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
