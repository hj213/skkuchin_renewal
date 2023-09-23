import { useEffect, useState } from "react";
import {  TextField, Button, InputLabel, Typography, Box, Link, Grid, Container, Dialog, DialogContent, DialogActions} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import logo from '../../../image/email_enhang.png'
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { password_email_check, password_email_send } from '../../../actions/email/email';

const Step2 = (props) => {
    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 456 + "px");

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleResend = () => {
        dispatch(password_email_send(props.email, ([result, message]) => {
            if (result) {
                setDialogMsg("이메일을 재전송했습니다.");
                setDialogOpen(true);
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

    const handleSubmit= (e) => {
        e.preventDefault();

        dispatch(password_email_check(props.email, ([result, message]) => {
            if (result) {
                props.handleNextStep();
            } else {
                setDialogMsg(message);
                setDialogOpen(true);
            }
        }));
    }

    useEffect(() => {
        setRemainHeight(window.innerHeight - 446 + "px");
    })


    return (
        <div>
        <Box
            sx={{
            margin: '95px 24px 15px 24px',
            margin: `calc(${remainHeight} * 0.45) 24px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '61px'}}>
            <Image width={12.02} height={21.55} src={back} />
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header> */}
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={103} height={85} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '24px', fontWeight: '900', mb: '16px', mt: '32px'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '14px', fontWeight: '500', lineHeight: '21px', color: '#777777', mb: '32px'}}>
                비밀번호 초기화 인증 메일이 발송되었습니다. <br/>
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
        <div>
        
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

    <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{width:'270px', marginBottom:'0px', padding: '28px 16px 24px 16px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px', fontWeight: '700'}}>
                      {dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center', borderTop: '1px solid #E2E2E2'}}>
                    
                        <Button onClick={e => setDialogOpen(false)} variant="text" style={{fontSize:"14px", fontWeight: '700', color:'#505050'}}>
                            <Typography style={{fontSize:"14px", fontWeight: '700', color:'#FC9712', marginBottom:'10px', height: '16px'}}>
                                확인
                            </Typography>
                        </Button>

                </DialogActions>
          </Dialog>
    </div>
    );
};

export default Step2;