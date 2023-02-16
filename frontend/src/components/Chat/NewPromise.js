import { ThemeProvider } from '@emotion/react';
import { Button, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid } from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';
import { useRouter } from 'next/router';
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';

// 스위치
import Image from 'next/image';
import closeIcon from '../../image/close.png';

const NewPromise = ({ onClose, open }) => {

    const user = useSelector(state => state.auth.user);

    const keywords = ["ENTP", "스포츠", "양식"];
    const introduction = "엔팁 좋아하시는 분 여기여기 모여라 랄라라라랄랄ㄹㄹㄹ";  
    
    // 밥약 신청하기 버튼
    const [submit, setSubmit] = useState(false);
    const handleSubmit = () => {
        setSubmit(true);
    }
    const handleClose = () => {
        setSubmit(false);
    }

    const handleAccept = () => {
        alert('신청 수락');
    }

    return (
            <Modal
                open={open}
                onClose={onClose}
            >
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: "270px",
                    height: '439px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '0',
                    borderRadius: "30px",
                }}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth:"600px", padding:"22px 15px 0px 15px"}}>
                    <div style={{flex: 1}} />
                    <div style={{ display: "flex", justifyContent: "flex-end", padding:"none" }}>
                    <Image
                        src={closeIcon}
                        width="35px"
                        height="35px"
                        onClick={onClose}
                        style={{position: 'absolute', top: '-15px', right: '-15px', cursor: 'pointer'}}
                    />
                    </div>
                </div>
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {displayMBTI("ENTP")}
                    <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>{user !== null && user.nickname}</Typography>
                    <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                        <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '0px 6.5px', borderRadius: '17px'}}>{user !== null && user.campus}</Typography>&nbsp;
                        {user.major} &nbsp;/&nbsp; 
                        {user.student_id} 학번 /&nbsp; 
                        {"남"}
                    </Grid>
                    
                    <Grid item sx={{display: 'flex'}}>
                        {(keywords) != null ?
                            ((keywords).slice(0, 3).map((interest, index)=> (
                                <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 26px'}}>
                                    {interest}
                                </Grid>
                            )))
                        : null}
                    </Grid >
                    <Grid item sx={{width: '169px', textAlign: 'center'}}>
                        <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>"{introduction}"</Typography>
                    </Grid> 
                    <Grid style={{justifyContent: 'center'}}>
                        <Button onClick={handleSubmit} sx={{backgroundColor: '#BABABA', borderRadius: '34px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 16px', m: '30px 15px'}}>
                            거절하기
                        </Button>
                        <Button onClick={handleAccept} sx={{backgroundColor: '#FFCE00', borderRadius: '34px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 16px', m: '30px 15px'}}>
                            수락하기
                        </Button>
                    </Grid>
                    <Dialog
                        open={submit}
                        onClose={handleClose}
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
                                <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>{"밥약을 거절하시겠습니까?"}</DialogTitle>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{p:'0'}}>
                            <div style={{width: '100%', paddingBottom: '16px'}}>
                                <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleClose}>취소</Button>
                                <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={handleClose}>거절</Button>
                            </div>
                        </DialogActions>
                    </Dialog>
                </Grid>
                </div>
            </Modal>
)};


export default NewPromise;
