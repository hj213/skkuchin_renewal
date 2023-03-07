import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Typography, Button, Grid, Popover, Modal, IconButton, Dialog,DialogContent,DialogActions,  } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import theme from '../theme/theme';
import { useState, useEffect } from 'react';
import {Container} from '@mui/material';
import { change_status_info, load_matching_info } from '../actions/matchingUser/matchingUser';

// 스위치
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import Image from 'next/image';
import Link from 'next/link';

import closeIcon from '../image/close.png';
import profile from '../image/profile.png';

//mbti 프로필
import profile1 from '../image/mbti/profile/mainCharacter.png';
import profile2 from '../image/mbti/profile/mealCharacter.png';
import ENFJ from '../image/mbti/profile/ENFJ.png';
import ENTP from '../image/mbti/profile/ENTP.png';
import INFP from '../image/mbti/profile/INFP.png';
import ENFP from '../image/mbti/profile/ENFP.png';
import ISTJ from '../image/mbti/profile/ISTJ.png';
import ISTP from '../image/mbti/profile/ISTP.png';
import ISFP from '../image/mbti/profile/ISFP.png';
import INTP from '../image/mbti/profile/INTP.png';
import ESTJ from '../image/mbti/profile/ESTJ.png';
import INFJ from '../image/mbti/profile/INFJ.png';
import ENTJ from '../image/mbti/profile/ENTJ.png';
import ESTP from '../image/mbti/profile/ESTP.png';
import ESFJ from '../image/mbti/profile/ESFJ.png';
import INTJ from '../image/mbti/profile/INTJ.png';
import ISFJ from '../image/mbti/profile/ISFJ.png';
import ESFP from '../image/mbti/profile/ESFP.png';

