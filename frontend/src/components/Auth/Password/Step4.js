import {useState} from 'react'
import {  Button, Typography, Box } from '@mui/material';
import logo from '../../../image/email_enhang.png'
import Image from 'next/image';
import { useRouter } from 'next/router';

const Step4 = (props) => {
  const router = useRouter();

  const [remainHeight, setRemainHeight] = useState(window.innerHeight - 290 + "px");

  const handleSubmit = () => {
    router.push('/login');
  }
  
  return (
    <Box
      sx={{
      //marginTop: '245px',
      margin: `calc(${remainHeight} * 0.45) 24px`,
      innerHeight: window.innerHeight,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      }}
    >
      <Image width={103} height={85} src={logo} placeholder="blur" layout='fixed' />
      <Typography align='center' style={{fontSize: '24px', color: '#3C3C3C', fontWeight: '700', margin: '32px 0 12px 0'}}>비밀번호 초기화 완료!</Typography>
      <Typography align='center' style={{fontSize: '14px', color: '#777777'}}>비밀번호가 초기화되었습니다.</Typography>
      <div style={{display: 'grid', width: '100%', marginTop: '44px'}}>
      <Button variant="contained" onClick={handleSubmit} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
        로그인 하러가기
      </Button>
      </div>
    </Box>
  )
}
export default Step4;