import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../hocs/Layout";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import ResetStep1 from '../components/Auth/Password/ResetStep1';
import ResetStep2 from '../components/Auth/Password/ResetStep2';
import ResetStep3 from '../components/Auth/Password/ResetStep3';
import ResetStep4 from '../components/Auth/Password/ResetStep4';

export default function resetPassword() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    const handleNextStep = (stepData) => {
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout title= '스꾸친 | 비밀번호 초기화' content='Register page'>
            <Container component="main" maxWidth="xs">
            {
                step === 1 && <ResetStep1 handleNextStep={handleNextStep} setEmail={setEmail} />
            }
            {
                step === 2 && <ResetStep2 handleNextStep={handleNextStep} email={email} />
            }
            {
                step === 3 && <ResetStep3 handleNextStep={handleNextStep} email={email} />
            }
            {
                step === 4 && <ResetStep4 />
            }
            </Container>
        </Layout>
        </ThemeProvider>
    )
};
