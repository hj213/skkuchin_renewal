import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useRouter } from "next/router";
import { load_other_matching_info } from '../actions/matchingUser/matchingUser';
import { CssBaseline, Typography, Grid, Container,ThemeProvider, Card, Box, Button, Divider } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import { displayMBTI } from '../components/Matching/MBTIList';
import close from '../image/close.png';
import dynamic from 'next/dynamic';
import { clear_user_profile } from '../actions/chat/chatRoom';
import MBTITypes from '../components/SkkuChat/MBTITypes';

const clickProfile = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const userProfile = useSelector(state => state.chatRoom.userProfile);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    useEffect(() => {
        if (userProfile) {
            dispatch(load_other_matching_info(userProfile.id));
        }
        return () => {
            dispatch(clear_user_profile());
        }
    }, [userProfile]);

    const handleBack = (e) => {
        router.back();
    }

    return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container fixed style={{ position:'fixed', zIndex:'4', padding:'14px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                    <Card style={{
                        top: '18px',
                        height: '120%',
                        zIndex: '4',
                        borderRadius: 0,
                        boxShadow: 'none',
                    }}>
                        <Grid container style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <Grid sx={{width: '24px'}}>
                            </Grid>
                            <Grid>
                                <Typography sx={{fontSize: '18px', fontWeight: 700, color: '#3C3C3C'}}>프로필</Typography>
                            </Grid>
                            <Grid onClick={handleBack}>
                                <Image src={close} width={24} height={24} name='search' layout='fixed' />
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
                <div style={{
                    padding: '0',
                    margin:'48px 24px 0'
                }}>
                
                {matchingUser !== null ?
                    <>
                        <Grid container sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '10px 0'}}>
                            <Grid item sx={{mr: '18px'}}>{displayMBTI(matchingUser.mbti, 80, 80)}</Grid>
                            <Grid item sx={{flexGrow: 1, height: '80px'}}>
                                <Typography sx={{p: '10px 0px', fontSize: '16px', fontWeight: '700'}}>{ matchingUser.nickname}</Typography>
                                <Grid item sx={{display: 'flex', fontSize: '12px', alignItems: 'center', fontWeight: 400, color: '#3C3C3C'}}>
                                    {
                                        matchingUser !== null && 
                                        matchingUser.campus == '명륜' ?
                                        <Typography sx={{width: 'max-content',color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{matchingUser.campus}</Typography>
                                        : 
                                        <Typography sx={{color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px',fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{matchingUser.campus}</Typography>
                                    }
                                    <Grid item sx={{flexGrow: 1, fontSize: '12px'}}>
                                        {matchingUser.major}/
                                        {matchingUser.student_id}학번/
                                        {(matchingUser.gender).charAt(0)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: '20px' }}>
                            <Typography sx={{ fontSize: '12px', color: '#3C3C3C', fontWeight: 700, pl: '4px', mb: '8px' }}>MBTI</Typography>
                            <MBTITypes types={['E', 'N', 'F', 'P', 'I', 'S', 'T', 'J']} matchingUser={matchingUser} />
                        </Box>

                        <Box>
                            <Typography sx={{fontSize: '12px', color: '#3C3C3C', fontWeight: 700, p: '16px 4px 8px'}}>한 줄 자기소개</Typography>
                            <Typography sx={{ fontSize:'13px', fontWeight: '500', p: '12px 18px', borderRadius: '8px', border: '1px solid #E2E2E2'}}>
                                {matchingUser.introduction}
                            </Typography>
                        </Box>
                        {/*                         
                            <Grid item sx={{display: 'flex'}}>
                                {(matchingUser.keywords) != null ?
                                    ((matchingUser.keywords).slice(0, 3).map((interest, index)=> (
                                        <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 26px'}}>
                                            {interest}
                                        </Grid>
                                    )))
                                : null}
                        </Grid > */}
                    </>
                    : null}
                    </div>
                    <Button
                        disableElevation
                        disableTouchRipple
                        sx={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#FFF',
                            fontSize: '16px',
                            fontWeight: 800,
                            textAlign: 'center',
                            p: '16px',
                            width: 'calc(100% - 48px)', 
                            backgroundColor: '#FFCE00',
                            borderRadius: '8px',
                            height: '56px'
                        }}
                    >
                        밥약 신청하기
                    </Button>

        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(clickProfile), {
    ssr: false,
});