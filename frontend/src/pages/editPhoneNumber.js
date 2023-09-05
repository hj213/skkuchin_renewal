import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText, Button, TextField, Typography, Link, FormControl, InputLabel, Select, Container, Grid, Autocomplete } from '@mui/material';
import theme from '../theme/theme';
import back from '../image/close.png';
import { enroll_phone } from '../actions/pushToken/pushToken';

import dynamic from 'next/dynamic';

const editPhoneNumber = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const pushToken = useSelector(state => state.pushToken.pushToken);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    console.log(pushToken);

    const [phone, setPhone] = useState("");
    const [validPhone, setValidPhone] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [smallDialogOpen, setSmallDialogOpen] = useState(false);
    const [smallDialogOpen2, setSmallDialogOpen2] = useState(false);



    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNextStep = () => {
        let finalMajor = major;
        if (major == '화학공학/고분자공학부') {
            finalMajor = '화학공학_고분자공학부'
        }
        dispatch(change_user(nickname, finalMajor, image, studentId.slice(0, 2)))
            .then(() => {
                router.push('/myPage');
            })
            .catch((error) => {
                console.log(error);
            });
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

    const handleDelete = () => {
        dispatch(enroll_phone(null, ([result, message]) => {
            if (result) {
                localStorage.removeItem("sms");
                setDialogOpen(false);
                setSmallDialogOpen2(true);
                setTimeout(() => {
                    router.push('/myPage');
                  }, 1000); 
            }
        }));
    };

    const handleSubmit = () => {
        dispatch(enroll_phone(phone, ([result, message]) => {
            if (result) {
                localStorage.setItem("sms", "true");
                setSmallDialogOpen(true);
                setTimeout(() => {
                    router.push('/myPage');
                  }, 1000); 
            }
        }));
    }

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
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
            <Grid container>
                <Grid item style={{margin:'0px 0px 0px 25px', visibility:'none'}}>
                    <Image src={back} width={25} height={25} name='back' onClick={handleArrowClick} layout='fixed'/>
                </Grid>
                <Grid item style={{marginLeft:'25%'}}>
                    <Typography style={{margin:'0px 0px 0px 5px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>전화번호 변경</Typography>
                </Grid>
                <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                { phone.length > 0 && validPhone ?
                    <Button onClick={handleSubmit} style={{padding:'0', right:'0'}}>
                        <Typography style={{margin:'0px 0px 0px 10px',color:'#FFCE00', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                    </Button>
                    :
                    <Button style={{padding:'0', right:'0'}}>
                        <Typography style={{margin:'0px 0px 0px 10px',color:'#BABABA', textAlign:'center',fontSize:'18px', fontWeight: '500'}}>저장</Typography>
                    </Button>
                }
                </Grid>
            </Grid>
        </Container>
        {user && 
        <Box
            sx={{
            margin: '45px 10px 16px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <form style={{ width: '100%'}}>
        <div style={{margin: '0 20px 20px'}}>
            <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#777777'}}>전화번호</Typography>
            <TextField
                variant="outlined"
                placeholder="닉네임을 입력해주세요."
                value={phone}
                onChange={handlePhoneChange}
                style={{width: '100%'}}
                required
                // InputProps={{
                //     endAdornment: (validNickname) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                // }}
                // helperText="이미 사용 중인 닉네임입니다."
            />
        </div>
        <div style={{display: 'flex', justifyContent: 'center',}} onClick={handleDialogOpen}>
            <Button style={{color:'#3C3C3C', fontSize:'12px', textDecoration: 'underline'}}>전화번호 삭제하기</Button>
        </div>
        
        </form>
        </Box>}

        <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            PaperProps={{ style: { borderRadius: '10px' } }}
        >
            <DialogContent sx={{p: '20px 24px 13px'}}>
                <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                    <DialogTitle sx={{color: '#000', fontSize: '15px', p: '25px 35px 25px', m: '0', fontWeight: '700'}}>전화번호를 삭제하시겠습니까?</DialogTitle>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{p:'0'}}>
                <div style={{width: '100%', paddingBottom: '20px',  display: 'flex',justifyContent: 'space-between' }}>
                    <Button sx={{width: '43%', hegiht:'100px', p: '5', marginLeft:'15px', color: '#BABABA', borderRadius: '10px', border:'1px solid #F2F2F2', background:'#F2F2F2', fontWeight: '500'}} onClick={handleDialogClose}>아니요</Button>
                    <Button sx={{width: '43%', hegiht:'100px', p: '5', marginRight:'15px',color: 'white', borderRadius: '10px', border:'1px solid #FFCE00', background:'#FFCE00', fontWeight: '500'}} onClick={handleDelete}>확인</Button>
                </div>
            </DialogActions>
        </Dialog>
        <Dialog open={smallDialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>저장이 완료되었습니다.</Typography></DialogContent></Dialog>
        <Dialog open={smallDialogOpen2}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>전화번호가 삭제되었습니다.</Typography></DialogContent></Dialog>

        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(editPhoneNumber), {
    ssr: false,
});