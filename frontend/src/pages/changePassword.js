import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  TextField, Button, Typography, Box, Dialog, DialogContent, DialogActions, ThemeProvider, CssBaseline, Container, Grid, OutlinedInput,InputAdornment,IconButton } from '@mui/material';
import back from '../image/close.png';
import Image from 'next/image';
import theme from '../theme/theme';
import { change_password } from '../actions/auth/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import check from '../image/check.png';
import check2 from '../image/checkGreen.png';

const changePassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [curPassword, setCurPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isCorrect, setIsCorrect] = useState('none');
    const [isAlpha, setIsAlpha] = useState(false);
    const [isNumeric, setIsNumeric] = useState(false);
    const [isSpecialChar, setIsSpecialChar] = useState(false);
    const [isLengthValid, setIsLengthValid] = useState(false);

  
    const checkPassword = (password) => {
      setIsAlpha(/[a-zA-Z]/.test(password));
      setIsNumeric(/\d/.test(password));
      setIsSpecialChar(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password));
      setIsLengthValid(password.length >= 8 && password.length <= 16);
    }


    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState("");
    const [apiResult, setApiResult] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const handleMouseDownRePassword = (event) => {
      event.preventDefault();
    };

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNextStep = () => {
        change_password(curPassword, password, rePassword)
            .then((message) => {
                setApiResult(true);
                setDialogMsg(message);
            })
            .catch((error) => {
                setApiResult(false);
                setDialogMsg(error);
            })
            .finally(() => {
                setDialogOpen(true);
                setTimeout(() => {
                    router.push('/myPage');
                }, 1000); 
            });
    }
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        checkPassword(password);
        let num = password.search(/[0-9]/g)
        let eng = password.search(/[a-z]/ig)
        let spe = password.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g)

        if (password.length < 8 || password.length > 16) {
            setValidPW(false);
        } else if (num < 0 || eng < 0 || spe < 0) {
            setValidPW(false);
        } else {
            setValidPW(true);
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
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
            <Grid container>
                <Grid item style={{margin:'0px 0px 0px 25px', visibility:'none'}}>
                    <Image src={back} width={25} height={25} name='back' onClick={handleArrowClick} layout='fixed'/>
                </Grid>
                <Grid item style={{marginLeft:'20%'}}>
                    <Typography style={{margin:'0px 0px 0px 15px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>비밀번호 재설정</Typography>
                </Grid>
                <Grid item style={{padding:'0', marginLeft:'auto', marginRight:'20px'}}>
                {validPW && (password == rePassword) ?
                    <Button onClick={handleNextStep} style={{padding:'0', right:'0'}}>
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
        <Box
            sx={{
            margin: '46px 10px 16px 10px',
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
            {/* <div style={{margin: '0 36px 39px 36px'}}>
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
            </div> */}
            <div style={{margin: '0 20px'}}>
                {/* <TextField
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                }}
                /> */}
                <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#777777'}}>새로운 비밀번호</Typography>
                <OutlinedInput
                color='none'
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="비밀번호"
                onChange={handlePasswordChange}
                style={{width:'100%'}}
                required
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {(password != '') ? 
                    validPW ? 
                    <div style={{height: '21px', marginBottom: '20px', marginTop:'5px', display:'flex', fontSize:'12px', color:'#12A054'}}>
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                        </div>
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                        </div>
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                        </div>
                        <div style={{display:'flex'}}>
                            <Image src={check2} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
                        </div>
                    </div>
                    : <div style={{height: '21px', marginBottom: '20px', marginTop:'5px', display:'flex', fontSize:'12px'}}>
                        <div style={{display:'flex', color: isAlpha ? '#12A054' : '#777777'}}>
                            <Image src={isAlpha ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                        </div>
                        <div style={{display:'flex',color: isNumeric ? '#12A054' : '#777777'}}>
                            <Image src={isNumeric ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                        </div>
                        <div style={{display:'flex',color: isSpecialChar ? '#12A054' : '#777777'}}>
                            <Image src={isSpecialChar ? check2 :check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                        </div>
                        <div style={{display:'flex',color: isLengthValid ? '#12A054' : '#777777'}}>
                            <Image src={isLengthValid ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
                        </div>
                    </div> 
                :<div style={{height: '21px', marginBottom: '20px', marginTop:'5px', display:'flex', fontSize:'12px', color:'#777777'}}>
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                    </div>
                    <div style={{display:'flex'}}>
                        <Image src={check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
                    </div>
                </div> 
                }
            </div>
            <div style={{margin: '0 20px'}}>
                {/* <TextField
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
                    endAdornment: (password === rePassword && validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                }}
                /> */}
                <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#777777'}}>비밀번호 확인</Typography>
                <OutlinedInput
                color={isCorrect}
                type={showRePassword ? 'text' : 'password'}
                value={rePassword}
                placeholder="비밀번호 재입력"
                onChange={(e) => {
                    const newPassword = e.target.value;

                    if (newPassword === password) {
                      setIsCorrect('none');
                    } else {
                      setIsCorrect('wrong');
                    }
                
                    setRePassword(newPassword);
                }}
                style={{width:'100%'}}
                required
                endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownRePassword}
                        edge="end"
                      >
                        {showRePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                { (rePassword != '') ? ((password == rePassword) ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#505050'}}></Typography>
                : <Typography sx={{fontSize: '12px', fontWeight: '400', mt: '6px', color: '#FF0000'}}>일치하지 않는 비밀번호입니다.</Typography>)
                : null}
            </div>
        
        </form>
    </Box>
    <Dialog open={dialogOpen}><DialogContent><Typography style={{color:'#3C3C3C', fontWeight:'700', fontSize:'16px'}}>비밀번호 재설정이 완료되었습니다.</Typography></DialogContent></Dialog>
    </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(changePassword), {
    ssr: false,
});