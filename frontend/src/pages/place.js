import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { load_places } from "../actions/place/place";
import { load_menu }  from "../actions/menu/menu";
import { load_favorite, enroll_favorite, delete_favorite } from "../actions/favorite/favorite";
import Layout from "../hocs/Layout";
import Map from "../components/Map";
import Image from 'next/image';
import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden } from '@mui/material';
import theme from '../theme/theme';
import line from '../image/Line1.png';
import food from '../image/food.png';
import tag16 from '../image/tag16.png';
import tag17 from '../image/tag17.png';
import bookmarkAdd from '../image/bookmark_add.png';
import bookmarkOn from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import mapIcon from '../image/map-1.png'
import back from '../image/arrow_back_ios.png'

import ReviewStar from '../components/ReviewStar'

const PlacePage = () => {

    // Part 1) place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = useState('');
    const places = useSelector(state => state.place.place);
    
    // Part 2) menu, 가게 정보 (menu API)
    const menus = useSelector(state => state.menu.menu);
    
    // Part 3) favorite, 스크랩 정보 (favorite API)
    const favorites = useSelector(state => state.favorite.favorite);

    // *슬라이드탭 카드 애니메이션 관리
    const [height, setHeight] = useState('32%');
    const [cardStyle, setCardStyle] = useState({
        radius: '30px 30px 0px 0px',
        cardVisibility: 'visible',
        iconVisibility: 'visible',
    });

    const [numOfLi, setNumOfLi] = useState(0);
    const [open, setOpen] = useState({
        bool:false,
        visibility: 'hidden'
    });
    const cardRef = useRef(null);
    const animationDuration = '0.3s';
    const animationTimingFunction = 'ease-out';

    const [isCardVisible, setIsCardVisible] = useState(false);

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_places());
            dispatch(load_favorite());
        }
    }, [dispatch]);

    const handleOpen = (id) => {

        setPlaceId(id);
        setIsCardVisible(true);
        setHeight('32%');

        if(dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_menu(id));
        }
        if (cardRef.current) {
            cardRef.current.addEventListener("touchmove", handleTouchMove);
        }
    }
    
    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.addEventListener("touchmove", handleTouchMove);
        }
        return () => {
            if (cardRef.current) {
                cardRef.current.removeEventListener("touchmove", handleTouchMove);
            }
        };
    }, [cardRef]);
        
    // 카드 터치 했을 때 변화
    const handleTouchMove = (event) => {
        event.preventDefault();

        const WINDOW_HEIGHT = window.innerHeight;
        const TARGET_HEIGHT = WINDOW_HEIGHT * 0.55;
        if(WINDOW_HEIGHT > 1000){
            TARGET_HEIGHT = WINDOW_HEIGHT*0.58;
        }
        const MinHeight = window.innerHeight * 0.32;
        const cardHeight = 140 * numOfLi;
        const newHeight = window.innerHeight - event.touches[0].clientY;

        if( TARGET_HEIGHT >= cardHeight){
            setHeight(Math.min(Math.max(newHeight, MinHeight), TARGET_HEIGHT));
        } else {
            setHeight(Math.max(newHeight, MinHeight));
        }
        if (newHeight >= TARGET_HEIGHT) {
            setOpen({
                bool: true,
                visibility: 'visible'
            });
            setCardStyle({
                radius:'0px',
                iconVisibility:'hidden'
            });
        } else {
            setOpen({
                bool: false,
                visibility: 'hidden'
            });
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility:'visible'
            });
        }
    };

     // 전체화면 시, 헤더영역 아이콘 클릭 이벤트
     const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            setOpen({ bool:false,
                Visibility:'hidden'});
            setHeight('32%');
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility: 'visible'
            })
        } 
    };

    // Favorite 관리
    const isFavorite = (placeId) => {
        return favorites.some(favorite => favorite.place_id === placeId);
    }
    
    const handleFavClick = (placeId) => {
        dispatch(load_favorite());
        const favorite_id = favorites.find(favorite => favorite.place_id === placeId);
        if(favorite_id) {
            dispatch(delete_favorite(favorite_id.id));
        } else {
            dispatch(enroll_favorite(placeId));
        }
    }
    
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout
                title='스꾸친 | Place'
                content='Place page'
            >
                <div style={{position: 'absolute', zIndex: 2, backgroundColor: 'white'}}>
                    { places.map((place) => (
                        <Grid key={place.id}>
                            <div className='p-3' onClick={() => handleOpen(place.id)}>
                                <h4>{place.name}</h4>
                            </div>
                        </Grid>
                    ))}
                </div>
                            
                <div style={{ position: 'relative', width:'100%', height:'100%'}}>  
                <Map latitude={37.58622450673971} longitude={126.99709024757782} />                    
                    {/* 카드 전체화면 채울 시, 헤더영역 */}
                <Slide direction="up" in={open.bool} timeout={1} >
                <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                        <Card style={{
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '98px',
                            zIndex: '4',
                            boxShadow: '0px 10px 20px -10px rgb(0,0,0, 0.16)',
                            visibility: open.visibility,
                        }}>
                            <Grid container style={{padding:'50px 15px 0px 15px', justifyContent: 'space-between'}}>
                                <Grid style={{padding: '0px 10px 0px 0px'}}>
                                    <Image src={back} width={37} height={36} name='back' onClick={handleOnclick}/>
                                </Grid>
                          
                                <Grid>
                                    {places.filter(item => item.id === place_id).map(item => (
                                        <Grid style={{flexDirection: 'row'}}>
                                            <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                                {item.name}
                                            </Typography>
                                            <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="span" >
                                                {item.detail_category}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            
                                <Grid onClick={()=> handleFavClick(place_id)}>
                                    <Image width={25} height={28}  src={isFavorite(place_id)? bookmarkOn : bookmarkAdd}/>
                                </Grid> 
                            </Grid>
                        </Card>
                    </Container>
                </Slide>
                {/* 카드 Content */}
                <Container style={{padding: '0px 16px 0px 0px', overflow: 'hidden'}}>
                    <Card style={{
                        borderRadius: cardStyle.radius,
                        position: 'absolute',
                        bottom: '0px',
                        width: '100%',
                        height: height,
                        overflowY: 'auto',
                        zIndex: '3',
                        boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
                        visibility: cardStyle.cardVisibility,
                        transition: `height ${animationDuration} ${animationTimingFunction}`,
                    }} 
                    ref = {cardRef}
                    >
                    <div>


                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" style={{ visibility:cardStyle.iconVisibility}}>
                        <Box gridColumn="span 4"></Box>
                        <Box style={{textAlign: 'center'}}gridColumn="span 4">
                            <Image width={60} height={4} src={line} /> 
                        </Box>
                        <Box style={{textAlign: 'right', padding: '5px 15px'}} gridColumn="span 4" onClick={()=> handleFavClick(place_id)}>
                            <Image width={25} height={28}  src={isFavorite(place_id)? bookmarkOn : bookmarkAdd}/>
                        </Box> 
                    </Box>
                    
                    
                    <ul style={{listStyleType: "none", padding: '0px 18px 0px 18px', margin: '0px'}} >
                    {places.filter(item => item.id === place_id).map(item => (
                            <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9', }}>
                                <>
                                    <Grid container>
                                        <Grid>
                                            <CardContent style={{padding:'15px'}}>
                                                <Grid container >
                                                    <Grid>
                                                        <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid style={{padding:'2px 4px'}}>
                                                        <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="div" >
                                                            {item.detail_category}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '10px'}}>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400', marginTop:'2px'}}  color="#505050" component="div">
                                                        스꾸친 평점 :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid style={{margin:'0px 7px 0px 7px'}}>
                                                        <Image width={15} height={14} src={star}/>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
                                                        {item.rate}
                                                        </Typography>
                                                    </Grid >
                                                    <Grid style={{margin:'0px 7px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400', marginTop:'3px'}} color="#A1A1A1" component="div">
                                                        /5
                                                        </Typography>
                                                    </Grid>
                                                    <Grid style={{margin:'0px 7px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400', marginTop:'3px'}} color="#505050" component="div">
                                                        |
                                                        </Typography>
                                                    </Grid>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400', marginTop:'3px'}} color="#505050" component="div">
                                                        스꾸 리뷰
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
                                                        {item.review_count}
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Grid>

                                                <Grid container style={{margin: '4px 0px 11px 0px'}}>
                                                    <Stack direction="row" spacing={2}>
                                                    <Image
                                                        width= {72}
                                                        height= {27}
                                                        alt="tag"
                                                        src={tag16}
                                                    />
                                                    <Image
                                                        width= {72}
                                                        height= {27}
                                                        alt="tag"
                                                        src={tag17}
                                                    />
                                                    <Image
                                                        width= {72}
                                                        height= {27}
                                                        alt="tag"
                                                        src={tag17}
                                                    />
                                                    </Stack>
                                                </Grid>
                                                <Grid container style={{marginTop: '6px'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                                        위치 : {item.gate}   
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#a1a1a1" component="div">
                                                        ({item.address})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '6px'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                                        학생 할인 : {(item.discount_content != null) ? 'O' : 'X'}   
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#a1a1a1" component="div">
                                                        {(item.discount_content != null) ? '('+item.discount_content+')' : ''}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '6px', flexDirection: 'column'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                                        영업시간 
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{marginTop: '6px', fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                                        매일 : {item.service_time}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{marginTop: '6px',fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                                        브레이크 타임 : {item.break_time}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                            <CardContent sx={{mb: '10px'}}>
                                                메뉴 {menus.length}
                                               
                                                { menus.map((menu, index) => (
                                                    <Grid container style={{marginTop: '6px',borderBottom: '0.5px solid gray'}}>
                                                        <Grid style={{margin:'0'}}>
                                                            <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                                                {menu.name}  ({menu.price}원)
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                ))}
                                            </CardContent>
                                        </Grid>

                                    </Grid>
                                </>
                            </li> 
                        ))}
                        </ul>
                        </div>
                        <Grid style={{padding:'20px'}}>
                         <ReviewStar />
                        </Grid>
                    </Card>
                </Container>
                </div>
            </Layout>
        </ThemeProvider>
    );
};
export default PlacePage;

