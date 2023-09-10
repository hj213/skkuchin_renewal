import { useState } from "react";
import {  TextField, Button,  Typography,  Box, Select, MenuItem, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import theme from '../../theme/theme';
import check from '../../image/check_circle.png';
import uncheck from '../../image/uncheck.png';
import logo from '../../image/email_enhang.png'
import back from '../../image/arrow_back_ios.png';
import Image from 'next/image';
import { signup_email_send } from '../../actions/email/email';
import { useRouter } from 'next/router';

const SignUpStep6 = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [emailId, setEmailId] = useState('');
    const [domain, setDomain] = useState('@g.skku.edu');
    const src = router.query.src;

    const [checkState, setCheckState] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 505 + "px");
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }
    const handleSubmit= (e) => {
      e.preventDefault();
      console.log(props.data)

      dispatch(signup_email_send(props.data.username, emailId+domain, true, ([result, message]) => {
        if (result) {
          props.setData({...props.data, email: emailId+domain});
          props.handleNextStep();
        } else {
          setDialogMsg(message);
          setDialogOpen(true);
        }
      }));
    }

    const handleCheck = () => {
      setCheckState(!checkState);
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
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                                <div style={{width: '11px', height: '18px'}}></div>
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}></Typography>
                            </Grid>
                        </Grid>
        </Container>
      <Box
            sx={{
            margin: '55px 0 15px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center'
            }}
        >
        {/* <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={141} height={101} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '25px', fontWeight: '500', mb: '37px'}}>성균관대학교 인증</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '500', mb: '55px', lineHeight: '25px', color: '#505050'}}>스꾸친(SKKU_CHIN)은 <br/>
                        <u>성균관대학교 맛집 정보 & 성대생과의 대화 서비스</u>를 제공합니다 <br/>
                        원활한 서비스 이용을 위해 <br/>
                        이메일 인증을 완료해주세요</Typography>
        </div> */}

        {/* <form onSubmit={handleSubmit} style={{display: 'grid', width: '100%', alignItems: 'center', justifyItems: 'center', margin: '0 24px'}}>
        <div style={{textAlign: 'center', display: 'flex', margin: '0 55px', marginBottom: '10.75px'}}>
          <TextField
            variant="standard"
            placeholder="킹고 이메일 주소"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            inputProps={{
              style: {
                fontSize: '12px',
                padding: '4px 24px 5px 0',
                height: '32px'
              }
            }}
            
          />
          <Select
              variant="standard"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              InputProps={{
                style: {
                  fontSize: '12px',
                }
              }}
          >
            <MenuItem value="@g.skku.edu">@g.skku.edu</MenuItem>
            <MenuItem value="@skku.edu">@skku.edu</MenuItem>
          </Select>
        </div>
        <div style={{display:'flex', height: '28px', alignItems: 'center', justifyItems: 'center', marginBottom: '37px'}}>
            {
              checkState ?
                <Image src={check} onClick={handleCheck} width={15.83} height={15.83} layout='fixed' />
              :  
                <Image src={uncheck} onClick={handleCheck} width={15.83} height={15.83} layout='fixed' />
            }
          <Typography sx={{fontSize: '10px', fontWeight: '500', ml: '5.58px'}}><span onClick={() => router.push({pathname: '/policy', query: {page: 'register', pathUsername: props.data.username}})} style={{textDecoration: 'underline'}}>개인정보처리방침</span> 및 <span onClick={() => router.push({pathname: '/userAgreement', query: {page: 'register', pathUsername: props.data.username}})} style={{textDecoration: 'underline'}}>이용약관</span>에 동의합니다</Typography>
        </div>
        <div style={{display: 'grid', width: '90%', alignItems: 'center', justifyItems: 'center'}}>
          {emailId != '' && checkState ?
              <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                  이메일 인증하기
              </Button>
          :
              <Button variant="contained"  disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                  이메일 인증하기
              </Button>
          }
        </div>
        </form> */}
        <form onSubmit={handleSubmit} style={{ width: '100%'}}>
        <div style={{margin: '0 24px'}}>
        <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>이메일 인증</Typography>
        <Typography style={{fontSize: '12px', fontWeight: '900', marginTop: '31px', marginLeft: '4px', color: '#3C3C3C'}}>이메일 입력</Typography>
        <div style={{textAlign: 'center', display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: '8px'}}>
        <input
            variant="standard"
            placeholder="이메일 주소"
            value={emailId}
            onClick={e => setDialogOpen(false)}
            onChange={(e) => setEmailId(e.target.value)}
            style={{
                fontSize: '16px',
                padding: '20px 15px 21px 12px',
                height: '56px',
                border: '1px solid #E2E2E2',
                borderRadius: '8px 0 0 8px',
                width: '100%',
                outline: 'none'
            }}
        />
        <Select
            //xs={2}
            sx={{ 
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
            }, 
            color: '#3C3C3C',
            fontSize: '16px',
            //padding: '0px 0px 1px 12px',
            textAlign: 'left',
            height: '56px',
            border: '1px solid #E2E2E2',
            borderLeft: '1px solid white',
            borderRadius: '0 8px 8px 0',
            outline: 'none',
            appearance: 'none',}}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
        >
            <MenuItem value='@g.skku.edu'>@g.skku.edu</MenuItem>
            <MenuItem value='@skku.edu'>@skku.edu</MenuItem>
        </Select>   
        </div>
        <div style={{display:'flex', height: '28px', alignItems: 'center', justifyItems: 'center', marginBottom: '28px', marginTop: '20px'}}>
            {
              checkState ?
                <Image src={check} onClick={handleCheck} width={15.83} height={15.83} layout='fixed' />
              :  
                <Image src={uncheck} onClick={handleCheck} width={15.83} height={15.83} layout='fixed' />
            }
          <Typography sx={{fontSize: '12px', fontWeight: '500', ml: '5.58px', color: '#3C3C3C'}}><span onClick={() => router.push({pathname: '/policy', query: {page: 'register', pathUsername: props.data.username}})} style={{textDecoration: 'underline', fontWeight: '700', color: '#3C3C3C'}}>개인정보처리방침</span> 및 <span onClick={() => router.push({pathname: '/userAgreement', query: {page: 'register', pathUsername: props.data.username}})} style={{textDecoration: 'underline', fontWeight: '700', color: '#3C3C3C'}}>이용약관</span>에 동의합니다</Typography>
        </div>
        </div>
            <div style={{margin: '28px 24px 12px'}}>
            {emailId != '' && checkState ?
                <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                    이메일 인증하기
                </Button>
                :
                <Button variant="contained"  disabled style={{width: '100%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                    이메일 인증하기
                </Button>
            }
            </div>
            </form>
      </Box>
      <div style={{display: 'grid', justifyItems: 'center', marginBottom: '22px', marginTop: remainHeight}}>
        <Typography sx={{fontSize: '9px', fontWeight: '400', ml: '5.58px', color: '#BABABA', marginTop: '22px'}}>*이메일 인증을 완료하지 않으면 서비스 이용에 어려움이 있을 수 있습니다.</Typography>
        <Typography sx={{fontSize: '9px', fontWeight: '400', ml: '5.58px', color: '#BABABA', mt: '8px'}}>*이메일이 도착하지 않을 경우, 스팸메일함을 확인해주세요.</Typography>
      </div>

        <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                      {dialogMsg}
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

  export default SignUpStep6;