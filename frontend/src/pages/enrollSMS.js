import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import back from '../image/arrow_back_ios.png';
import Image from 'next/image';
import check from '../image/check_circle.png';
import theme from '../theme/theme';
import { enroll_phone } from '../actions/pushToken/pushToken';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const enrollSMS = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [DialogOpen, setDialogOpen] = useState(false);

    const pushToken = useSelector(state => state.pushToken.pushToken);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleSubmit = () => {
        dispatch(enroll_phone(phone, ([result, message]) => {
            if (result) {
                localStorage.setItem("sms", "true");
                router.push('/myPage');
            }
        }));
    }

    useEffect(() => {
        if (pushToken) {
            if (pushToken.phone === null) {
                setPhone("");
            } else {
                setValidPhone(true);
                setPhone(pushToken.phone);
            }
        }
    }, [pushToken])

    const handlePhoneChange = (e) => {
        const phone = e.target.value;
        setPhone(phone);

        const phoneRegex = /^010[0-9]{8}$/;
        if (!phoneRegex.test(phone)) {
            setValidPhone(false);
        } else {
            setValidPhone(true);
        }
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDelete = () => {
        dispatch(enroll_phone(null, ([result, message]) => {
            if (result) {
                localStorage.removeItem("sms");
                router.push('/myPage');
            }
        }));
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px', marginBottom: '55px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleArrowClick} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'29%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>{pushToken?.phone ? 'SMS 알림 변경' : 'SMS 알림 등록'}</Typography>
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '0px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 36px 39px 36px'}}>
                <TextField
                    variant="standard"
                    type="tel"
                    label="전화번호"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e)}
                    style={{width: '100%'}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    InputProps={{
                        endAdornment: (validPhone) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                    }}
                />
                { phone.length > 0 && !validPhone ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#505050'}}>올바르지 않은 전화번호입니다.</Typography>
                : null}

            </div>
            {
                pushToken?.phone &&
                <div>
                    <Button onClick={handleDialogOpen} style={{padding:'0px', marginLeft:'35px', fontSize:'12px', color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration:'underline'}}>전화번호 삭제하기</Button>
                </div>
            }

            <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', margin: '0 auto 50px auto', maxWidth: '420px'}}>
            {phone.length > 0 && validPhone ?
                    <Button variant="contained" onClick={handleSubmit} style={{width: '80%', margin: '0 auto', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        확인
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '80%', margin: '0 auto', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        확인
                    </Button>
            }
            </div>
        </form>
    </Box>
    <Dialog
        open={DialogOpen}
        onClose={handleDialogClose}
        PaperProps={{ style: { borderRadius: '10px' } }}
    >
        <DialogContent sx={{p: '20px 24px 13px'}}>
            <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>전화번호를 삭제하시겠어요?</DialogTitle>
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{p:'0'}}>
            <div style={{width: '100%', paddingBottom: '20px'}}>
                <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleDialogClose}>취소</Button>
                <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={handleDelete}>삭제</Button>
            </div>
        </DialogActions>
    </Dialog>
    </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(enrollSMS), {
    ssr: false,
});