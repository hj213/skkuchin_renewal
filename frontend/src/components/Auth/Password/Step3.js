import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reset_password } from '../../../actions/auth/auth';
import {  TextField, Button, Typography, Box, Grid, Container, Dialog, DialogContent, DialogActions, OutlinedInput, InputAdornment, IconButton, Item } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import back from '../../../image/arrow_back_ios.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import check from '../../../image/check.png';
import check2 from '../../../image/checkGreen.png';

const Step3 = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const email = router.query.email;
    const authNum = router.query.authNum;

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [containEng, setContainEng] = useState(false);
    const [containNum, setContainNum] = useState(false);
    const [containSpe, setContainSpe] = useState(false);
    const [validLen, setValidLen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleNextStep = () => {
        reset_password(props.email, password, rePassword, ([result, message]) => {
            if (result) {
                props.handleNextStep();
            } else {
                setDialogMsg(message);
                setDialogOpen(true);
            }
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClickShowRePassword = () => setShowRePassword((show) => !show);

    const handleMouseDownRePassword = (event) => {
      event.preventDefault();
    };

    const checkPassword = (password) => {
        setContainEng(/[a-zA-Z]/.test(password));
        setContainNum(/\d/.test(password));
        setContainSpe(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password));
        setValidLen(password.length >= 8 && password.length <= 16);
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
        } else{
            setDialogOpen(true);
        }
    }

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'28%'}}>
                                {/* <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>비밀번호 초기화</Typography> */}
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '55px 0 15px 0',
            display: 'flex',
            flexDirection: 'column',
            //alignItems: 'center',
            }}
        >
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header> */}
       
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 24px'}}>
            <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>비밀번호 초기화</Typography>
            <Typography style={{fontSize: '12px', fontWeight: '900', marginTop: '45px', color: '#3C3C3C'}}>새로운 비밀번호</Typography>
            <OutlinedInput
                color='none'
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="비밀번호"
                onChange={handlePasswordChange}
                style={{width:'100%', outline: 'none', marginTop: '8px'}}
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
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& input': {
                      fontSize: '16px',
                    },
                    height: '56px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '8px',
                    outline: 'none',
                    appearance: 'none',
                    fontSize: '16px',
                  }}
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
                        <div style={{display:'flex', color: containEng ? '#12A054' : '#777777'}}>
                            <Image src={containEng ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>영문</span>
                        </div>
                        <div style={{display:'flex',color: containNum ? '#12A054' : '#777777'}}>
                            <Image src={containNum ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>숫자 </span>
                        </div>
                        <div style={{display:'flex',color: containSpe ? '#12A054' : '#777777'}}>
                            <Image src={containSpe ? check2 :check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>특수문자 </span>
                        </div>
                        <div style={{display:'flex',color: validLen ? '#12A054' : '#777777'}}>
                            <Image src={validLen ? check2 : check} width={16} height={16}></Image><span style={{marginTop:'2px', marginRight:'10px'}}>8~16자 이내</span>
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
                {/* <input
                    variant="standard"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                    style={{
                        fontSize: '16px',
                        padding: '20px 15px 21px 12px',
                        height: '56px',
                        border: '1px solid #E2E2E2',
                        margin: '8px 0 4px 0',
                        borderRadius: '8px',
                        width: '100%',
                        outline: 'none'
                    }}
                />
        <Grid container>
            <Grid item>
                <Typography style={{fontSize: '12px', color: containEng ? '#12A054' : '#777777', marginRight: '8px'}}>&#10003;영문</Typography>
            </Grid>
            <Grid item>
                <Typography style={{fontSize: '12px', color: containNum ? '#12A054' : '#777777', marginRight: '8px'}}>&#10003;숫자</Typography>
            </Grid>
            {/* <Grid item>
                <Typography style={{fontSize: '12px', color: containSpe ? '#12A054' : '#777777', marginRight: '8px'}}>&#10003;특수문자</Typography>
            </Grid> 
            <Grid item>
                <Typography style={{fontSize: '12px', color: validLen ? '#12A054' : '#777777', marginRight: '8px'}}>&#10003;8~16자 이내</Typography>
            </Grid>
        </Grid> */}

        <Typography style={{fontSize: '12px', fontWeight: '900', marginTop: '20px', color: '#3C3C3C'}}>비밀번호 확인</Typography>
        <input
            variant="standard"
            type="password"
            placeholder="비밀번호 재입력"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            style={{
                fontSize: '16px',
                padding: '20px 15px 21px 12px',
                height: '56px',
                border: (rePassword != '') && password !== rePassword ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                margin: '8px 0 4px 0',
                borderRadius: '8px',
                width: '100%',
                outline: 'none'
            }}
        />
        {(rePassword != '') && password !== rePassword ? <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#FF3B3B'}}>일치하지 않는 비밀번호입니다.</Typography>
            : <div style={{height: '18px'}}></div>}
        </div>
            {/* <div style={{margin: '0 36px'}}>
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
                    endAdornment: (password === rePassword && validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                }}
                />
                { (rePassword != '') ? ((password == rePassword) ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#505050'}}>동일한 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#FF0000'}}>일치하지 않는 비밀번호입니다.</Typography>)
                : null}
            </div> */}
            <div style={{margin: '32px 24px'}}>
            {validPW && (password == rePassword) ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        비밀번호 초기화하기
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        비밀번호 초기화하기
                    </Button>
            }
            </div>
        </form>
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
    )
}
export default Step3;