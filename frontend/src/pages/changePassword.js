import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {  TextField, Button, Typography, Box, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import back from '../image/arrow_back_ios.png';
import check from '../image/check_circle.png';
import Image from 'next/image';
import theme from '../theme/theme';
import { change_password } from '../actions/auth/auth';
import { useRouter } from 'next/router';

export default function changePassword() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [curPassword, setCurPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    const [apiResult, setApiResult] = useState(false);

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNextStep = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(change_password(curPassword, password, rePassword, ([result, message]) => {
                setApiResult(result);
                setDialogMsg(message);
                setDialogOpen(true);
            }));
        }
    }
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);

        if (password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,16}$/)) {
            setValidPW(true);
        } else {
            setValidPW(false);
        }
    }

    const handleDialogOpen = (e) => {
        if(dialogOpen){
            setDialogOpen(false);
            if (apiResult) {
                router.push('/myPage');
            }
        } else{
            setDialogOpen(true);
        }
    }

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px', marginBottom: '55px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleArrowClick}/>
                            </Grid>
                            <Grid item style={{marginLeft:'29%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>비밀번호 변경</Typography>
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
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Image width={11} height={18} src={back} onClick={handleArrowClick}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 변경</Typography>
        </header> */}

        <form style={{ width: '100%'}}>
            <div style={{margin: '0 36px 39px 36px'}}>
                <TextField
                variant="standard"
                label="현재 비밀번호"
                type="password"
                value={curPassword}
                onChange={(e) => setCurPassword(e.target.value)}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                />
            </div>
            <div style={{margin: '0 36px'}}>
                <TextField
                variant="standard"
                label="새로운 비밀번호"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}}/> : null 
                }}
                />
                {(password != '') ? 
                    validPW ? 
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '39px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px', mb: '39px'}}>안전하지 않은 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '39px'}}>영문, 숫자를 포함한 8~16자 조합으로 입력해주세요.</Typography> }
            </div>
            <div style={{margin: '0 36px'}}>
                <TextField
                variant="standard"
                label="비밀번호 확인"
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (password === rePassword && validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}}/> : null 
                }}
                />
                { (rePassword != '') ? ((password == rePassword) ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#505050'}}>동일한 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#FF0000'}}>일치하지 않는 비밀번호입니다.</Typography>)
                : null}
            </div>
            <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', margin: '0 36px 50px 36px'}}>
            {validPW && (password == rePassword) ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        확인
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                        확인
                    </Button>
            }
            </div>
        </form>

        <Dialog open={dialogOpen} onClose={handleDialogOpen} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{display: 'grid', alignItems: 'center', width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                        {dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                        <Button onClick={handleDialogOpen} variant="text" style={{fontSize:"14px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`}}>
                            <Typography style={{fontSize:"14px", fontWeight: '700', color:`${theme.palette.fontColor.dark}`, marginBottom:'10px'}}>
                                확인
                            </Typography>
                        </Button>
                </DialogActions>
        </Dialog>
    </Box>
    </ThemeProvider>
    )
}
