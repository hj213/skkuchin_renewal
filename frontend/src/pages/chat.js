import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Box, ThemeProvider, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import time from '../image/calendar.png';
import place from '../image/marker.png';
import more from '../image/more_vert.png';


const chatPage = () => {

    const router = useRouter();

    const user = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <Grid
                    sx={{
                    marginTop: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    }}
                >
                    <Grid style={{width: '100%', padding: '0 15px', textAlign: 'center', borderBottom: '1px solid #BABABA'}}>
                        <Grid sx={{display: 'flex'}}>
                            <Image width={12.02} height={21.55} src={back}/>
                            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>{user!=null && user.nickname}</Typography>
                            <Image width={6.33} height={17.33} src={more}/>
                        </Grid>
                        <Grid item sx={{display: 'flex', justifyContent: 'center', fontSize: '10px', fontWeight: '500', color: '#BABABA', padding: '10px 0px'}}>
                            <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '0px 6.5px', borderRadius: '17px'}}>{user !== null && user.campus}</Typography>&nbsp;
                            경영학과 &nbsp;/&nbsp; 
                            21 학번 &nbsp;/&nbsp; 
                            남
                        </Grid>
                    </Grid>

                    <Grid style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                        <div style={{width: '210px', backgroundColor: '#FFF8D9', display: 'flex', justifyContent: 'center' }}>
                        <Grid item sx={{display: 'flex'}}>
                            <Image width={13} height={15} src={time}></Image>
                            <Typography sx={{fontSize: '10px', padding: '5px auto'}}>시간 정하기</Typography>
                        </Grid>
                        <Grid item  sx={{display: 'flex'}}>
                            <Image width={10.5} height={14.6} src={place}></Image>
                            <Typography sx={{fontSize: '10px', padding: '5px auto'}}>장소 정하기</Typography>
                        </Grid>
                        </div>
                    </Grid>
                </Grid>
        </ThemeProvider>
    )
}

export default chatPage;