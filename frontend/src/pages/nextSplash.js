import { CssBaseline, ThemeProvider,Container } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import { autoPlay } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import { virtualize } from "react-swipeable-views-utils";
import { useState } from "react";
import { useRouter } from "next/router";
import splash0 from '../image/splash1.png';
import splash1 from '../image/splash2.png';
import splash2 from '../image/splash3.png';
import start from '../image/startBtn.png';


const splashImages = [{src: splash0, width:'262', height:'526'}, {src: splash1, width:'202', height:'525'}, {src: splash2, width:'315', height:'448'}];
const VirtualizeSwipeableViews = virtualize(SwipeableViews);
const AutoPlaySwipeableViews = autoPlay(VirtualizeSwipeableViews);

export default function nextSplash(){

    const router = useRouter();
    const [splashIndex, setSplashIndex] = useState(0);
    const handleSplashChange = (index) => {
        setSplashIndex(index);
    };
    const handleStartClick = () => {
        router.push('/')
    }

    const height = window.innerHeight / 2 - 250;
    
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <div style={{ height: "100vh", textAlign: "center" }}>
                <SwipeableViews
                index={splashIndex}
                onChangeIndex={handleSplashChange}
                >
                {splashImages.map((image, index) => (
                    <div key={index} style={{marginTop: height}}>
                    <Image src={image.src} width={image.width} height={image.height} />
                    {image.src == splash2 && (
                    <div style={{ marginTop: "1.5rem" }}>
                        <Image src={start} width={296} height={56} onClick={handleStartClick}/>
                    </div>
                    )}
                    </div>
                ))}
                </SwipeableViews>
                </div>
            </Container>
        </ThemeProvider>
    )
}