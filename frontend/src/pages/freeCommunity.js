import React from 'react';
import { Grid, Container, Typography, Card, ThemeProvider, CssBaseline} from '@mui/material';
import back from '../image/arrow_back_ios.png';
import searchIcon from '../image/search.png';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommunityItem from '../components/SkkuChat/CommunityItem';
import { useRouter } from 'next/router';
import theme from '../theme/theme';

const FreeCommunity = () => {
    const router = useRouter();
    
    const handleBackClick = () => {
        router.back();
    };
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
        {
            id: 3,
            title: '게시글 제목3',
            content: '게시글 내용 본문본문본문본문본문본문본문본문본문본문본문본문문본문본문본문본문본문본문',
            likes: 10,
            comments: 5,
            date: '10분 전',
            image: 'https://picsum.photos/300',
        },
        {
            id: 4,
            title: '게시글 제목',
            content: '게시글 내용 본문본문본문본문',
            likes: 10,
            comments: 5,
            date: '10분 전',
            image: 'https://picsum.photos/200',
        },
        {
            id: 5,
            title: '게시글 제목2',
            content: '게시글 내용 본문본문본문본문본문본문본문본문본문본문본문본문문본문본문본문본문본문본문',
            likes: 10,
            comments: 5,
            date: '10분 전',
            image: '',
        },
        {
            id: 6,
            title: '게시글 제목3',
            content: '게시글 내용 본문본문본문본문본문본문본문본문본문본문본문본문문본문본문본문본문본문본문',
            likes: 10,
            comments: 5,
            date: '10분 전',
            image: 'https://picsum.photos/300',
        },
    ];

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container fixed style={{ position:'fixed', zIndex:'4', padding:'14px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <Card style={{
                    top: '18px',
                    height: '120%',
                    zIndex: '4',
                    borderRadius: 0,
                    boxShadow: 'none',
                }}>
                    <Grid container style={{justifyContent: 'space-between', alignItems: 'center', }}>
                        <Grid onClick={handleBackClick}>
                            <Image src={back} width={11} height={18} name='back' layout='fixed' />
                        </Grid>
                        <Grid>
                            <Typography sx={{fontSize: '18px', fontWeight: 700, color: '#3C3C3C'}}>자유게시판</Typography>
                        </Grid>
                        <Grid>
                            <Image src={searchIcon} width={24} height={24} name='search' layout='fixed' />
                        </Grid>
                    </Grid>
                </Card>
            </Container>
            <Container sx={{p: '0 24px', height: 'max-content', alignItems: 'center', mt: '63px', display: 'flex'}}>
                <Typography sx={{fontSize: '14px', whiteSpace: 'nowrap', mr: '10px', color: '#FFAC0B', fontWeight: 700}}>인기🔥</Typography>
                <Grid container sx={{justifyContent: 'space-between', p: '10px 15px', backgroundColor: '#FFFCE4', borderRadius: '10px'}}>
                    <Typography sx={{fontSize: '14px', color: '#3C3C3C', fontWeight: 400}}>요즘 스꾸친 폼 미쳤다</Typography>
                    <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                        <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                        <Typography sx={{fontSize: '12px', ml: '3px', color: '#FFCE00', fontWeight: 600}}>5</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container sx={{ p: '0 24px', height: 'max-content', alignItems: 'center', mt: '10px' }}>
                {posts.map((post) => (
                    <CommunityItem key={post.id} {...post} />
                ))}
            </Container>
        </ThemeProvider>
    );
};

export default FreeCommunity;
