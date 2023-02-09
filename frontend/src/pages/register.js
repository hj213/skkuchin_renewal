import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../hocs/Layout";
import SignUpStep1 from '../components/Auth/SignUpStep1';
import SignUpStep2 from '../components/Auth/SignUpStep2';
import SignUpStep3 from '../components/Auth/SignUpStep3';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const register_success = useSelector(state => state.auth.register_success);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        username: "",
        password: "",
        re_password: "",
        nickname: "",
        major: "",
        student_id: "",

    })

    const handleNextStep = (stepData) => {
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }

    if(typeof window !== 'undefined' && isAuthenticated)
        router.push('/dashboard');
    if(register_success)
        router.push('/login');
    
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout title= '스꾸친 | Register' content='Register page'>
            <Container component="main" maxWidth="xs">
            {
                step === 1 && <SignUpStep1 handleNextStep={handleNextStep} data={data} setData={setData} />
            }
            {
                step === 2 && <SignUpStep2 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 3 && <SignUpStep3 handlePrevStep={handlePrevStep} data={data} />
            }
            </Container>
        </Layout>
        </ThemeProvider>
    )
};

export default RegisterPage;