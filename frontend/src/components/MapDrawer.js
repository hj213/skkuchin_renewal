import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from "next/router";
import {Grid,ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Switch, styled, FormControlLabel} from '@mui/material';
import hamburger from '../image/hamburgerBar.png';
import bookmark from '../image/bookmark-1.png';
import star from '../image/Star2.png';
import profile from '../image/profile.png';
import yyj from '../image/YJ_on.png'; //캠퍼스 율전
import ymr from '../image/MR_off.png'; //캠퍼스 율전
import myj from '../image/YJ_off.png'; //캠퍼스 명륜
import mmr from '../image/MR_on.png'; //캠퍼스 명륜
import { change_toggle, load_user } from '../actions/auth/auth';
import { clear_search_results, search_places } from '../actions/place/place';
import theme from '../theme/theme';

//mbti 프로필
import profile1 from '../image/mbti/profile/mainCharacter.png';
import profile2 from '../image/mbti/profile/mealCharacter.png';
import ENFJ from '../image/mbti/profile/ENFJ.png';
import ENTP from '../image/mbti/profile/ENTP.png';
import INFP from '../image/mbti/profile/INFP.png';
import ENFP from '../image/mbti/profile/ENFP.png';
import ISTJ from '../image/mbti/profile/ISTJ.png';
import ISTP from '../image/mbti/profile/ISTP.png';
import ISFP from '../image/mbti/profile/ISFP.png';
import INTP from '../image/mbti/profile/INTP.png';
import ESTJ from '../image/mbti/profile/ESTJ.png';
import INFJ from '../image/mbti/profile/INFJ.png';
import ENTJ from '../image/mbti/profile/ENTJ.png';
import ESTP from '../image/mbti/profile/ESTP.png';
import ESFJ from '../image/mbti/profile/ESFJ.png';
import INTJ from '../image/mbti/profile/INTJ.png';
import ISFJ from '../image/mbti/profile/ISFJ.png';
import ESFP from '../image/mbti/profile/ESFP.png';

export default function MapDrawer(openID){

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const router = useRouter();
    let open = false;
  
    if(typeof window !== 'undefined' && !isAuthenticated){
      router.push('/login');
    }
    
    //api
    const user = useSelector(state => state.auth.user);

    //state
    const [drawerOpen, setDrawerOpen] = useState(open);
    const [toggleImage, setToggleImage] = useState('');
    
    useEffect(() => {
      if (user) {
        if (user.campus == '명륜') {
          if (user.toggle == '율전') {
            setToggleImage(myj)
          } else if (user.toggle == '명륜') {
            setToggleImage(mmr)
          }
        } else if(user.campus == '율전') {
          if (user.toggle == '율전') {
            setToggleImage(yyj)
          } else if (user.toggle == '명륜') {
            setToggleImage(ymr)
          }
        }
      }
      
    },[user])


    //뒤로가기 시 드로워 열리도록
    useEffect(()=>{
      if(openID.open){
        setDrawerOpen(true)
      }
    }, []);

    //drawer 열리는
    const handleDrawerClick = (bool) => (e) => {
      e.preventDefault();
      open = bool;
      setDrawerOpen(open);  
    };

    //drawer 하위 페이지로 이동
    const handleMove = (e) =>{
      router.push('/myFavorite');
    }

    const handleMyReview = (e) =>{
      router.push('/myReview');
    }
    //토글 클릭
    const handleToggle = (e) => {
      if (user.toggle === '명륜') {
        dispatch(change_toggle('율전'));
      } else if (user.toggle === '율전') {
        dispatch(change_toggle('명륜'))
      }
    };
    
    const list = (anchor) => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClick(false)}
          onKeyDown={handleDrawerClick(false)}
        >   
            <Box style={{ textAlign:'center', marginTop:'40px'}}>
                <Image src={ user && user.image ? src[user.image] : profile} alt='프로필' width={98} height={98} style={{borderRadius: "30px",}} placeholder="blur" layout='fixed'  />
                <div>
                <Typography style={{marginTop:'13px', fontSize:'15px', fontWeight:'700', lineHeight: '28px'}} >{user != null ? user.nickname : ''}</Typography>
                <Typography style={{marginTop:'13px', fontSize:'12px', fontWeight:'500', lineHeight: '28px'}} >{user != null ? user.major : ''}</Typography>
                </div>
            </Box>
            <List style={{marginLeft:'55px', marginTop:'54px'}}>
                <ListItem disablePadding >
                    <Grid container style={{fontSize:'20px', fontWeight:'400', lineHeight: '28px'}} >
                        <Grid item style={{marginRight:'9px'}}>
                            <Image src={bookmark} alt='즐겨찾기' width={16} height={16} layout='fixed' />
                        </Grid>
                        <Grid item>
                            <ListItemText primary="즐겨찾기 장소" style={{marginTop:'1px'}} onClick={handleMove} />  
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem disablePadding>
                    <Grid container style={{marginTop:'37px', fontSize: '20px', fontWeight:'400', lineHeight: '28px'}}>
                        <Grid item style={{marginRight:'9px',}}>
                            <Image src={star} alt='나의 리뷰' width={16} height={16} style={{marginTop:'0px'}} layout='fixed' />
                        </Grid>
                        <Grid item>
                            <ListItemText primary="나의 리뷰" style={{marginTop:'2px'}} onClick={handleMyReview}/>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </Box>
    );

    const src ={
      DEFAULT1: profile1,
      DEFAULT2: profile2,
      INFP:INFP,
      ENFJ:ENFJ,
      ENTP:ENTP,
      ENFP:ENFP,
      ISTJ:ISTJ,
      ISTP:ISTP,
      ISFP:ISFP,
      INTP:INTP,
      ESTJ:ESTJ,
      INFJ:INFJ,
      ENTJ:ENTJ,
      ESTP:ESTP,
      ESFJ:ESFJ,
      INTJ:INTJ,
      ISFJ:ISFJ,
      ESFP:ESFP,
    }
    
    return(
        <ThemeProvider theme={theme}>
            <Image src={hamburger} alt='drawer' onClick={handleDrawerClick(true)} width={20} height={15} layout='fixed' />
            <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerClick(false)} width={250} >
              <Grid container style={{position:'relative'}}>
                <Grid item style={{marginTop:'45px', marginLeft:'70%'}} onClick={handleToggle}>
                  {user && <Image src={toggleImage} width={60} height={60} placeholder="blur" layout='fixed' />}
                </Grid>
              </Grid>
                {list('left')}
            </Drawer>
        </ ThemeProvider>
    )
}