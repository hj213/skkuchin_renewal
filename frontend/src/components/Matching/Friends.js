import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Grid, Divider } from '@mui/material';
import { displayMBTI } from './MBTIList';
import { load_candidate } from '../../actions/candidate/candidate'
import { load_request_id, request_chat } from '../../actions/chat/chatRoom';
import noCharacter from '../../image/mbti/profile/noCharacter.png'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import CustomPopup from "../SkkuChat/CustomPopup";

const GoLogin = dynamic(() => import('../GoLogin'));

const dummyProfiles = [
    {
        name: '바뱍',
        campus: '명륜',
        major: '경영학과',
        student_id: '23학번',
        gender: '남',
        mbti: 'ENFP',
        keywords: ['일식', '음악'],
        description:
            '성대 학우와 대화를 나누시려면 추가 프로필을 등록해주세요 👀',
    },
    {
        name: '김꾸친',
        campus: '명륜',
        major: '무용학과',
        student_id: '20학번',
        gender: '여',
        mbti: 'ISFJ',
        keywords: ['여행', '동아리'],
        description:
            '성대 학우와 대화를 나누시려면 추가 프로필을 등록해주세요 👀',
    },
    {
        name: '웅이',
        campus: '율전',
        major: '반도체시스템공학과',
        student_id: '22학번',
        gender: '남',
        mbti: 'INTP',
        keywords: ['연극/뮤지컬', '카페'],
        description:
            '성대 학우와 대화를 나누시려면 추가 프로필을 등록해주세요 👀',
    },

];
  
