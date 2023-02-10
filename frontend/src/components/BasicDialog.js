import { useState } from "react";
import {ThemeProvider, CssBaseline, Dialog, DialogTitle, Typography, styled, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';
import theme from "../theme/theme";

export default function BasicDialog(openID){

    const [open, setOpen] = useState(true);
    const handleOpen = (e) => {
        if(open){
            setOpen(false);
        } else{
            setOpen(true);
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Dialog open={open} onClose={handleOpen}>
                <DialogContent style={{width:'270px', height:'100px', paddingTop:'27px',}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight={theme.typography.h1}>
                    AI 매칭 기능을 이용하시려면<br/>
                    매칭 프로필이 필요해요 🥹
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center', paddingBottom:'13px'}}>
                    <Button 
                    href={`./changeProfile`}
                    style={{fontSize:"12px", fontWeight: `${theme.typography.h1}`, color:`${theme.palette.fontColor.dark}`}} sx={{textDecoration: 'underline'}}>매칭 프로필 설정하기</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
        )
}

