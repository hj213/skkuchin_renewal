import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reset_password } from '../../../actions/auth/auth';
import {  TextField, Button, Typography, Box } from '@mui/material';
import check from '../../../image/check_circle.png';
import uncheck from '../../../image/uncheck.png';
import Image from 'next/image';

export default function ResetStep3(props) {
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);

    const handleNextStep = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(reset_password(props.email, password, rePassword, ([result, message]) => {
                if (result) {
                    props.handleNextStep();
                } else {
                    alert(message);
                }
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

    return (
        <Box
            sx={{
            marginTop: '45px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 초기화</Typography>
        </header>
       
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
                    endAdornment: (validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}}/> : null 
                }}
                />
                {(password != '') ? 
                    validPW ? 
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '25px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px', mb: '25px'}}>안전하지 않은 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mb: '25px'}}>영문, 숫자를 포함한 8~16자 조합으로 입력해주세요.</Typography> }
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
                <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050'}}>동일한 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000'}}>일치하지 않는 비밀번호입니다.</Typography>)
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
  )
}
