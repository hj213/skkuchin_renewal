import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, Link, Grid, Container, Dialog, DialogContent, DialogActions} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import logo from '../../../image/email_enhang.png'
import Image from 'next/image';
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { password_email_check, password_email_send } from '../../../actions/email/email';

const Step2 = (props) => {
    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleResend = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            // console.log(props.email)
            // console.log("test")
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

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(password_email_check(props.email, ([result, message]) => {
                if (result) {
                    props.handleNextStep();
                } else {
                    setDialogMsg(message);
                    setDialogOpen(true);
                }
            }));
        }
    }


    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'28%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
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
            <Image width={12.02} height={21.55} src={back} />
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header> */}
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image width={121} height={101} src={logo} placeholder="blur" layout='fixed' />
            <Typography sx={{fontSize: '25px', fontWeight: '400', mb: '37px'}}>메일을 확인해주세요!</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '500', mb: '55px', lineHeight: '25px', color: '#505050'}}>
                비밀번호 초기화 인증 메일이 발송되었습니다. <br/>
                발송된 메일을 통해 인증 완료 후 <br/>
                아래 확인 버튼을 눌러주세요
            </Typography>
            <Typography sx={{fontSize: '10px', fontWeight: '500', mb: '97px', lineHeight: '25px', color: '#505050'}}>
                        모바일인 경우 <br/>
                        [킹고M 어플&gt;메뉴&gt;킹고포털&gt;G-Mail]에서 확인 가능합니다
            </Typography>
            <Link component="button" variant="body2" color="#BABABA" onClick={handleResend} sx={{fontSize: '12px', mb: '18px'}}>이메일 재전송</Link>
        </div>

        <div style={{display: 'grid', alignItems: 'center', justifyItems: 'center', width: '90%', margin: '0 20px'}}>
        <Button variant="contained" onClick={handleSubmit} style={{width: '100%', margin: '0 20px', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
            확인
        </Button>
        </div>
    </Box>

    <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px', fontWeight: '700'}}>
                      {dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                    
                        <Button onClick={e => setDialogOpen(false)} variant="text" style={{fontSize:"14px", fontWeight: '700', color:'#505050'}}>
                            <Typography style={{fontSize:"14px", fontWeight: '700', color:'#505050', marginBottom:'10px'}}>
                                확인
                            </Typography>
                        </Button>

                </DialogActions>
          </Dialog>
    </div>
    );
};

export default Step2;