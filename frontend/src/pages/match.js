import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Layout from "../hocs/Layout";

import Friends from '../components/Matching/Friends';

import UpperBar from '../components/UpperBar';
import AiGreeting from '../components/AiGreeting'

const MatchPage = () => {
    const user = useSelector(state => state.auth.user); 

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 0211 상단바, 내 프로필 보기 병합 완료 (재현) */}
        
        <Layout
                title='스꾸친 | Match'
                content='Match page'
            > 
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
        </Layout>
       </ThemeProvider>
    )
} 

export default MatchPage;