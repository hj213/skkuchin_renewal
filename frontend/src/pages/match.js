import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import { load_matching_info } from '../actions/matchingUser/matchingUser';

import Friends from '../components/Matching/Friends';

import UpperBar from '../components/UpperBar';
import AiGreeting from '../components/AiGreeting'
import { useRouter } from 'next/router';

const MatchPage = () => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user); 

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 0211 상단바, 내 프로필 보기 병합 완료 */}
            <UpperBar />
            <AiGreeting />
            
            <Container sx={{p: '0 15px', mt: '0'}}>
                {/* 상대 프로필 */}
                <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
                    <Grid item>
                        <Friends />
                    </Grid>
                </Grid>
            </Container>
       </ThemeProvider>
    )
} 

export default MatchPage;