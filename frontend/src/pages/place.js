
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { load_menu }  from "../actions/menu/menu";
import { enroll_favorite, delete_favorite } from "../actions/favorite/favorite";
import Map from "../components/Map";
import Image from 'next/image';
import { CssBaseline, Box, Rating, Select,Button, ThemeProvider,Slide, MenuItem, Card, CardContent, Typography, Grid, Container, Stack, Hidden } from '@mui/material';
import theme from '../theme/theme';
import line from '../image/Line1.png';
import bookmarkAdd from '../image/bookmark_add.png';
import bookmarkOn from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import expand from '../image/expand_more2.png'
import back from '../image/arrow_back_ios.png'
import ReviewStar from '../components/ReviewStar'
import TagList from "../components/TagList";
import SearchBox from "../components/SearchBox";
import { displayBigReviewTag } from "../components/TagList";
import Link from 'next/link';
import UpperBar from "../components/UpperBar";
import { clear_search_results } from "../actions/place/place";
import { load_reviews } from "../actions/review/review";
import { load_place } from "../actions/place/place";
import PlaceReview from "../components/PlaceReview";
import morePic from '../image/morePicY.png';
import { textAlign } from "@mui/system";

const PlacePage = () => {

    const WINDOW_HEIGHT = window.innerHeight;
    const TARGET_HEIGHT = WINDOW_HEIGHT - 78;
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    // list.js 에서 전달 받은 id 값 받아오기
    const { id } = router.query;

    // Part 1) place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const place = useSelector(state => state.place.searchplace);

    // 태그 검색
    const [keyword, setKeyword] = useState('');
    const [tags, setTags] = useState([]); // 태그 2개까지

    const user = useSelector(state => state.auth.user);
    const [filteredPlace, setFilteredPlace] = useState([]);

    useEffect(() => {
        if (place && user != null && user.toggle!=null) {
            setFilteredPlace(place.filter(item => item.campus === user.toggle));
        } else {
            if (tags != null) setFilteredPlace(null);
        }
    }, [place, user]);

    // Part 2) menu, 가게 정보 (menu API)
    const menus = useSelector(state => state.menu.menu);
    
    // Part 3) favorite, 스크랩 정보 (favorite API)
    const favorites = useSelector(state => state.favorite.favorite);

    // *슬라이드탭 카드 애니메이션 관리
    const [height, setHeight] =  useState('');
    const [cardStyle, setCardStyle] = useState({
        radius: '30px 30px 0px 0px',
        cardVisibility: 'visible',
        iconVisibility: 'visible',
    });

    const [open, setOpen] = useState({
            bool:false,
            visibility: 'hidden'
        });
    const [scroll, setScroll] = useState('');
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isTall, setIsTall] = useState(false);
    const [startY, setStartY] = useState(0);

    const cardRef = useRef(null);
    const listRef = useRef(null);
    const animationDuration = '0.3s';
    const animationTimingFunction = 'ease-out';

    if(typeof window !== 'undefined' && !isAuthenticated){
        router.push('/login');
    }

    useEffect(()=>{
        if(WINDOW_HEIGHT < 750){
            setHeight(270)
        } else {
            setHeight(430)
        }
        setIsTall(false);
        setScroll("");
        setOpen({
            bool: false,
            visibility: "hidden"
        });
        setCardStyle({
            radius:'30px 30px 0px 0px',
            iconVisibility:'visible'
        });
        cardRef.current.scrollTo({top:0});
    },[])

    useEffect(()=>{
        if(isTall){
            setScroll('scroll')
        } else{
            setScroll('')
        }
    },[isTall])

    useEffect(() => {
        if(dispatch && dispatch !== null && dispatch !== undefined) {
            setPlaceId(id);
            if(WINDOW_HEIGHT < 750){
                setHeight(270)
            } else {
                setHeight(435)
            }
            dispatch(load_place(id, ([result, message]) => {
                dispatch(load_menu(id, ([result, message]) => {
                    dispatch(load_reviews(id));
                }));
            }));
        }
    }, [id, click]);

        
    const handleTouchStart = (event) => {
        if(isTall){
            setScroll('scroll');
            setStartY(event.touches[0].clientY);

        } else if(!isTall){
            setScroll("");
            setStartY(event.touches[0].clientY);
        }
    };

    const handleTouchMove = (event) => {
        const touchY = event.touches[0].clientY;
        const deltaY = touchY - startY;
    
        if (!isTall && deltaY < 0 && cardRef.current.offsetHeight < TARGET_HEIGHT) {   
            setHeight(TARGET_HEIGHT);
            setIsTall(true);
            setScroll("scroll");
            setCardStyle({
                radius:'0px',
                iconVisibility:'hidden'
            });
            setOpen({
                bool: true,
                visibility: 'visible'
            });
        } else if (isTall && deltaY > 0 && cardRef.current.scrollTop == 0) {
            cardRef.current.scrollTo({top:0});
            if(WINDOW_HEIGHT < 750){
                setHeight(270)
            } else {
                setHeight(435)
            }
            setIsTall(false);
            setScroll("");
            setOpen({
                bool: false,
                visibility: "hidden"
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
            if(WINDOW_HEIGHT < 750){
                setHeight(270)
            } else {
                setHeight(430)
            }
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility: 'visible'
            });
            setIsTall(false);
            setScroll('');
            cardRef.current.scrollTo({top:0});
        } 
    
    };

    // Favorite 관리
    const isFavorite = (placeId) => {
        return favorites ? favorites.some(favorite => favorite.place_id == placeId) : null;
    }
    
    const handleFavClick = (placeId) => {
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


    const onTagClick = (id) => {
        dispatch(clear_search_results());
        setKeyword(id);
        setIsTall(false);
        if(tags!=null) {
            if(tags.length<2) {
                tags.push(id);
                setKeyword(tags.join(', '));
            } else {
                tags.shift();
                tags.push(id);
                setKeyword(tags.join(', '));
            }
        }
        router.push(`/?keyword=${id}`);
    }

    // to enrollReveiw.js Page

    const handleReviewClick = (e) => {
        e.preventDefault();
    };
    
    // 검색창에 포커스 잡혔을 때
    //드로워가 열리거나
    const [click, setClick] = useState(true);
    const handleFocus= (bool) => {
        setClick(bool);
        if(bool) {
            setHeight('0');
            setIsTall(false);
            setClick(!click);
        }
    }
// 별점 관리
    const [rating, setRating] = useState(0);
    const handleTouch = (index) => {
        // setRating(index);
        if (index + 1 === rating) {
            setRating(0);
        } else {
            setRating(index + 1);
        }
    };

    // 리뷰 파트 컴포넌트화 필요 
    const selectedPlace = useSelector(state => state.place.place);

    // 리뷰정보 (review API)
    const reviews = useSelector(state => state.review.review);
    const [filter, setFilter] = useState('Latest'); // 디폴트 필터는 'Latest'

    const totalImageCount = reviews && reviews.reduce((acc, review) => acc + review.images.length, 0);
    const totalImagesUrl = reviews && reviews.map(review => review.images).flatMap(imageArray => imageArray);

    const allImages = selectedPlace && selectedPlace.images ? selectedPlace.images.concat(totalImagesUrl) : [];

    useEffect(() => {
        if(reviews != null) {
            if (filter === 'Latest') {
                setSortedReviews([...reviews].reverse()); // 최신순으로 정렬
            } else if (filter === 'Rating') {
                setSortedReviews([...reviews].sort((a, b) => b.rate - a.rate)); // 평점이 높은 순으로 정렬
            } else if (filter === 'Oldest') {
                setSortedReviews([...reviews]); // 오래된 순으로 정렬 
            }
            else {
                setSortedReviews([...reviews].sort((a, b) => a.rate - b.rate));
            }
        }
    }, [filter, reviews]);
    
    const [sortedReviews, setSortedReviews] = useState(reviews ? [...reviews] : []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar/>
                <div style={{ position: 'fixed', height:'100%', width:'100%',overflow: 'hidden'}}>  
                <Container style={{position:'absolute', padding:'0px', zIndex:'3', width:'100%'}} >
                    <SearchBox openID={openID} handleFocus={handleFocus}/> 
                    <div style={{position:'relative', width:'100%'}}>
                        <TagList keyword={keyword} onTagClick={onTagClick} />  
                    </div>
                </Container> 
                {/* {filteredPlace != null ?
                    <Map latitude={37.58622450673971} longitude={126.99709024757782} places={filteredPlace} selectedId={id}/>                  
                    : <Map latitude={37.58622450673971} longitude={126.99709024757782} places={filteredPlace}/>                  
                } */}
                { selectedPlace &&
                    <Map latitude={selectedPlace.ycoordinate} longitude={selectedPlace.xcoordinate} places={filteredPlace} selectedId={id}/>  
                }
    
                    {/* 카드 전체화면 채울 시, 헤더영역 */}
                <Slide direction="up" in={open.bool} timeout={1} >
                <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                        <Card elevation={0}
                        style={{
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '80px',
                            zIndex: '4',
                            // borderTop: '1.5px solid rgba(234, 234, 234, 1)',
                            borderRadius:'0px',
                            visibility: open.visibility,
                            
                        }}>
                            <Grid container style={{padding:'30px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Grid style={{padding: '0px 10px 0px 0px', marginTop:'6px'}}>
                                    <Image src={back} width={12} height={22} name='back' onClick={handleOnclick} placeholder="blur" layout='fixed' />
                                </Grid>

                                <Grid>
                                    { selectedPlace &&
                                        <Grid key={selectedPlace.id} style={{flexDirection: 'row'}}>
                                            <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '28px', pr: '4px'}} color="#000000"  component="span">
                                                {selectedPlace.name}
                                            </Typography>
                                            <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="span" >
                                                {selectedPlace.detail_category}
                                            </Typography>
                                        </Grid>
                                    }
                                </Grid>
                            
                                <Grid onClick={()=> handleFavClick(place_id)}>
                                    <Image width={20} height={21.85}  src={isFavorite(place_id)? bookmarkOn : bookmarkAdd} layout='fixed' />
                                </Grid> 
                            </Grid>
                        </Card>
                    </Container>
                </Slide>
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
                    ref={cardRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}

                    >
                    <div>

                    {!open.bool && (
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" style={{ visibility:cardStyle.iconVisibility}}>
                        <Box gridColumn="span 4"></Box>
                        <Box style={{textAlign: 'center', verticalAlign: 'top', padding: '8px'}}gridColumn="span 4">
                            <Image width={70} height={4} src={line} placeholder="blur" layout='fixed' /> 
                        </Box>
                        <Box style={{textAlign: 'right', padding: '15px 15px 0'}} gridColumn="span 4" onClick={()=> handleFavClick(place_id)}>
                            <Image width={20} height={21.85}  src={isFavorite(place_id)? bookmarkOn : bookmarkAdd} placeholder="blur" layout='fixed' />
                        </Box> 
                    </Box>
                    )}
                    { selectedPlace && 
                    <Container component="main" maxWidth="xs" style={{listStyleType: "none"}}>
                            <li key={selectedPlace.id} ref={listRef}>
                                <>
                                <Grid container style={{padding: '0px 15px'}}>
                                        <Grid style={{width: '100%'}}>
                                            <CardContent>
                                                {!open.bool && (
                                                    <Grid container sx={{mt: 0, pt: 0, justifyContent: 'center'}}>
                                                        <Grid>
                                                        <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000">
                                                                {selectedPlace.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid>
                                                            <Typography sx={{fontSize: '15px', fontWeight: '500', lineHeight: '129%', paddingLeft: '4px'}} color="#a1a1a1" component="div" >
                                                                {selectedPlace.detail_category}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                )}
                                                <Grid sx={{width: '100%'}}>
                                                <Grid container style={{paddingTop: '0px', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400', marginTop:'2px'}}  color="#505050" component="div">
                                                        스꾸친 평점 :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid sx={{height: '100%', margin:'5px 4px 0px'}}>
                                                        <Image width={20} height={19} src={star} placeholder="blur" layout='fixed' />
                                                    </Grid>
                                                    <Grid >
                                                        <Typography sx={{fontSize: '15px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
                                                        {selectedPlace.rate}
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
                                                        {selectedPlace.review_count}개
                                                        </Typography>
                                                    </Grid>
                                                    
                                                </Grid>
                                                <Grid container sx={{justifyContent: 'center'}}>
                                                    {/* 태그 받아오기 */}
                                                    {selectedPlace && selectedPlace.tags && selectedPlace.tags.map((tag, index) => (
                                                    <Grid sx={{padding: "5px 5px 10px 0px"}} key={index}>
                                                        {displayBigReviewTag(tag)}
                                                    </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{width: '100%', paddingTop: '14px', justifyContent: 'center', padding: '22px 2% 0'}}>
                                                <Grid container>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        위치 : {selectedPlace.gate}   
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#BABABA" component="div">
                                                        ({selectedPlace.address})
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '7.5px'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        학생 할인 : {(selectedPlace.discount_content != null) ? 'O' : 'X'}   
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{fontSize: '15px', fontWeight:'400'}} color="#BABABA" component="div">
                                                        {(selectedPlace.discount_content != null) ? '('+selectedPlace.discount_content+')' : ''}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{marginTop: '7.5px', flexDirection: 'column'}}>
                                                    <Grid style={{margin:'0px 3px 0px 0px', flexDirection: 'row'}}>
                                                        <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        영업시간  <Image src={expand} width={10} height={6.5}  placeholder="blur" layout='fixed' />                                          
                                                        </Typography>          
                                                    </Grid>
                                                    <Grid>
                                                        <Typography  sx={{marginTop: '7.5px', fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        매일 : {selectedPlace.service_time}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid >
                                                        <Typography  sx={{margin: '7.5px 0px 11.5px', fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                        브레이크 타임 : {selectedPlace.break_time}
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
                                                    <Grid container key={index} style={{borderBottom: '0.5px solid rgba(151, 151, 151, 0.75)'}}>
                                                        <Grid style={{margin:'0', padding: '20px 0px 14px'}}>
                                                            <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#000000" component="div">
                                                            {menu.name}  ({addComma(menu.price)}원)
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                // )) : null }
                                                )) : <h5>적합한 결과가 없습니다.</h5>}
                                            </CardContent>
                                        </Grid>

                                    </Grid>
                                </>
                            </li> 
                        </Container>
                        }
                        { selectedPlace && 
                            <li key={selectedPlace.id} style={{listStyleType:"none", height:'100%'}} onClick={handleReviewClick} >
                                <Link href={{ pathname: '/enrollReview', query: { id: selectedPlace.id, rating: rating } }}>
                                    <div>
                                    <ReviewStar rating={rating} handleTouch={handleTouch}/>
                                    </div>
                                </Link>
                            </li>
                        }
                        </div>
                        {/* 이미지 */}
                        <Grid container style={{margin:'-85px 0px 0px 0',  justifyContent: 'center', paddingBottom:'5px'}}>
                        {allImages && allImages.length > 5 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignContent:'center', textAlign:'center', borderBottom: '4px solid rgba(217, 217, 217, 0.54)' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignContent:'center', textAlign:'center'}}>
                                {allImages.slice(0, 6).map((image, index) => (
                                <div key={index} style={{ width: 'calc(100% / 3 - 10px)', margin: '0px', position: 'relative',alignContent:'center', textAlign:'center'}}>
                                    <Image
                                    width={115}
                                    height={115}
                                    src={image}
                                    alt={`image-${index}`}
                                    blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                    layout='fixed'
                                    objectFit='cover'
                                    style={{borderRadius:'5px', margin:'0 auto'}}
                                    />
                                    {index === 5 && (
                                    <div 
                                    onClick={()=> router.push({
                                        pathname: '/morePhotos',
                                        query: { id: place_id }
                                    })}
                                    style={{
                                        width:'115px',
                                        height:'115px',
                                        position:'relative',
                                        top: -121,
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius:'5px',
                                        textAlign:'center',
                                        margin:'0 auto -110px auto',
                                    }}>
                                        <Image src={morePic} width={23} height={23}></Image>
                                        <Typography sx={{color: '#FFCE00', fontSize: '9px', fontWeight: '500'}}>사진 더보기</Typography>
                                    </div>
                                    )}
                                </div>
                                ))}
                            </div>
                            </div>
                        ) : null}
                        </Grid>

                        {/* Content */}
                        { selectedPlace && selectedPlace.review_count > 0 && 
                        <Container component="main" style={{listStyleType: "none", mt: '0', pt: '0'}}>
                            <Grid container sx={{pt: '18px'}} style={{justifyContent:'center'}} >
                                <Grid style={{width:'100%'}}>
                                    <CardContent>
                                        <>
                                        <Grid container style={{margin:'-10px auto 10px', justifyContent:'space-between'}}>
                                            <Grid item style={{display:'flex'}}>
                                                <Typography xs={3} sx={{fontSize: '17px', fontWeight:'700', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                                    스꾸리뷰
                                                </Typography>
                                                <Typography sx={{fontSize: '17px', fontWeight:'700', lineHeight: '97%', verticalAlign: 'top', paddingLeft:'10px'}} color="#FFCE00" align="left">
                                                    {selectedPlace && selectedPlace.review_count}
                                                </Typography>
                                            </Grid>
                                            <Grid item style={{marginTop:'-3px'}}> 
                                                <Select
                                                    xs={2}
                                                    sx={{ fontSize: '14px', lineHeight: '150%', width: 'wrapContent', border: 'none', padding:'0',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                    }, height: '30px', marginTop: '-10px', marginRight: '-15px',border: 'none', textAlign: 'right', color: '#A1A1A1'}}
                                                    value={filter}
                                                    onChange={handleFilterChange}
                                                    style={{top:-2}}
                                                >
                                                    <MenuItem value='Latest' style={{fontSize:'14px'}}>최신순</MenuItem>
                                                    <MenuItem value='Oldest' style={{fontSize:'14px'}}>오래된순</MenuItem>
                                                    <MenuItem value='Rating' style={{fontSize:'14px'}}>평점높은순</MenuItem>
                                                    <MenuItem value='Lowest' style={{fontSize:'14px'}}>평점낮은순</MenuItem>
                                                </Select>                        
                                            </Grid>
                                        </Grid>
                                        </>
                                        <Grid container style={{margin:'-10px auto 0px', justifyContent:'left', verticalAlign: 'center'}}>
                                            <Grid>
                                                <Typography sx={{fontSize: '19px', fontWeight: '700', color: '#FFCE00', marginTop:'8px', paddingRight:'0px'}} component="div">
                                                    {selectedPlace && selectedPlace.rate}점
                                                </Typography>
                                            </Grid>
                                            <Grid>
                                            <Box component="fieldset" borderColor="transparent">
                                                <Rating name="read-only" size="medium" sx={{p: '0'}} value={selectedPlace && selectedPlace.rate} readOnly precision={0.1} />
                                            </Box>

                                            </Grid>
                                        </Grid>
                                        <ul style={{listStyle:"none",paddingLeft:"0px", marginTop:'0px'}}>
                                            <>
                                                {reviews && sortedReviews.slice(0, 4).map((review, index)=>(
                                                    <PlaceReview key={index} review={review} user={user} />
                                                ))}
                                            </>
                                        </ul>
                                    </CardContent>
                                </Grid>
                            </Grid>
                            { selectedPlace && 
                                <li key={selectedPlace.id} style={{listStyleType:"none", marginBottom:'100px'}} onClick={handleReviewClick} >
                                        <Link href={`reviews?id=${selectedPlace.id}`} key={selectedPlace.id}>
                                            <Typography sx={{fontWeight:'400',marginTop:'0px',textAlign:'right', p: '0 20px 40px', color: '#505050', fontSize: '16px'}}>
                                                후기 더보기 &gt;
                                            </Typography>
                                        </Link>
                                </li>
                                }
                        </Container>
                        
                        }

                    </Card>
                </Container>
                </div>
                
        </ThemeProvider>
    );
};
export default PlacePage;