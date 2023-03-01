import { useRouter } from 'next/router'
import React, { useState } from 'react'
import theme from '../theme/theme';
import Image from 'next/image';
import logo from '../image/login_enheng.png'
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';

export default function welcome() {
    const router = useRouter();
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - (143+56) + "px");

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
            sx={{
            margin: '55px 15px 15px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <div style={{ width: '100%', textAlign: 'center', marginTop: `calc(${remainHeight} * 0.45)` }}>
            <Typography sx={{fontSize: '20px', fontWeight: '500', mb: '12px'}}>WELCOME</Typography>
            <Image width={121} height={101} src={logo} placeholder="blur" layout='fixed' />
            </div>

            <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', margin: '40px'}}>
            <Button variant="contained" onClick={() => router.push('/login')} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                로그인 홈 가기
            </Button>
            </div>
        </Box>
        </ThemeProvider>
    )
}
