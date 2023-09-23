import { useState } from "react";
import {  TextField, Button, InputLabel, Typography, Box, Container, Grid, ThemeProvider, CssBaseline} from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import Image from 'next/image';
import logo from '../../image/email_enhang.png'
import theme from '../../theme/theme';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';

const SignUpStep5 = (props) => {
    const dispatch = useDispatch();
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 320 + "px")
    const handleSubmit = () => {
        props.handleNextStep();
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                          <Grid container>
                              <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                  {/* <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' /> */}
                                  <div style={{width: '11px', height: '18px'}}></div>
                              </Grid>
                              <Grid item style={{marginLeft:'35%'}}>
                                  <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}></Typography>
                              </Grid>
                          </Grid>
          </Container>
        <Box
              sx={{
              margin: `calc(${remainHeight} * 0.3) 24px`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              //justifyItems: 'center'
            }}
        >
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={103} height={85} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '32px', color: '#3C3C3C'}}>스꾸친에 오신 걸 환영합니다!</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', mb: `calc(${remainHeight} * 0.2)`, lineHeight: '21px', color: '#777777'}}>
                스꾸친은 성균관대학교 기반 매칭 서비스를 제공합니다<br/>
                원활한 서비스 이용을 위해 이메일 인증을 해주세요
            </Typography>
        </div>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center', width: '100%'}}>
            <Typography style={{fontSize: '10px', color: '#3C3C3C', marginBottom: '10px'}}>*매칭 프로필은 마이페이지 밥약 매칭 프로필 설정에서 변경 가능합니다.</Typography>
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                이메일 인증하기
            </Button>
        </div>
    </Box>
    </ThemeProvider>
    )
}

export default SignUpStep5;