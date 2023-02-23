import { useState, useEffect } from "react";
import {  Container, Typography, Box, Grid, Button } from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import check from '../../image/check_circle.png';
import theme from '../../theme/theme';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

import profile1 from '../../image/mbti/profile/mainCharacter.png';
import profile2 from '../../image/mbti/profile/mealCharacter.png';
import profile3 from '../../image/mbti/profile/ENFJ.png';
import profile4 from '../../image/mbti/profile/ENTP.png';
import profile5 from '../../image/mbti/profile/INFP.png';
import profile6 from '../../image/mbti/profile/ENFP.png';
import profile7 from '../../image/mbti/profile/ISTJ.png';
import profile8 from '../../image/mbti/profile/ISTP.png';
import profile9 from '../../image/mbti/profile/ISFP.png';
import profile10 from '../../image/mbti/profile/INTP.png';
import profile11 from '../../image/mbti/profile/ESTJ.png';
import profile12 from '../../image/mbti/profile/INFJ.png';
import profile13 from '../../image/mbti/profile/ENTJ.png';
import profile14 from '../../image/mbti/profile/ESTP.png';
import profile15 from '../../image/mbti/profile/ESFJ.png';
import profile16 from '../../image/mbti/profile/INTJ.png';
import profile17 from '../../image/mbti/profile/ISFJ.png';
import profile18 from '../../image/mbti/profile/ESFP.png';

import profile1On from '../../image/mbti/profile/selectMainCharacter.png';
import profile2On from '../../image/mbti/profile/selectMealCharacter.png';
import profile3On from '../../image/mbti/profile/selectENFJ.png';
import profile4On from '../../image/mbti/profile/selectENTP.png';
import profile5On from '../../image/mbti/profile/selectINFP.png';
import profile6On from '../../image/mbti/profile/selectENFP.png';
import profile7On from '../../image/mbti/profile/selectISTJ.png';
import profile8On from '../../image/mbti/profile/selectISTP.png';
import profile9On from '../../image/mbti/profile/selectISFP.png';
import profile10On from '../../image/mbti/profile/selectINTP.png';
import profile11On from '../../image/mbti/profile/selectESTJ.png';
import profile12On from '../../image/mbti/profile/selectINFJ.png';
import profile13On from '../../image/mbti/profile/selectENTJ.png';
import profile14On from '../../image/mbti/profile/selectESTP.png';
import profile15On from '../../image/mbti/profile/selectESFJ.png';
import profile16On from '../../image/mbti/profile/selectINTJ.png';
import profile17On from '../../image/mbti/profile/selectISFJ.png';
import profile18On from '../../image/mbti/profile/selectESFP.png';
import { register } from '../../actions/auth/auth';
import { useDispatch } from 'react-redux';

