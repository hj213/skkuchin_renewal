import { useState, useEffect } from "react";
import {  TextField, Button, Typography, Box, Select, MenuItem, Link, Grid, Container} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';

export default function Step2(props) {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleButtonClick = () => {
        router.push('/login');
    }

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'33%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>아이디 찾기</Typography>
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '55px 15px 15px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '55px'}}>
                <Image width={12.02} height={21.55} src={back} />
                <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>아이디 찾기</Typography>
        </header> */}

        <div style={{margin: '0 24px', width: '80%'}}>
                <TextField
                variant="standard"
                label="아이디:"
                value={user.username}
                style={{width: '100%'}}
                inputProps={
					{ readOnly: true }
				}
                />
            </div>
        <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', margin: '40px auto', maxWidth: '420px'}}>
        <Button variant="contained" onClick={handleButtonClick} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
            로그인 홈 가기
        </Button>
        </div>
        </Box>
        </div>
    );
}
