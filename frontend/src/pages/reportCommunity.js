import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import 'moment/locale/ko';
import {Box, TextField, CssBaseline, Checkbox, ThemeProvider, Typography, Grid, Container } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import blank from '../image/chat/check_box_outline_blank.png';
import checked from '../image/chat/check_box.png'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import UploadHeader from "../components/SkkuChat/UploadHeader";

  
const reportCommunity = () => {
  
    const router = useRouter();
    const dispatch = useDispatch();
   
    // 신고 선택
    const tags = [
      { id: '욕설_비하', text: '욕설/비하' },
      { id: '음란_선정성', text: '음란/선정적인 내용' },
      { id: '부적절', text: '게시판 성격에 부적절함' },
      { id: '영리목적_홍보성', text: '영리/홍보 목적의 내용' },
      { id: '정당_정치인_비하_및_선거운동', text: '정치/종교적인 내용' },
      { id: '낚시_도배', text: '낚시/도배' },
      { id: '기타', text: '기타' },
    ];

    const [checkedTag, setCheckedTag] = useState(null);
    const [tagChoose, setTagChoose] = useState({});
    const [showInputBox, setShowInputBox] = useState(false);
    const [content, setContent] = useState('');
    
    const isValidForm = Object.values(tagChoose).some((value) => value === true) &&
    (!tagChoose['기타'] || (tagChoose['기타'] && content !== ''));
    
    const handleTagClick = (event) => {
        const tagId = event.currentTarget.id;
        console.log(tagId);
        setTagChoose((prevTags) => ({ ...prevTags, [tagId]: !prevTags[tagId] }));

        if (tagId == '기타') {
          setShowInputBox((prevShowInputBox) => !prevShowInputBox);
        }
    
        if (tagId == checkedTag) {
            setCheckedTag(null);
        } else {
            setCheckedTag(tagId);
        }
    };

    const handleCompleteClick = () => {
      alert("신고하기 클릭!");
      // const selectedTag = checkedTag || '기타';
      // dispatch(enroll_report(selectedTag, content, reviewId, null, ([result, message]) => {
      //   if (result) {
      //     router.back();
      //   } else {
      //     console.log('실패!: ' + message);
      //   }
      // }));
    };

    const handleBackClick = () => {
        router.back();
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
            <UploadHeader onBackClick={handleBackClick} onCompleteClick={handleCompleteClick} isValidForm={isValidForm} isReport={true}/>
        </Container>
        <Container sx={{ mt: '78px', p: '30px 24px', overflow: 'hidden', maxWidth: '420px' }}>
          <Typography sx={{fontSize: '18px', fontWeight: 700}}>
              해당 사용자에 대한 신고사유를 알려주세요.
          </Typography>
          <Container sx={{p: 0}}>
            <Typography sx={{fontSize: '14px', fontWeight: 700, color: '#9E9E9E', p: '30px 0 10px'}}>
              신고사유
            </Typography>
            <Grid>
              {tags.map((tag) => (
                <Grid key={tag.id} sx={{ display: 'flex', p: '10px 0', width: '100%', alignItems: 'center' }}>
                  <Checkbox
                    checked={tagChoose[tag.id] || false}
                    onChange={handleTagClick}
                    id={tag.id}
                    sx={{ p: '4px', mr: '8px', color: '#9E9E9E' }}
                  />
                  <Typography style={{ fontSize: '16px', fontWeight: 400, color: '#3C3C3C' }}>
                    {tag.text}
                  </Typography>
                </Grid>
              ))}
              <Box>
                {showInputBox && (
                  <>
                    <Typography sx={{color: '#9E9E9E', fontWeight: 700, fontSize: '14px'}}>
                      기타 신고사유
                    </Typography>
                    <div style={{ margin: '10px auto 10px auto' }}>
                      <TextField
                        sx={{ fontSize: 12 }}
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="상세한 신고 사유를 입력해주세요."
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                      />
                    </div>
                  </>
                )}
              </Box>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    );
  };
  

export default dynamic(() => Promise.resolve(reportCommunity), {
    ssr: false,
});