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
import { enroll_report } from "../actions/report/report";
import dynamic from 'next/dynamic';

const reportReview = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const reviewId = router.query.reviewId;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleBack = (e) => {
        router.back();
    }

    // 신고 선택
    const [tagChoose, setTagChoose] = useState({
        '관련_없는_주제_허위사실':false,
        '욕설_비하':false,
        '음란_선정성':false,
        '영리목적_홍보성':false,
        '정당_정치인_비하_및_선거운동':false,
        '기타':false,
    })

    const handleTagClick = (event) => {
        const tagId = event.target.id;
        setTagChoose(prevState => {
            const newTagChoose = {...prevState};
            for (const tag in newTagChoose) {
                if (tag !== tagId) {
                    newTagChoose[tag] = false;
                }
            }
            newTagChoose[tagId] = !prevState[tagId];
            return newTagChoose;
            });
    };

    const [showInputBox, setShowInputBox] = useState(false);
    const [content, setContent] = useState(null);

    const handleSubmit = () => {
        const selectedTag = Object.keys(tagChoose).find(tag => tagChoose[tag]);
        
        dispatch(enroll_report(selectedTag, content, reviewId, null, ([result, message])=>{
            if(result){
                router.back();
            } else {
                console.log("실패!: " +message);
            }
        }));
    }
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Container style={{padding:'0px', margin:'50px 0px 0px 0px', overflow:'hidden'}}>
                    <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                        <Card elevation={0} style={{
                            position: 'fixed',
                            top: '0px',
                            width: '100%',
                            height: '98px',
                            zIndex: '4',
                            border: 'none',
                        }}>
                            <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid style={{padding: '0px 10px 0px 0px'}}>
                                    <Image src={back} width={12} height={20} name='back' onClick={handleBack} layout='fixed' />
                                </Grid>

                                <Grid>
                                    <Grid style={{flexDirection: 'row'}}>
                                        <Typography sx={{fontSize: '18px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                            신고하기
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid style={{width:'14px'}}>

                                </Grid> 
                            </Grid>
                        </Card>
                    </Container>

                    <Container style={{padding:'0px'}}>
                        <Grid container style={{margin:'45px 0px 0px 20px'}}>
                            <Grid item style={{margin:'0px 0px 0px 5px'}}>
                                <Typography style={{ margin:'2px 0px 0px 0px', textAlign:'left', fontSize:'16px'}} fontWeight={theme.typography.h1}>
                                    사용자를 신고하시려는 이유를 선택해주세요.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px', margin:'20px 0px 0px 30px'}}>

                    <Grid sx={{width: '100%'}}>
                        <div style={{margin: '-20px -20px 0', padding: '0 0px 10px 0px',}}>
                            <Grid container style={{margin: '0 0px 11px 0px',  justifyContent: 'left', maxWidth:'350px'}}>
                                <Grid style={{display: 'flex', margin:'25px 15px 0 15px', width:'100%'}}>
                                    <Image
                                        src={tagChoose['관련_없는_주제_허위사실'] ? checked : blank}
                                        width= {27.6}
                                        height= {27.6}
                                        alt="tag1"
                                        onClick={handleTagClick}
                                        id='관련_없는_주제_허위사실'
                                    />
                                    <Typography style={{fontSize:'16px', marginLeft:"8px", paddingTop:'2px'}}>
                                        관련 없는 주제/허위사실이에요
                                    </Typography>
                                </Grid>
                                <Grid style={{display: 'flex', margin:'25px 15px 0 15px', width:'100%'}}>
                                    <Image
                                        src={tagChoose['욕설_비하'] ? checked : blank}
                                        width= {27.6}
                                        height= {27.6}
                                        alt="tag2"
                                        onClick={handleTagClick}
                                        id='욕설_비하'
                                    />
                                    <Typography style={{fontSize:'16px', marginLeft:"8px", paddingTop:'2px'}}>
                                        욕설/비하를 해요
                                    </Typography>
                                </Grid>
                                <Grid style={{display: 'flex', margin:'25px 15px 0 15px', width:'100%'}}>
                                    <Image
                                        src={tagChoose['음란_선정성'] ? checked : blank}
                                        width= {27.6}
                                        height= {27.6}
                                        alt="tag3"
                                        onClick={handleTagClick}
                                        id='음란_선정성'
                                    />
                                    <Typography style={{fontSize:'16px', marginLeft:"8px", paddingTop:'2px'}}>
                                        음란/선정적인 이야기를 해요
                                    </Typography>
                                </Grid>
                                <Grid style={{display: 'flex', margin:'25px 15px 0 15px', width:'100%'}}>
                                    <Image
                                        src={tagChoose['영리목적_홍보성'] ? checked : blank}
                                        width= {27.6}
                                        height= {27.6}
                                        alt="tag4"
                                        onClick={handleTagClick}
                                        id='영리목적_홍보성'
                                    />
                                    <Typography style={{fontSize:'16px', marginLeft:"8px", paddingTop:'2px'}}>
                                        영리/홍보 목적의 이야기를 해요
                                    </Typography>
                                </Grid>
                                <Grid style={{display: 'flex', margin:'25px 15px 0 15px', width:'100%'}}>
                                    <Image
                                        src={tagChoose['정당_정치인_비하_및_선거운동'] ? checked : blank}
                                        width= {27.6}
                                        height= {27.6}
                                        alt="tag5"
                                        onClick={handleTagClick}
                                        id='정당_정치인_비하_및_선거운동'
                                    />
                                    <Typography style={{fontSize:'16px', marginLeft:"8px", paddingTop:'2px'}}>
                                        정치/종교적 대화를 시도해요
                                    </Typography>
                                </Grid>
                                <Grid style={{display: 'flex', margin:'25px 15px 0 15px', width:'100%',}}>
                                    <Image
                                        src={tagChoose['기타'] ? checked : blank}
                                        width= {27.6}
                                        height= {27.6}
                                        alt="tag7"
                                        onClick={(event) => {
                                            handleTagClick(event);
                                            setShowInputBox(!showInputBox)
                                        }}
                                        id='기타'
                                    />
                                    <Typography style={{fontSize:'16px', marginLeft:"8px", paddingTop:'2px'}}>
                                        기타
                                    </Typography>
                                </Grid>
                                <Box sx={{width:1300, maxWidth:'90%', margin:'0 auto 20px auto'}}>
                                    {showInputBox &&
                                        <div style={{margin: '10px auto 10px auto'}}>
                                            <TextField 
                                                sx={{fontSize:12}} 
                                                fullWidth 
                                                placeholder="기타 신고 사유를 입력해주세요." 
                                                value={content}
                                                onChange={(event) => setContent(event.target.value)} 
                                            />
                                        </div>
                                    }
                                </Box>
                            </Grid>
                        </div>
                    </Grid>

                    </Container>
                    <Container style={{justifyContent:'center', position: "relative", bottom: 0, zIndex: '5'}}>
                        <div style={{ textAlign:'center', marginBottom:'53px'}}>
                            <Image src={check} width={300} height={56} onClick={handleSubmit} placeholder="blur" layout='fixed'/>
                        </div>
                    </Container>
                </Container>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(reportReview), {
    ssr: false,
});