import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, ThemeProvider, CssBaseline, Grid, Checkbox } from '@mui/material';
import UploadHeader from '../components/SkkuChat/UploadHeader';
import theme from '../theme/theme';
import { useRouter } from 'next/router';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useDispatch } from 'react-redux';
import { enroll_post, load_all_posts } from '../actions/post/post';

const tagToArticleType = {
    "뭐 먹을까요?": "WHAT_TO_EAT",
    "같이 먹어요": "TOGETHER",
    "기타": "ETC"
};

const UploadPost = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [isAnonymous, setIsAnonymous] = useState(true);
    
    const [images, setImages] = useState([]);

    const isValidForm = title !== '' && content !== '' && selectedTag !== null;

    const handleTagClick = (tag) => {
        if (selectedTag === tag) {
          setSelectedTag(null);
        } else {
          setSelectedTag(tag);
        }
    };    

    const onChangeImages = (e) => {
        const fileArray = Array.from(e.target.files);
        setImages(fileArray);
    
        const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
    };
        
    const [previewImages, setPreviewImages] = useState([]);

    const handleAnonymousClick = () => {
        setIsAnonymous(!isAnonymous);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleBackClick = () => {
        router.back();
    };

    const handleCompleteClick = () => {
        const selectedArticleType = tagToArticleType[selectedTag];

        dispatch(enroll_post(title, content, selectedArticleType, isAnonymous, ([result, message]) => {
            if (result) {
                console.log("게시글 작성 완료!!")
                dispatch(load_all_posts());
                router.push('/freeCommunity');
            } else {
                alert("게시글 작성 오류" + message);
            }
        }));
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container fixed style={{ position:'fixed', zIndex:'4', padding:'24px 24px 5px', overflow: "hidden", height:'max-content', maxWidth:'420px', top: '0', backgroundColor: '#fff'}} >
                <UploadHeader onBackClick={handleBackClick} onCompleteClick={handleCompleteClick} isValidForm={isValidForm}/>
            </Container>
            <Container sx={{ mt: '63px',  p: '24px'}}>
                <form>
                    {/* 익명 여부 */}
                    <Grid sx={{ display: 'flex', mb: '8px', columnGap: '4px', alignItems: 'center', justifyContent: 'end'}}>
                        <Typography sx={{ fontSize: '14px', color: isAnonymous ? '#FFCE00' : '#777777' , fontWeight: 700}}>
                            익명
                        </Typography>
                        <Checkbox
                            checked={isAnonymous}
                            onChange={handleAnonymousClick}
                            sx={{ color: '#FFCE00', p: 0 }}
                        />
                    </Grid>
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
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            padding: '16px',
                            marginBottom: '20px',
                            border: '1px solid #E2E2E2',
                            borderRadius: '12px',
                            outline: 'none',
                        }}
                        onChange={handleTitleChange}
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
                        onChange={handleContentChange}
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
                    <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', mb: '20px'}}>
                        <Grid item>
                            {
                            ["뭐 먹을까요?", "같이 먹어요", "기타"].map((tag, index) => (
                                <Button key={index} 
                                    style={{
                                        fontSize:'14px', 
                                        fontWeight: 400, 
                                        color: '#3C3C3C',
                                        backgroundColor: selectedTag === tag ? '#FFFCE4' : 'transparent',
                                        padding: '3px 20px', 
                                        marginRight: '8px', 
                                        borderRadius: '20px', 
                                        border: selectedTag === tag ? '1px solid #FFCE00' : '1px solid #E2E2E2',
                                    }}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </Grid>     
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
                    <Grid container style={{position:'relative', width:'100%'}}>
                        <Grid item style={{overflowX: 'auto', whiteSpace: 'nowrap', flexWrap: 'nowrap'}}>
                            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', marginRight: '10px'}}>
                                <input onChange={e => onChangeImages(e)} style={{position: 'absolute', fontSize: '100px', left: '0', top: '0', opacity: '0', zIndex: '5' }} type="file" name="images" accept="image/*" multiple />
                                <label style={{width:'150px', height:'150px', textAlign:'center', display: 'inline-block', cursor: 'pointer',borderRadius:'10px', backgroundColor:'white', border: '1px solid #E2E2E2', padding:'55px 0 0 7px'}} htmlFor="images">
                                    <AddPhotoAlternateOutlinedIcon style={{width: '20px', color:'#BABABA'}}/>
                                </label>
                            </div>
                            {previewImages.map((previewImage, index) => (
                                <Grid item key={index} style={{ display:'inline-block',flexShrink: 0, position:'relative', width: '150px', height: '150px',overflow: 'hidden', borderRadius: '10px', marginRight: '10px'}}>
                                    <img key={previewImage} src={previewImage} alt="preview" 
                                        style={{
                                            width: '100%',
                                            height: '100%', 
                                            objectFit: 'cover',
                                        }} />
                                </Grid>
                                
                            ))}
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </ThemeProvider>
    );
};

export default UploadPost;
