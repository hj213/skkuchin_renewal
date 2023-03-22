import { useRouter } from 'next/router';
import {ThemeProvider, CssBaseline, Typography, Button, Container, Grid, TextField} from '@mui/material';
import theme from "../theme/theme";
import Image from 'next/image';
import button1 from '../image/goLoginButton.png';
import button2 from '../image/startAIButton.png';
import dynamic from 'next/dynamic';

const matchingComplete = () => {

    const router = useRouter();
    const src= router.query.src;

    const handleButtonClick = (e) => {
        if(src == '회원가입'){
            router.push('/login');
        } else if(src == '매칭프로필설정'){
            router.push('/match');
        }
    }
    const height = window.innerHeight / 2 - 100;
    const height2 = window.innerHeight /3 - 50;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{ marginTop:height}}>
                <div style={{textAlign:'center', fontSize:'36px'}}>
                    👏
                </div>
            </div>
            <div style={{textAlign:'center', marginTop:'12px'}}>
                <Typography style={{fontSize:'20px'}}>
                    매칭 프로필 설정으로<br/>
                    매칭이 활성화되었습니다. 
                </Typography>
            </div>
            <div style={ {marginTop:height2}}>
                <div style={{textAlign:'center'}}>
                    <Typography style={{fontSize:'10px'}}>
                        *매칭 프로필을 변경하고 싶은 경우<br/>
                        [AI매칭 &#62; 내 프로필 보기]에서 변경가능합니다. 
                    </Typography>
                </div>
            </div>
            <div style={{textAlign:'center', marginTop:'17px'}}>
                <Image src={src == '회원가입' ? button1: button2} width={296} height={56} onClick={handleButtonClick} placeholder="blur" layout='fixed' />
            </div>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(matchingComplete), {
    ssr: false,
});