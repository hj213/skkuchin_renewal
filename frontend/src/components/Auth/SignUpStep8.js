import { useState, useEffect } from "react";
import {  TextField, Button,  Typography,  Box, Link, Container, Grid} from '@mui/material';
import logo from '../../image/email_enheng_wink.png'
import Image from 'next/image';
import { useRouter } from 'next/router';

const SignUpStep8 = (props) => {
    const router = useRouter();
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 456 + "px");

    useEffect(() => {
        setRemainHeight(window.innerHeight - 350 + "px")
    }, [window.innerHeight])

    const handleButtonClick = () => {
        router.push({
          pathname: '/',
          //query: { src : '회원가입', username: props.username }
        });
    }
      
    return (
      <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                {/* <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' /> */}
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
            }}
        >
        <div style={{ width: '100%', textAlign: 'center'}}>
            <Image width={103} height={85} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '32px', color: '#3C3C3C'}}>인증이 완료되었어요!</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', mb: '32px', height: '37px', color: '#777777'}}>스꾸친에 오신걸 환영해요!</Typography>
        </div>

        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center', width: '100%'}}>
        <Button variant="contained" onClick={handleButtonClick} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
            홈으로 가기
        </Button>
        </div>
      </Box>
      </div>
    );
  };

  export default SignUpStep8;