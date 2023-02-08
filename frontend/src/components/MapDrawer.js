import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from "next/router";
import {Grid,ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Switch, styled, FormControlLabel} from '@mui/material';
import hamburger from '../image/햄버거바.png';
import bookmark from '../image/bookmark-1.png';
import star from '../image/Star2.png';
import profile from '../image/profile.png';
import yj from '../image/율전_on.png';
import mr from '../image/명륜_off.png';
import { change_toggle, load_user } from '../actions/auth/auth';
import { load_favorite } from '../actions/favorite/favorite';
import theme from '../theme/theme';

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
    const favorites = useSelector(state => state.favorite.favorite);

    //뒤로가기 시 드로워 열리도록
    if(openID.open){
      open = true;
    }

    useEffect(()=>{
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(load_favorite());
        dispatch(load_user());
      }
    }, [dispatch]);

    //state
    const [drawerOpen, setDrawerOpen] = useState(open);
    const [toggleOn, setToggleOn] = useState(user&&user.toggle);

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

    //스위처
    const handleSwitch = (e) =>{
      e.preventDefault();
      setChecked(e.target.checked);

    } 

    //토글 클릭
    const handleToggle = (e) =>{
      e.preventDefault();
      
      // if(user.toggle == '명륜'){
      //   setToggleOn('율전');
      //   if (dispatch && dispatch !== null && dispatch !== undefined) {
      //   dispatch(change_toggle('율전'));
      //   dispatch(load_user());
      //   console.log(user.toggle)
      //   }
      // } else {
      //   setToggleOn('명륜');
      //   if (dispatch && dispatch !== null && dispatch !== undefined) {
      //   dispatch(change_toggle('명륜'));
      //   dispatch(load_user());
      //   }
      //   console.log(user.toggle)

      // }
    } 

    const list = (anchor) => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleDrawerClick(false)}
          onKeyDown={handleDrawerClick(false)}
        >   
            <Box style={{ textAlign:'center', marginTop:'40px'}}>
                <Image src={user && user.image ? user.image: profile} alt='프로필' width={98} height={98} style={{borderRadius: "30px",}} />
                <div >
                <Typography style={{marginTop:'13px', fontSize:'15px', fontWeight:'700', lineHeight: '28px'}} >{user != null ? user.nickname : ''}</Typography>
                <Typography style={{marginTop:'13px', fontSize:'12px', fontWeight:'500', lineHeight: '28px'}} >{user != null ? user.major : ''}</Typography>
                </div>
            </Box>
            <List style={{marginLeft:'55px', marginTop:'54px'}}>
                <ListItem disablePadding >
                    <Grid container style={{fontSize:'20px', fontWeight:'400', lineHeight: '28px'}} >
                        <Grid item style={{marginRight:'9px'}}>
                            <Image src={bookmark} alt='즐겨찾기' width={16} height={16}/>
                        </Grid>
                        <Grid item>
                            <ListItemText primary="즐겨찾기 장소" style={{marginTop:'1px'}} onClick={handleMove} />  
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem disablePadding>
                    <Grid container style={{marginTop:'37px', fontSize: '20px', fontWeight:'400', lineHeight: '28px'}}>
                        <Grid item style={{marginRight:'9px',}}>
                            <Image src={star} alt='나의 리뷰' width={16} height={16} style={{marginTop:'0px'}}/>
                        </Grid>
                        <Grid item>
                            <ListItemText primary="나의 리뷰" style={{marginTop:'2px'}} onClick={handleMove}/>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </Box>
    );

    return(
        <ThemeProvider theme={theme}>
            <Image src={hamburger} alt='drawer' onClick={handleDrawerClick(true)} width={20} height={15}/>
            <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerClick(false)} width={250} >
              <Grid container style={{position:'relative'}}>
                <Grid item style={{marginTop:'45px', marginLeft:'70%'}}>
                  <Image src={toggleOn == '율전' ? yj: mr} width={60} height={60} onClick={handleToggle}/>
                </Grid>
              </Grid>
             
                {list('left')}
            </Drawer>
        </ ThemeProvider>
    )
}