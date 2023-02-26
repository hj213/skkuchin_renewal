import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import NewPromise from "../components/Chat/NewPromise";
import { useRouter } from 'next/router';

const MatchPage = () => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user); 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }


    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Container style={{textAlign: 'center', margin: '30px 0'}}>
                <Box onClick={handleOpen}>
                    새로운 밥약 신청
                </Box>
                {
                    open?  <NewPromise open={open} onClose={()=> setOpen(false)}/> : null
                }
               

            </Container>
       </ThemeProvider>
    )
} 

export default MatchPage;