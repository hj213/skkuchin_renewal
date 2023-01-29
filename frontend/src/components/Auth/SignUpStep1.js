// 아이디, 비밀번호
import { useState, useEffect } from "react";
import {  TextField, Button, Container, Typography, Box } from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

const SignUpStep1 = (props) => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    const [validPW, setValidPW] = useState(false);

    
    const handleNextStep = () => {
        props.handleNextStep({username, password, re_password});
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

    const backClick = () => {
        router.push('/login');
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
            <Image width={12.02} height={21.55} src={back} onClick={backClick}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>회원가입</Typography>
        </header>
       
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 36px'}}>
                <TextField
                variant="standard"
                label="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                />
                {/* 중복확인 메소드 추가 */}
                <Button variant="contained" style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '15px', width: '47px', height: '20px', fontSize: '9px', padding: '1px 7px', margin: '6px 0px 28px', boxShadow: 'none'}}>중복확인</Button>
            </div>

            <div style={{margin: '0 36px'}}>
                <TextField
                variant="standard"
                label="비밀번호"
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
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mb: '25px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mb: '25px'}}>안전하지 않은 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mb: '25px'}}>영문, 숫자를 포함한 8~16자 조합으로 입력해주세요.</Typography> }
            </div>
            <div style={{margin: '0 36px'}}>
                <TextField
                variant="standard"
                label="비밀번호 확인"
                type="password"
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (password === re_password && validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}}/> : null 
                }}
                />
                { (re_password != '') ? ((password == re_password) ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050'}}>동일한 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000'}}>일치하지 않는 비밀번호입니다.</Typography>)
                : null}
            </div>
            <div style={{margin: '53px 36px 12px'}}>
            {/* 아이디 중복확인 처리 필요 */}
            { validPW && (password == re_password) && username != null ?
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
        <div style={{textAlign: 'center', fontSize: '12px', fontWeight: '500', padding: '6px 0', color: '#505050'}}>
                이미 회원이신가요? <Link href={`/login`} > 로그인 </Link> 
        </div>
      </Box>
    );
  };

  export default SignUpStep1;