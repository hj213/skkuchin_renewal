import { useState } from "react";
import {  TextField, Button,  Typography,  Box, Link} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import uncheck from '../../image/uncheck.png';
import logo from '../../image/email_enhang.png'
import Image from 'next/image';
import { register } from "../../actions/auth/auth";
import { signup_email_check, signup_email_send } from '../../actions/email/email';
import { useRouter } from 'next/router';

const SignUpStep5 = (props) => {
    const router = useRouter();
    
    const handlePrevStep = () => {
      props.handlePrevStep();
    }

    const handleButtonClick = () => {
        router.push('/makeProfile');
    }
      
    return (
      <Box
            sx={{
            marginTop: '45px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '61px'}}>
            <Image width={12.02} height={21.55} src={back} onClick={handlePrevStep}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>이메일 인증</Typography>
        </header>
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={101} src={logo}/>
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>인증 완료!</Typography>
        </div>

        <Button variant="contained" onClick={handleButtonClick} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none', margin: '0 49px'}}>
            스꾸친 시작하기
        </Button>

      </Box>
    );
  };

  export default SignUpStep5;