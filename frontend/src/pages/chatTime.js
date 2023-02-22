import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'; 
import 'moment/locale/ko';
import { CssBaseline, Slide, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, TextField, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import calendar from '../image/calendar.png';
import down from '../image/down-1.png';
import check from '../image/check_3.png';
import style from 'styled-components';
import { styled } from '@mui/material/styles';
import TimePicker from "react-time-picker";

export default function chatTime(){

    const router = useRouter();

    const now = new Date();
    const hours = now.getHours() % 24;
    const minutes = now.getMinutes();
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    const [date, setDate] = useState(now);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [DialogOpen, setDialogOpen] = useState(false);
    const [changedtime, setChangedTime] = useState(time);
    const [timeOpen, setTimeOpen] = useState('hidden');
   
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
        return `${year}.${month}.${day}(${dayOfWeek})`;
      };
    

    const handleBack = (e) => {
        router.back();
    }

    const handleDownClick = (e) => {
        // if(calendarOpen == 'hidden'){
        //     setCalendarOpen('visible');
        // } else {
        //     setCalendarOpen('hidden');
        // }
        if(calendarOpen){
            setCalendarOpen(false);
        } else{
            setCalendarOpen(true);
        }
    };
    const handleDialogOpen = (e) => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    const handleDelete = (e) => {
        router.back();
    };
    const handleSubmit = (e) => {
        // router.back();
    }
    const handleOpenTime = () => {
        if(timeOpen=='hidden'){
            setTimeOpen('visible')

        } else {
            setTimeOpen('hidden')
        }
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
        background: #f8f8fa;
        color: #ffce00;
        border-radius: 6px;
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
    `
    const TextFieldContainer = style.div`
    .& .MuiInputBase-root {
        border: none;

    }
    .css-u54r9x-MuiInputBase-root-MuiOutlinedInput-root{
        font-weight: 500;
    }
    .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        font-size: 14px;
        padding: 6px 5px 5px 10px;
        border-color: transparent;
    }
    .css-u54r9x-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline{
        border-color: transparent;
    }
    .css-u54r9x-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline{
        border-color: transparent;
    }

    `

    const CustomTextField = styled(TextField)({
        '& .MuiInputBase-root': {
          border: 'none',
          borderColor: 'transparent',
        },
      });

    const TimeContainer = style.div`
    .react-time-picker {
        display: inline-flex;
        position: relative;
      }
      
      .react-time-picker,
      .react-time-picker *,
      .react-time-picker *:before,
      .react-time-picker *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      
      .react-time-picker--disabled {
        background-color: #f0f0f0;
        color: #6d6d6d;
      }
      
      .react-time-picker__wrapper {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        border: thin solid gray;
      }
      
      .react-time-picker__inputGroup {
        min-width: calc((4px * 3) + 0.54em * 6 + 0.217em * 2);
        flex-grow: 1;
        padding: 0 2px;
        box-sizing: content-box;
      }
      
      .react-time-picker__inputGroup__divider {
        padding: 1px 0;
        white-space: pre;
      }
      
      .react-time-picker__inputGroup__divider,
      .react-time-picker__inputGroup__leadingZero {
        display: inline-block;
      }
      
      .react-time-picker__inputGroup__input {
        min-width: 0.54em;
        height: 100%;
        position: relative;
        padding: 0 1px;
        border: 0;
        background: none;
        font: inherit;
        box-sizing: content-box;
        -webkit-appearance: textfield;
        -moz-appearance: textfield;
        appearance: textfield;
      }
      
      .react-time-picker__inputGroup__input::-webkit-outer-spin-button,
      .react-time-picker__inputGroup__input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0;
      }
      
      .react-time-picker__inputGroup__input:invalid {
        background: rgba(255, 0, 0, 0.1);
      }
      
      .react-time-picker__inputGroup__input--hasLeadingZero {
        margin-left: -0.54em;
        padding-left: calc(1px + 0.54em);
      }
      
      .react-time-picker__inputGroup__amPm {
        font: inherit;
        -webkit-appearance: menulist;
        -moz-appearance: menulist;
        appearance: menulist;
      }
      
      .react-time-picker__button {
        border: 0;
        background: transparent;
        padding: 4px 6px;
      }
      
      .react-time-picker__button:enabled {
        cursor: pointer;
      }
      
      .react-time-picker__button:enabled:hover .react-time-picker__button__icon,
      .react-time-picker__button:enabled:focus .react-time-picker__button__icon {
        stroke: #0078d7;
      }
      
      .react-time-picker__button:disabled .react-time-picker__button__icon {
        stroke: #6d6d6d;
      }
      
      .react-time-picker__button svg {
        display: inherit;
      }
      
      .react-time-picker__clock {
        width: 200px;
        height: 200px;
        max-width: 100vw;
        padding: 25px;
        background-color: white;
        border: thin solid #a0a096;
        z-index: 1;
      }
      
      .react-time-picker__clock--closed {
        display: none;
      }
      `

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{padding:'0px', margin:'41px 0px 53px 0px', overflowX:'hidden', overflowY:'hidden'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleBack}/>
                            </Grid>
                            <Grid item style={{marginLeft:'32%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>시간 정하기</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px'}}>
                        <Grid container style={{margin:'50px 0px 0px 20px'}}>
                            <Grid item >
                                <Image src={calendar} width={20} height={23}/>
                            </Grid>
                            <Grid item style={{margin:'0px 0px 0px 5px'}}>
                                <Typography style={{ margin:'4px 0px 0px 0px', textAlign:'left', fontSize:'16px'}} fontWeight={theme.typography.h1}>약속 시간</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px', margin:'30px 0px 0px 20px'}}>
                        <Grid container justify="space-around">
                            <Grid item style={{width:'90%'}}> 
                                <div style={{ width:'100%', paddingBottom:'8px', borderBottom:"1px solid #BABABA"}}>
                                    <Typography style={{fontSize:'16px', }} fontWeight={theme.typography.h2}>{formatDate(date)}  {changedtime}</Typography>
                                </div>
                            </Grid>
                            <Grid item style={{ right:'0',position:'absolute', zIndex:'2', marginRight:'20px'}}>
                                <Image src={down} width={25} height={25} onClick={handleDownClick}/>
                            </Grid>
                        </Grid>
                        <div>
                            <Button onClick={handleDialogOpen} style={{padding:'0px', margin:'25px 0px 0px 0px', fontSize:'12px', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration:'underline'}}>약속 시간 삭제하기</Button>
                        </div>
                        
                    </Container>
                    <div style={{ position:'absolute',width:'100%', margin:'0px 0px 0px 0px',zIndex:'2',bottom:0}}>
                        <Slide direction="up" in={calendarOpen} timeout={1} >
                            <Container style={{padding:'0px',}}>
                                <Card style={{ position: 'relative', borderRadius:'20px', width:'100%', height:"380px", boxShadow:'0px -10px 20px -5px rgb(0,0,0, 0.1)', paddingTop:'10px'}}>
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
            
                                    {/* <Button onClick={handleOpenTime}>{time}</Button> */}
                                    {/* <div style={{visibility: timeOpen, positon:'relative'}}>
                                        <Card style={{position:'absolute', zIndex:'4', bottom:0, right:0, height:'200px'}}>
                                            
                                        </Card>
                                    </div> */}
                                    <Grid container>
                                        <Grid item style={{margin: '10px 0px 0px 35px'}}>
                                            <Typography style={{fontWeight:'500', fontSize:'15px'}}>시간</Typography>
                                        </Grid>
                                        <Grid item style={{right:0, position:'absolute', marginTop:'5px', marginRight:'35px'}}>
                                            {/* <div style={{position:'relative'}}>
                                            <TextFieldContainer>
                                            <CustomTextField
                                                id="time"
                                                type="time"
                                                defaultValue={changedtime}
                                                onChange={(e) => setChangedTime(e.target.value)}
                                                sx={{ width: 114, '& input[type="time"]': {
                                                    backgroundColor: '#EEEEF0',
                                                    borderRadius: '5px',
                                                    
                                                  }, border: 'none', '& .MuiInputBase-input': {
                                                    paddingLeft: '0px',
                                                  }, }}
                                                
                                            />
                                            </TextFieldContainer>
                                            </div> */}
                                            {/* <div style={{borderRadius:'8px', backgroundColor:'#EEEEF0', width:'80px', height:'30px', textAlign:'center', paddingTop:'5px'}}>
                                                <Typography style={{fontSize:'15px', fontWeight:'500'}}>{time}</Typography>
                                            </div> */}
                                            <TimeContainer>
                                                <TimePicker  onChange={(e)=>setChangedTime(e.target.value)} value={changedtime} />
                                            </TimeContainer>
                                            
                                        </Grid>
                                    </Grid>
                                    
                                </Card>
                                
                            </Container>
                        </Slide>
                        
                        </div>
                    <Container style={{justifyContent:'center', position: "absolute", bottom: 0}}>
                        <div style={{ textAlign:'center', marginBottom:'53px'}}>
                            <Image src={check} width={300} height={56} onClick={handleSubmit}/>
                        </div>
                    </Container>
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