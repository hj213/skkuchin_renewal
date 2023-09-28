import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import 'moment/locale/ko';
import {Box, TextField, CssBaseline, Paper, Input, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import check from '../image/check_3.png';

import blank from '../image/chat/check_box_outline_blank.png';
import checked from '../image/chat/check_box.png'
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReportReason = ({ tag, checkedTag, onClick }) => {
    return (
      <Grid
        style={{
          display: 'flex',
          margin: '25px 15px 0 15px',
          width: '100%',
        }}
      >
        <Image
          src={checkedTag ? checked : blank}
          width={27.6}
          height={27.6}
          alt={`tag-${tag}`}
          onClick={onClick}
        />
        <Typography style={{ fontSize: '16px', marginLeft: '8px', paddingTop: '2px' }}>
          {tag}
        </Typography>
      </Grid>
    );
};
 
  
const reportCommunity = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [checkedTag, setCheckedTag] = useState(null);
    const [showInputBox, setShowInputBox] = useState(false);
    const [content, setContent] = useState('');
  
    const [tagChoose, setTagChoose] = useState({
        '관련_없는_주제_허위사실':false,
        '욕설_비하':false,
        '음란_선정성':false,
        '영리목적_홍보성':false,
        '정당_정치인_비하_및_선거운동':false,
        '기타':false,
    })
    
    const handleBack = () => {
      router.back();
    };
  
    const handleTagClick = (tag) => {
      if (tag === checkedTag) {
        setCheckedTag(null);
      } else {
        setCheckedTag(tag);
      }
      if (tag === '기타') {
        setShowInputBox(!showInputBox);
      } else {
        setShowInputBox(false);
      }
    };
  
    const handleSubmit = () => {
      const selectedTag = checkedTag || '기타';
      dispatch(enroll_report(selectedTag, content, reviewId, null, ([result, message]) => {
        if (result) {
          router.back();
        } else {
          console.log('실패!: ' + message);
        }
      }));
    };
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container style={{ padding: '0px', margin: '50px 0px 0px 0px', overflow: 'hidden', maxWidth: '420px' }}>
          <Container fixed style={{ padding: '0px 16px 0px 0px', overflow: 'hidden' }}>
            <Card elevation={0} style={{ position: 'fixed', top: '0px', width: '100%', height: '98px', zIndex: '4', border: 'none' }}>
              <Grid container style={{ padding: '30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center', maxWidth: '420px' }}>
                <Grid style={{ padding: '0px 10px 0px 0px' }}>
                  <Image src={back} width={12} height={20} name='back' onClick={handleBack} layout='fixed' />
                </Grid>
                <Grid>
                  <Grid style={{ flexDirection: 'row' }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '500', lineHeight: '28px', pr: '4px' }} color="#000000" component="span">
                      신고하기
                    </Typography>
                  </Grid>
                </Grid>
                <Grid style={{ width: '14px' }}></Grid>
              </Grid>
            </Card>
          </Container>
  
          <Container style={{ padding: '0px' }}>
            <Grid container style={{ margin: '45px 0px 0px 20px' }}>
              <Grid item style={{ margin: '0px 0px 0px 5px' }}>
                <Typography style={{ margin: '2px 0px 0px 0px', textAlign: 'left', fontSize: '16px' }} fontWeight={theme.typography.h1}>
                  사용자를 신고하시려는 이유를 선택해주세요.
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Container style={{ padding: '0px', margin: '20px 0px 0px 30px' }}>
            <Grid sx={{ width: '100%' }}>
              <div style={{ margin: '-20px -20px 0', padding: '0 0px 10px 0px' }}>
                <Grid container style={{ margin: '0 0px 11px 0px', justifyContent: 'left', maxWidth: '350px' }}>
                  {Object.keys(tagChoose).map((tag) => (
                    <ReportReason
                      key={tag}
                      tag={tag}
                      checkedTag={checkedTag === tag}
                      onClick={() => handleTagClick(tag)}
                    />
                  ))}
                  <Box sx={{ width: 1300, maxWidth: '90%', margin: '0 auto 20px auto' }}>
                    {showInputBox && (
                      <div style={{ margin: '10px auto 10px auto' }}>
                        <TextField
                          sx={{ fontSize: 12 }}
                          fullWidth
                          placeholder="기타 신고 사유를 입력해주세요."
                          value={content}
                          onChange={(event) => setContent(event.target.value)}
                        />
                      </div>
                    )}
                  </Box>
                </Grid>
              </div>
            </Grid>
          </Container>
          <Container style={{ justifyContent: 'center', position: 'relative', bottom: 0, zIndex: '5' }}>
            <div style={{ textAlign: 'center', marginBottom: '53px' }}>
              <Image src={check} width={300} height={56} onClick={handleSubmit} placeholder="blur" layout='fixed' />
            </div>
          </Container>
        </Container>
      </ThemeProvider>
    );
  };
  

export default dynamic(() => Promise.resolve(reportCommunity), {
    ssr: false,
});