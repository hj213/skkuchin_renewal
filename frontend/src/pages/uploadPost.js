import React from 'react';
import { Container, Typography, TextField, Button, ThemeProvider, CssBaseline, Grid } from '@mui/material';
import UploadHeader from '../components/SkkuChat/UploadHeader';
import theme from '../theme/theme';
import { useRouter } from 'next/router';

const UploadPost = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    const handleCompleteClick = () => {
        alert("게시글 작성 완료!!");
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <UploadHeader onBackClick={handleBackClick} onCompleteClick={handleCompleteClick}/>
            </Container>
            <Container sx={{ mt: '63px',  p: '24px'}}>
                <form>
                    {/* 제목 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777' }}>
                            제목
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (최대 00자)
                        </Typography>
                    </Grid>
                    <input
                        type='text'
                        placeholder='글 제목을 입력해주세요.'
                        placeholderTextColor='#BABABA'
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            padding: '16px',
                            marginBottom: '20px',
                            border: '1px solid #E2E2E2',
                            borderRadius: '12px',
                            outline: 'none',
                        }}
                    >
                    </input>
                    {/* 게시글 내용 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777'}}>
                            게시글
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (최대 00자)
                        </Typography>
                    </Grid>
                    <textarea
                        placeholder='내용을 입력해주세요.'
                        placeholderTextColor='#BABABA'
                        style={{
                            width: '100%',
                            height: '231px',
                            fontSize: '16px',
                            padding: '16px',
                            marginBottom: '20px',
                            border: '1px solid #E2E2E2',
                            borderRadius: '12px',
                            outline: 'none',
                            resize: 'none',
                        }}
                    >
                    </textarea>
                    {/* 태그 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777' }}>
                            태그 선택
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (1개)
                        </Typography>
                    </Grid>
                    
                    {/* 사진 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px'}}>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#777777' }}>
                            사진
                        </Typography>
                        <Typography component="div" sx={{ fontSize: '14px', color: '#BABABA' }}>
                            (선택)
                        </Typography>
                    </Grid>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default UploadPost;
