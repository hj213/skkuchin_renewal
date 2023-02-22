import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {  TextField, Button, Typography, Box } from '@mui/material';
import back from '../image/arrow_back_ios.png';
import check from '../image/check_circle.png';
import Image from 'next/image';
import { change_password } from '../actions/auth/auth';
import { useRouter } from 'next/router';

export default function changePassword() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [curPassword, setCurPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [validPW, setValidPW] = useState(false);

    const handleArrowClick = () => {
        router.push('/myPage');
    }

    const handleNextStep = () => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(change_password(curPassword, password, rePassword, ([result, message]) => {
                if (result) {
                    alert(message);
                    router.push('/myPage');
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
            margin: '45px 16px 16px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
        <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
            <Image width={12.02} height={21.55} src={back} onClick={handleArrowClick}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>비밀번호 변경</Typography>
        </header>
       
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
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '25px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px', mb: '25px'}}>안전하지 않은 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '25px'}}>영문, 숫자를 포함한 8~16자 조합으로 입력해주세요.</Typography> }
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
      </Box>
  )
}
