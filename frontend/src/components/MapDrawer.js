import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from "next/router";
import {Grid,ThemeProvider, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Switch, styled, FormControlLabel} from '@mui/material';
import hamburger from '../image/햄버거바.png';
import bookmark from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import profile from '../image/profile.png';
import yj from '../image/율전.png';
import { load_user } from '../actions/auth/auth';
import { load_review } from '../actions/review/review';
import { load_favorite } from '../actions/favorite/favorite';
import theme from '../theme/theme';

export default function MapDrawer({openID}){
    const dispatch = useDispatch();
    const router = useRouter();
    let open = false;
    let campus = true;

    //api
    const user = useSelector(state => state.auth.user);
    const favorites = useSelector(state => state.favorite.favorite);
    // const review = useSelector(state => state.)

    if(openID){
      open = openID;
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



    //토글 아이콘
    const IOSSwitch = styled((props) => (
        <Switch checked={checked} onClick={handleSwitch} focusVisibleClassName=".Mui-focusVisible" sx={{ m: 1 }} {...props}/>
      ))(({theme}) => ({
        width: 50,
        height: 30,
        padding: 0,
        
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: '7px 0px 0px 10px' ,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.primary.main,
              backgroundImage: `url('data:image/svg+xml;utf8,<svg width="23" height="13" viewBox="0 0 23 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.86096 1.861V3.226H8.92896V1.861H5.86096ZM5.86096 4.266V5.644H8.98096V4.266H5.86096ZM8.38296 0.119V7.165H10.112V0.119H8.38296ZM0.530958 0.989999V6.515H6.22496V0.989999H0.530958ZM4.52196 2.355V5.163H2.23396V2.355H4.52196ZM6.02996 7.477C3.48196 7.477 1.90896 8.348 1.90896 9.817C1.90896 11.299 3.48196 12.157 6.02996 12.157C8.57796 12.157 10.151 11.299 10.151 9.817C10.151 8.348 8.57796 7.477 6.02996 7.477ZM6.02996 8.803C7.60296 8.803 8.43496 9.128 8.43496 9.817C8.43496 10.506 7.60296 10.844 6.02996 10.844C4.46996 10.844 3.63796 10.506 3.63796 9.817C3.63796 9.128 4.46996 8.803 6.02996 8.803ZM15.5489 7.23V9.557H17.2779V7.23H15.5489ZM18.4739 7.23V9.557H20.1899V7.23H18.4739ZM11.8439 6.567V7.932H22.7379V6.567H11.8439ZM13.1049 10.571V11.949H21.7369V10.571H13.1049ZM13.1049 8.738V11.351H14.8209V8.738H13.1049ZM13.1699 0.379V1.692H19.7089V2.485H13.1829V4.968H14.8989V3.707H21.4119V0.379H13.1699ZM13.1829 4.526V5.826H21.6459V4.526H13.1829Z" fill="white"/>
              </svg>'
              )`,
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
          width: 15,
          height: 15,
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
                <Image src={profile} alt='프로필' width={98} height={98} style={{borderRadius: "30px",}} />
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
            <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerClick(false)} width={250}>
              <FormControlLabel
              control={<IOSSwitch />}
              style={{marginTop:'45px', marginLeft:'70%'}}
              />
                {list('left')}
            </Drawer>
        </ ThemeProvider>
    )
}