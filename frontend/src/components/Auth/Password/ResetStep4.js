import React from 'react'
import {  Button, Typography, Box } from '@mui/material';
import check from '../../../image/check_circle.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ResetStep4() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/login');
  }
  
  return (
    <Box
      sx={{
      marginTop: '45px',
      innerHeight: window.innerHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      }}
    >
      <Image src={check} width={35.83} height={35.83} sx={{p: '1.58px', mb: '5.58px'}}/>
      <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화 완료</Typography>
      <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none', margin: '0 49px'}}>
        로그인 홈 가기
      </Button>
    </Box>
  )
}
