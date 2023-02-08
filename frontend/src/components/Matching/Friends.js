import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { displayMBTI } from './MBTIList';

const Friends = () => {

    const user = useSelector(state => state.auth.user); 

    // 관심사 태그 임의 설정
    const interests = (['INTP', '음악', '주짓수']);

    const [isExpanded, setIsExpanded] = useState(false);
    const [content, setContent] = useState("제순식당 같이 가실 분 구해요하힛헬로크크크크ㅡ 반가워요 저는 된장찌개에 제육이요!");
    const [height, setHeight] = useState('383px');
    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        if(!isExpanded) {
            setHeight('439px');
        } else setHeight('383px');
    };

    // 밥약 신청하기 버튼
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Card variant="outlined" sx={{height: height, width: '261px', borderRadius: '30px', border: '1px solid #BABABA', m: '13px 0px 40px', p: '16px 0 13px'}}>
             <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                {displayMBTI("INTP")}
                {/* <Typography sx={{p: '12px 0px', fontSize: '15px', fontWeight: '700'}}>{user.nickname}</Typography> */}
                <Typography sx={{p: '5px 0px', fontSize: '15px', fontWeight: '700'}}>{user !== null && user.nickname}</Typography>
                <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                    <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '0px 6.5px', borderRadius: '17px'}}>{user !== null && user.campus}</Typography>&nbsp;
                    {user !== null && user.major} &nbsp;/&nbsp; 
                    {user !== null && user.student_id}
                </Grid>
                
                <Grid item sx={{display: 'flex'}}>
                    {interests != null ?
                        (interests.map((interest, index)=> (
                            // <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '17px 2.5px 28px'}}>
                            <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 24px'}}>
                                {interest}
                            </Grid>
                        )))
                    : null}
                </Grid >
                {/* <Grid item sx={{width: '169px', textAlign: 'center', pb: '13px'}}> */}
                <Grid item sx={{width: '169px', textAlign: 'center', pb: '8px'}}>
                    {isExpanded ?
                        <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>"{content}"</Typography>
                        : <Typography sx={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize:'13px', fontWeight: '500'}}>"{content}"</Typography>
                    }
                    { content.length > 17 ?
                    <Button sx={{fontSize: '12px', color: '#BABABA'}} onClick={handleExpand}>
                        <u>{isExpanded ? '닫기' : '더보기'}</u>
                    </Button>
                    : null }
                </Grid>
                <Button onClick={handleSubmit} sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px'}}>
                    밥약 신청하기
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ style: { borderRadius: '10px' } }}
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
        </Card>
    )
}

export default Friends;