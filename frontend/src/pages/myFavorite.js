import { CssBaseline, Grid,ThemeProvider, Button, Grow, Box,Card, Paper, MenuList, MenuItem, ClickAwayListener, Typography, Popper, Container, CardContent, Stack} from '@mui/material';
import { useDispatch, useSelector, } from "react-redux";
import { useState, useEffect, useRef, } from 'react';
import { useRouter } from "next/router";
import { load_favorite, delete_favorite } from '../actions/favorite/favorite';
import Link from 'next/link';
import Image from 'next/image';
import bookmarkOn from '../image/bookmark-1.png';
import food from '../image/food.png';
import star from '../image/Star2.png';
import back from '../image/arrow_back_ios.png';
import closeIcon from '../image/close.png';
import down from '../image/down.png';
import theme from '../theme/theme';
import { displayReviewTag } from "../components/TagList";
import BasicDialog from '../components/BasicDialog';


export default function myFavorite(){
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState(true);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const router = useRouter();
    const dispatch = useDispatch();
    const anchorRef = useRef(null);

    // if(typeof window !== 'undefined' && !isAuthenticated){
    //     router.push('/login');
    // }

    // api에서 데이터 불러오기
    useEffect(()=>{
        dispatch(load_favorite());
    }, [dispatch]);
    
    const favorites = useSelector(state => state.favorite.favorite);

    const isFavorite = (placeId) => {
        const favorite = favorites.some(favorite => favorite.place_id === placeId)
        if(favorite){
            return <Image width={15} height={15} src={bookmarkOn}/>
        }
        return null;
    };

    //place 페이지로 넘어가는
    const handleLiClick = (e) => {
        e.preventDefault();
    };
    
    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'back' ){
            
            router.push({
                pathname: '/',
                query: { openID: true }
              });
            
        } else{
            router.push('/');
        }
    };

    //즐겨찾기 클릭시 즐겨찾기 삭제
    const handleFavClick = (placeId) => (e) => {
        e.preventDefault();
        dispatch(load_favorite());
        const favorite_id = favorites.find(favorite => favorite.place_id == placeId);
        if(favorite_id) {
            dispatch(delete_favorite(favorite_id.id));
        }
    };

    //최신순 버튼
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
    
        setOpen(false);
      };

    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
      prevOpen.current = open;
    }, [open]);


    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div name="상단" style={{width:'100%', height:'100%', position:'relative', marginTop:'50px'}}>
                <div style={{position: 'absolute',}}>
                <Container fixed style={{ position:'fixed', zIndex:'4', padding:'0px', overflow: "hidden", height:'50px', maxWidth:'600px'}} >
                <Card style={{
                            // position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '120%',
                            zIndex: '4',
                            border: "1px solid transparent",
                            boxShadow: 'none',
                            padding:'0px'
                        }}>
                        <Grid container style={{padding:'0px 13px 0px 15px', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Grid style={{padding: '2px 10px 0px 4px'}} >
                                <Image src={back} width={11} height={18} name='back' onClick={handleIconOnclick}/>
                            </Grid>
                            <Grid>
                                <Grid container>
                                    <Grid item xs style={{marginTop:'4px'}} >
                                        <Image src={bookmarkOn} width={20} height={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{margin:'0px 0px 0px 5px', fontSize:'20px'}}>즐겨찾기 장소</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid >
                                <Image src={closeIcon} width={31} height={31} name='close' onClick={handleIconOnclick}/>
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
                </div>
                <Container name='최신순' style={{background:'white', padding:'0px'}}>
                <div style={{float:'right',zIndex:'2', margin:'60px 0px 0px 0px'}}>
                        <Grid container style={{marginRight:'15px'}} onClick={handleToggle}>
                            <Grid item style={{margin:'0px'}}>
                                <Button
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                style={{padding:'0px'}}
                                color="fontColor"
                                >
                                최신순
                                </Button>
                            </Grid>
                            <Grid item>
                                <Image src={down} width={13} height={8} />
                            </Grid>
                        </Grid>
                        <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        style={{zIndex:'3', }}
                        >
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                boxShadow: '0px 0px 4px 0px rgb(0,0,0, 0.16)', 
                                borderRadius:'5px',
                                padding:'4px 5px 4px 5px',
                                height:'113px'
                            }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    dense={true}
                                    autoFocus={true}
                                >
                                    <Grid container justifyContent='center' >
                                        <MenuItem style={{fontSize:'15px'}} color={color? theme.palette.primary : '#000'} name='최신순' onClick={handleClose}>최신순</MenuItem>
                                    </Grid>
                                    <Grid container justifyContent='center' >
                                        <MenuItem style={{fontSize:'15px'}} name='이름순' onClick={handleClose}>이름순</MenuItem>
                                    </Grid>
                                    <Grid container justifyContent='center' >
                                        <MenuItem style={{fontSize:'15px'}} name='오래된순' onClick={handleClose}>오래된순</MenuItem>
                                    </Grid>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>
                    </div>
                </Container>
                <Container name ='리스트' style={{ padding:'0px', overflowY:'scroll', zIndex:'0',border:'none'}}>
                <Paper style={{overflowY:'auto', padding:'0px 15px 0px 15px', marginTop:'0px', border: "0px solid transparent", boxShadow:'none'}}>
                    <ul style={{listStyleType: "none", padding: '0px 0px 0px 0px', margin: '0px', }} >
                            {favorites? favorites.map((item) => (
                                    <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}} onClick={handleLiClick}>
                                        <Link href={`/place?id=${item.place_id}`} key={item.id}>
                                        <Grid container style={{margin: '10px 0px 0px 0px'}}>
                                            <Grid item xs >
                                                <CardContent style={{padding:'0px'}}>
                                                    <Grid container spacing={2} style={{margin:'0px',}}>
                                                        <Grid item style={{marginTop:'15px',  padding:'0px'}}>
                                                            <Typography sx={{fontSize: '18px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{padding:'0px 0px 0px 8px'}}>
                                                            <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop: '22px'}} color={theme.palette.fontColor.light} component="div" >
                                                                {item.detail_category}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{padding:'0px 0px 0px 8px', marginTop:'19px'}} onClick={handleFavClick(item.place_id)}>
                                                            <Image width={15} height={15} src={bookmarkOn}/>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item container style={{marginTop: '10px'}}>
                                                        <Grid >
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'2px'}}  color={theme.palette.fontColor.dark} component="div">
                                                            스꾸친 평점 :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid style={{margin: '-3px 7px 0px 7px'}}>
                                                            <Image width={10} height={10} src={star}/>
                                                        </Grid>
                                                        <Grid >
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color={theme.palette.fontColor.dark} component="div">
                                                            {item.rate}
                                                            </Typography>
                                                        </Grid >
                                                        <Grid style={{margin:'0px 7px 0px 0px'}}>
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color={theme.palette.fontColor.light} component="div">
                                                            /5
                                                            </Typography>
                                                        </Grid>
                                                        <Grid style={{margin:'0px 7px 0px 0px'}}>
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color={theme.palette.fontColor.dark}component="div">
                                                            |
                                                            </Typography>
                                                        </Grid>
                                                        <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color={theme.palette.fontColor.dark} component="div">
                                                            스꾸리뷰
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color={theme.palette.fontColor.dark} component="div">
                                                            {item.review_count}
                                                            </Typography>
                                                        </Grid>
                                                        
                                                    </Grid>
                                                    <Grid container style={{marginTop: '6px'}}>
                                                        <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color={theme.palette.fontColor.dark} component="div">
                                                            위치 : {item.gate}   
                                                            </Typography>
                                                        </Grid>
                                                        <Grid >
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color={theme.palette.fontColor.light} component="div">
                                                            ({item.address})
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container>
                                                        {item.tags.map((tag, index) => (
                                                            <Grid sx={{padding: "5px 5px 10px 0px"}} key={index}>
                                                                {displayReviewTag(tag)}
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </CardContent>
                                            </Grid>
                                            <Grid style={{marginTop:'10px', marginBottom:'10px'}}>
                                                <Image
                                                width= {98} height= {98}
                                                alt={item.name} 
                                                src={ item.images && item.images.length > 0 ? item.images[0] : food }
                                                style={{borderRadius: '10px'}}
                                                
                                                />
                                            </Grid>
                                        </Grid>
                                        </Link>
                                    </li>
                            )): null}
                        </ul>
                    </Paper>
                </Container>
                </div>
                <BasicDialog/>
        </ThemeProvider>
    )
};