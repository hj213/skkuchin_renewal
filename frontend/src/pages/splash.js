import { CssBaseline, Paper, MobileStepper, ThemeProvider, DialogContent, DialogContentText, DialogTitle, DialogActions, Card, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import logo from '../image/main_logo.png';
import Image from 'next/image';
import {Swipeable} from 'react-swipeable';
import { useState, useEffect } from "react";
import loading0 from '../image/loading0.png';
import loading1 from '../image/loading1.png';
import loading2 from '../image/loading2.png';
import loading3 from '../image/loading3.png';
import splash0 from '../image/splash1.png';
import splash1 from '../image/splash2.png';
import splash2 from '../image/splash3.png';


const loadingImages = [loading0, loading1, loading2, loading3];
const splashImages = [splash0, splash1, splash2];

export default function splash(){

    const [loadingIndex, setLoadingIndex] = useState(0);
    const [splashIndex, setSplashIndex] = useState(0);

    useEffect(() => {
        // 1초마다 이미지 변경
        const intervalId = setInterval(() => {
            setLoadingIndex((loadingIndex + 1) % loadingImages.length); // 다음 이미지로 변경
        
        }, 1000);
        return () => clearInterval(intervalId);
    }, [loadingIndex]);

    const height = window.innerHeight / 2 - 140;
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container style={{height:'100vh', width:'100%', position:'relative', padding:'0px', display:'flex'}}>
                <div style={{ width:'100%', height:'100%', textAlign:'center', position:'absolute', display:'block', justifyContent:'center', marginTop:height}}>
                    <Image src={logo} />
                </div>
                <div style={{width:'100%', textAlign:'center', position:'absolute', bottom:35}}>
                    <Image src={loadingImages[loadingIndex] }width={133} height={56}/>
                </div>
            </Container>
            <Container>
                {/* <div style={{height:'100%', textAlign:'center'}}>
                    <Swipeable onSwipedLeft={() => console.log('Swiped left!')}>
                        <Image src={splashImages[splashIndex]} />
                    </Swipeable>
                </div> */}
            </Container>
        </ThemeProvider>
    )
}