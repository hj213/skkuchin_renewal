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
                            <Grid item style={{margin:'0px 0px 0px 39px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'33%'}}>
                                {/* <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>아이디 찾기</Typography> */}
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

        <div style={{width: '100%'}}>
        <div style={{margin: '0 24px'}}>
        <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>아이디 찾기</Typography>
        <Typography style={{fontSize: '12px', fontWeight: '400', marginBottom: '13px', color: '#777777'}}>입력하신 정보와 일치하는 아이디입니다.</Typography>
        <div style={{ width: '100%'}}>
                <input readOnly
                variant="standard"
                value={user.username}
                style={{fontSize: '16px',
                    padding: '20px 15px 21px 12px',
                    height: '56px',
                    border: '1px solid #E2E2E2',
                    marginTop: '15px',
                    borderRadius: '8px',
                    width: '100%',
                    outline: 'none'}}
                />
            </div>
        <Button variant="contained" onClick={() => router.push('/login')} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none', marginTop: '62px'}}>
            로그인 하러가기
        </Button>
        <Button variant="contained"  disabled style={{width: '100%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none', marginTop: '15px'}}>
            비밀번호 찾기
        </Button>
        </div>
        </div>
        </Box>
        </div>
    );
}
