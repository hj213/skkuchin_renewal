import { Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';


const GoLogin = ({open, onClose}) => {

    const router = useRouter();

    // // 대화 요청하기 버튼
    const [submit, setSubmit] = useState(open);

    const handleSubmit= (e) => {
        if(open){
            setSubmit(false);
            onClose(false);
        } else{
            setSubmit(true);
            onClose(true);
        }
    }

    const handleLogin = () => {
        router.push('/login');
    }
    return (
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Dialog
                        open={submit}
                        onClose={handleSubmit}
                        PaperProps={{
                            style: { 
                            borderRadius: '10px', 
                            boxShadow: 'none', 
                            maxWidth: '100vw', 
                            maxHeight: '100vh'
                            }
                        }}
                        BackdropProps={{
                            sx: {
                            backgroundColor: 'rgba(50, 50, 50, 0.25)',
                            maxWidth: '100vw',
                            maxHeight: '100vh'
                            }
                        }}
                    >
                        <DialogContent sx={{p: '20px 24px 13px'}}>
                            <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                                <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>
                                    로그인 하시겠습니까?
                                </DialogTitle>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{p:'0'}}>
                            <div style={{width: '100%', paddingBottom: '16px'}}>
                                <Button onClick={()=>handleLogin()} sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} >예</Button>
                                <Button onClick={handleSubmit} sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} >아니오</Button>
                            </div>
                        </DialogActions>
                    </Dialog>
                </Grid>
)};


export default GoLogin;
