import { useRouter } from "next/router";
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
import bookmarkAdd from '../image/bookmark_add.png';
import bookmarkOn from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import expand from '../image/expand_more.png'
import back from '../image/arrow_back_ios.png'
import mapTagOn8 from '../image/태그/지도_on/tag_간단.png';
import mapTagOn9 from '../image/태그/지도_on/tag_분위기.png';
import ReviewStar from '../components/ReviewStar'
import TagList from "../components/TagList";
import SearchBox from "../components/SearchBox";

const PlacePage = () => {
    
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const router = useRouter();
    // list.js 에서 전달 받은 id 값 받아오기
    const { id } = router.query;

    // Part 1) place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.place);
    
    // Part 2) menu, 가게 정보 (menu API)
    const menus = useSelector(state => state.menu.menu);
    
    // Part 3) favorite, 스크랩 정보 (favorite API)
    const favorites = useSelector(state => state.favorite.favorite);

    // *슬라이드탭 카드 애니메이션 관리
    const [height, setHeight] =  useState('32%');
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
    const [scroll, setScroll] = useState('');
    const [isCardVisible, setIsCardVisible] = useState(false);

    const cardRef = useRef(null);
    const animationDuration = '0.3s';
    const animationTimingFunction = 'ease-out';

    if(typeof window !== 'undefined' && !isAuthenticated){
        router.push('/login');
    }

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            dispatch(load_favorite());
            dispatch(load_menu(id));
        }
    }, [dispatch, id]);

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
        const TARGET_HEIGHT = WINDOW_HEIGHT * 0.56;
        if(WINDOW_HEIGHT > 1000){
            TARGET_HEIGHT = WINDOW_HEIGHT*0.58;
        }
        const MinHeight = window.innerHeight * 0.32;
        const cardHeight = 150 * numOfLi;
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
            setScroll('scroll');
        } else {
            setOpen({
                bool: false,
                visibility: 'hidden'
            });
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility:'visible'
            });
            setScroll('');
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
            });
            setScroll('');
            cardRef.current.scrollTo({top:0, behavior: 'smooth'});
        } 
    };

    // Favorite 관리
    const isFavorite = (placeId) => {
        return favorites.some(favorite => favorite.place_id == placeId);
    }
    
    const handleFavClick = (placeId) => {
        dispatch(load_favorite());
        const favorite_id = favorites.find(favorite => favorite.place_id == placeId);
        if(favorite_id) {
            dispatch(delete_favorite(favorite_id.id));
        } else {
            dispatch(enroll_favorite(placeId));
        }
    }

    // 메뉴 가격 천단위 포맷팅
    const addComma = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const {openID} = router.query;

    // 태그 검색
    const [keyword, setKeyword] = useState('');

    const onTagClick = (id) => {
        setKeyword(id);
        router.push(`/?keyword=${id}`);
    }
    
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <Layout
                title='스꾸친 | Place'
                content='Place page'
            >           
                <div style={{ position: 'relative', width:'100%', height:'100%'}}>  
                <Container style={{position:'absolute', zIndex:'2'}}>
                    <SearchBox openID={openID}/>   
                </Container> 
                <Map latitude={37.58622450673971} longitude={126.99709024757782} places={places} selectedId={id}/>                  
                {/* 태그 목록 */}
                <TagList keyword={keyword} onTagClick={onTagClick} />
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
                            <Grid container style={{padding:'50px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid style={{padding: '0px 10px 0px 0px', marginTop:'6px'}}>
                                    <Image src={back} width={12} height={22} name='back' onClick={handleOnclick}/>
                                </Grid>

                                <Grid>
                                    { places ? places.filter(item => item.id == place_id).map(item => (
                                        <Grid key={item.id} style={{flexDirection: 'row'}}>
                                            <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                                {item.name}
                                            </Typography>
                                            <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="span" >
                                                {item.detail_category}
                                            </Typography>
                                        </Grid>
                                    )) : null }
                                </Grid>
                            
                                <Grid onClick={()=> handleFavClick(place_id)}>
                                    <Image width={20} height={21.85}  src={isFavorite(place_id)? bookmarkOn : bookmarkAdd}/>
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
                        overflowY: scroll,
                        zIndex: '3',
                        boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
                        visibility: cardStyle.cardVisibility,
                        transition: `height ${animationDuration} ${animationTimingFunction}`,
                    }} 
                    ref = {cardRef}
                    >
                    <div>

                    {!open.bool && (
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" style={{ visibility:cardStyle.iconVisibility}}>
                        <Box gridColumn="span 4"></Box>
                        <Box style={{textAlign: 'center', verticalAlign: 'top', padding: '8px'}}gridColumn="span 4">
                            <Image width={70} height={4} src={line} /> 
                        </Box>
                        <Box style={{textAlign: 'right', padding: '15px 15px 0'}} gridColumn="span 4" onClick={()=> handleFavClick(place_id)}>
                            <Image width={20} height={21.85}  src={isFavorite(place_id)? bookmarkOn : bookmarkAdd}/>
                        </Box> 
                    </Box>
                    )}
                    {open.bool && (
                        <Box sx={{paddingTop: '10px'}}></Box>
                    )}
                    
                    <Container component="main" maxWidth="xs" style={{listStyleType: "none"}}>
                    { places ? places.filter(item => item.id == place_id).map(item => (
                            <li key={item.id} data={item}>

                                <>
                                <Grid container style={{padding: '10px 15px'}}>
                                        <Grid style={{width: '100%'}}>
                                            <CardContent>
                                            {!open.bool && (
                                                <Grid container sx={{mt: 0, pt: 0}}>
                                    
                                                    <Grid>
                                                    <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000">
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography sx={{fontSize: '15px', fontWeight: '500', lineHeight: '129%', paddingLeft: '4px'}} color="#a1a1a1" component="div" >
                                                            {item.detail_category}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                )}
                                                <Grid sx={{width: '100%'}}>
                                                <Grid container style={{paddingTop: '11px', alignItems: 'center', justifyContent: open.bool? 'center' : 'left'}}>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400', marginTop:'2px'}}  color="#505050" component="div">
                                                        스꾸친 평점 :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid sx={{height: '100%', margin:'5px 4px 0px'}}>
                                                        <Image width={20} height={19} src={star}/>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography sx={{fontSize: '15px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
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
                                                        {item.review_count}개
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Grid>

                                                <Grid container style={{margin: '4px 0px 11px 0px',  justifyContent: open.bool? 'center' : 'left'}}>
                                                    <Stack direction="row" spacing={2}>
                                                    <Image
                                                        width= {90}
                                                        height= {27}
                                                        alt="tag"
                                                        src={mapTagOn8}
                                                    />
                                                    <Image
                                                        width= {76}
                                                        height= {27}
                                                        alt="tag"
                                                        src={mapTagOn9}
                                                    />
                                                    <Image
                                                        width= {76}
                                                        height= {27}
                                                        alt="tag"
                                                        src={mapTagOn9}
                                                    />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{width: '100%', paddingTop: '14px', padding: open.bool? '0px 10%' : '0'}}>
                                                <Grid container>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        위치 : {item.gate}   
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#BABABA" component="div">
                                                        ({item.address})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '7.5px'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        학생 할인 : {(item.discount_content != null) ? 'O' : 'X'}   
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#BABABA" component="div">
                                                        {(item.discount_content != null) ? '('+item.discount_content+')' : ''}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '7.5px', flexDirection: 'column'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px', flexDirection: 'row'}}>
                                                        <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        영업시간  <Image src={expand} width={10.7} height={6.5} style={{margin: '0px 6.65px'}}></Image>                                          
                                                        </Typography>          
                                                    </Grid>
                                                    <Grid>
                                                        <Typography  sx={{marginTop: '7.5px', fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        매일 : {item.service_time}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{margin: '7.5px 0px 11.5px', fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        브레이크 타임 : {item.break_time}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            </CardContent>
                                            <CardContent>
                                                <Grid sx={{display: 'flex', mb: '10px'}}>
                                                    <Typography sx={{fontSize: '17px', fontWeight: '700', pr: '4px'}}>
                                                        메뉴
                                                    </Typography>
                                                    <Typography sx={{fontSize: '17px', fontWeight: '700', color: '#FFCE00'}}>
                                                        { menus ? menus.length : null }
                                                    </Typography>
                                                </Grid>
                                                { menus ? menus.map((menu, index) => (
                                                    <Grid container style={{borderBottom: '0.5px solid rgba(151, 151, 151, 0.75)'}}>
                                                        <Grid style={{margin:'0', padding: '20px 0px 14px'}}>
                                                            <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                            {menu.name}  ({addComma(menu.price)}원)
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                )) : null }
                                            </CardContent>
                                        </Grid>

                                    </Grid>
                                </>
                            </li> 
                            )) : null }
                        </Container>
                        
                        </div>
                        <Grid>
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

