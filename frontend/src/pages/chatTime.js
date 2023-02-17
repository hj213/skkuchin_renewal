import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'; 
import 'moment/locale/ko';
import { CssBaseline, Box, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import calendar from '../image/calendar.png';
import down from '../image/down-1.png';
import check from '../image/확인_3.png';


export default function chatTime(){

    const router = useRouter();

    const [date, setDate] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState('hidden');
    const [DialogOpen, setDialogOpen] = useState(false);
    
    const handleBack = (e) => {
        router.back();
    }

    const handleDownClick = (e) => {
        if(calendarOpen == 'hidden'){
            setCalendarOpen('visible');
        } else {
            setCalendarOpen('hidden');
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

    }
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
                            <Grid item> 
                                <div style={{ width:'355%', paddingBottom:'8px', borderBottom:"1px solid #BABABA"}}>
                                    <Typography style={{fontSize:'16px', }} fontWeight={theme.typography.h2}>{moment(date).format("YYYY.MM.DD(dd)")}</Typography>
                                </div>
                            </Grid>
                            <Grid item style={{ margin:'0px 0px 0px 225px'}}>
                                <Image src={down} width={25} height={25} onClick={handleDownClick}/>
                            </Grid>
                        </Grid>
                        <div>
                            <Button onClick={handleDialogOpen} style={{padding:'0px', margin:'25px 0px 0px 0px', fontSize:'12px', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration:'underline'}}>약속 시간 삭제하기</Button>
                        </div>
                        <div style={{visibility: calendarOpen, position:'absolute', zIndex:'2',bottom:0}}>
                            <Calendar onChange={setDate} value={date}></Calendar>
                        </div>

                    </Container>
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