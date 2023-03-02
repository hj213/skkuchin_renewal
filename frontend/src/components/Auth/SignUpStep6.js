import { useState } from "react";
import {  TextField, Button,  Typography,  Box, Link, Container, Grid} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import uncheck from '../../image/uncheck.png';
import logo from '../../image/email_enheng_wink.png'
import Image from 'next/image';
import { register } from "../../actions/auth/auth";
import { signup_email_check, signup_email_send } from '../../actions/email/email';
import { useRouter } from 'next/router';

const SignUpStep6 = (props) => {
    const router = useRouter();
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }

    const handleButtonClick = () => {
        router.push({
          pathname: '/makeProfile',
          query: { src : '회원가입', username: props.username }
        });
    }
      
    return (
      <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} placeholder="blur" layout='fixed' />
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
            }}
        >
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '61px'}}>
            <Image width={12.02} height={21.55} src={back} onClick={handlePrevStep}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>이메일 인증</Typography>
        </header> */}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '150px' }}>
            <Image width={121} height={101} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>인증 완료!</Typography>
        </div>

        <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', margin: '40px'}}>
        <Button variant="contained" onClick={handleButtonClick} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
            스꾸친 시작하기
        </Button>
        </div>
      </Box>
      </div>
    );
  };

  export default SignUpStep6;