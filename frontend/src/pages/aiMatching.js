import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden } from '@mui/material';
import Layout from "../hocs/Layout";
import theme from '../theme/theme';
import UpperBar from "../components/UpperBar";
import AiGreeting from "../components/AiGreeting";
import TagList from "../components/TagList";
import SearchBox from "../components/SearchBox";


const aiMatchingPage = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    // list.js 에서 전달 받은 id 값 받아오기
    const { id } = router.query;

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout
                title='스꾸친 | AI 매칭'
                content='aiMatching Page'
            >   
            <div style={{ borderBottom: '1px solid #EAEAEA' }}>
                <UpperBar />
            </div>
            <AiGreeting />
            </Layout>
        </ThemeProvider>
    )
}

export default aiMatchingPage;