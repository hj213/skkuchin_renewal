import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reset_password } from '../../../actions/auth/auth';
import {  TextField, Button, Typography, Box, Grid, Container, Dialog, DialogContent, DialogActions } from '@mui/material';
import check from '../../../image/check_circle.png';
import back from '../../../image/arrow_back_ios.png'
import Image from 'next/image';
import { useRouter } from 'next/router';

const Step3 = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const email = router.query.email;
    const authNum = router.query.authNum;

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);

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
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);

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
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep} layout='fixed' />
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
        {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header> */}
       
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 36px'}}>
                <TextField
                variant="standard"
                label="새로운 비밀번호"
                type="password"
                //value={password}
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
                />
                {(password != '') ? 
                    validPW ? 
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '25px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px', mb: '25px'}}>영문, 숫자를 포함한 8~16자 조합으로 입력해주세요.</Typography>
                : <div style={{height: '21px', marginBottom: '39px'}}></div> }
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
                    endAdornment: (password === rePassword && validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} layout='fixed' /> : null 
                }}
                />
                { (rePassword != '') ? ((password == rePassword) ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#505050'}}>동일한 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', mt: '6px', color: '#FF0000'}}>일치하지 않는 비밀번호입니다.</Typography>)
                : null}
            </div>
            <div style={{margin: '150px 36px 12px'}}>
            {validPW && (password == rePassword) ?
                    <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                        다음
                    </Button>
                :
                    <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                        다음
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