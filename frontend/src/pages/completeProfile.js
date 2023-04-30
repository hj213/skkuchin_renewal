import { useRouter } from 'next/router';
import {ThemeProvider, CssBaseline, Typography, Button, Container, Grid, TextField} from '@mui/material';
import theme from "../theme/theme";
import dynamic from 'next/dynamic';

const matchingComplete = () => {

    const router = useRouter();
    const src= router.query.src;

    const handleButtonClick = (e) => {
        if(src == '회원가입'){
            router.push('/login');
        } else if(src == '스꾸챗프로필설정'){
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
                    스꾸챗 프로필 등록으로<br/>
                    대화 참여가 가능해졌습니다. 
                </Typography>
            </div>
            <div style={ {marginTop:height2}}>
                <div style={{textAlign:'center'}}>
                    <Typography style={{fontSize:'10px'}}>
                        *스꾸챗 프로필을 변경하고 싶은 경우<br/>
                        [스꾸챗 &#62; 내 프로필 보기]에서 변경가능합니다. 
                    </Typography>
                </div>
            </div>
            <div style={{textAlign:'center', marginTop:'17px'}}>
                <Button 
                    variant="contained" 
                    onClick={handleButtonClick}
                    style={{
                        width: '80%', 
                        backgroundColor: "#FFCE00", 
                        color: '#fff', 
                        fontSize: '16px', 
                        fontWeight: '700',  
                        borderRadius: '15px', 
                        height: '56px', 
                        boxShadow: 'none'
                    }}>
                    {src == '회원가입' ? '로그인 홈 가기' : '스꾸챗 시작하기'}
                </Button>
            </div>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(matchingComplete), {
    ssr: false,
});