// 아이디, 비밀번호
import { useState } from "react";
import {  TextField, Button, Typography, Box, Container, Grid } from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { check_username } from '../../actions/auth/auth';

const SignUpStep1 = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [validPW, setValidPW] = useState(false);
    const [validUsername, setValidUsername] = useState(null);
    const [usernameMsg, setUsernameMsg] = useState("");

    const handleNextStep = () => {
        props.handleNextStep();
    }

    const handleUsernameChange = (e) => {
        if (validUsername != null) {
            setValidUsername(null);
        }
        props.setData({...props.data, username: e.target.value});
    }

    const checkUsername = () => {
        dispatch(check_username(props.data.username, ([result, message]) => {
            setValidUsername(result);
            if (typeof(message) == 'string') {
                setUsernameMsg(message);
            }
            //setUsernameMsg(message);
        }))
    }
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        props.setData({...props.data, password})
/*
        // if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*|\\\'\";:\/?])[A-Za-z\d!@#$%^&*]{8,16}$/)) {
        if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*|\\\'\";:\/?\(\)-_=+{},<.>])[A-Za-z\d`~!@#$%^&*|\\\'\";:\/?\(\)-_=+\[\]{},<.>]{8,16}$/)) {
            setValidPW(true);
        } else {
            setValidPW(false);
        }*/

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

    const backClick = () => {
        router.push('/login');
    }

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={backClick} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography>
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
            <Image width={12.02} height={21.55} src={back} onClick={backClick}/>
            <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>회원가입</Typography>
        </header> */}
       
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 36px'}}>
                <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>아이디*</Typography>
                <TextField
                variant="standard"
                //label="아이디"
                value={props.data.username}
                onChange={handleUsernameChange}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (validUsername) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} placeholder="blur" layout='fixed' /> : null 
                }}
                />
                {/* 중복확인 메소드 추가 */}
                <div style={{display:'flex'}}>
                    <Button variant="contained" onClick={checkUsername} style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '15px', width: '47px', height: '20px', fontSize: '9px', padding: '3px 4px', margin: '4px 0px 39px', boxShadow: 'none'}}>중복확인</Button>
                    {validUsername == null && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', margin: '7px 0 39px 5px'}}>아이디 중복 확인 체크를 해주세요</Typography>}
                    {validUsername && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', margin: '7px 0 39px 5px'}}>{usernameMsg}</Typography>}
                    {validUsername == false && <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', margin: '7px 0 39px 5px'}}>{usernameMsg}</Typography>}
                </div>
            </div>

            <div style={{margin: '0 36px'}}>
                <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>비밀번호*</Typography>
                <TextField
                variant="standard"
                //label="비밀번호"
                type="password"
                //value={password}
                value={props.data.password}
                onChange={handlePasswordChange}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} placeholder="blur" layout='fixed' /> : null 
                }}
                />
                {/* {(props.data.password != '') ? 
                    validPW ? 
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '39px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px', mb: '39px'}}>안전하지 않은 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '39px'}}>영문, 숫자, 특수문자를 포함한 8~16자 조합으로 입력해주세요.</Typography> } */}
                {(props.data.password != '') ? 
                    validPW ? 
                    <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px', mb: '39px'}}>안전한 비밀번호입니다.</Typography>
                    : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px', mb: '39px'}}>영문, 숫자, 특수문자를 포함한 8~16자 조합으로 입력해주세요.</Typography>
                : <div style={{height: '21px', marginBottom: '39px'}}></div> }
            </div>
            <div style={{margin: '0 36px'}}>
                <Typography style={{paddingBottom: '4px', fontSize: '15px', color: '#505050'}}>비밀번호 확인*</Typography>
                <TextField
                variant="standard"
                //label="비밀번호 확인"
                type="password"
                //value={re_password}
                value={props.data.re_password}
                //onChange={(e) => setRePassword(e.target.value)}
                onChange={(e) => props.setData({...props.data, re_password: e.target.value})}
                style={{width: '100%'}}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                InputProps={{
                    endAdornment: (props.data.password === props.data.re_password && validPW) ? <Image src={check} width={15.83} height={15.83} sx={{p: '1.58px', mb: '5.58px'}} placeholder="blur" layout='fixed' /> : null 
                }}
                />
                { (props.data.re_password != '') ? ((props.data.password == props.data.re_password) ? 
                <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#505050', mt: '6px'}}>동일한 비밀번호입니다.</Typography>
                : <Typography sx={{fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px'}}>일치하지 않는 비밀번호입니다.</Typography>)
                : <div style={{height: '21px'}}></div>}
            </div>
            <div style={{margin: '39px 36px 12px'}}>
            {/* 아이디 중복확인 처리 필요 */}
            {validUsername && validPW && (props.data.password == props.data.re_password) && props.data.username != null ?
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
        <div style={{display: 'flex', fontSize: '12px', fontWeight: '500', padding: '6px 0', color: '#505050'}}>
                <span style={{alignSelf: 'center'}}>이미 회원이신가요?</span><Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700'}}>로그인</Button>
        </div>
      </Box>
      </div>
    );
  };

  export default SignUpStep1;