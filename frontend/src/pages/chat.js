import { useEffect, useState, useRef, useLayoutEffect } from "react";
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

import Link from 'next/link'
import { get_realtime_otherUser, get_realtime_setting, get_realtime_message, send_message, clear_chat } from '../actions/chat/chatMessage';
import { set_user_block, set_chat_room_alarm, exit_room } from "../actions/chat/chatRoom";
import { request_refresh } from '../actions/auth/auth';

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

    const room_id = router.query.room_id;
    const user_number = router.query.user_number; // user1,2(내가 1인지 2인지) 구분
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const messages = useSelector(state => state.chatMessage.messages);
    const otherUser = useSelector(state => state.chatMessage.otherUser);
    const setting = useSelector(state => state.chatMessage.setting);

    const stompClient = useSelector(state => state.stompClient.stompClient);

    const [meetTime, setMeetTime] = useState(null);
    const [meetPlace, setMeetPlace] = useState(null);

    let subOtherUser = null;
    let subMessage = null;
    let subSetting = null;

    const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            router.back();
        } 
    };

    const get_info = async () => {
        dispatch(request_refresh())
        .then(() => {
            subOtherUser = dispatch(get_realtime_otherUser(room_id, user_number, stompClient));
            subMessage = dispatch(get_realtime_message(room_id, user_number, user.username, stompClient));
            subSetting = dispatch(get_realtime_setting(room_id, user_number, stompClient));
        })
    }

    useEffect(() => {
        if (stompClient && room_id && user_number && user && user.username) {
            get_info();
        }
    }, [stompClient, room_id, user_number, user])

    useEffect(() => {
        return () => {
            dispatch(clear_chat());
            if (subOtherUser && subOtherUser.id) {
                subOtherUser.unsubscribe();
            }
            if (subMessage  && subMessage.id) {
                subMessage.unsubscribe();
            }
            if (subSetting && subSetting.id) {
                subSetting.unsubscribe();
            }
        }
    }, [])

    useEffect(() => {
        if (setting) {
            setMeetTime(setting.meet_time);
            setMeetPlace(setting.meet_place)
        }
    }, [setting])

    // 프로필 보기 (load_matchingUser )
    const handleProfile = ()=>{
        router.push('/clickProfile')
    }

    // 차단하기 Dialog
    const [openBlockDialog, setBlockDialog] = useState(false);
    const isUser1Blocked = setting && setting.user1_blocked;
    const isUser2Blocked = setting && setting.user2_blocked;
    const [isBlocked, setBlocked] = useState(isUser1Blocked || isUser2Blocked);

    let isAlarmOn = null;
    let friendBlocked = null;

    if (setting) {
        if (user_number === 'user1') {
            isAlarmOn = setting.user1_alarm;
            friendBlocked = setting.user2_blocked;
        } else {
            isAlarmOn = setting.user2_alarm;
            friendBlocked = setting.user1_blocked;
        }
    }

    useEffect(() => {
        setBlocked(isUser1Blocked || isUser2Blocked);
    }, [isUser1Blocked, isUser2Blocked]);

    const handleBlockUser = () => {
        setBlockDialog(true);
    };

    const handleCloseDialog = () => {
        setBlockDialog(false);
        setExitDialog(false);
    };

    const handleConfirmBlockUser = () => {
        // alert(isBlocked);
        dispatch(
            set_user_block(!friendBlocked, room_id, ([result, message]) => {
                if (result) {
                    // alert("set_user_block 성공!");
                } else {
                    // alert("set_user_block 실패 " + message);
                }
            })
        );
        setBlockDialog(false);
    };
    
    // 채팅방 나가기 Dialog
    const [openExitDialog, setExitDialog] = useState(false);

    const handleExit = () => {
        setExitDialog(true);
    };

    const handleConfirmExit = () => {
        alert(room_id);
        dispatch(exit_room(room_id, ([result, message])=>{
            if(result){
                router.push('/message');
            } else {
                // alert("exit_room 실패 " +message);
            }
        }));
        setExitDialog(false);
    };

    // 신고하기
    const handleReportUser = () => {
        router.push({
            pathname: '/reportChatUser',
            query: { roomId : room_id }
        })
    }

    const handleAlarm = () => {
        dispatch(set_chat_room_alarm(!isAlarmOn, room_id, ([result, message]) => {
            if(result) {
                // alert('set_chat_room_alarm 성공!');
            } else {
                // alert('set_chat_room_alarm ' + message);
            }
        }));
    };

    
    const ITEM_HEIGHT = 50;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (message) => {
        dispatch(send_message(message, room_id, ([result, message])=>{
            if(result){
                // alert('send 성공!');           
            } else {
                // alert("send 실패 " +message);
            }
        }));
        setInputMessage('');
    }

        // more 버튼
        const options = [
            {label: '프로필 보기', onClick: handleProfile},
            {label: isAlarmOn ? '알림끄기' : '알림켜기' , onClick: handleAlarm},
            {label: friendBlocked ? "차단해제" : "차단하기", onClick: handleBlockUser},
            {label: '신고하기', onClick: handleReportUser},
            {label: '채팅방 나가기', onClick: handleExit},
        ];
    const lastMessageRef = useRef(null);

    useLayoutEffect(()  => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
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
                            boxShadow:'none',
                            borderBottom: '1.5px solid #BABABA',
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
                                    {otherUser && otherUser.nickname}
                                </Typography>
                                {/* 알림 끄기 표시 */}
                                { !isAlarmOn &&
                                <Box sx={{paddingLeft:'3px', paddingTop:'4px'}}>
                                    <Image src={notiOff} width="12px" height="12px"/>
                                </Box>
                                }
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
                            {otherUser && otherUser.campus}
                        </Typography>
                        {otherUser && otherUser.major} /&nbsp;
                        {otherUser && otherUser.student_id} /&nbsp;
                        {otherUser && otherUser.gender && (otherUser.gender).charAt(0)}
                    </Grid>
                </div>
                </Card>
            </Container>
            
            {/* 차단하기 Dialog */}
            <Dialog open={openBlockDialog} onClose={handleCloseDialog}>
                <DialogContent sx={{p: '20px 24px 13px'}}>
                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                        {
                            friendBlocked ? 
                            <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 15px 5px', m: '0'}}>
                                차단 해제 시 해당 채팅방의 상대와 채팅이 가능합니다. 차단을 해제하시겠어요?
                            </DialogTitle>
                            :
                            <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 15px 5px', m: '0'}}>
                                차단 시 해당 채팅방의 상대와는 더 이상 채팅이 불가하며 상대는 더 이상 매칭에서 노출되지 않아요. 차단하시겠어요?
                            </DialogTitle>
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{p:'0'}}>
                    <div style={{width: '100%', paddingBottom: '20px'}}>
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleCloseDialog}>취소</Button>
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0'}} onClick={handleConfirmBlockUser}>차단</Button>
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
                        <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0'}} onClick={handleConfirmExit}>나가기</Button>
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
                            <Link href={{
                                pathname: '/chatTime',
                                query: {
                                    room_id: room_id,
                                    meetTime: meetTime
                                }
                            }}>
                                <Grid item sx={{display: 'flex', height: 'fit-content', paddingRight:"38px", paddingTop:"6px"}}>
                                    <Image width={13} height={15} src={time} />
                                    <Typography sx={{fontSize: '10px', paddingLeft:'5px'}}>
                                        { setting && setting.meet_time ? setting.meet_time : "시간 정하기" }
                                    </Typography>
                                </Grid>
                            </Link>
                            <Link href={{
                                pathname: '/chatPlace',
                                query: {
                                    room_id: room_id,
                                    meetPlace: meetPlace
                                }
                            }}>
                                <Grid item sx={{display: 'flex', height: 'fit-content',paddingTop:"6px"}}>
                                    <Image width={10.5} height={14.6} src={place} />
                                    <Typography sx={{fontSize: '10px', paddingLeft:'5px'}}>
                                        { setting && setting.meet_place ? setting.meet_place : "장소 정하기" }
                                    </Typography>
                                </Grid>
                            </Link>
                        </div>
                    </Grid>
                </Grid>

                {/* 날짜 정보 */}
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid>
                        <Typography sx={{fontSize:'12px', color:'#A1A1A1'}}>
                            {message.data}
                        </Typography>
                    </Grid>
                </div> */}

                { messages && messages.slice().reverse().map((message, index) => {
                    // 이어서 메시지를 보냈는지 확인
                    const prevMessage = messages.slice().reverse()[index - 1];
                    const isContinuedMessage = prevMessage && ((prevMessage.sender === message.sender && prevMessage.sender === user.username) || (prevMessage.sender === message.sender && prevMessage.sender !== user.username));
                    let topMargin = isContinuedMessage ? 10 : 22;
                    // 보낸 시간 체크, 1분 미만인 경우
                    let displayAvatar = true;
                    // 이전 메시지와 현재 메시지의 시간 비교
                    if (prevMessage && prevMessage.time === message.time && isContinuedMessage) {
                        displayAvatar = false;
                        // displayTime = false; 
                    }
                    return (
                        (message.sender === user.username) ? (
                        <Grid key={message.id} ref={messages.length - 1 === index ? lastMessageRef : null} style={{width:"100%", margin:`${topMargin}px 0px 0px 0px`, paddingRight:'15px', justifyContent:'flex-end'}}>
                            <Grid item sx={{pr:"7px"}}>
                            <Stack direction="column" spacing={1}>
                                <Grid style={{display:'flex'}}>
                                <Grid container style={{margin:'0px 0px 0px', justifyContent:'flex-end', display: 'flex', alignItems: 'flex-end'}}>
                                    <Typography sx={{fontSize: '9px', fontWeight: '500', paddingLeft:'5px', bottom:0}} color="#a1a1a1" component="div" align="center">
                                        {
                                            (message.time).slice(0,2) === 'PM' ? '오후'+(message.time).slice(2) : '오전'+(message.time).slice(2)
                                        }
                                    </Typography>
                                    <Card elevation="none" sx={{
                                        borderRadius: '15px 0px 15px 15px',
                                        backgroundColor:'#FFE885',
                                        maxWidth:'80%',
                                    }}>
                                    <Typography style={{
                                        padding:'10px 10px 6px 10px',
                                        fontSize: '14px',
                                        maxWidth:'100%',
                                    }}>
                                        {message.message}
                                    </Typography>
                                    </Card>
                                </Grid>
                                </Grid>
                            </Stack>
                            </Grid>
                        </Grid>
                        )  : (message.sender === 'admin') ? (
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
                                            {/* {otherUser && otherUser.nickname} 님과  */}
                                            {message.message.split('요.').map((text, index, arr) => (
                                                <React.Fragment key={index}>
                                                {text}{index !== arr.length - 1 && '요.'}<br />
                                                </React.Fragment>
                                            ))}
                                        </Typography>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                        ) : (
                        <Grid key={message.id} ref={messages.length - 1 === index ? lastMessageRef : null} container style={{width:"100%", margin:`${topMargin}px 0px 0px 0px`, paddingLeft:'15px', justifyContent:'left'}}>
                            {displayAvatar && (
                                <Grid item>
                                    <Avatar alt="" />
                                </Grid>
                            )}
                                <Grid item sx={{pl:"7px", ml : displayAvatar ? 0 : '40px'}}>
                                    <Stack direction="column" spacing={1}>
                                        {displayAvatar && 
                                            <Typography sx={{fontSize: '12px', fontWeight:'700', verticalAlign: 'top'}} align="left">
                                                {otherUser && otherUser.nickname}
                                            </Typography>
                                        }
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
                                                        {message.message}
                                                    </Typography>
                                                </Card>
                                                <Grid>
                                                <Typography sx={{fontSize: '9px', fontWeight: '500', paddingLeft:'5px', bottom:0}} color="#a1a1a1" component="div" align="center">
                                                    {
                                                        (message.time).slice(0,2) === 'PM' ? '오후'+(message.time).slice(2) : '오전'+(message.time).slice(2)
                                                    }
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    ))
                })}
                </Grid>

                {/* 텍스트 인풋 필드 & 버튼 */}
                <Grid style={{position:"fixed", width:"100%", bottom:0, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 10px 20px 10px', backgroundColor:"white", zIndex:"4",maxWidth: '600px',}}>
                    <textarea 
                        name='chat' 
                        placeholder={isBlocked ? '채팅을 입력할 수 없습니다.' : '메세지를 입력하세요.'}
                        required
                        style={{fontSize:'14px', width: '100%', height: '42px', padding: '13px 14px', backgroundColor: isBlocked? 'rgba(186, 186, 186, 0.5)' : '#FFFCED', border: 'none', borderRadius: '20px', outline:'none', resize: 'none',verticalAlign: 'middle'}}
                        rows={calculateRows}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        disabled={isBlocked}
                    />
                    <Grid onClick={()=>handleSubmit(inputMessage)} sx={{ marginLeft: '10px', paddingTop:'5px' }}>
                        <Image src={send} width={41} height={41} layout="fixed"/>
                    </Grid>
                </Grid>
        </ThemeProvider>
    )
}

export default chatPage;