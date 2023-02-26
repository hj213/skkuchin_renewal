import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Container, Grid, MenuItem, Button, TextField, Typography, Link, FormControl, InputLabel, Select } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/arrow_back_ios.png';
import next from '../image/arrow_next.png';
import UserAgreement from '../components/MyPage/UserAgreement';
import PersonalInfo from '../components/MyPage/PersonalInfo';
import AdAgreement from '../components/MyPage/AdAgreement';

export default function agreement() {
    const router = useRouter();

    const list = ["약관 및 정책", "이용약관", "개인정보 처리방침", "광고성 정보 수신 동의"]
    const [page, setPage] = useState("약관 및 정책");

    const backClick = e => {
        if (page == list[0]) {
            router.push('/myPage');
        } else {
            setPage(list[0]);
        }
    }

    const handleClick = e => {
        console.log(e.target.id);
        setPage(e.target.id);
    }

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
            sx={{
            margin: '45px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        {/* 상단 */}
        <Container style={{padding:'0px', alignItems: 'center', marginBottom: '55px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={backClick}/>
                            </Grid>
                            <Grid item style={{marginLeft:'31%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>{page}</Typography>
                            </Grid>
                        </Grid>
        </Container>

        {page == list[0] && list.map(elem => 
            <div style={{display: 'grid', gridTemplateColumns: '1px 11px', marginBottom: '32px'}} id={elem} onClick={handleClick}>
                <Typography id={elem} style={{fontSize: '16px'}}>{elem}</Typography>
                <Image width={10.43} height={17.69} src={next} />
            </div>    
        )}

        {page == list[0] && <UserAgreement />}

        {page == list[1] && <PersonalInfo />}

        {page == list[2] && <AdAgreement />}
        </Box>
    </ThemeProvider>
    )
}
