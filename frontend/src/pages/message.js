import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_reviews } from "../actions/review/review";
import { load_review} from "../actions/review/review"
import { load_favorite } from "../actions/favorite/favorite";
import { load_menu }  from "../actions/menu/menu";

import { styled } from '@mui/material/styles';
import { Tabs, Tab, CssBaseline, Box, Rating, ThemeProvider, Slide,Button,IconButton, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png'
import more from '../image/more_vert.png'
import profile from '../image/profile.png'
import { reviewsTags } from "../components/TagList";
import MessageTab from "../components/MessageTab";

const MessagePage = () => {

    // 뒤로가기 버튼
    const handleOnclick = () =>{
        router.back();
    };  

    const router = useRouter();
    const { id } = router.query;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            // dispatch(load_favorite());
            // dispatch(load_menu(id));
            dispatch(load_reviews(place_id));
            // dispatch(load_review());
        }
    }, [dispatch, id]);

    // place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.place);

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);

    const user = useSelector(state => state.auth.user);

    // 이미지
    const images = useSelector(state => state.review.review)



    return(
        <ThemeProvider theme={theme} >
            <CssBaseline />
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}

            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card elevation={0} style={{
                    position: 'fixed',
                    top: '0px',
                    width: '100%',
                    height: '60px',
                    zIndex: '4',
                    border:'none',
                    maxWidth:'600px'
                }}>
                    <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 10px 0px 0px'}}>
                            <Image src={back} width={12} height={20} name='back' onClick={handleOnclick}/>
                        </Grid>
                
                        <Grid >
                            <Typography sx={{fontSize: '18px', fontWeight:'700', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                메시지
                            </Typography>
                        </Grid>
                    
                        <Grid style={{width:'14px'}}>

                        </Grid> 
                    </Grid>
                </Card>
            </Container>
            <Container component="main" width="100%" style={{listStyleType: "none"}}>
                <Grid container sx={{pt:6}} style={{justifyContent:'center'}} >
                </Grid>
            </Container>
            <MessageTab />
        </div>
        </ThemeProvider>
        
    )
}

export default MessagePage;