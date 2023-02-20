import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Layout from "../hocs/Layout";
import NewPromise from "../components/Chat/NewPromise";
const MatchPage = () => {
    const user = useSelector(state => state.auth.user); 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };


    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout
                title='스꾸친 | Match'
                content='Match page'
            > 
            
            <Container style={{textAlign: 'center', margin: '30px 0'}}>
                <Box onClick={handleOpen}>
                    새로운 밥약 신청
                </Box>
                {
                    open?  <NewPromise open={open} onClose={()=> setOpen(false)}/> : null
                }
               

            </Container>
        </Layout>
       </ThemeProvider>
    )
} 

export default MatchPage;