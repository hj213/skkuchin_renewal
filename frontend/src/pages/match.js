import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { CssBaseline, Box, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import { load_matching_info } from '../actions/matchingUser/matchingUser';

import Friends from '../components/Matching/Friends';

import UpperBar from '../components/UpperBar';
import AiGreeting from '../components/AiGreeting'
import { useRouter } from 'next/router';

const MatchPage = () => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user); 

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* 0211 상단바, 내 프로필 보기 병합 완료 */}
            <UpperBar />
            <AiGreeting />
            
            <Container sx={{p: '0 15px', mt: '0'}}>
                {/* 상대 프로필 */}
                <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0px'}}>
                    <Grid item>
                        <Friends />
                    </Grid>
                </Grid>
            </Container>

            <Grid style={{marginLeft:'15px', marginRight:'15px'}}>
                <Typography style={{fontSize:'18px', fontWeight:'700'}}>
                    더 많은 사람들과 만나고 싶다면?
                </Typography>
                <div style={{display:'flex',marginTop:'10px'}}>
                    <Typography style={{fontSize:'16px', fontWeight:'500'}}>
                        OPENCHAT
                    </Typography>
                    <Typography style={{fontSize:'10px', fontWeight:'500', color:'#A1A1A1', margin:'5px 0 0 5px'}}>
                        스꾸친 AI가 추천하는 음식점 채팅방
                    </Typography>
                </div>
                <Grid container style={{display:'flex', alignItems:'center', width:'100%',marginTop:'3px'}}>
                    <Grid item style={{width:'61px', height:'61px', borderRadius:'10px',}}>
                        <div style={{
                            backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5) ), url(https://mblogthumb-phinf.pstatic.net/MjAyMTA5MTJfMTgz/MDAxNjMxNDEwNzg3Mzkz.IBDH6TDTYh5I9_tc5RT29xAUMycdBhXSyZrjFCZwjzcg.jbPFJ1NyFq_3HJ5Mbt2ZCUsyKpMUgRit2s-V1pVzwzcg.JPEG.agong91/IMG_4285.jpg?type=w800)`, 
                            backgroundSize: 'cover',
                            backgroundPosition:'50% 50%',
                            width:'100%',
                            height:'100%',
                            borderRadius:'10px',
                            textAlign:'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Typography style={{color:'white', fontSize:'16px', fontWeight:'700'}}>
                            준비중
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item style={{marginLeft: '10px', width:'75%'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Typography style={{fontSize:'16px', fontWeight:'700', marginBottom: '3px'}}>
                            마돌 OPENCHAT
                            </Typography>
                            <Typography style={{fontSize: '12px', color:'#A1A1A1'}}>
                            마돌 좋아하는 사람들 모여라~!
                            </Typography>
                        </div>
                        <div style={{display: 'flex', marginTop:'3px',}}>
                            <Typography style={{fontSize:'12px', fontWeight:'700', color:'#FFCE00'}}>
                            0
                            </Typography>
                            <Typography style={{fontSize:'12px', fontWeight:'500'}}>
                            명 참여 중!
                            </Typography>
                        </div>
                        </div>
                    </Grid>
                </Grid>
                <hr style={{border:'1px solid #F0F0F0'}}/>

                <Grid container style={{display:'flex', alignItems:'center', width:'100%', margin:'10px 0 20px 0'}}>
                    <Grid item style={{width:'61px', height:'61px', borderRadius:'10px',}}>
                        <div style={{
                            backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5) ), url(https://img.siksinhot.com/place/1535526024147268.jpg)`, 
                            backgroundSize: 'cover',
                            backgroundPosition:'50% 50%',
                            width:'100%',
                            height:'100%',
                            borderRadius:'10px',
                            textAlign:'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Typography style={{color:'white', fontSize:'16px', fontWeight:'700'}}>
                            준비중
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item style={{marginLeft: '10px', width:'75%'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Typography style={{fontSize:'16px', fontWeight:'700', marginBottom: '3px'}}>
                            옥집 OPENCHAT
                            </Typography>
                            <Typography style={{fontSize: '12px', color:'#A1A1A1'}}>
                            옥집 좋아하는 사람들 모여라~!
                            </Typography>
                        </div>
                        <div style={{display: 'flex', marginTop:'3px'}}>
                            <Typography style={{fontSize:'12px', fontWeight:'700', color:'#FFCE00'}}>
                                0
                            </Typography>
                            <Typography style={{fontSize:'12px', fontWeight:'500'}}>
                                명 참여 중!
                            </Typography>
                        </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
} 

export default MatchPage;