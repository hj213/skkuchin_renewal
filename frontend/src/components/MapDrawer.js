import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from "next/router";
import {Grid,ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Switch, styled, FormControlLabel} from '@mui/material';
import hamburger from '../image/햄버거바.png';
import bookmark from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import profile from '../image/profile.png';
import yj from '../image/율전토글_on.png';
import mr from '../image/명륜토글_default.png';
import { load_user } from '../actions/auth/auth';
import { load_favorite } from '../actions/favorite/favorite';
import theme from '../theme/theme';

export default function MapDrawer(openID){

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const router = useRouter();
    let open = false;
    let campus = true;
  
    if(typeof window !== 'undefined' && !isAuthenticated){
      router.push('/login');
    }

    //api
    const user = useSelector(state => state.auth.user);
    const favorites = useSelector(state => state.favorite.favorite);
    // const review = useSelector(state => state.)

    if(openID.open.openID){
      open = true;
    }

    
    if(user != null) {
      if(user.campus == '명륜'){
        campus = false;
      } else{
        campus = true;
      }
    }


    useEffect(()=>{
        dispatch(load_user());
        dispatch(load_favorite());
    }, [dispatch]);

    //state
    const [drawerOpen, setDrawerOpen] = useState(open);
    const [checked, setChecked] = useState(campus);
    const [toggleOn, setToggleOn] = useState(campus);

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
      if(toggleOn){
        setToggleOn(false);
      }else{
        setToggleOn(true);
      }
    
    }

    //토글 아이콘
    const IOSSwitch = styled((props) => (
        <Switch checked={checked} size="" onClick={handleSwitch} focusVisibleClassName=".Mui-focusVisible" sx={{ m: 1 }} {...props}/>
      ))(({theme}) => ({
        width: 57,
        height: 30,
        padding: 0,
        
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: '8px 0px 0px 15px',
          transitionDuration: '300ms',
          backgroundImage:`url(${mr})`,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundImage: `url(${yj})`,
              backgroundSize: 'cover',
              height:'100%',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 14,
          height: 14,
          boxShadow: 'none'
        },
        '& .MuiSwitch-track': {
          borderRadius: 50,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));

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
                            <ListItemText primary="즐겨찾기 장소" style={{marginTop:'0px'}} onClick={handleMove} />  
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem disablePadding>
                    <Grid container style={{marginTop:'37px', fontSize: '20px', fontWeight:'400', lineHeight: '28px'}}>
                        <Grid item style={{marginRight:'9px',}}>
                            <Image src={star} alt='나의 리뷰' width={20} height={20} style={{marginTop:'3px'}}/>
                        </Grid>
                        <Grid item>
                            <ListItemText primary="나의 리뷰" style={{marginTop:'0px'}} onClick={handleMove}/>
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
                  {/* <FormControlLabel
                  control={<IOSSwitch />}
                  /> */}
                  <Image src={toggleOn ? yj: mr} width={57} height={30} onClick={handleToggle}/>
                </Grid>
                {/* <Grid item style={{position:'absolute', marginTop:'59px', marginLeft:'71%', zIndex:'2'}}>
                  <Image src={mr} width={23} height={14}/>
                </Grid> */}
              </Grid>
             
                {list('left')}
            </Drawer>
        </ ThemeProvider>
    )
}