const Friends = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.matchingUser.matchingUser);
    const candidate = useSelector(state => state.candidate.candidate);
    const requestId = useSelector(state => state.chatRoom.requestId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(load_request_id(([result, message]) => {
                if (result) {
                    dispatch(load_candidate());
                }
            }))
        }
    }, [isAuthenticated]);

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
    
    const handleSettingOpen = () => {
        if (isAuthenticated) {
            router.push({
                pathname: '/makeProfile',
                query: { src : '스꾸챗프로필설정', }
            });
        } else {
            setIsLogin(true);
        }
    }

    const handleFriendClick = (friendId) => {
        router.push(`/clickProfile?id=${friendId}`);
    };

    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0'}}>
            {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
            { candidate ? 
            candidate.map((person, index) => (
            <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '15px', flexShrink: 0, mr: '19px', mb: '21px'}}>
                <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {displayMBTI(person.mbti, 80, 80)}
                    <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                        <Typography sx={{fontSize: '16px', fontWeight: '700', mr: '5px'}}>{person !== null && person.nickname}</Typography>
                        {
                            person !== null && 
                            person.campus == '명륜' ?
                            <Typography sx={{width: 'max-content',color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                            : 
                            <Typography sx={{color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px',fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                        }
                    </Grid>
                    <Grid item sx={{display: 'flex', fontSize: '12px', alignItems: 'center', fontWeight: 400, color: '#3C3C3C'}}>
                        <Grid item sx={{flexGrow: 1, fontSize: '12px'}}>
                            {person.major}&nbsp;/&nbsp; 
                            {person.student_id}학번&nbsp;/&nbsp; 
                            {(person.gender).charAt(0)}
                        </Grid>
                    </Grid>
                    <Grid item sx={{display: 'flex', p: '10px 0', m: '10px 0', gap: '4px'}}>
                        <Grid item sx={{color: '#777777', backgroundColor: '#F2F2F2', p: '4px 12px', fontSize: '12px', fontWeight: 400, borderRadius: '24px'}}>
                            {person.mbti}
                        </Grid>
                        {(person.keywords) != null ?
                            ((person.keywords).slice(0, 2).map((interest, index)=> (
                                <Grid item key={index} sx={{color: '#777777', backgroundColor: '#F2F2F2', p: '4px 12px', fontSize: '12px', fontWeight: 400, borderRadius: '24px'}}>
                                    {interest}
                                </Grid>
                            )))
                        : null}
                    </Grid >
                    <Typography sx={{ fontSize:'14px', fontWeight: 400, color: '#3C3C3C', mb: '10px'}}>{'"'+person.introduction+'"'}</Typography>
                    <Grid item sx={{ display: 'flex',  alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        <Button
                            disableElevation
                            disableTouchRipple
                            key="profile-button"
                            onClick={() => handleFriendClick(person.id)}
                            sx={{
                                color: '#777777',
                                fontSize: '14px',
                                fontWeight: 700,
                                textAlign: 'center',
                                pr: '15px',
                            }}
                        >
                            프로필 보기
                        </Button>
                        <div
                            style={{
                                width: '2px',
                                height: '12px', 
                                backgroundColor: '#E2E2E2',
                                borderRadius: '10px',
                            }}
                        />
                        {requestId && requestId.includes(person.id) ? (
                            <Button
                                disableElevation
                                disableTouchRipple
                                key="completed-button"
                                sx={{
                                    color: '#505050',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    pl: '15px',
                                }}
                            >
                                신청 완료
                            </Button>
                        ) : (
                            <Button
                                disableElevation
                                disableTouchRipple
                                key="apply-button"
                                onClick={() => handleOpen(person.id)}
                                sx={{
                                    color: '#FFAC0B',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    pl: '15px',
                                }}
                            >
                                밥약 걸기
                            </Button>
                        )}
                    </Grid>
                    <CustomPopup
                        open={open}
                        onClose={handleClose}
                        content={`밥약 신청을 하시겠어요?`}
                        leftButtonLabel="아니요"
                        rightButtonLabel="신청"
                        onLeftButtonClick={handleClose}
                        onRightButtonClick={() => {
                            handleSubmit(selectedPersonId);
                        }}
                    />
                </Grid>
            </Card> 
            )) 
            :
            <>
                { dummyProfiles.length !== 0 &&
                    dummyProfiles.map((person, index) => (
                    <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '15px', flexShrink: 0, mr: '19px', mb: '21px'}}>
                        <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image src={noCharacter} width={80} height={80} placeholder="blur" layout='fixed' />
                            <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                <Typography sx={{fontSize: '16px', fontWeight: '700', mr: '5px'}}>{person.name}</Typography>
                                {
                                        person !== null && 
                                        person.campus == '명륜' ?
                                        <Typography sx={{width: 'max-content',color: '#FFAC0B', backgroundColor: '#FFFCE4', fontSize: '12px', fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                                        : 
                                        <Typography sx={{color: '#58C85A', backgroundColor: '#DCF8DB', fontSize: '12px',fontWeight: 700, p: '3.5px 5px 2.5px', borderRadius: '10px', mr: '5px'}}>{person.campus}</Typography>
                                }
                            </Grid>
                            <Grid item sx={{display: 'flex', fontSize: '12px', alignItems: 'center', fontWeight: 400, color: '#3C3C3C'}}>
                                <Grid item sx={{flexGrow: 1, fontSize: '12px'}}>
                                    {person.major}&nbsp;/&nbsp; 
                                    {person.student_id}학번&nbsp;/&nbsp; 
                                    {(person.gender).charAt(0)}
                                </Grid>
                            </Grid>
                            <Grid item sx={{display: 'flex', p: '10px 0', m: '10px 0'}}>
                                <Grid item sx={{color: '#9E9E9E', p: '0px 2.5px', fontSize: '12px', fontWeight: 700}}>
                                    {'#'+person.mbti}
                                </Grid>
                                {(person.keywords) != null ?
                                    ((person.keywords).slice(0, 2).map((interest, index)=> (
                                        <Grid item key={index} sx={{ color: '#9E9E9E', p: '0px 1.5px', fontSize: '12px', fontWeight: 700}}>
                                            {'#'+interest}
                                        </Grid>
                                    )))
                                : null}
                            </Grid >
                            <Grid item sx={{width: '169px', height: '48px',textAlign: 'center', pb: '8px'}}>
                                <Typography sx={{ fontSize:'13px', fontWeight: '500', whiteSpace: 'pre-wrap'}}>
                                    {
                                        user?.matching === false ?
                                        '성대 학우와 대화를 나누시려면\n\n[내 프로필 보기]에서\n대화 활성화 버튼을 켜주세요 👀' 
                                        : '성대 학우와 대화를 나누시려면 추가 프로필을 등록해주세요 👀'
                                    }
                                </Typography>
                            </Grid>
                            {
                                user?.matching === false ? null
                                :
                                <Button onClick={()=>handleSettingOpen()}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                                    프로필 등록하기
                                </Button>
                            }
                        </Grid>
                    </Card>
                ))}
            </>
            }
    </Grid>
    )
}

export default Friends;