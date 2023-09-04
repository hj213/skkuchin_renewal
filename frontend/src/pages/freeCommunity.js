import React, { useEffect } from 'react';
import { Grid, Container, Typography, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommunityItem from '../components/SkkuChat/CommunityItem';
import { useRouter } from 'next/router';
import theme from '../theme/theme';
import Header from '../components/SkkuChat/Header';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { load_all_posts } from '../actions/post/post';

const FreeCommunity = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const allPosts = useSelector(state => state.post.allPosts);

    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            router.push('/login');
        } else {
            dispatch(load_all_posts());
        }
    }, []);

    const handleBackClick = () => {
        router.push('/match');
    };

    const handleAddClick = () => {
       router.push('/uploadPost');
    };
// id, article_type, title, content, user_id, nickname, user_image, display_time, article_like_count, comment_count

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
        {
            id: 3,
            article_type: "TOGETHER",
            tag_type: "같이 먹어요",
            title: "하이",
            content: "antifragile",
            user_id: 102,
            nickname: "테스트100",
            user_image: "ENFJ",
            display_time: "1시간 전",
            article_like_count: 0,
            comment_count: 0
        },
        {
            id: 4,
            article_type: "TOGETHER",
            tag_type: "같이 먹어요",
            title: "하이하하하하이",
            content: "antifragile 안티티티 프레즐",
            user_id: 102,
            nickname: "테스트100",
            user_image: "ENFJ",
            display_time: "1시간 전",
            article_like_count: 3,
            comment_count: 5,
            image: 'https://picsum.photos/100',
        },
        {
            id: 5,
            article_type: "ETC",
            tag_type: "기타",
            title: "크크쿠쿠다스",
            content: "안녕하십니까 쿠쿠다스에요",
            user_id: 98,
            nickname: "테스트96",
            user_image: "ENFP",
            display_time: "35분 전",
            article_like_count: 0,
            comment_count: 1,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <Header title="스꾸게시판" onBackClick={handleBackClick} showSearchIcon={true}/>
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
                {allPosts && allPosts.map((post) => (
                // {posts && posts.map((post) => (
                    <CommunityItem key={post.id} {...post} />
                ))}
            </Container>
            <Container
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton 
                    onClick={handleAddClick}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: '50px',
                        height: '50px',
                        '&:hover, &:active': {
                            backgroundColor: theme.palette.primary.main,
                        },
                    }} aria-label="add">
                    <AddIcon sx={{color: '#fff'}} />
                </IconButton>
            </Container>
        </ThemeProvider>
    );
};

export default FreeCommunity;
