import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../hocs/Layout";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import theme from '../theme/theme';
import Step2 from '../components/Auth/Password/Step2';
import Step1 from '../components/Auth/Password/Step1';
import Step3 from '../components/Auth/Password/Step3';
import Step4 from '../components/Auth/Password/Step4';

export default function resetPassword() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");

    const handleNextStep = () => {
        console.log("zz");
        setStep(step + 1);
    }
    
    const handlePrevStep = () => {
        setStep(step - 1);
    }
    
    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout title= '스꾸친 | 비밀번호 초기화' content='Register page'>
            {/* <Container component="main" maxWidth="xs"> */}
            {
                step === 1 && <Step1 handleNextStep={handleNextStep} setEmail={setEmail} />
            }
            {
                step === 2 && <Step2 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} email={email} />
            }
            {
                step === 3 && <Step3 handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} email={email} />
            }
            {
                step === 4 && <Step4 />
            }
            {/* </Container> */}
        </Layout>
        </ThemeProvider>
    )
};
