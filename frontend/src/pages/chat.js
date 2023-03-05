import { useEffect,useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import * as React from 'react';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Avatar, TextField, Box, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import time from '../image/calendar.png';
import place from '../image/marker.png';
import more from '../image/chat/more.png';
import send from '../image/chat/send.png';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import notiOff from '../image/chat/notifications_off.png'

import Layout from "../hocs/Layout";
import Link from 'next/link'

function calculateRows() {
    const input = document.getElementsByName('chat')[0];
    const inputWidth = input.clientWidth;
    const fontSize = parseInt(getComputedStyle(input).fontSize);
    const textLength = input.value.length;
    const rows = Math.ceil(textLength * fontSize / inputWidth);
    return rows;
}

const chatPage = () => {
    const router = useRouter();

    const user = useSelector(state => state.auth.user); 
    
    const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            router.back();
        } 
    };  

    // 프로필 보기
    const handleProfile = ()=>{
        router.push('/clickProfile')
    }

    // 차단하기 Dialog
    const [openBlockDialog, setBlockDialog] = useState(false);

    const handleBlockUser = () => {
        setBlockDialog(true);
    };
  
    const handleCloseDialog = () => {
        setBlockDialog(false);
        setExitDialog(false);
    };

    const handleConfirmBlockUser = () => {
      // Code to leave the chat room
        setBlockDialog(false);
    };

    // 채팅방 나가기 Dialog
    const [openExitDialog, setExitDialog] = useState(false);

    const handleExit = () => {
        setExitDialog(true);
    };
  
    const handleConfirmExit = () => {
      // Code to leave the chat room
        setExitDialog(false);
    };

    // 신고하기
    const handleReportUser = () => {
        router.push('/reportUser')
    }


    // more 버튼
    const options = [
        {label: '프로필 보기', onClick: handleProfile},
        {label: '알림끄기'},
        {label: '차단하기', onClick: handleBlockUser},
        {label: '신고하기', onClick: handleReportUser},
        {label: '채팅방 나가기', onClick: handleExit},
    ];
    
    const ITEM_HEIGHT = 50;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Layout>
            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card style={{
                            position: 'fixed',
                            top: '0px',
                            width: '100%',
                            maxWidth: '600px',
                            height: '90px',
                            zIndex: '4',
                            borderRadius:'0',
                            }}>
                    <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 0px 0px 0px'}}>
                            <a>
                            <Image src={back} width={12} height={20} name='back' onClick={handleOnclick}/>
                            </a>
                        </Grid>
                        <Grid>
                            <div style={{display:'flex'}}>
                                <Typography sx={{paddingLeft:'12px',fontSize: '18px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                    상대방 닉네임
                                </Typography>
                                {/* 알림 끄기 표시 */}
                                <Box sx={{paddingLeft:'3px', paddingTop:'4px'}}>
                                    <Image src={notiOff} width="12px" height="12px"/>
                                </Box>
                            </div>
                        </Grid>
                        <Grid style={{paddingTop:'0', paddingLeft:'0'}}>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? 'long-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                                style={{padding:"0 0 0 0 "}}
                            >
                                <Image width={26} height={26} src={more}/>
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 8,
                                    borderRadius:"20px",
                                    padding:'0',
                                    textAlign:'center',
                                    width:'175px',
                                    alignItems:'center',
                                },
                                }}
                            >
                                {options.map((option, index) => (
                                <MenuItem
                                    key={option.label}
                                    selected={option === ''}
                                    className="option"
                                    onClick={option.onClick}
                                    style={{ 
                                        fontSize:'12px',
                                        padding:'0',
                                        margin:'0 auto',
                                        color: index === options.length - 1 ? 'red' : 'black' ,
                                        borderBottom: index === options.length -1 ? 'none' : '1px solid #BABABA',
                                        width:'80%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {option.label}
                                </MenuItem>
                                ))}
                            </Menu>
                        </Grid> 
                    </Grid>
                    <div style={{textAlign:"center", marginTop:"5px"}}>
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
                            명율
                        </Typography>
                        경영학과 /&nbsp;
                        21 학번 /&nbsp;
                        남
                    </Grid>
                </div>
                </Card>
            </Container>
            
            {/* 차단하기 Dialog */}
            <Dialog open={openBlockDialog} onClose={handleCloseDialog}>
                <DialogContent sx={{p: '20px 24px 13px'}}>
                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                        <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 15px 5px', m: '0'}}>
                            차단 시 해당 채팅방은 자동으로 나가지며 상대는 더 이상 매칭에서 노출되지 않아요. 차단하시겠어요?
                        </DialogTitle>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p:'0'}}>
                    <div style={{width: '100%', paddingBottom: '20px'}}>
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleCloseDialog}>취소</Button>
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0'}}>차단</Button>
                    </div>
                </DialogActions>
            </Dialog>

            {/* 나가기 Dialog */}
            <Dialog open={openExitDialog} onClose={handleCloseDialog}>
                <DialogContent sx={{p: '20px 24px 13px'}}>
                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                        <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 15px 5px', m: '0'}}>
                            채팅방을 나가면 대화 내용 및 채팅 목록이 삭제돼요.
                            <br/>
                            채팅방에서 나가시겠어요?
                        </DialogTitle>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p:'0'}}>
                    <div style={{width: '100%', paddingBottom: '20px'}}>
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleCloseDialog}>취소</Button>
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0'}}>나가기</Button>
                    </div>
                </DialogActions>
            </Dialog>

            {/* 시간정하기 & 장소정하기 버튼 */}
            {/* 하단 텍스트 입력 박스에 가려지는 메시지 패딩으로 끌어올리기 */}
            <Grid sx={{paddingBottom:"90px"}}>
                <Grid
                    sx={{
                    marginTop: '95px',
                    display: 'flex',
                    flexDirection: 'column',
                    }}
                >
                    <Grid container style={{justifyContent: 'center', width: '100%', height:'40px', alignItems: 'center'}}>
                        <div style={{position:"fixed",width: '210px', height:'28px', backgroundColor: '#FFF8D9', display: 'flex', justifyContent: 'center' , borderRadius:'15px'}}>
                            <Link href="/chatTime">
                                <Grid item sx={{display: 'flex', height: 'fit-content', paddingRight:"38px", paddingTop:"6px"}}>
                                    <Image width={13} height={15} src={time} />
                                    <Typography sx={{fontSize: '10px', paddingLeft:'5px'}}>시간 정하기</Typography>
                                </Grid>
                            </Link>
                            <Link href="/chatPlace">
                                <Grid item sx={{display: 'flex', height: 'fit-content',paddingTop:"6px"}}>
                                    <Image width={10.5} height={14.6} src={place} />
                                    <Typography sx={{fontSize: '10px', paddingLeft:'5px'}}>장소 정하기</Typography>
                                </Grid>
                            </Link>
                        </div>
                    </Grid>
                </Grid>

                {/* 날짜 정보 */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid>
                        <Typography sx={{fontSize:'12px', color:'#A1A1A1'}}>
                            2023년 1월 7일 월요일
                        </Typography>
                    </Grid>
                </div>

                {/* 상대방 카톡 틀 1(첫 메세지, 내 메세지 이후 첫 메시지) */}
                <Grid container style={{width:"100%",margin:'22px 0px 0px 0px', paddingLeft:'15px', justifyContent:'left'}}>
                    <Grid item>
                        <Avatar alt=""/>
                    </Grid>
                    <Grid item style={{paddingLeft:"7px"}}>
                        <Stack direction="column" spacing={1}>
                            <Typography sx={{fontSize: '12px', fontWeight:'700', verticalAlign: 'top',}} align="left">
                                상대방 닉네임
                            </Typography>
                            <Grid style={{display:'flex'}}>
                            <Grid container style={{margin:'0px 0px 0px', justifyContent:'left', display: 'flex', alignItems: 'flex-end'}}>
                                <Card elevation="none" style={{
                                borderRadius: '0px 15px 15px 15px',
                                backgroundColor:'white',
                                border:'1px solid #FFCE00',
                                maxWidth:'75%'
                                }}>
                                <Typography
                                    style={{
                                    padding:'8px 10px 6px 10px',
                                    fontSize: '14px',
                                    maxWidth:'100%'
                                    }}>
                                    상대 1, 첫 chat 
                                </Typography>
                                </Card>
                                <Typography sx={{fontSize: '9px', fontWeight: '500', paddingLeft:'5px', bottom:0}} color="#a1a1a1" component="div" align="center">
                                    오후 10:30
                                </Typography>
                            </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>

                {/* 상대방 카톡 틀 2(상대방의 연속된 메시지) */}
                <Grid container style={{width:"100%",margin:'10px 0px 0px 0px', paddingLeft:'15px', justifyContent:'left'}}>
                    <Grid item style={{paddingLeft:"7px", marginLeft:"40px"}}>
                        <Stack direction="column" spacing={1}>
                            <Grid style={{display:'flex'}}>
                            <Grid container style={{margin:'0px 0px 0px', justifyContent:'left', display: 'flex', alignItems: 'flex-end'}}>
                                <Card elevation="none" style={{
                                borderRadius: '0px 15px 15px 15px',
                                backgroundColor: 'white',
                                border:'1px solid #FFCE00',
                                maxWidth:'75%'
                                }}>
                                <Typography
                                    style={{
                                    padding:'8px 10px 6px 10px',
                                    fontSize: '14px',
                                    maxWidth:'100%'
                                    }}>
                                    상대 2, 연속된 chat 상대 2, 연속된 chat상대 2, 연속된 chat상대 2, 연속된 chat상대 2, 연속된 chat상대 2, 연속된 chat상대 2, 연속된 chat상대 2, 연속된 chat상대 2, 연속된 chat
                                </Typography>
                                </Card>
                                <Typography sx={{fontSize: '9px', fontWeight: '500', paddingLeft:'5px', bottom:0}} color="#a1a1a1" component="div" align="center">
                                오후 10:30
                                </Typography>
                            </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>


                {/* 내 카톡 틀 1 (내 첫 메시지) */}
                <Grid container style={{width:"100%", margin:'22px 0px 0px 0px', paddingRight:'15px', justifyContent:'flex-end'}}>
                    <Grid item style={{paddingRight:"7px"}}>
                        <Stack direction="column" spacing={1}>
                            <Grid style={{display:'flex'}}>
                                <Grid container style={{margin:'0px 0px 0px', justifyContent:'flex-end', display: 'flex', alignItems: 'flex-end'}}>
                                    <Typography sx={{fontSize: '9px', fontWeight: '500', paddingRight:'5px', bottom:0}} color="#a1a1a1" component="div" align="center">
                                        오후 10:30
                                    </Typography>
                                    <Card elevation="none"  sx={{
                                        borderRadius: '15px 0px 15px 15px',
                                        backgroundColor:'#FFE885',
                                        maxWidth:'80%'
                                    }}>
                                    <Typography
                                        style={{
                                            padding:'10px 10px 6px 10px',
                                            fontSize: '14px',
                                            maxWidth:'100%',
                                        }}>
                                        나 1. 이 메시지는 영국에서부터 시작되어 상단 마진이 22px로 설정되어 있습니다. 상대방의 메시지 이후 내가 보내는 첫 메시지입니다.
                                    </Typography>
                                </Card>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>

                {/* 내 카톡 틀 2 (내 연속 메시지) */}
                <Grid container style={{width:"100%", margin:'10px 0px 0px 0px', paddingRight:'15px', justifyContent:'flex-end'}}>
                    <Grid item style={{paddingRight:"7px"}}>
                        <Stack direction="column" spacing={1}>
                            <Grid style={{display:'flex'}}>
                                <Grid container style={{margin:'0px 0px 0px', justifyContent:'flex-end', display: 'flex', alignItems: 'flex-end'}}>
                                    <Typography sx={{fontSize: '9px', fontWeight: '500', paddingRight:'5px', bottom:0}} color="#a1a1a1" component="div" align="center">
                                        오후 10:30
                                    </Typography>
                                    <Card elevation="none"  sx={{
                                        borderRadius: '15px 0px 15px 15px',
                                        backgroundColor:'#FFE885',
                                        maxWidth:'80%'
                                    }}>
                                    <Typography
                                        style={{
                                            padding:'10px 10px 6px 10px',
                                            fontSize: '14px',
                                            maxWidth:'100%',
                                        }}>
                                        나 2, 상단 마진이 10px로 설정되어 있습니다. 내가 보낸 메시지 이후 연속적으로 보내는 메시지입니다.
                                    </Typography>
                                </Card>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>

                {/* 약속 확인 메시지 */}
                <Grid
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin:"22px 0 0 0"
                    }}
                >
                    <Grid container style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                        <div style={{ backgroundColor: '#FFF8D9', display: 'flex', justifyContent: 'center' , borderRadius:'20px', padding:"5px 15px"}}>
                            <Grid item sx={{display: 'flex', height: 'fit-content', textAlign:"center"}}>
                                <Typography sx={{fontSize: '10px', paddingLeft:'5px'}}>
                                    00님과
                                    <span style={{fontWeight:"700"}}>2월 12일 일 19:50시</span>에
                                    <br/>
                                    약속을 만들었어요. 약속을 꼭 지켜주세요!
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                {/* 약속 취소 메시지 */}
                <Grid
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin:"22px 0 0 0"
                    }}
                >
                    <Grid container style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                        <div style={{backgroundColor: '#FFF8D9', display: 'flex', justifyContent: 'center' , borderRadius:'20px', padding:"5px 15px"}}>
                            <Grid item sx={{display: 'flex', height: 'fit-content',textAlign:"center"}}>
                                <Typography sx={{fontSize: '10px', paddingLeft:'5px'}}>
                                    <span style={{fontWeight:"700"}}>2월 12일 일 19:50시 </span>
                                    
                                    약속이 취소되었습니다.
                                </Typography>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                </Grid>

                {/* 텍스트 인풋 필드 & 버튼 */}
                <Grid style={{position:"fixed", width:"100%", bottom:0, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 10px 20px 10px', backgroundColor:"white", zIndex:"4",maxWidth: '600px',}}>
                    <textarea 
                        name='chat' 
                        placeholder='메세지를 입력하세요.'
                        required
                        style={{fontSize:'14px', width: '100%', height: '42px', padding: '13px 14px', backgroundColor: '#FFFCED', border: 'none', borderRadius: '20px', outline:'none', resize: 'none',verticalAlign: 'middle'}}
                        rows={calculateRows}
                    />
                    <Grid sx={{ marginLeft: '10px', paddingTop:'5px' }}>
                        <Image src={send} width={41} height={41} layout="fixed"/>
                    </Grid>
                </Grid>
            </Layout>
        </ThemeProvider>
    )
}

export default chatPage;