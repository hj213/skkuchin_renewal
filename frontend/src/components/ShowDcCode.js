import { Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import contentCopy from '../image/saladweeks/content_copy.png';
import Image from 'next/image';

const ShowDcCode = ({open, onClose}) => {

    // // 밥약 신청하기 버튼
    const [submit, setSubmit] = useState(open);

    const handleSubmit= (e) => {
        if(open){
            setSubmit(false);
            onClose(false);
        } else {
            setSubmit(true);
            onClose(true);
        }
    }

    const copyCode = () => {
        const text = "샐러드윅스구독하러가보자고";
        navigator.clipboard.writeText(text);
        setSubmit(false);
        onClose(false);
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
                    <DialogContent sx={{p: '15px 20px 15px 40px', justifyContent: 'space-between'}}>
                        <DialogContentText sx={{textAlign: 'center', flexDirection: 'row', display: 'flex'}} onClick={copyCode} >
                            <DialogTitle sx={{p: '0', m: '0'}} >
                                <span style={{color: '#000', fontSize: '15px', fontWeight:'700', textDecorationLine: 'underline'}}>
                                    샐러드윅스구독하러가보자고
                                </span>
                                &nbsp;&nbsp;
                            </DialogTitle>
                            <div style={{marginTop: '5px'}}>
                                <Image 
                                    src={contentCopy} 
                                    height={21}
                                    width={21}
                                    layout='fixed'
                                />
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    </Dialog>
                </Grid>
)};


export default ShowDcCode;
