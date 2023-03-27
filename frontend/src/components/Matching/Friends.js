import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid } from '@mui/material';
import { displayMBTI } from './MBTIList';
import { load_candidate } from '../../actions/candidate/candidate'
import { load_request_id, request_chat } from '../../actions/chat/chatRoom';
import noCharacter from '../../image/mbti/profile/noCharacter.png'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const GoLogin = dynamic(() => import('../GoLogin'));

const Friends = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const candidate = useSelector(state => state.candidate.candidate);
    const requestId = useSelector(state => state.chatRoom.requestId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(load_request_id(([result, message]) => {
                if (result) {
                    dispatch(load_candidate(([result, message]) => {
                        if (!result) {
                            if (typeof(message) == 'string') {
                                setDialogMsg(message);
                            }
                        }
                        setDialogOpen2(true);
                    }));
                }
            }))
        }
    }, [isAuthenticated]);
    

    const [height, setHeight] = useState('383px');

    // 밥약 신청하기 버튼
    const [open, setOpen] = useState(false);
    const [selectedPersonId, setSelectedPersonId] = useState(null);

    const handleOpen = (id) => {
        setOpen(true);
        setSelectedPersonId(id);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSubmit = (id) => {
        setOpen(false);
        dispatch(request_chat(id));
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
    const handleSettingOpen = () => {
        if (isAuthenticated) {
            router.push({
                pathname: '/makeProfile',
                query: { src : '매칭프로필설정', }
            });
        } else {
            setIsLogin(true);
        }
    }

    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
        {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
        { candidate ? 
        candidate.map((person, index) => (
        <Card key={index} variant="outlined" sx={{height: height, width: '261px', borderRadius: '30px', border: '1px solid #BABABA', m: '13px 0px 25px', p: '16px 0 13px', flexShrink: 0, mr: '13px'}}>
            <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                {displayMBTI(person.mbti)}
                <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>{person !== null && person.nickname}</Typography>
                <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                    <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '1px 6.5px', borderRadius: '17px'}}>{person !== null && person.campus}</Typography>&nbsp;
                    {person.major} &nbsp;/&nbsp; 
                    {person.student_id}학번 &nbsp;/&nbsp; 
                    {(person.gender).charAt(0)}
                </Grid>
                
                <Grid item sx={{display: 'flex'}}>
                    <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                        {person.mbti}
                    </Grid>
                    {(person.keywords) != null ?
                        ((person.keywords).slice(0, 2).map((interest, index)=> (
                            <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                                {interest}
                            </Grid>
                        )))
                    : null}
                </Grid >
                <Grid item sx={{width: '169px', height: '48px',textAlign: 'center', pb: '8px'}}>
                    <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>"{person.introduction}"</Typography>
                </Grid> 
                { 
                    requestId && requestId.includes(person.id) ?
                    <Button key={index} sx={{backgroundColor: '#505050', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                        신청 완료
                    </Button>
                    : 
                    <Button key={index} onClick={()=>handleOpen(person.id)}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                        밥약 신청하기
                    </Button>
                }

                <Dialog
                    key={person.id}
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
                            <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={() => handleSubmit(selectedPersonId)}>신청</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Card> 
        )) 
        :
        <>
            <Card variant="outlined" sx={{height: height, width: '261px', borderRadius: '30px', border: '1px solid #BABABA', m: '13px 0px 25px', p: '16px 0 13px', flexShrink: 0, mr: '13px'}}>
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={noCharacter} width={140} height={140} placeholder="blur" layout='fixed' />
                    <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>바뱍</Typography>
                    <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                        <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '1px 6.5px', borderRadius: '17px'}}>명륜</Typography>&nbsp;
                        경영학과 &nbsp;/&nbsp; 
                        23학번 &nbsp;/&nbsp; 
                        남
                    </Grid>
                    <Grid item sx={{display: 'flex'}}>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            ENFP
                        </Grid>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            일식
                        </Grid>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            음악
                        </Grid>
                    </Grid >
                    <Grid item sx={{width: '169px', height: '48px',textAlign: 'center', pb: '8px'}}>
                        <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>
                        AI 매칭 서비스를 이용하시려면 매칭 프로필을 설정해주세요 👀
                        </Typography>
                    </Grid>
                    <Button onClick={()=>handleSettingOpen()}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                            프로필 설정하기
                    </Button>
                </Grid>
            </Card>
            <Card variant="outlined" sx={{height: height, width: '261px', borderRadius: '30px', border: '1px solid #BABABA', m: '13px 0px 25px', p: '16px 0 13px', flexShrink: 0, mr: '13px'}}>
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={noCharacter} width={140} height={140} placeholder="blur" layout='fixed' />
                    <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>김꾸친</Typography>
                    <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                        <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '1px 6.5px', borderRadius: '17px'}}>명륜</Typography>&nbsp;
                        무용학과 &nbsp;/&nbsp; 
                        20학번 &nbsp;/&nbsp; 
                        여
                    </Grid>
                    <Grid item sx={{display: 'flex'}}>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            ISFJ
                        </Grid>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            여행
                        </Grid>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            동아리
                        </Grid>
                    </Grid >
                    <Grid item sx={{width: '169px', height: '48px',textAlign: 'center', pb: '8px'}}>
                        <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>
                        AI 매칭 서비스를 이용하시려면 매칭 프로필을 설정해주세요 👀
                        </Typography>
                    </Grid>
                    <Button onClick={()=>handleSettingOpen()}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                            프로필 설정하기
                    </Button>
                </Grid>
            </Card>
            <Card variant="outlined" sx={{height: height, width: '261px', borderRadius: '30px', border: '1px solid #BABABA', m: '13px 0px 25px', p: '16px 0 13px', flexShrink: 0, mr: '13px'}}>
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image src={noCharacter} width={140} height={140} placeholder="blur" layout='fixed' />
                    <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>웅</Typography>
                    <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                        <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '1px 6.5px', borderRadius: '17px'}}>율전</Typography>&nbsp;
                        반도체시스템공학과 &nbsp;/&nbsp; 
                        22학번 &nbsp;/&nbsp; 
                        여
                    </Grid>
                    <Grid item sx={{display: 'flex'}}>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            INTP
                        </Grid>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            연극 / 뮤지컬
                        </Grid>
                        <Grid item sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7.5px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 20px'}}>
                            카페
                        </Grid>
                    </Grid >
                    <Grid item sx={{width: '169px', height: '48px',textAlign: 'center', pb: '8px'}}>
                        <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>
                            AI 매칭 서비스를 이용하시려면 매칭 프로필을 설정해주세요 👀
                        </Typography>
                    </Grid>
                    <Button onClick={()=>handleSettingOpen()}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                            프로필 설정하기
                    </Button>
                </Grid>
            </Card>
        </>
        }

        {!candidate && dialogMsg ? 
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
        </Dialog> 
        : null }
    </Grid>
    )
}

export default Friends;