export default function SignUpStep3(props) {
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [profile, setProfile] = useState({
        'DEFAULT1': false,
        'DEFAULT2': false,
        'ENFJ': false,
        'ENTP': false,
        'INFP': false,
        'ENFP': false,
        'ISTJ': false,
        'ISTP': false,
        'ISFP': false,
        'INTP': false,
        'ESTJ': false,
        'INFJ': false,
        'ENTJ': false,
        'ESTP': false,
        'ESFJ': false,
        'INTJ': false,
        'ISFJ': false,
        'ESFP': false,
    })

    const handlePrevStep = () => {
        props.handlePrevStep();
    }

    const handleProfileClick = (event) => {
        if(profile[event.target.name]){
            setProfile({
                ...profile,
                [event.target.name] : false
                
            })
            setImage('');
            props.setData({...props.data, image: ''})
        } else{
            setProfile({
                ...profile,
                [event.target.name] : true,
                ...Object.keys(profile).reduce((acc, key) => {
                    if (key !== event.target.name) {
                        acc[key] = false;
                    }
                    return acc;
                }, {}),
            })
            setImage(event.target.name);
            props.setData({...props.data, image: event.target.name});
        }
    }

    const handleNextStep = () => {
        console.log(props.data);
        dispatch(register(props.data));
        props.handleNextStep();
      }

    return (
        <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handlePrevStep}/>
                            </Grid>
                            <Grid item style={{marginLeft:'35%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px', fontWeight: '700'}}>회원가입</Typography>
                            </Grid>
                        </Grid>
        </Container>
        <Box
            sx={{
            margin: '45px 15px 15px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
            >
            {/* <header style={{display: 'flex',  width: '100%', justifyContent: 'space-between', marginBottom: '42px'}}>
                    <Image width={12.02} height={21.55} src={back} onClick={handlePrevStep}/>
                    <Typography align='center' style={{margin: 'auto', fontSize: '18px', fontWeight: '700'}}>회원가입</Typography>
            </header> */}

            <div name='매칭 프로필 사진' style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
                        <div>
                            <Container  style={{padding:'0px', margin:'0px 0px 0px 10px', justifyContent:'center'}}>
                                <Typography style={{fontSize:'15px', textAlign:'left', margin:'13px 0px 8px 0px'}} color={theme.palette.fontColor.dark} fontWeight={theme.typography.h2}>프로필 이미지 선택*</Typography>
                                <Typography style={{fontSize:'12px', textAlign:'left', margin:'12px 0px 12px 0px'}} color={theme.palette.fontColor.main} fontWeight={theme.typography.h2}>1개의 이미지를 선택해주세요.</Typography>
                                <div style={{marginTop:'10px'}}>
                                    <Grid container style={{maxWidth:'340px'}}>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.DEFAULT1 ? profile1On : profile1} width={100} height={100} onClick={handleProfileClick} name='DEFAULT1'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.DEFAULT2 ? profile2On : profile2} width={100} height={100} onClick={handleProfileClick} name='DEFAULT2'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ENFJ ? profile3On : profile3} width={100} height={100} onClick={handleProfileClick} name='ENFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ENTP ? profile4On : profile4} width={100} height={100} onClick={handleProfileClick} name='ENTP'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.INFP ? profile5On : profile5} width={100} height={100} onClick={handleProfileClick} name='INFP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ENFP ? profile6On : profile6} width={100} height={100} onClick={handleProfileClick} name='ENFP'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ISTJ ? profile7On : profile7} width={100} height={100} onClick={handleProfileClick} name='ISTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ISTP ? profile8On : profile8} width={100} height={100} onClick={handleProfileClick} name='ISTP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ISFP ? profile9On : profile9} width={100} height={100} onClick={handleProfileClick} name='ISFP'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.INTP ? profile10On : profile10} width={100} height={100} onClick={handleProfileClick} name='INTP'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ESTJ ? profile11On : profile11} width={100} height={100} onClick={handleProfileClick} name='ESTJ'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.INFJ ? profile12On : profile12} width={100} height={100} onClick={handleProfileClick} name='INFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.ENTJ ? profile13On : profile13} width={100} height={100} onClick={handleProfileClick} name='ENTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ESTP ? profile14On : profile14} width={100} height={100} onClick={handleProfileClick} name='ESTP'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ESFJ ? profile15On : profile15} width={100} height={100} onClick={handleProfileClick} name='ESFJ'/>
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid style={{marginRight:'15px', marginBottom:'14px'}}>
                                                <Image src={profile.INTJ ? profile16On : profile16} width={100} height={100} onClick={handleProfileClick} name='INTJ'/>
                                            </Grid>
                                            <Grid style={{marginRight:'15px'}}>
                                                <Image src={profile.ISFJ ? profile17On : profile17} width={100} height={100} onClick={handleProfileClick} name='ISFJ'/>
                                            </Grid>
                                            <Grid style={{}}>
                                                <Image src={profile.ESFP ? profile18On : profile18} width={100} height={100} onClick={handleProfileClick} name='ESFP'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div> 
                            </Container>
                        </div>
                    </div>
            <div style={{width: '100%'}}>
            <div style={{margin: '20px 36px 12px'}}>
                {image ?
                        <Button variant="contained" onClick={handleNextStep} style={{width: '100%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                            다음
                        </Button>
                        :
                        <Button variant="contained" disabled style={{width: '100%', backgroundColor: "#BABABA", color: '#fff', fontSize: '15px', fontWeight: '700',  borderRadius: '15px', height: '38px', boxShadow: 'none'}}>
                            다음
                        </Button>
                }
            </div>
            </div>
        
            <div style={{display: 'flex', fontSize: '12px', fontWeight: '500', padding: '6px 0', color: '#505050'}}>
                <span style={{alignSelf: 'center'}}>이미 회원이신가요?</span><Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700'}}>로그인</Button>
            </div>
        </Box>
        </div>
    )
}
