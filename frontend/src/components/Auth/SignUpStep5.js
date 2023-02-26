import { useState } from "react";
import {  TextField, Button,  Typography,  Box, Link, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import theme from '../../theme/theme';
import back from '../../image/arrow_back_ios.png';
import logo from '../../image/email_enhang.png'
import Image from 'next/image';
import { signup_email_check, signup_email_send } from '../../actions/email/email';

const SignUpStep5 = (props) => {
    const dispatch = useDispatch();
    const [emailId, setEmailId] = useState('');
    const [domain, setDomain] = useState('@g.skku.edu');

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }
    
    const handleResend = () => {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(signup_email_send(props.data.username, props.data.email, true, ([result, message]) => {
          if (result) {
            setDialogMsg("이메일을 재전송했습니다.");
          } else {
            setDialogMsg(message);
          }
          setDialogOpen(true);
        }));
      }
    }

    const handleSubmit= (e) => {
      e.preventDefault();

      if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(signup_email_check(props.data.username, ([result, message]) => {
          if (result) {
            props.handleNextStep();
          } else {
            setDialogMsg(message);
            setDialogOpen(true);
          }
        }));
      }
    }

    const handleDialogOpen = (e) => {
      if(dialogOpen){
          setDialogOpen(false);
      } else{
          setDialogOpen(true);
      }
    }
      
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep}/>
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography>
                            </Grid>
                        </Grid>
        </Container>
      <Box
            sx={{
            margin: '55px 15px 15px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center'
            }}
        >
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '61px'}}>
            <Image width={12.02} height={21.55} src={back} onClick={handlePrevStep}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>이메일 인증</Typography>
        </header> */}
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={101} src={logo}/>
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '500', mb: '31px', lineHeight: '25px', color: '#505050'}}>
                성균관대학교 인증 메일이 발송되었습니다. <br/>
                        발송된 메일을 통해 인증 완료 후 <br/>
                        아래 확인 버튼을 눌러주세요
            </Typography>
            <Typography sx={{fontSize: '10px', fontWeight: '500', mb: '97px', lineHeight: '25px', color: '#505050'}}>
                        모바일인 경우 <br/>
                        [킹고M 어플&gt;메뉴&gt;킹고포털&gt;G-Mail]에서 확인 가능합니다
            </Typography>
            <Link component="button" variant="body2" color="#BABABA" onClick={handleResend} sx={{fontSize: '12px', mb: '18px'}}>이메일 재전송</Link>
        </div>
        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center', width: '90%'}}>
            <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                확인
            </Button>
        </div>
      </Box>

      <div style={{display: 'grid', justifyItems: 'center', marginBottom: '24px'}}>
        <Typography sx={{fontSize: '6px', fontWeight: '400', ml: '5.58px', color: '#BABABA', marginTop: '22px'}}>*이메일 인증을 완료하지 않으면 서비스 이용에 어려움이 있을 수 있습니다.</Typography>
        <Typography sx={{fontSize: '6px', fontWeight: '400', ml: '5.58px', color: '#BABABA', mt: '8px'}}>*이메일이 도착하지 않을 경우, 스팸메일함을 확인해주세요.</Typography>
      </div>
        <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{display: 'grid', alignItems: 'center', width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                      {/* {dialogMsg.includes('\n') == true ? 
                      <>
                      {dialogMsg.split('\n')[0]}<br/>
                      {dialogMsg.split('\n')[1]}
                      </>
                      :
                      {dialogMsg}} */}
                      {dialogMsg.split('\n').length > 1 ? 
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

  export default SignUpStep5;