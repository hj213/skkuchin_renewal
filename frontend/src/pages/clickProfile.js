import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useRouter } from "next/router";
import { load_matching_info } from '../actions/matchingUser/matchingUser';
import { CssBaseline, Typography, Grid, Container,ThemeProvider,  } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import { displayMBTI } from '../components/Matching/MBTIList';
import back from '../image/arrow_back_ios.png';

export default function clickProfile(){

    const dispatch = useDispatch();
    const router = useRouter();

    const matchingUser = useSelector(state => state.matchingUser.matchingUser);
    const user = useSelector(state => state.auth.user);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }
    
    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_matching_info(([result, message]) => {
                if (result) {
                    // alert(message);
                    setLoad(true);
                } else {
                    // alert(message);
                    setLoad(false);
                }
            }));
    
        }
    
    }, [dispatch]);

    const [load, setLoad] = useState('');

    const handleBack = (e) => {
        router.back();
    }

    return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container style={{padding:'0px', marginTop:'41px', alignItems: 'center',}}>
                        <Grid container>
                            <Grid item style={{margin:'0px 0px 0px 20px', visibility:'none'}}>
                                <Image src={back} width={11} height={18} name='back' onClick={handleBack} placeholder="blur" layout='fixed' />
                            </Grid>
                            <Grid item style={{marginLeft:'32%'}}>
                                <Typography style={{margin:'0px 0px 0px 0px', textAlign:'center',fontSize:'18px'}} fontWeight={theme.typography.h1}>프로필 보기</Typography>
                            </Grid>
                        </Grid>
                </Container>
                <div style={{
                    padding: '0',
                    marginTop:'75px'
                }}>
                
                {matchingUser !== null ?
                    <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Grid sx={{pt: '39px'}}>{displayMBTI(matchingUser.mbti)}</Grid>
                        <Typography sx={{p: '8px 0px', fontSize: '15px', fontWeight: '700'}}>{user !== null && matchingUser.nickname}</Typography>
                        <Grid item sx={{display: 'flex', fontSize: '10px', alignItems: 'center', fontWeight: '500', color: '#BABABA'}}>
                            <Typography sx={{border: "1px solid #BABABA", fontSize: '10px', p: '0px 6.5px', borderRadius: '17px'}}>{matchingUser.campus}</Typography>&nbsp;
                            {matchingUser.major} &nbsp;/&nbsp; 
                            {matchingUser.student_id} 학번 /&nbsp; 
                            {matchingUser.gender}
                        </Grid>
                        
                        <Grid item sx={{display: 'flex'}}>
                            {(matchingUser.keywords) != null ?
                                ((matchingUser.keywords).slice(0, 3).map((interest, index)=> (
                                    <Grid item key={index} sx={{backgroundColor: '#BABABA', color: '#fff', p: '4.5px 7px', fontSize: '12px', fontWeight: '500px', borderRadius: '116px', m: '11px 2.5px 26px'}}>
                                        {interest}
                                    </Grid>
                                )))
                            : null}
                        </Grid >
                        <Grid item sx={{width: '169px', textAlign: 'center'}}>
                            <Typography sx={{ fontSize:'13px', fontWeight: '500'}}>"{matchingUser.introduction}"</Typography>
                        </Grid>
                    </Grid> 
                    : null}
                    </div>
        </ThemeProvider>
    )
}