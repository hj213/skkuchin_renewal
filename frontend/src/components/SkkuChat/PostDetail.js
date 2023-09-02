import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Grid, CssBaseline, ThemeProvider, Button, Divider, Box } from '@mui/material';
import theme from '../../theme/theme';
import Header from './Header';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { displayMBTI } from '../Matching/MBTIList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CustomInputField from './CustomInputField';

const posts = [
  {
    id: 1,
    title: '게시글 제목',
    content: '게시글 내용 본문본문본문본문',
    likes: 10,
    comments: 5,
    uploadDay: '08/13',
    uploadTime: '16:30',
    image: ['https://picsum.photos/200', 'https://picsum.photos/300', 'https://picsum.photos/400']
  },
  {
    id: 2,
    title: '게시글 제목2',
    content: '게시글 내용 본문본문본문본문본문본문본문본문본문본문본문본문문본문본문본문본문본문본문',
    likes: 10,
    comments: 5,
    uploadDay: '08/13',
    uploadTime: '16:30',
    image: [],
  },
];


const PostDetail = ({ postId }) => {
    const router = useRouter();

    const handleBackClick = () => {
      router.back();
    };

    // 더미데이터 사용
    const user = useSelector(state => state.auth.user);

    const selectedPost = posts.find(post => post.id == postId);

    const displayPost = selectedPost || posts[0]; // 디폴트 데이터


    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <Header title="스꾸게시판" onBackClick={handleBackClick}/>
            </Container>
          <Container sx={{ p: '0 24px', mt: '72.5px'}}>
            {/* 작성자 프로필 */}
            <Grid sx={{display: 'flex', alignItems: 'center', p: '10px 0'}}>
              {user && displayMBTI(user.image, 60, 60)}
              <Grid sx={{ml: '10px'}}>
                  <Typography sx={{fontSize: '14px', fontWeight: 800, color: '#3C3C3C'}}>{user && user.nickname}</Typography>
                  <Typography sx={{fontSize: '12px', fontWeight: 700, color: '#BABABA'}}>{displayPost.uploadDay} {displayPost.uploadTime}</Typography>
              </Grid>
            </Grid>

            {/* 게시글 */}
            <Grid sx={{display: 'flex', flexDirection: 'column', p: '10px 0', overflowX: 'hidden'}}>
              <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontSize: '18px', fontWeight: 800, color: '#3C3C3C'}}>{displayPost.title}</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: 400, color: '#3C3C3C', mt: '14px'}}>{displayPost.content}</Typography>
              </Grid>
              
              <Grid sx={{display: 'flex', overflowX: 'scroll', p: '10px 0', mt: '10px', gap: '10px',
                scrollbarWidth: 'none',  // Firefox에
                '-ms-overflow-style': 'none',  // IE, Edge에
                '&::-webkit-scrollbar': {
                  display: 'none',  // Chrome, Safari
              } }}>
                {displayPost.image.length != 0 && displayPost.image.map((image, index) => (
                  <Box key={index}>
                    <img src={image} width={150} height={150} style={{borderRadius: '10px'}}/>
                  </Box>
                ))}
              </Grid>

              <Grid sx={{display: 'flex', mt: '10px', justifyContent: 'space-between'}}>
                  <Grid item sx={{ display: 'flex', alignItems: 'center'}}>
                      <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                      <Typography sx={{fontSize: '12px', ml: '3px', color: '#FFCE00', fontWeight: 600}}>
                        {displayPost.likes}
                      </Typography>

                      <ChatBubbleOutlineIcon sx={{width: '13px', color: '#72D270', ml: '7px'}} />
                      <Typography sx={{fontSize: '12px', ml: '3px', color: '#72D270', fontWeight: 600, ml: 0.5}}>
                        {displayPost.comments}
                      </Typography>
                  </Grid>
                <div>
                  <Button startIcon={<FavoriteBorderIcon sx={{ width: '15px' }} />} sx={{backgroundColor: '#FBFBFB', p: '7px 11px', borderRadius: '10px', color: '#9E9E9E', fontWeight: 700, fontSize: '12px'}}>
                    좋아요
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Divider orientation='horizontal' sx={{width: '100%', borderBottom: '10px solid #FBFBFB'}}/> 
          </Container>

          {/* 댓글 */}
          
          {/* 입력창 */}
          <Container sx={{justifyContent: 'center', position: 'fixed', bottom: '24px'}}>
            <CustomInputField />
          </Container>
      </ThemeProvider>
    );
};

export default PostDetail;
