import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/arrow_back_ios.png';
import toggle_off from '../image/toggle_off.png';
import toggle_on from '../image/toggle on.png';
import { displayProfile } from '../components/MyPage/ProfileList';
import { load_user } from '../actions/auth/auth';
import UpperBar from '../components/UpperBar';

export default function myPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);

    const arrowClick = () => {
        router.push('/editProfile')
    }

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_user());
        }
    }, [dispatch])

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <UpperBar />
        {user && <div style={{marginTop: '30px'}}>
            {/* 상단 회원 정보 */}
            <div style={{display: 'grid', gridTemplateColumns: '72px 1fr 11px', alignItems: 'center', padding: '0 15px'}}>
                {displayProfile(user.image, 72, 72)}
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: '9px'}}>
                    <Typography style={{fontSize: '15px', fontWeight: '700', marginBottom: '9px'}}>{user.nickname} 님</Typography>
                    {/* 캠퍼스, 학과, 학번 */}
                    <div style={{display: 'flex'}}>
                        <Typography sx={{height: '16px', border: "1px solid #BABABA", fontSize: '10px', p: '0px 6.5px', borderRadius: '17px'}} color={theme.palette.fontColor.main}>{user.campus}</Typography>
                        <Typography sx={{fontSize: '10px', p: '0px 3.5px'}} color={theme.palette.fontColor.main}>{user.major} / {user.student_id}학번</Typography>
                    </div>
                </div>
                <Image width={10.43} height={17.69} src={back} onClick={arrowClick} style={{zIndex: '-1'}}/>
            </div>
            
            {/* 사용자 설정 */}
            {/* <Container style={{display: 'grid', borderBottom: '1px solid #CCCCCC', padding: '0 15px', marginTop: '30px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '25px'}}>사용자 설정</Typography>
                <Button variant="text" style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px', color: '#000000', padding: '0', justifySelf: 'start'}}>비밀번호 변경</Button>
                <Button variant="text" style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px', color: '#000000', padding: '0', justifySelf: 'start'}}>차단 유저 관리</Button>
            </Container> */}

            {/* 알림 설정 */}
            {/* <Container style={{borderBottom: '1px solid #CCCCCC', padding: '0 15px', marginTop: '25px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '25px'}}>알림 설정</Typography>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 49px', alignItems: 'start'}}>
                    <Typography style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px'}}>채팅 알림</Typography>
                    <Image width={48.58} height={26.5} src={toggle_off} onClick={arrowClick} style={{zIndex: '-1'}}/>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 49px', alignItems: 'start'}}>
                    <Typography style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px'}}>스꾸친 공지/이벤트 알림</Typography>
                    <Image width={48.58} height={26.5} src={toggle_off} onClick={arrowClick} style={{zIndex: '-1'}}/>
                </div>
            </Container> */}

            {/* 기타 */}
            {/* <Container style={{display: 'grid', padding: '0 15px', marginTop: '25px'}}>
                <Typography style={{fontSize: '16px', fontWeight: '700', marginBottom: '25px'}}>기타</Typography>
                <Button variant="text" style={{fontSize: '16px', fontWeight: '500', marginBottom: '25px', color: '#000000', padding: '0', justifySelf: 'start'}}>로그아웃</Button>
                <Button variant="text" style={{fontSize: '16px', fontWeight: '500', color: '#000000', padding: '0', justifySelf: 'start'}}>문의하기</Button>
            </Container> */}

            {/* 하단 */}
            {/* <Container style={{width: '100%', display: 'grid', justifyItems: 'center', marginTop: '80px', marginBottom: '50px'}}>
                <div style={{display: 'flex', fontSize: '14px'}}>
                    <Button variant="text" color={theme.palette.fontColor.main}>탈퇴하기</Button>
                    <Button variant="text" color={theme.palette.fontColor.main}>약관 및 정책</Button>
                </div>
            </Container> */}

        </div>}
        </ThemeProvider>
    )
}
