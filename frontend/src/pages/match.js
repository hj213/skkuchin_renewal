import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button, Divider } from '@mui/material';
import theme from '../theme/theme';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CommunityItem from '../components/SkkuChat/CommunityItem';

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

    const posts = [
        {
            id: 1,
            title: '게시글 제목',
            content: '게시글 내용 본문본문본문본문',
            likes: 10,
            comments: 5,
            date: '10분 전',
            image: 'https://picsum.photos/200',
        },
        {
            id: 2,
            title: '게시글 제목2',
            content: '게시글 내용 본문본문본문본문본문본문본문본문본문본문본문본문문본문본문본문본문본문본문',
            likes: 10,
            comments: 5,
            date: '10분 전',
            image: '',
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
                        게시판
                    </Typography>
                    <Button sx={{fontSize:'14px', fontWeight: 400, color: '#BABABA', p: 0}} onClick={() => router.push('/freeCommunity')}>
                        전체보기
                    </Button>
                </div>
                <Container sx={{ p: '0 24px', height: 'max-content', alignItems: 'center', mt: '10px' }}>
                    {posts.map((post) => (
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