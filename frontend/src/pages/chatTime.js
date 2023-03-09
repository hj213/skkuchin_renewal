import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import moment from 'moment'; 
// import 'moment/locale/ko';
import { CssBaseline, Slide, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, TextField, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import calendar from '../image/calendar.png';
import down from '../image/down-1.png';
import check from '../image/check_3.png';
import style from 'styled-components';
import { styled } from '@mui/material/styles';
import {TimePicker }from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { set_meet_time, delete_meet_time } from "../actions/chat/chatRoom";
export default function chatTime(){

    const router = useRouter();
    const dispatch =useDispatch();

    const chatRoom = useSelector(state => state.chatRoom.chatRooms);
    const otherUser = useSelector(state => state.chatMessage.otherUser);

    const roomId = chatRoom && chatRoom.find(room => room.nickname === otherUser.nickname)?.room_id;
    const now = new Date();
    const format = 'HH:mm';
    const defaultValue = dayjs().format(format);

    const [date, setDate] = useState(now);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [DialogOpen, setDialogOpen] = useState(false);
    const [changedtime, setChangedTime] = useState(defaultValue);
    const [timeOpen, setTimeOpen] = useState('hidden');
    const [isUp, setIsUp] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
   
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
        return `${year}.${month}.${day} (${dayOfWeek})`;
      };
    
      
    const handleBack = () => {
        router.back();
    }

    const handleDownClick = () => {
        if(calendarOpen){
            setCalendarOpen(false);
        } else{
            setCalendarOpen(true);
        }
        setIsUp((prevIsUp) => !prevIsUp);
    };
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDelete = () => {
        router.back();
    };
    const handleSubmit = () => {
        alert('버튼 클릭!');
        const dateInfo = dayjs(date).format('YYYY-MM-DD')+"T"+changedtime+':00';
        alert(dateInfo);
        alert(roomId);
        dispatch(set_meet_time(dateInfo, roomId, ([result, message]) => {
            if (result) {
                alert('set_meet_time 성공! ' + result);
            } else {
                alert('set_meet_time 실패! ' + message);
                // if (typeof(message) == 'string') {
                // setDialogMsg(message);
                // }
            }
        }));
        // router.back();
    }
    const handleOpenTime = () => {
        if(timeOpen=='hidden'){
            setTimeOpen('visible')

        } else {
            setTimeOpen('hidden')
        }
    }

    const handleOnChange = (time, timeString) => {
        setChangedTime(timeString);
    }
    

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{padding:'0px', margin:'41px 0px 53px 0px', overflowX:'hidden', overflowY:'hidden', width:'100%'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleBack} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'32%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>시간 정하기</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px'}}>
                        <Grid container style={{margin:'50px 0px 0px 20px'}}>
                            <Grid item >
                                <Image src={calendar} width={20} height={23} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{margin:'0px 0px 0px 5px'}}>
                                <Typography style={{ margin:'4px 0px 0px 0px', textAlign:'left', fontSize:'16px'}} fontWeight={theme.typography.h1}>약속 시간</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px', margin:'30px 0px 0px 20px', position:'relative'}}>
                        <Grid container justify="space-around">
                            <Grid item style={{width:'90%'}}> 
                                <div style={{ width:'100%', paddingBottom:'8px', borderBottom:"1px solid #BABABA"}}>
                                    <Typography style={{fontSize:'16px', }} fontWeight={theme.typography.h2}>{formatDate(date)}  {changedtime}</Typography>
                                </div>
                            </Grid>
                            <Grid item style={{ right:'0',position:'absolute', zIndex:'5', marginRight:'40px'}}>
                                <Image src={down} width={25} height={25} onClick={handleDownClick} placeholder="blur" layout='fixed' style={{ transform: `rotate(${isUp ? "180deg" : "0deg"})` }} />
                            </Grid>
                        </Grid>
                        <div>
                            <Button onClick={handleDialogOpen} style={{padding:'0px', margin:'25px 0px 0px 0px', fontSize:'12px', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration:'underline'}}>약속 시간 삭제하기</Button>
                        </div>
                        
                    </Container>
            
                    
                    <div style={{ position:'fixed',width:'100%', maxWidth:'600px',margin:'0px 0px 0px 0px'}}>
                        <Slide direction="up" in={calendarOpen} timeout={200} >
                            <Container style={{padding:'0px', width:'100%', position:'relative', zIndex: 1}}>
                                <Card style={{ position: 'relative', borderRadius:'20px', width:'100%', height:"380px", boxShadow:'0px -10px 20px -5px rgb(0,0,0, 0.1)', paddingTop:'10px', bottom: '0'}}>
                                    <CalendarContainer>
                                        <Calendar onChange={setDate} value={date} formatDay={(locale, date) =>
                                            date.toLocaleString('en', { day: 'numeric' })
                                        }
                                        next2Label={null}
                                        prev2Label={null}
                                        showNeighboringMonth={false}
                                        returnValue='start'
                                        selectRange={false}
                                        />
                                    </CalendarContainer>
            
                                    <Grid container style={{width:'100%'}}>
                                        <Grid item style={{margin: '10px 0px 0px 35px'}}>
                                            <Typography style={{fontWeight:'500', fontSize:'15px'}}>시간</Typography>
                                        </Grid>
                                        <Grid item style={{right:0, position:'absolute', marginTop:'5px', marginRight:'35px'}}>     
                                            <TimePicker defaultValue={dayjs(defaultValue,format)} format={format} placeholder={defaultValue} onChange={handleOnChange}  popupStyle={{ fontWeight: '500' }} style={{border:'none', backgroundColor:'#EEEEF0', width:'80px'}}/>
                                        </Grid>
                                    </Grid>
                                    
                                </Card>
                                
                            </Container>
                        </Slide>
                        <Container style={{justifyContent:'center', position: "absolute", bottom: 0, width:'100%', maxWidth:'600px', zIndex: calendarOpen ? 0 : 2}}>
                            <div onClick={handleSubmit} style={{ textAlign:'center', marginBottom:'53px', cursor: 'pointer'}}>
                                <Image src={check} width={300} height={56} placeholder="blur" layout='fixed' />
                            </div>
                        </Container>   
                        </div>         
                </Container>
                <Dialog
                    open={DialogOpen}
                    onClose={handleDialogClose}
                    PaperProps={{ style: { borderRadius: '10px' } }}
                >
                    <DialogContent sx={{p: '20px 24px 13px'}}>
                        <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                            <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>약속 시간을 삭제하시겠어요?</DialogTitle>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{p:'0'}}>
                        <div style={{width: '100%', paddingBottom: '20px'}}>
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleDialogClose}>취소</Button>
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={handleDelete}>삭제</Button>
                        </div>
                    </DialogActions>
                </Dialog>
        </ThemeProvider>
    )
}

