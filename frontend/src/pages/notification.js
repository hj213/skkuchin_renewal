import { useRouter } from "next/router";
import { Tabs, Tab, CssBaseline, Box, Rating, ThemeProvider, Slide,Button,IconButton, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png'
import dynamic from 'next/dynamic';

const NotiTab = dynamic(() => import("../components/notiTab"));

const NotificationPage = () => {

    const handleOnclick = () =>{
        router.back();
    };

    const router = useRouter();

    return(
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  
                <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                    <Card elevation={0} style={{
                        position: 'fixed',
                        top: '0px',
                        width: '100%',
                        height: '60px',
                        zIndex: '4',
                        border:'none',
                        maxWidth:'420px'
                    }}>
                        <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center', backgroundColor:'white'}}>
                            <Grid style={{padding: '5px 10px 0px 0px'}}>
                                <Image src={back} width={12} height={20} name='back' onClick={handleOnclick} layout='fixed' />
                            </Grid>
                    
                            <Grid >
                                <Typography sx={{fontSize: '18px', fontWeight:'700', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                    알림
                                </Typography>
                            </Grid>
                        
                            <Grid style={{width:'14px'}}>

                            </Grid> 
                        </Grid>
                    </Card>
                </Container>
                <Container component="main" width="100%" style={{listStyleType: "none"}}>
                    <Grid container sx={{pt:6}} style={{justifyContent:'center'}} >
                    </Grid>
                </Container>
                <NotiTab />
            </div>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(NotificationPage), {
    ssr: false,
});