const AiGreeting = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const userInfo = useSelector(state => state.matchingUser.matchingUser);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [status, setStatus] = useState(false);

    const src ={
        DEFAULT1: profile1,
        DEFAULT2: profile2,
        INFP:INFP,
        ENFJ:ENFJ,
        ENTP:ENTP,
        ENFP:ENFP,
        ISTJ:ISTJ,
        ISTP:ISTP,
        ISFP:ISFP,
        INTP:INTP,
        ESTJ:ESTJ,
        INFJ:INFJ,
        ENTJ:ENTJ,
        ESTP:ESTP,
        ESFJ:ESFJ,
        INTJ:INTJ,
        ISFJ:ISFJ,
        ESFP:ESFP,
    }
    
    // useEffect(() => {
    //     if (dispatch && dispatch !== null && dispatch !== undefined) {
    //         dispatch(load_matching_info(([result, message]) => {
    //             if (result) {
    //                 // alert(message);
    //                 setLoad(true);
    //             } else {
    //                 // alert(message);
    //                 setLoad(false);
    //             }
    //         }));
    //     }
    // }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            setStatus(userInfo.matching);
        }
    }, [userInfo])
    
    //매칭프로필 정보 받아오기
    const [load, setLoad] = useState('');

    //프로필 설정하라는 다이얼로그
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (e) => {
        if(dialogOpen){
            setDialogOpen(false);
        } else{
            setDialogOpen(true);
        }
    }

    const handleMatching = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(change_status_info(!status, ([result, message]) => {
                if (result) {

                } else {

                }
                console.log(result, message);
            }))
        }
        setStatus(!status);
    }

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} onClick={handleMatching} checked={status} />
        ))(({ theme }) => ({
            width: 40,
            height: 22,
            padding: 0,

            '& .MuiSwitch-switchBase': {
            padding: 1,
            margin: 3,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#FFCE00',
                opacity: 1,
                border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#FFCE00',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
            },
            '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 15,
            height: 15,
            },
            '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
            },
    }));

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if(load){
            setOpen(true);
            setDialogOpen(false);
        }else{
        setOpen(false);
        setDialogOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMoveProfile = () => {
        router.push({
            pathname: '/makeProfile',
            query: { src : '매칭프로필설정', }
        })
    }

    const authLinks = (
        <div style={{ position:"relative", paddingTop:"10px", width: "100%", background: "white", alignContent:"center", maxWidth:"600px"}}>
            <div style={{ display: "flex", justifyContent: "space-between", padding:"10px 15px 0px 15px"}}>
                <Typography style={{fontWeight:700}}>
                    안녕하세요 &nbsp;
                    <span style={{color:"#FFCE00"}}>
                        {user !== null && user.nickname}
                    </span>
                    님
                    <br />
                    오늘의 AI 매칭 추천을 확인해보세요 👀
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding:"10px 15px 0px 15px", margin:"0 0 30px 0"}}>
                <Button sx={{padding:0}} onClick={handleOpen}>
                        <Typography style={{fontSize:"12px", color:"black", borderBottom:"1px solid black"}}>
                            내 프로필 보기
                        </Typography>
                </Button>
            </div>
        </div>
    );

    const guestLinks = (
        <>
            <div>
                <Typography>
                    회원가입 및 로그인 후 이용해주세요!
                </Typography>
            </div>
        </>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container disableGutters={true} maxWidth="xs" style={{height:"120px", margin:"0", padding:"0"}} overflow="hidden">
                    {
                        isAuthenticated ? authLinks: guestLinks
                    }
            {user && userInfo !== null ?
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: "300px",
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '0',
                    borderRadius: "30px",
                }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth:"600px", padding:"15px 15px 0px 15px"}}>
                <div style={{fontSize:"12px", paddingTop:"3px"}}>
                    매칭 활성화
                </div>

                {/* 토글 스위치 */}
                <FormControlLabel
                    style={{paddingTop:"2px"}}
                    onClick={(e) => console.log(e)}
                    control={<IOSSwitch sx={{ m: 1, marginLeft:"20px" }} defaultChecked />}
                />

                <div style={{flex: 1}} />
                    <div style={{ display: "flex", justifyContent: "flex-end", padding:"none" }}>
                            <Image
                                src={closeIcon}
                                width="35px"
                                height="35px"
                                onClick={handleClose}
                                placeholder="blur"
                                layout='fixed'
                                />
                    </div>
                </div>

                {/* 유저 프로필 이미지 */}
                <div style={{textAlign:"center", marginTop:"30px"}}>
                    <Image 
                        src={user.image ? src[user.image] : profile}
                        width="140px"
                        height="140px"
                        placeholder="blur"
                        layout='fixed'
                    />
                </div>

                {/* 유저 nickname */}
                <div style={{textAlign:"center"}}>
                    <Typography style={{fontWeight:700, fontSize:"15px"}}>
                        {user.nickname}
                    </Typography>
                </div>

                {/* 유저 가입정보 및 성별 */}
                <div style={{textAlign:"center"}}>
                    <Grid style={{fontSize:"10px", color:"#BABABA", textAlign:"center"}}>
                        <Typography style={{
                            fontSize:"10px", 
                            color:"#BABABA", 
                            borderRadius:"10px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"3px",
                            padding:"1px 3px 0 3px",
                            width:"28px"}}>
                        {user.campus}
                        </Typography>
                        {user.major} /&nbsp;
                        {user.student_id}학번 /&nbsp;
                        {userInfo.gender.slice(0,1)}
                    </Grid>
                </div>

                {/* 유저 관심사, 매칭 프로필 설정 후 연결 필요 */}
                <div style={{textAlign:"center", marginTop:"10px"}}>
                <Grid style={{fontSize:"12px", color:"#BABABA", textAlign:"center"}}>
                        <Typography style={{
                            fontSize:'12px',
                            color:"white", 
                            background:"#BABABA",
                            borderRadius:"20px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"5px",
                            padding:"2px 7px 0 7px",
                            }}>
                        {userInfo.mbti}
                        </Typography>
                            {(userInfo.keywords) != null?
                                ((userInfo.keywords).slice(0,2).map((interest =>
                                    <Typography style={{
                                        color:"white", 
                                        background:"#BABABA",
                                        borderRadius:"20px", 
                                        border:"1px solid #BABABA", 
                                        display:"inline-block", 
                                        marginRight:"5px",
                                        padding:"2px 7px 0 7px",
                                        fontSize:'12px'}}>
                                    {interest}
                                    </Typography>
                                )))
                            :null}
                    </Grid>
                </div>

                <div style={{width:"70%", margin:"40px auto"}}>
                    <Typography style={{textAlign:"center", fontSize:"13px"}}>
                        {userInfo.introduction}
                    </Typography>
                </div>

                {/* Link to 프로필 수정 */}
                <div style={{padding:"none", margin:"0 auto 30px auto", width:"80px", borderBottom:"1px solid black"}}>
                    <Link href="/changeProfile">
                        <Typography style={{textAlign:"center", fontSize:"12px", fontWeight:700}}>
                            프로필 수정하기
                        </Typography>
                    </Link>
                </div>
                
            </div>
            </Modal>
            : null }
            </Container>
            <Dialog open={dialogOpen} onClose={handleDialogOpen}>
                <DialogContent style={{width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                    AI 매칭 기능을 이용하시려면<br/>
                    매칭 프로필이 필요해요 🥹
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                    <Button style={{fontSize:"12px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration: 'underline'}}>
                        <Typography style={{fontSize:"12px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`, marginBottom:'10px'}} onClick={handleMoveProfile}>
                            매칭 프로필 설정하기
                        </Typography>
                    </Button> 
                </DialogActions>
            </Dialog>
        </ThemeProvider>
)};

export default AiGreeting;