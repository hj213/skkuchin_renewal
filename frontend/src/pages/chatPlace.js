import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CssBaseline, Paper, Input, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import marker from '../image/marker.png';
import marker2 from '../image/location.png';
import check from '../image/check_3.png';
import search from '../image/search.png';
import { load_places } from "../actions/place/place";
import { load_user } from "../actions/auth/auth";
import { set_meet_place, delete_meet_place } from "../actions/chat/chatRoom";

export default function chatPlace(){

    const router = useRouter();
    const dispatch = useDispatch();
    
    const room_id = router.query.room_id;
    const meetPlace = router.query.meetPlace;
    console.log(meetPlace)

    const [calendarOpen, setCalendarOpen] = useState('hidden');
    const [DialogOpen, setDialogOpen] = useState(false);
    const [auto, setAuto] = useState([]);
    const [autoBox, setAutoBox] = useState(false);
    const [value, setValue] = useState('');
    // const [filteredPlace, setFilteredPlace] =useState([]);

    const allPlaces = useSelector(state => state.place.allplaces);
    const user = useSelector(state => state.auth.user);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    useEffect(() => {
        if (!allPlaces || allPlaces.length === 0) {
            dispatch(load_places());
        }
    }, []);

    // //캠퍼스 필터링
    // useEffect(() => {
    //     if (allPlaces && user) {
    //         setFilteredPlace(allPlaces.filter((item) => item.campus === user.toggle));
    //     } else {
    //         setFilteredPlace([]);
    //     }
    // }, [allPlaces, user]);

    const handleValue = (e) => {
        setValue(e.target.value);
        if(e.target.value == ''){
            setAuto([]);
        } else{
            const newAuto = allPlaces.filter((item) => item.name.includes(e.target.value));
            setAuto(newAuto);
        }
    }

    const handleAutoOnClick = (autoValue) => {
        setValue(autoValue);
        setAuto([]);
    }

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
    const handleDelete = () => {
        dispatch(delete_meet_place(room_id, ([result, message]) => {
            if (result) {
                // alert('delete_meet_place 성공! ' + result);
            } else {
                // alert('delete_meet_place 실패! ' +message);
            }
        }));
        router.back();
    };
    const handleSubmit = () => {
        // alert(value);
        dispatch(set_meet_place(value, room_id, ([result, message]) => {
            if (result) {
                // alert('set_meet_place 성공! ' + result);
            } else {
                // alert('set_meet_place 실패! ' + message);
                // if (typeof(message) == 'string') {
                // setDialogMsg(message);
                // }
            }
        }));
        router.back();
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{padding:'0px', margin:'41px 0px 53px 0px', overflow:'hidden'}}>
                    <Container style={{padding:'0px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleBack} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'32%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>장소 정하기</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px'}}>
                        <Grid container style={{margin:'50px 0px 0px 20px'}}>
                            <Grid item>
                                <Image src={marker} width={15} height={19} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{margin:'0px 0px 0px 5px'}}>
                                <Typography style={{ margin:'2px 0px 0px 0px', textAlign:'left', fontSize:'16px'}} fontWeight={theme.typography.h1}>약속 장소</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container style={{padding:'0px', margin:'30px 0px 0px 20px'}}>
                        <Grid container justify="space-around" >
                            <Grid item style={{ margin:'6px 10px 0px 5px', position:'absolute', zIndex:'2'}}>
                                <Image src={search} width={20} height={20} onClick={handleDownClick} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{width:'100%'}}> 
                                <Input 
                                style={{fontSize:'16px', padding:'0px 0px 5px 40px',width:'90%', fontWeight:'500'}} 
                                placeholder= {meetPlace? meetPlace :'식당 이름을 검색해주세요.'}
                                value={value}
                                onChange={handleValue}
                                />
                            </Grid>
                        </Grid>
                        {auto.length > 0 &&
                        <div style={{position:'absolute', zIndex:'2', width:'90%'}}>
                            <Paper style={{width:'90%', border: '0px solid transparent', borderRadius: '0px', boxShadow:'none'}}>
                            <ul style={{padding:'0px 0px 0px 0px', listStyleType: "none",}}>
                                {auto.map((autoList) => (
                                    <li
                                        key={autoList.id}
                                        onClick={()=>handleAutoOnClick(autoList.name)}
                                        style={{ padding:'15px 10px 7px 0px'}}
                                    >   
                                        <Grid container>
                                            <Grid item style={{margin:'0px 0px 0px 0px'}}>
                                                <div style={{fontSize:'16px', fontWeight:'500'}}>
                                                {autoList.name}
                                                </div>
                                                <div style={{fontSize:'12px', color:'#a1a1a1'}}>
                                                    {autoList.address.substr(2)}
                                                </div>
                                            </Grid>
                                            
                                        </Grid>
                                        
                                    </li>
                                ))}
                            </ul>
                            </Paper>
                        </div>
                        }
                        <div>
                            <Button onClick={handleDialogOpen} style={{padding:'0px', margin:'25px 0px 0px 0px', fontSize:'12px', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration:'underline'}}>약속 장소 삭제하기</Button>
                        </div>
                    </Container>
                    <Container style={{justifyContent:'center', position: "absolute", bottom: 0, width:'100%', maxWidth:'600px', zIndex: calendarOpen ? 0 : 2}}>
                        <div onClick={handleSubmit} style={{ textAlign:'center', marginBottom:'53px', cursor: 'pointer'}}>
                            <Image src={check} width={300} height={56} placeholder="blur" layout='fixed' />
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
                            <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>약속 장소를 삭제하시겠어요?</DialogTitle>
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