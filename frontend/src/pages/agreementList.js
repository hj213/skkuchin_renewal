import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Container, Grid, MenuItem, Button, TextField, Typography, Link, FormControl, InputLabel, Select } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/arrow_back_ios.png';
import next from '../image/arrow_next.png';
import dynamic from 'next/dynamic';

const agreementList = () => {
    const router = useRouter();

    const list = ["이용약관", "개인정보 처리방침", "광고성 정보 수신 동의"]

    const backClick = e => {
        router.push('/myPage');
    }

    const handleClick = e => {
        switch(e.target.id) {
            case "이용약관":
                router.push({pathname: '/userAgreement', query: {page: 'agreementList'}});
                break;
            case "개인정보 처리방침":
                router.push({pathname: '/policy', query: {page: 'agreementList'}});
                break;
            case "광고성 정보 수신 동의":
                router.push({pathname: '/marketingConsent', query: {page: 'agreementList'}});
                break;

        }
    }

    return (
    <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* 상단 */}
        <Container style={{padding:'0px', alignItems: 'center', marginBottom: '55px', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={backClick} style={{justifySelf: 'start'}} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'32%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>약관 및 정책</Typography>
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '0px 22px 22px 22px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >

        {list.map(elem => 
            <div style={{display: 'grid', gridTemplateColumns: '1fr 38px', alignItems: 'center', marginBottom: '32px', width: '100%'}} id={elem} onClick={handleClick}>
                <Typography id={elem} style={{fontSize: '16px'}}>{elem}</Typography>
                <Image width={38} height={38} src={next} layout='fixed' id={elem}/>
            </div>    
        )}
        </Box>
    </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(agreementList), {
    ssr: false,
});