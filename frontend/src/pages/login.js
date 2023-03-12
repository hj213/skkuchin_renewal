import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { login, find_username, check_nickname, check_username } from "../actions/auth/auth";
import Loader from "react-loader-spinner";

import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import logo from '../image/main_logo.png'
import check from '../image/check_circle.png';
import uncheck from '../image/uncheck.png';
import { load_favorite } from '../actions/favorite/favorite';


const LoginPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);

    const [autoLogin, setAutoLogin] = useState(false);
    const [rememberUsername, setRememberUsername] = useState(false);
    const [error, setError] = useState('');
    //const remainHeight = window.innerHeight - 480 + "px";
    const [remainHeight, setRemainHeight] = useState(window.innerHeight - 480 + "px");
    const [isClicked, setIsClicked] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });

    const {
        username,
        password,
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(login(username, password, ([result, message]) => {
                if (result) {
                    if (rememberUsername) {
                        localStorage.setItem("username", username);
                    } else {
                        localStorage.removeItem("username");
                    }
                } else {
                    if (message == '이메일 등록이 필요한 유저입니다') {
                        router.push({
                            pathname: '/register', 
                            query: {src: '이메일', username: username}
                        })
                    } else if (typeof(message) == 'string' && message.includes('@')) {
                        router.push({
                            pathname: '/register',
                            query: {src: '인증', username: username, email: message}
                        })
                    }
                    else if (typeof(message) == 'string') {
                        setError(message);
                    }
                }
            }));
        }
    };

    if (typeof window !== 'undefined' && isAuthenticated){
        router.push('/');
    } 

    useEffect(() => {
        setRemainHeight(window.innerHeight - 480 + "px");
        let username = localStorage.getItem("username");
        if (username != null) {
            setRememberUsername(true);
            setFormData({...formData, username: username});
        }
    }, [])

    useEffect(() => {
        if (!isClicked) {
        setRemainHeight(window.innerHeight - 480 + "px");
        }
    }, [window.innerHeight])

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                        //marginTop: '191px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                        }}
                        style={{marginTop: `calc(${remainHeight} * 0.54)`}}
                    >
                    <Image width={145} height={160} src={logo} placeholder="blur" layout='fixed' />
                    <div style={{ display: 'flex', width: '100%' }}>
                        <form onSubmit={onSubmit} style={{ width: '100%' }}>
                            <div style={{ margin: '0 24px 11px', marginTop: `calc(${remainHeight} * 0.22)` }}>
                                <input 
                                    onClick={() => setIsClicked(true)}
                                    type = 'text' name='username' 
                                    placeholder ='아이디' onChange={onChange} value={username}
                                    required
                                    autoComplete='off'
                                    style={{width: '100%', height: '45px', padding: '13px 14px',backgroundColor: '#FFFCED', border: 'none', borderRadius: '15px', outline: 'none'}}
                                />
                            </div>
                            <div style={{ margin: '0 24px', display: 'flex', flexDirection: 'column' }}>
                                <input 
                                    type = 'password' name='password' 
                                    placeholder ='비밀번호' onChange={onChange} value={password}
                                    onClick={() => {setError(''); setIsClicked(true)}}
                                    required
                                    autoComplete='off'
                                    style={{width: '100%', height: '45px', padding: '13px 14px',backgroundColor: '#FFFCED', border: 'none', borderRadius: '15px', outline: 'none'}}
                                />
                                <div style={{alignSelf: 'start', justifySelf: 'start'}}><Typography sx={{height: '15px', fontSize: '9px', fontWeight: '500', color: '#FF0000', mt: '6px'}}>{error}</Typography></div>
                            </div>
                            {
                                loading ? (
                                    <div className="d-flex justify-content-center align-items-center mt-5">
                                        <Loader type = 'Oval' color = '#00bfff' width={50} height={50}></Loader>
                                    </div>
                                ) : (
                                    <div style={{ margin: '5px 24px 10px' }}>
                                        <Button variant="contained" type="submit" style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                                            스꾸친 로그인
                                        </Button>
                                    </div>
                                )
                            }
                            <div style={{display: 'flex', marginTop: '10px', marginLeft: '24px'}}>
                                {/* {autoLogin ? 
                                    <Image onClick={() => setAutoLogin(false)} src={check} width={15.83} height={15.83} sx={{p: '1.58px'}} placeholder="blur" layout='fixed' /> : 
                                    <Image onClick={() => setAutoLogin(true)} src={uncheck} width={15.83} height={15.83} sx={{p: '1.58px'}} placeholder="blur" layout='fixed' />}
                                <span style={{marginLeft: '4px', marginRight: '18px', fontSize: '9px'}} color={theme.palette.fontColor.dark}>자동로그인</span> */}
                                {rememberUsername ? 
                                    <Image onClick={() => setRememberUsername(false)} src={check} width={15.83} height={15.83} sx={{p: '1.58px'}} placeholder="blur" layout='fixed' /> : 
                                    <Image onClick={() => setRememberUsername(true)} src={uncheck} width={15.83} height={15.83} sx={{p: '1.58px'}} layout='fixed' />}
                                <span style={{marginLeft: '4px', marginRight: '18px', fontSize: '9px'}} color={theme.palette.fontColor.dark}>아이디 기억하기</span>
                            </div>
                        </form>
                    </div>

                {/* <div style={{display: 'grid', gridTemplateColumns: '1fr 26px 1fr', fontSize: '12px', color: '#505050', marginTop: `calc(${remainHeight} * 0.22)`, marginBottom: '25px'}}>
                    <div onClick={() => router.push('/register')} style={{justifySelf: 'right'}}>회원가입</div>
                    <div style={{justifySelf: 'center', textAlign: 'center'}}>|</div>
                    <div onClick={() => router.push('/resetPassword')} style={{justifySelf: 'left'}}>비밀번호 초기화</div>
                </div> */}

                <div style={{fontSize: '12px', color: '#505050', marginTop: `calc(${remainHeight} * 0.22)`, marginBottom: '25px', marginLeft: '10px'}}>
                    <span onClick={() => router.push('/register')}>회원가입</span>
                    <span style={{padding: '0 13px'}}>|</span>
                    <span onClick={() => router.push('/resetPassword')}>비밀번호 초기화</span>
                </div>
                    </Box>
                </Container>
            <div style={{display: 'grid', justifyItems: 'center', marginBottom: '40px'}}>
            <div style={{display: 'grid', justifyItems: 'center', fontSize: '9px', fontWeight: '500', color: '#BABABA', bottom: '36px'}}>
                <div>로그인하면 스꾸친 <span onClick={() => router.push({pathname: '/userAgreement', query: {page: 'login'}})} style={{textDecoration: 'underline'}}>이용약관</span>에 동의하는 것으로 간주합니다.</div>
                <div style={{marginTop: '6px', textAlign: 'center'}}>스꾸친의 회원정보 처리방식은 <span onClick={() => router.push({pathname: '/policy', query: {page: 'login'}})} style={{textDecoration: 'underline'}}>개인정보 처리방침</span> 및 쿠키 정책에서 확인해보세요.</div>
            </div>
            </div>
        </ThemeProvider>
    )
};

export default LoginPage;