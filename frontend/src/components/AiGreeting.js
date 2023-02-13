import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Typography, Button, Popover, Modal, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import theme from '../theme/theme';
import { useState } from 'react';
import {Container} from '@mui/material';

// 스위치
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';

import Image from 'next/image';
import Link from 'next/link';

import closeIcon from '../image/close-1.png';
import profile from '../image/profile.png';

const AiGreeting = () => {

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const user = useSelector(state => state.auth.user);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
                    오늘의 AI 매칭 추천을 확인해보세요
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
                    control={<IOSSwitch sx={{ m: 1, marginLeft:"20px" }} defaultChecked />}
                />

                <div style={{flex: 1}} />
                    <div style={{ display: "flex", justifyContent: "flex-end", padding:"none" }}>
                            <Image
                                src={closeIcon}
                                width="35px"
                                height="35px"
                                onClick={handleClose}
                                />
                    </div>
                </div>

                {/* 유저 프로필 이미지 */}
                <div style={{textAlign:"center", marginTop:"30px"}}>
                    <Image 
                        src={profile}
                        width="140px"
                        height="140px"
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
                    <Typography style={{fontSize:"10px", color:"#BABABA", textAlign:"center"}}>
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
                        {user.gender}
                    </Typography>
                </div>

                {/* 유저 관심사, 매칭 프로필 설정 후 연결 필요 */}
                <div style={{textAlign:"center", marginTop:"10px"}}>
                <Typography style={{fontSize:"12px", color:"#BABABA", textAlign:"center"}}>
                        <Typography style={{
                            color:"white", 
                            background:"#BABABA",
                            borderRadius:"20px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"5px",
                            padding:"2px 7px 0 7px",
                            }}>
                        Hard
                        </Typography>
                        <Typography style={{
                            color:"white", 
                            background:"#BABABA",
                            borderRadius:"20px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"5px",
                            padding:"2px 7px 0 7px",}}>
                        Code
                        </Typography>
                        <Typography style={{
                            color:"white", 
                            background:"#BABABA",
                            borderRadius:"20px", 
                            border:"1px solid #BABABA", 
                            display:"inline-block", 
                            marginRight:"5px",
                            padding:"2px 7px 0 7px",}}>
                        입니다
                        </Typography>
                    </Typography>
                </div>

                {/* 유저 인사말, 추후 연결 필요 */}
                <div style={{width:"70%", margin:"40px auto"}}>
                    <Typography style={{textAlign:"center", fontSize:"13px"}}>
                        "ㅁㄴ오민외머농asdhajshdjahsdㅁ니오미ㅓㄴ오ㅓ몬아ㅓㅗ마너옴ㄴ"
                    </Typography>
                </div>

                {/* Link to 프로필 수정 */}
                <div style={{padding:"none", margin:"0 auto 30px auto", width:"80px", borderBottom:"1px solid black"}}>
                    <Link href="/">
                        <Typography style={{textAlign:"center", fontSize:"12px", fontWeight:700}}>
                            프로필 수정하기
                        </Typography>
                    </Link>
                </div>
                
            </div>
            </Modal>
            </Container>
        </ThemeProvider>
)};

export default AiGreeting;