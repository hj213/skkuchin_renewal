import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import SignUpStep1 from '../components/Auth/SignUpStep1';
import SignUpStep2 from '../components/Auth/SignUpStep2';
import SignUpStep3 from '../components/Auth/SignUpStep3';
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import SignUpStep4 from '../components/Auth/SignUpStep4';
import SignUpStep5 from '../components/Auth/SignUpStep5';
import SignUpStep6 from '../components/Auth/SignUpStep6';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const register_success = useSelector(state => state.auth.register_success);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const src = router.query.src;
    const pathUsername = router.query.username;

    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        username: "",
        password: "",
        re_password: "",
        nickname: "",
        major: "",
        student_id: "",
        email: "",
        image: ""
    })

    const handleNextStep = (stepData) => {
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }

    if (typeof window !== 'undefined' && isAuthenticated)
        router.push('/');

    if(register_success)
        router.push('/login');

    useEffect(() => {
        if (src == '이메일') {
            setData({...data, username: pathUsername})
            setStep(4);
        } else if (src == 'emailDone') {
            setStep(6);
        }
    }, [src])
    
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            {/* <Container component="main" maxWidth="xs"> */}
            {
                step === 1 && <SignUpStep1 handleNextStep={handleNextStep} data={data} setData={setData} />
            }
            {
                step === 2 && <SignUpStep2 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 3 && <SignUpStep3 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 4 && <SignUpStep4 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} setData={setData} />
            }
            {
                step === 5 && <SignUpStep5 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} data={data} />
            }
            {
                step === 6 && <SignUpStep6 handlePrevStep={handlePrevStep} username={data.username} />
            }
            {/* </Container> */}
        </ThemeProvider>
    )
};

export default RegisterPage;