const CalendarContainer = style.div`
    .react-calendar { 
        width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        padding:0px 20px;
        border-color: transparent;
       }
       .react-calendar__navigation button {
        color: black;
        min-width: 30px;
        background: none;
        font-size: 16px;
        margin-top: 8px;
        font-weight: 500px;
       }
       .react-calendar__navigation button:enabled:hover,
       .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
       }
       .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
       }
       .react-calendar__month-view__weekdays {
        background: white;
        abbr { /*월,화,수... 글자 부분*/
          color: gray;
          font-weight: 500;
          text-decoration : none;
        }
      }
      .react-calendar__tile {
        text-align: center;
        padding: 10px;
        height:45px;
      }
       .react-calendar__tile:enabled:hover,
       .react-calendar__tile:enabled:focus {
        background: #ffce00;
        color: white;
        border-radius: 30px;
        font-weight: bold;

       }
       .react-calendar__tile--now {
        background: #ffe885;
        border-radius: 30px;
        font-weight: bold;
        color: white;
        heigth:100%;
       }
       .react-calendar__tile--rangeEnd {
        border-radius: 30px;
        background: #ffce00;
        color: white;
        height:45px
       }
       .react-calendar__tile--active {
        background: #ffce00;
        color: white;
        border-radius: 30px;
        font-weight: bold;
      }
    `