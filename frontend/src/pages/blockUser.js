import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, useMediaQuery, Paper } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import back from '../image/arrow_back_ios.png';
import logo from '../image/search_enheng.png'
import { useDispatch, useSelector } from "react-redux";


export default function blockUser(){
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const height = window.innerHeight/2 -140;

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                <Grid container>
                    <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                        <Image src={back} width={11} height={18} name='back' onClick={handleArrowClick} placeholder="blur" layout='fixed' />
                    </Grid>
                    <Grid item style={{marginLeft:'35%'}}>
                        <Typography style={{margin:'0px 0px 0px -15px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>차단 유저 관리</Typography>
                    </Grid>
                </Grid>
            </Container>
            <Container style={{textAlign:'center', marginTop: height}}>
                <Image src={logo} width={138} height={100}/>
                <Typography color={theme.palette.fontColor.light} style={{fontSize:'14px'}} fontWeight={theme.typography.h2}>차단한 유저가 없어요.</Typography>
            </Container>
        </ThemeProvider>
    )
}