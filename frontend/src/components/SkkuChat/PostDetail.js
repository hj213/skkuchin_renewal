import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Grid, CssBaseline, ThemeProvider, Button, Divider, Box } from '@mui/material';
import theme from '../../theme/theme';
import Header from './Header';
import { useRouter } from 'next/router';
import { displayMBTI } from '../Matching/MBTIList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { load_comment, clear_prev_comment } from '../../actions/comment/comment';
import { load_post, clear_prev_post } from '../../actions/post/post';
import { enroll_like } from '../../actions/like/like';
import Comment from './Comment';

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
      image: ['https://picsum.photos/200', 'https://picsum.photos/300', 'https://picsum.photos/400']
  },
];

const articleTypeToTag = {
  "WHAT_TO_EAT": "뭐 먹을까요?",
  "TOGETHER": "같이 먹어요",
  "ETC": "기타"
};

const PostDetail = ({ postId }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const post = useSelector(state => state.post.post);
    const comments = useSelector(state => state.comment.comment);

    useEffect(() => {
      dispatch(clear_prev_post());
      dispatch(clear_prev_comment());
      
      if(postId) {
        dispatch(load_post(postId, ([result, message]) => {
          if (result) {
            console.log("게시글 불러오기 성공")
          } else {
            console.log("게시글 불러오기 오류" + message);
          }
        }));

        dispatch(load_comment(postId, ([result, message]) => {
            if (result) {
                console.log("댓글 불러오기 성공");
                console.log(comments)
            } else {
                console.log("댓글 불러오기 오류" + message);
            }
        }));
      }
    }, []);

    const handleBackClick = () => {
      router.back();
    };

    const handleLikeBtn = (postId) => {
        console.log(postId);
        dispatch(enroll_like(postId, ([result, message]) => {
          if (result) {
            console.log("좋아요 성공")
          }
          else {
            console.log("좋아요 실패" + message);
          }
        }));
    };

    const handleDeleteBtn = (postId) => {
        console.log(postId);
        alert("취소 시도")
    };

    if(post === null || comments === null) return (<div>loading...</div>);

    return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
            {post && <Header title="스꾸게시판" onBackClick={handleBackClick} post={post[0]}/> }
          </Container>
          <Container sx={{ p: '0 24px', mt: '72.5px'}}>
            {/* 작성자 프로필 */}
            <Grid sx={{display: 'flex', alignItems: 'center', p: '10px 0'}}>
              {post && displayMBTI(post[0].user_image, 60, 60)}
              <Grid sx={{ml: '10px'}}>
                  <Typography sx={{fontSize: '14px', fontWeight: 800, color: '#3C3C3C'}}>{post && post[0].nickname}</Typography>
                  <Typography sx={{fontSize: '12px', fontWeight: 700, color: '#BABABA'}}>{post && post[0].display_time}</Typography>
              </Grid>
            </Grid>

            {/* 게시글 */}
            <Grid sx={{display: 'flex', flexDirection: 'column', p: '10px 0', overflowX: 'hidden'}}>
              <Grid sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{fontSize: '18px', fontWeight: 800, color: '#3C3C3C'}}>{post[0].title}</Typography>
                <Typography sx={{fontSize: '14px', fontWeight: 400, color: '#3C3C3C', mt: '17px'}}>{post[0].content}</Typography>
              </Grid>
              
              <Typography sx={{fontSize: '12px', fontWeight: 900, color: '#BABABA', mt: '17px'}}>{'#' + articleTypeToTag[post[0].article_type]}</Typography>

              <Grid sx={{display: 'flex', overflowX: 'scroll', p: '10px 0', mt: post[0].image && post[0].image.length != 0  ? '10px' : 0, gap: '10px',
                scrollbarWidth: 'none',  // Firefox에
                'msOverflowStyle': 'none',  // IE, Edge에
                '&::-webkit-scrollbar': {
                  display: 'none',  // Chrome, Safari
              } }}>
                {post[0].image && post[0].image.length != 0 && post[0].image.map((image, index) => (
                  <Box key={index}>
                    <img src={image} width={150} height={150} style={{borderRadius: '10px', cursor: 'pointer'}}/>
                  </Box>
                ))}
              </Grid>

              <Grid sx={{display: 'flex', mt: '10px', justifyContent: 'space-between'}}>
                  <Grid item sx={{ display: 'flex', alignItems: 'center'}}>
                      { post[0].user_liked === true ?
                        <FavoriteIcon sx={{width: '15px', color: '#FFCE00'}} />
                        :
                        <FavoriteBorderIcon sx={{width: '15px', color: '#FFCE00'}} />
                      }
                      <Typography sx={{fontSize: '12px', ml: '3px', color: '#FFCE00', fontWeight: 600}}>
                        {post[0].article_like_count}
                      </Typography>

                      <ChatBubbleOutlineIcon sx={{width: '13px', color: '#72D270', ml: '7px'}} />
                      <Typography sx={{fontSize: '12px', ml: '3px', color: '#72D270', fontWeight: 600, ml: 0.5}}>
                        {post[0].comment_count}
                      </Typography>
                  </Grid>
                <div>
                { post[0].user_liked === true ?
                  <Button onClick={()=> handleDeleteBtn(post[0].id)} startIcon={<FavoriteIcon sx={{ width: '15px', color: '#BABABA' }} />} sx={{backgroundColor: '#FBFBFB', p: '7px 11px', borderRadius: '10px', color: '#9E9E9E', fontWeight: 700, fontSize: '12px'}}>
                    좋아요 취소
                  </Button>                
                  :
                  <Button onClick={()=> handleLikeBtn(post[0].id)} startIcon={<FavoriteBorderIcon sx={{ width: '15px' }} />} sx={{backgroundColor: '#FBFBFB', p: '7px 11px', borderRadius: '10px', color: '#9E9E9E', fontWeight: 700, fontSize: '12px'}}>
                    좋아요
                  </Button>
                }
                </div>
              </Grid>
            </Grid>
          </Container>
          
          <Divider orientation='horizontal' sx={{width: '100%', borderBottom: '10px solid #FBFBFB'}}/> 

          {/* 댓글 */}
          { comments && 
            <Container sx={{p: '0 0 58px', overflow: 'hidden', height: 'max-content'}}>
              <Grid sx={{display: 'flex', flexDirection: 'column', p: '0 0 10px', overflowX: 'hidden'}}>
                <Comment comments={comments} postId={post[0].id}/>
              </Grid>
            </Container>
          }

      </ThemeProvider>
    );
};

export default PostDetail;
