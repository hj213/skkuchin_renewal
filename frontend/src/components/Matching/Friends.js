import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid } from '@mui/material';
import { displayMBTI } from './MBTIList';
import { load_candidate } from '../../actions/candidate/candidate'
const Friends = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user); 
    const candidate = useSelector(state => state.candidate.candidate);

    useEffect(() => {
        //dispatch(load_candidate());
        if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(load_candidate(([result, message]) => {
          if (result) {

          } else {
            if (typeof(message) == 'string') {
              setDialogMsg(message);
            }
          }
          console.log(message);
          setDialogOpen2(true);
        }));
      }
      }, [dispatch]);
    

    const [height, setHeight] = useState('383px');

    // 밥약 신청하기 버튼
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    // 매칭 활성화 유저 100명 미만 시 경고
    const [dialogOpen2, setDialogOpen2] = useState(false);
    const [dialogMsg, setDialogMsg] = useState('');
    const handleDialogOpen2 = () => {
        if(dialogOpen2){
            setDialogOpen2(false);
        } else{
            setDialogOpen2(true);
        }
    }


    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
        { candidate ? 
        candidate.map((person, index) => (
        <Card key={index} variant="outlined" sx={{height: height, width: '261px', borderRadius: '30px', border: '1px solid #BABABA', m: '13px 0px 25px', p: '16px 0 13px', flexShrink: 0, mr: '13px'}}>
             <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                {displayMBTI(person.mbti)}
                <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>{person !== null && person.nickname}</Typography>
                <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                    <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '0px 6.5px', borderRadius: '17px'}}>{person !== null && person.campus}</Typography>&nbsp;
                    {person.major} &nbsp;/&nbsp; 
                    {person.student_id} 학번 &nbsp;/&nbsp; 
                    {(person.gender).charAt(0)}
                </Grid>
                
                <Grid item sx={{display: 'flex'}}>
                    <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                        {person.mbti}
                    </Grid>
                    {(person.keywords) != null ?
                        ((person.keywords).slice(0, 2).map((interest, index)=> (
                            <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                                {interest}
                            </Grid>
                        )))
                    : null}
                </Grid >
                <Grid item sx={{width: '169px', height: '48px',textAlign: 'center', pb: '8px'}}>
                    <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>"{person.introduction}"</Typography>
                </Grid> 
                <Button onClick={handleSubmit} sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                    밥약 신청하기
                </Button>
                <Dialog
                    open={open}
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
                            <DialogTitle sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>{"밥약을 신청하시겠습니까?"}</DialogTitle>
                            <Typography sx={{color: '#BABABA', fontSize: '9px'}}>*신청 후 취소는 불가능</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{p:'0'}}>
                        <div style={{width: '100%', paddingBottom: '16px'}}>
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleClose}>취소</Button>
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={handleSubmit}>신청</Button>
                        </div>
                    </DialogActions>
                </Dialog>
             </Grid>
        </Card> ))
        : dialogMsg ? 
            <Dialog open={dialogOpen2} onClose={handleDialogOpen2} PaperProps={{ style: { borderRadius: '10px' } }}>
                <DialogContent style={{display: 'grid', alignItems: 'center', width:'270px', height:'100px', padding:'29px 0px 0px 0px', marginBottom:'0px'}}>
                    <Typography style={{fontSize:'14px', color:'black', textAlign:'center', lineHeight:'22px'}} fontWeight='700'>
                      
                      {(dialogMsg||'').split('\n').length > 1 ? 
                      <>
                      {dialogMsg.split('\n')[0]}<br/>
                      {dialogMsg.split('\n')[1]}
                      </>
                      : dialogMsg}
                    </Typography>
                </DialogContent>
                <DialogActions style={{justifyContent:'center'}}>
                    
                        <Button onClick={e => setDialogOpen2(false)} variant="text" style={{fontSize:"14px", fontWeight: '700', color:'#505050'}}>
                            <Typography style={{fontSize:"14px", fontWeight: '700', color:'#505050', marginBottom:'10px'}}>
                                확인
                            </Typography>
                        </Button>

                </DialogActions>
        </Dialog> : null }
        </Grid>
    )
}

export default Friends;