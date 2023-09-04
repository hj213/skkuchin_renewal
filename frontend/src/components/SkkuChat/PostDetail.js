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
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CustomInputField from './CustomInputField';
import { load_comment, clear_prev_comment } from '../../actions/comment/comment';

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
    const dispatch = useDispatch();

    const comments = useSelector(state => state.comment.comment);

    useEffect(() => {
      dispatch(clear_prev_comment());

      if(postId) {
          dispatch(load_comment(postId, ([result, message]) => {
            if (result) {
                console.log("댓글 불러오기 성공")
            } else {
                console.log("댓글 불러오기 오류" + message);
            }
        }));
      }
    }, []);

    const handleBackClick = () => {
      router.back();
    };

    // 더미데이터 사용
    const user = useSelector(state => state.auth.user);

    const selectedPost = posts.find(post => post.id == postId);

    const displayPost = selectedPost || posts[0]; // 디폴트 데이터

    const handleImageClick = (index) => {
      router.push(`/image-viewer/${postId}/${index}?images=${JSON.stringify(displayPost.image)}`);
    };

    if(comments === null) return (<div>loading...</div>);

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
                'msOverflowStyle': 'none',  // IE, Edge에
                '&::-webkit-scrollbar': {
                  display: 'none',  // Chrome, Safari
              } }}>
                {displayPost.image.length != 0 && displayPost.image.map((image, index) => (
                  <Box key={index}>
                    <img src={image} width={150} height={150} style={{borderRadius: '10px', cursor: 'pointer'}}/>
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
            <Divider orientation='horizontal' sx={{width: '100vw', left: 0, position: 'absolute', borderBottom: '10px solid #FBFBFB'}}/> 
          </Container>

          {/* 댓글 */}
          <Container sx={{p: '0 24px 58px', mt: '10px', overflow: 'hidden', height: 'max-content'}}>
            <Grid sx={{display: 'flex', flexDirection: 'column', p: '10px 0', overflowX: 'hidden'}}>
              {comments && comments.map((comment, index) => (
                <Grid key={index} sx={{display: 'flex', flexDirection: 'column', p: '10px 0', borderBottom: '1px solid #F2F2F2'}}>
                  {/* 프로필 이미지, 닉네임 */}
                  <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Grid item sx={{display: 'flex', alignItems: 'center', gap: '7px'}}>
                      {displayMBTI(comment.user_image, 35, 35)}
                      <Typography sx={{fontSize: '12px', fontWeight: 800, color: '#3C3C3C'}}>
                        {comment.nickname}
                        {comment.my_comment && <span style={{ color: '#FFCE00' }}> (나)</span>}
                      </Typography>
                    </Grid>
                    <Grid item sx={{display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FBFBFB', p: '0px 9px', borderRadius: '10px'}}>
                      <FavoriteBorderIcon sx={{width: '13px', color: '#BABABA'}} />
                      <Divider orientation='vertical' sx={{height: '7px', backgroundColor: '#E2E2E2'}}/>
                      <ChatBubbleOutlineIcon sx={{width: '13px', color: '#BABABA'}} />
                      <Divider orientation='vertical' sx={{height: '7px', backgroundColor: '#E2E2E2'}}/>
                      <MoreVertOutlinedIcon sx={{width: '13px', color: '#BABABA'}} />
                    </Grid>
                  </Grid>
                  {/* 댓글 내용 */}
                  <Typography sx={{fontSize: '14px', fontWeight: 400, color: '#3C3C3C', m: '10px 0'}}>{comment.content}</Typography>
                  {/* 업로드 시간, 좋아요 */}
                  <Grid sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <Typography sx={{fontSize: '12px', fontWeight: 700, color: '#BABABA'}}>{comment.display_time}</Typography>
                      <Grid sx={{display: 'flex', alignItems: 'center'}}>
                        <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                        <Typography sx={{fontSize: '12px',color: '#FFCE00', ml: '3px', fontWeight: 600}}> {comment.comment_likes}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Container>
          {/* 입력창 */}
          <Container sx={{justifyContent: 'center', position: 'fixed', backgroundColor: '#fff', bottom: '0px', pb: '24px'}}>
            <CustomInputField article_id={postId}/>
          </Container>
      </ThemeProvider>
    );
};

export default PostDetail;
