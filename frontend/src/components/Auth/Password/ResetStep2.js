import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, InputAdornment} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { password_email_check } from '../../../actions/email/email';

const ResetStep2 = (props) => {
    const dispatch = useDispatch();

    const handleSubmit= (e) => {
        e.preventDefault();

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(password_email_check(props.email, ([result, message]) => {
                if (result) {
                props.handleNextStep();
                alert(message);
                } else {
                alert(message);
                }
            }));
        }
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
            <Image width={12.02} height={21.55} src={back} />
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header>
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={101} src={logo}/>
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '500', mb: '55px', lineHeight: '25px', color: '#505050'}}>
                비밀번호 초기화 인증 메일이 발송되었습니다. <br/>
                발송된 메일을 통해 비밀번호를 재설정해주세요
            </Typography>
            <Typography sx={{fontSize: '10px', fontWeight: '500', mb: '97px', lineHeight: '25px', color: '#505050'}}>
                        모바일인 경우 <br/>
                        [킹고M 어플&gt;메뉴&gt;킹고포털&gt;메일]에서 확인 가능합니다
            </Typography>
            <Link component="button" variant="body2" onClick={handleResend} sx={{fontSize: '12px', mb: '18px'}}>이메일 재전송</Link>
        </div>

        
        <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none', margin: '0 49px'}}>
            확인
        </Button>
    </Box>
    );
};

export default ResetStep2;