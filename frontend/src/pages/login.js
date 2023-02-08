import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { login } from "../actions/auth/auth";
import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";

import Link from 'next/link';
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import logo from '../image/main_logo.png'

const LoginPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);


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

        if(dispatch && dispatch !== null && dispatch !== undefined) {
            if (dispatch(login(username, password))) {
                alert("gogo!!!");
            } else {
                alert("nono!!!");
            }
        }
    };

    if (typeof window !== 'undefined' && isAuthenticated){
        router.push('/dashboard');
    } 
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            
            {/* <Layout title= '스꾸친 | Login' content='Register page'> */}
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                        marginTop: '191px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                        }}
                    >
                    <Image width={169} height={185} src={logo}/>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <form onSubmit={onSubmit} style={{ width: '100%' }}>
                            <div style={{ margin: '67px 24px 11px' }}>
                                <input 
                                    type = 'text' name='username' 
                                    placeholder ='아이디' onChange={onChange} value={username}
                                    required
                                    style={{width: '100%', height: '45px', padding: '13px 14px',backgroundColor: '#FFFCED', border: 'none', borderRadius: '15px'}}
                                />
                            </div>
                            <div style={{ margin: '0 24px' }}>
                                <input 
                                    type = 'password' name='password' 
                                    placeholder ='비밀번호' onChange={onChange} value={password}
                                    required
                                    style={{width: '100%', height: '45px', padding: '13px 14px',backgroundColor: '#FFFCED', border: 'none', borderRadius: '15px'}}
                                />
                            </div>
                            {
                                loading ? (
                                    <div className="d-flex justify-content-center align-items-center mt-5">
                                        <Loader type = 'Oval' color = '#00bfff' width={50} height={50}></Loader>
                                    </div>
                                ) : (
                                    <div style={{ margin: '30px 24px 11.5px' }}>
                                        <Button variant="contained" type="submit" style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '15px', height: '56px', boxShadow: 'none'}}>
                                            스꾸친 로그인
                                        </Button>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                
                <Grid container sx={{justifyContent: 'center', fontSize: '12px', fontWeight: '400', color: '#505050'}}>
                    <Grid item >
                    <Link href={`/register`}> 
                        <span>회원가입</span>
                    </Link>
                    </Grid>
                    <Grid item xs={1}>
                        |
                    </Grid>
                    <Grid item>
                        <span>비밀번호 초기화</span>
                    </Grid>
                </Grid>
                <div style={{fontSize: '9px', fontWeight: '500', color: '#BABABA', position: 'absolute', bottom: '36px'}}>
                    로그인하면 스꾸친 이용약관에 동의하는 것으로 간주합니다.<br/>
                    스꾸친의 회원 정보 처리 방식은 개인정보 처리방침 및 쿠키 정책에서 확인해보세요.
                </div>
                    </Box>
                </Container>
            
            {/* </Layout> */}
        </ThemeProvider>
    )
};


export default LoginPage;

