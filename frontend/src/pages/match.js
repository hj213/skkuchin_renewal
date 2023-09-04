import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button, Divider } from '@mui/material';
import theme from '../theme/theme';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CommunityItem from '../components/SkkuChat/CommunityItem';
import { useDispatch, useSelector } from 'react-redux';
import { load_all_posts } from '../actions/post/post';
import { useEffect } from 'react';
import { getToken } from '../actions/auth/auth';

const Friends = dynamic(() => import('../components/Matching/Friends'));
const UpperBar = dynamic(() => import("../components/UpperBar"));
const AiGreeting = dynamic(() => import('../components/AiGreeting'));

const MatchContainer = styled.div`
  /* 데스크톱에서 스크롤 바를 숨김 */
  ::-webkit-scrollbar {
    display: none;
  }
  /* 모바일에서 스크롤 바를 숨김 */
  *::-webkit-scrollbar {
    display: none;
  }
`;

const MatchPage = () => {
    const router = useRouter();

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const allPosts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        if(isAuthenticated) {
            const access = dispatch(getToken('access'));
            console.log(access);

            console.log('load all posts')
            dispatch(load_all_posts());
        }
    }, []);

    const posts = [
        {
            id: 1,
            article_type: "WHAT TO EAT",
            tag_type: "뭐 먹을까요?",
            title: "게시글 제목제목",
            content: "안녕본문본붐놉누본ㅁ",
            user_id: 800,
            nickname: "진아지롱",
            user_image: "ESFP",
            display_time: "3분 전",
            article_like_count: 0,
            comment_count: 1,
            image: 'https://picsum.photos/30',
        },
        {
            id: 2,
            article_type: "TOGETHER",
            tag_type: "같이 먹어요",
            title: "크크",
            content: "안녕",
            user_id: 102,
            nickname: "테스트100",
            user_image: "ENFJ",
            display_time: "35분 전",
            article_like_count: 0,
            comment_count: 1,
            image: 'https://picsum.photos/200',
        },
    ];

    return(
        <MatchContainer>
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar />
            <AiGreeting />
            <Container sx={{p: '0 15px', mt: '0', position:'relative'}}>
                <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
                    <Grid item >
                        <Friends />
                    </Grid>
                </Grid>
            </Container>
            <Divider orientation='horizontal' sx={{width: '100%', borderBottom: '8px solid #FBFBFB'}}/> 
            <Grid sx={{mt: '21px'}}>
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px 0'}}>
                    <Typography style={{fontSize:'21px', fontWeight: 700, color: '#3C3C3C'}}>
                        스꾸게시판
                    </Typography>
                    <Button sx={{fontSize:'14px', fontWeight: 400, color: '#BABABA', p: 0}} onClick={() => router.push('/freeCommunity')}>
                        전체보기
                    </Button>
                </div>
                <Container sx={{ p: '0 24px', height: 'max-content', alignItems: 'center', mt: '10px' }}>
                    {/* {posts && posts.map((post) => ( */}
                    {allPosts && allPosts.slice(0,2).map((post) => (
                        <CommunityItem key={post.id} {...post} />
                    ))}
                </Container>
            </Grid>
        </ThemeProvider>
        </MatchContainer>
    )
} 

export default dynamic(() => Promise.resolve(MatchPage), {
    ssr: false,
});