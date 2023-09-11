import { useState } from "react";
import {  TextField, Button, Typography, Box, Container, Grid } from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { check_username } from '../../actions/auth/auth';

const SignUpStep1 = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [validPW, setValidPW] = useState(false);
    const [validUsername, setValidUsername] = useState(null);
    const [usernameMsg, setUsernameMsg] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [containEng, setContaingEng] = useState(false);
    const [containNum, setContainNum] = useState(false);
    const [containSpe, setContainSpe] = useState(false);
    const [validLen, setValidLen] = useState(false);

    const handleNextStep = () => {
        check_username(props.data.username, ([result, message]) => {
            setValidUsername(result);
            if (result) 
                props.handleNextStep();
            else {
                if (typeof(message) == 'string')
                    setUsernameMsg(message)
            }
        })
    }

    const handleUsernameChange = (e) => {
        if (validUsername != null) {
            setValidUsername(null);
        }
        props.setData({...props.data, username: e.target.value});
    }

    const checkUsername = () => {
        check_username(props.data.username, ([result, message]) => {
            setValidUsername(result);
            if (typeof(message) == 'string') {
                setUsernameMsg(message);
            }
        });
    }
    
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        props.setData({...props.data, password});

        let num = password.search(/[0-9]/g)
        let eng = password.search(/[a-z]/ig)
        let spe = password.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g)

        /*if (password.length < 8 || password.length > 16) {
            setValidPW(false);
        } else if (num < 0 || eng < 0 || spe < 0) {
            setValidPW(false);
        } else {
            setValidPW(true);
        }*/
        if ((password.length >= 8 && password.length <= 16) && num >= 0 && eng >= 0) {
            setValidPW(true)
            setValidLen(true)
            setContainNum(true)
            setContaingEng(true)
            //setContainSpe(true)
        } else {
            setValidPW(false)
            if (password.length < 8 || password.length > 16) setValidLen(false)
            else setValidLen(true)
            if (num < 0) setContainNum(false) 
            else setContainNum(true)
            if (eng < 0) setContaingEng(false)
            else setContaingEng(true)
            // if (spe < 0) setContainSpe(false)
            // else setContainSpe(true)
        }
    }

    const backClick = () => {
        router.push('/login');
    }

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={backClick} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                {/* <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography> */}
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '35px 0 55px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
       
        <form style={{ width: '100%'}}>
            <div style={{margin: '0 24px 100px'}}>
                <Grid container>
                <Typography style={{fontSize: '26px', color: '#9E9E9E', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                </Grid>
                <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>회원가입</Typography>

                <Typography style={{fontSize: '12px', fontWeight: '900', marginTop: '35px', marginLeft: '4px', color: '#3C3C3C'}}>아이디</Typography>
                <input
                    variant="standard"
                    placeholder="아이디"
                    value={props.data.username}
                    onChange={handleUsernameChange}
                    style={{
                        fontSize: '16px',
                        padding: '20px 15px 21px 12px',
                        height: '56px',
                        border: validUsername == null ? '1px solid #E2E2E2' : (validUsername ? '1px solid #12A054' : '1px solid #FF3B3B'),
                        margin: '8px 0 0px 0',
                        borderRadius: '8px',
                        width: '100%',
                        outline: 'none'
                    }}
                />
                {/* 중복확인 메소드 추가 */}
                <div style={{display:'flex'}}>
                    {/* <Button variant="contained" onClick={checkUsername} style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '8px', width: '47px', height: '20px', fontSize: '9px', padding: '3px 4px', marginTop: '4px', boxShadow: 'none'}}>중복확인</Button> */}
                    {/* {validUsername == null && <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#3C3C3C', margin: '5px 0 0 5px'}}>아이디 중복 확인 체크를 해주세요</Typography>} */}
                    {validUsername && <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#12A054', margin: '5px 0 0 5px'}}>{usernameMsg}</Typography>}
                    {validUsername == false && <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#FF3B3B', margin: '5px 0 0 5px'}}>{usernameMsg}</Typography>}
                </div>

                <Typography style={{fontSize: '12px', fontWeight: '900', marginTop: '16px', marginLeft: '4px', color: '#3C3C3C'}}>비밀번호</Typography>
                <input
                    variant="standard"
                    type="password"
                    placeholder="비밀번호"
                    value={props.data.password}
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
                    </Grid> */}
                    <Grid item>
                        <Typography style={{fontSize: '12px', color: validLen ? '#12A054' : '#777777', marginRight: '8px'}}>&#10003;8~16자 이내</Typography>
                    </Grid>
                </Grid>

                <Typography style={{fontSize: '12px', fontWeight: '900', marginTop: '20px', marginLeft: '4px', color: '#3C3C3C'}}>비밀번호 확인</Typography>
                <input
                    variant="standard"
                    type="password"
                    placeholder="비밀번호 재입력"
                    value={props.data.re_password}
                    onChange={(e) => props.setData({...props.data, re_password: e.target.value})}
                    style={{
                        fontSize: '16px',
                        padding: '20px 15px 21px 12px',
                        height: '56px',
                        border: (props.data.re_password != '') && props.data.password !== props.data.re_password ? '1px solid #FF3B3B' : '1px solid #E2E2E2',
                        margin: '8px 0 4px 0',
                        borderRadius: '8px',
                        width: '100%',
                        outline: 'none'
                    }}
                />
                {(props.data.re_password != '') && props.data.password !== props.data.re_password ? <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#FF3B3B'}}>비밀번호가 일치하지 않습니다.</Typography>
                    : <div style={{height: '18px'}}></div>}
            </div>
        </form>
        <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
        {props.data.username != '' && validUsername != false && validPW && (props.data.password == props.data.re_password) && props.data.username != null ?
                    <Button variant="contained" onClick={handleNextStep} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        다음
                    </Button> 
                :
                    <Button variant="contained" disabled style={{margin: '0 24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        다음
                    </Button>
            }
        <div style={{display: 'flex', justifyItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '500', padding: '31px 0', color: '#505050'}}>
                <span style={{alignSelf: 'center'}}>이미 회원이신가요?</span><Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700'}}>로그인</Button>
        </div>
        </div>
      </Box>
      
      </div>
      
    );
  };

  export default SignUpStep1;