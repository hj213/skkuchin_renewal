import { useState, useEffect } from "react";
import {  TextField, Button,  Typography,  Box, Link, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import theme from '../../theme/theme';
import back from '../../image/arrow_back_ios.png';
import logo from '../../image/email_enhang.png'
import Image from 'next/image';
import { signup_email_check, signup_email_send } from '../../actions/email/email';

const SignUpStep7 = (props) => {
    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 456 + "px");
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }
    
    const handleResend = () => {
        dispatch(signup_email_send(props.data.username, props.data.email, true, ([result, message]) => {
          if (result) {
            setDialogMsg("이메일을 재전송했습니다.");
          } else {
            if (typeof(message) == 'string') {
              setDialogMsg(message);
            }
          }
          setDialogOpen(true);
        }));
    }

    const handleSubmit= (e) => {
      e.preventDefault();

      dispatch(signup_email_check(props.data.username, ([result, message]) => {
        if (result) {
          props.handleNextStep();
        } else {
          setDialogMsg(message);
          setDialogOpen(true);
        }
      }));
    }

    const handleDialogOpen = (e) => {
      if(dialogOpen){
          setDialogOpen(false);
      } else{
          setDialogOpen(true);
      }
    }

    useEffect(() => {
      setRemainHeight(window.innerHeight - 510 + "px");
    })
      
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
            margin: `calc(${remainHeight} * 0.45) 24px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            //justifyItems: 'center'
            }}
        >
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={103} height={85} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '32px', color: '#3C3C3C'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', mb: '32px', lineHeight: '21px', color: '#777777'}}>
                성균관대학교 인증 메일이 발송되었습니다. <br/>
                        발송된 메일을 통해 인증 완료 후 <br/>
                        아래 확인 버튼을 눌러주세요
            </Typography>
            
        </div>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center', width: '100%'}}>
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                확인
            </Button>
            <Link component="button" variant="body2" color="#777777" onClick={handleResend} sx={{fontSize: '12px', mt: '32px'}}>이메일 재발송</Link>
        </div>
      </Box>

      <Typography sx={{fontSize: '10px', fontWeight: '500', lineHeight: '18px', color: '#505050', textAlign: 'center'}}>
                        @g.skku.edu인 경우 [성균관대 홈페이지 로그인 {'>'} 우측 상단 Google 메일], 
        </Typography>
        <Typography sx={{fontSize: '10px', fontWeight: '500', lineHeight: '18px', color: '#505050', textAlign: 'center'}}>
        @skku.edu인 경우 [킹고M 어플 {'>'} 킹고포털 {'>'} 메일]에서 확인 가능합니다
        </Typography>
        <Typography sx={{fontSize: '10px', fontWeight: '500', lineHeight: '16px', color: '#E2E2E2', textAlign: 'center'}}>
        * 이메일 인증을 완료하지 않으면 서비스 이용에 어려움이 있을 수 있습니다. 
        </Typography>
        <Typography sx={{fontSize: '10px', fontWeight: '500', lineHeight: '16px', color: '#E2E2E2', textAlign: 'center', mb: '10px'}}>
        이메일이 도착하지 않을 경우, 스팸메일함을 확인해주세요.
        </Typography>
      {/* <div style={{display: 'grid', justifyItems: 'center', marginBottom: '24px'}}>
        <Typography sx={{fontSize: '9px', fontWeight: '400', ml: '5.58px', color: '#BABABA', marginTop: '22px'}}>*이메일 인증을 완료하지 않으면 서비스 이용에 어려움이 있을 수 있습니다.</Typography>
        <Typography sx={{fontSize: '9px', fontWeight: '400', ml: '5.58px', color: '#BABABA', mt: '8px'}}>*이메일이 도착하지 않을 경우, 스팸메일함을 확인해주세요.</Typography>
      </div> */}
        <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{display: 'grid', alignItems: 'center', width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                      
                      {(dialogMsg||'').split('\n').length > 1 ? 
                      <>
                      {dialogMsg.split('\n')[0]}<br/>
                      {dialogMsg.split('\n')[1]}
                      </>
                      : dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                    
                        <Button onClick={e => setDialogOpen(false)} variant="text" style={{fontSize:"14px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`}}>
                            <Typography style={{fontSize:"14px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`, marginBottom:'10px'}}>
                                확인
                            </Typography>
                        </Button>

                </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  };

  export default SignUpStep7;