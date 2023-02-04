import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { load_places } from "../actions/place/place";
import { load_favorite } from "../actions/favorite/favorite";
import { search_places } from "../actions/place/place";
import Layout from "../hocs/Layout";
import Map from "../components/Map";
import Image from 'next/image';
import Link from 'next/link';
import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger } from '@mui/material';
import theme from '../theme/theme';
import line from '../image/Line1.png';
import food from '../image/food.png';
import star from '../image/Star-1.png';
import mapIcon from '../image/map-1.png';
import closeIcon from '../image/close.png';
import bookmarkOn from '../image/bookmark-1.png';
import SearchBox from "../components/SearchBox";
import TagList from "../components/TagList";
import { displayTagImage } from "../components/TagList";

import mapTagOn8 from '../image/태그/지도_on/tag_간단.png';
import mapTagOn9 from '../image/태그/지도_on/tag_분위기.png';

export default function list(){

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const router = useRouter();
    // 장소 정보 불러오기
    const place = useSelector(state => state.place.place);
    const favorites = useSelector(state => state.favorite.favorite);
    const user = useSelector(state => state.auth.user);

    //캠퍼스 필터링
    let filteredPlace = [];
    if(place && user){
        filteredPlace = place.filter((item) => item.campus === user.campus);
    }

    //상태
    const [height, setHeight] = useState('0');
    const [cardStyle, setCardStyle] = useState({
        radius: '30px 30px 0px 0px',
        cardVisibility: 'visible',
        iconVisibility: 'visible',
        bool: 'false',
    }) ;
    const [numOfLi, setNumOfLi] = useState(0);
    const [open, setOpen] = useState({
        bool:false,
        visibility: 'hidden',
    });
    const [preventScroll, setPreventScroll] = useState(''); //스크롤 방지
    const [keyword, setKeyword] = useState(''); //태그검색

    const cardRef = useRef(null);
    const animationDuration = '0.3s';
    const animationTimingFunction = 'ease-out';
    const mouseClicked = false;
    const tagClicked = false;

    if(typeof window !== 'undefined' && !isAuthenticated){
        router.push('/login');
    }

    //뒤로가기에서 drawer 열어두기 위하여
    const {openID} = router.query;

    useEffect(() => {
        // 0-2 검색 결과 목록 -> 1 목록보기
        if(router.query.keyword != undefined && router.query.keyword != '') {
            setKeyword(router.query.keyword);
            router.query.keyword = '';
        }
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            if(keyword == '')
                filteredPlace == null;
            else if(keyword != '') {
                dispatch(search_places(keyword));
                setHeight('32%');
                setCardStyle({
                    radius: '30px 30px 0px 0px',
                    cardVisibility: 'visible',
                    iconVisibility: 'visible'
                });
            }
        }
    }, [keyword, router.query.keyword]);
    
    
    // 사용자 터치에 따라 카드 사이즈 변화
    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.addEventListener("touchmove", handleTouchMove);
            setHeight(cardRef.current.getBoundingClientRect().height);
        }
        return () => {
            if (cardRef.current) {
                cardRef.current.removeEventListener("touchmove", handleTouchMove);
            }
        };
      }, [cardRef]);
    

    //li 개수를 반환: (li 개수 * 높이)를 계산하여, 리스트 개수가 적을 경우 계속 스크롤 하여 여백이 생기지 않도록 설정하기 위함
    useEffect(() => {
        if(filteredPlace) {
            setNumOfLi(filteredPlace.length);
        }
    }, [filteredPlace]);

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
                visibility: 'visible',
            });
            setCardStyle({
                radius:'0px',
                iconVisibility:'hidden'
            });
            setPreventScroll('scroll');
          } else {
            setOpen({
                bool: false,
                visibility: 'hidden',
            });
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility:'visible'
            });
            setPreventScroll('');
        }
    };

    // 아이콘 클릭했을 때 이벤트
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'map' ){
            setOpen({ bool:false,
                Visibility:'hidden'});
            setHeight('32%');
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility: 'visible'
            });
            setPreventScroll('');
            cardRef.current.scrollTo({top:0, behavior:'smooth'});
        } else{
            setCardStyle({cardVisibility:'hidden'});
            setOpen({ bool:false,
                visibility:'hidden'});
            // setHeight('0');
            setKeyword('');
            setPreventScroll('');
        }
    };

    //북마크 기능
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

    //태그 클릭했을 때 사라지도록
    const handleTagClick = (e) => {
        e.preventDefault();
        e.currentTarget.style.display = 'none';
        // 태그가 2개인 경우 수정해야함
        setOpen({ bool:false,
            visibility:'hidden'});
        setCardStyle({cardVisibility:'hidden'});
        setKeyword('');
        setPreventScroll('');
    }

    const onTagClick = (id) => {
        setKeyword(id);
    }

    return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <Layout>
            <div style={{ position: 'relative', height:'100%'}}>  
            <Container style={{position:'absolute', zIndex:'2'}}>
                <SearchBox openID={openID}/>   
            </Container> 
             {/* 태그 목록 */}
            <TagList keyword={keyword} onTagClick={onTagClick} />
             
            <Map latitude={37.58622450673971} longitude={126.99709024757782} places={filteredPlace} />

            <Slide direction="up" in={open.bool} timeout={1} >
                <Container fixed style={{padding: '0px 16px 0px 0px',}}>
                    <Card style={{
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                    height: '98px',
                    zIndex: '4',
                    boxShadow: '0px 10px 20px -10px rgb(0,0,0, 0.16)',
                    visibility: open.visibility,
                    }} >
                        <Grid container style={{padding:'50px 15px 0px 15px'}}>
                            <Grid item style={{padding: '0px 10px 0px 0px'}}>
                            <Image src={mapIcon} width={37} height={36} onClick={handleIconOnclick} name='map' />
                            </Grid>
                            <Grid item xs>
                                <Grid container>
                                    {
                                        keyword != '' ?
                                        <Grid item onClick={handleTagClick}>
                                            {displayTagImage(keyword)}
                                        </Grid>
                                        : null
                                    }
                                </Grid>
                            </Grid>
                            <Grid item >
                            <Image src={closeIcon} width={36} height={36} onClick={handleIconOnclick} name='close'/>
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
            </Slide>
            <Container style={{padding: '0px 16px 0px 0px', }} >
                <Card style={{
                borderRadius: cardStyle.radius,
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                height: height,
                overflowY: preventScroll,
                zIndex: '3',
                boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
                visibility: cardStyle.cardVisibility,
                transition: `height ${animationDuration} ${animationTimingFunction}`,
                }} 
                ref = {cardRef}
                 >
                <div>
                <div style={{textAlign:'center', paddingTop:'8px', visibility:cardStyle.iconVisibility}}>
                    <Image width={70} height={4} src={line} /> 
                </div>
                
               
                <ul style={{listStyleType: "none", padding: '0px 18px 0px 18px', margin: '0px'}} >
                    {filteredPlace? filteredPlace.map((item) => (
                            <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}} onClick={handleLiClick}>
                                <Link href={`/place?id=${item.id}`} key={item.id}>
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
                                                    <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop: '22px'}} color="#a1a1a1" component="div" >
                                                        {item.detail_category}
                                                    </Typography>
                                                </Grid>
                                                <Grid item style={{padding:'0px 0px 0px 8px', marginTop:'19px'}}>
                                                    {isFavorite(item.id)}
                                                </Grid>
                                            </Grid>
                                            <Grid item container style={{marginTop: '10px'}}>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'2px'}}  color="#505050" component="div">
                                                    스꾸친 평점 :
                                                    </Typography>
                                                </Grid>
                                                <Grid style={{margin:'0px 7px 0px 7px'}}>
                                                    <Image width={15} height={14} src={star}/>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
                                                    {item.rate}
                                                    </Typography>
                                                </Grid >
                                                <Grid style={{margin:'0px 7px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color="#A1A1A1" component="div">
                                                    /5
                                                    </Typography>
                                                </Grid>
                                                <Grid style={{margin:'0px 7px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color="#505050" component="div">
                                                    |
                                                    </Typography>
                                                </Grid>
                                                <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color="#505050" component="div">
                                                    스꾸리뷰
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
                                                    {item.review_count}
                                                    </Typography>
                                                </Grid>
                                                
                                            </Grid>
                                            <Grid container style={{marginTop: '6px'}}>
                                                <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    위치 : {item.gate}   
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#a1a1a1" component="div">
                                                    ({item.address})
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{margin: '4px 0px 11px 0px'}}>
                                                <Stack direction="row" spacing={2}>
                                                <Image
                                                    width= {72}
                                                    height= {27}
                                                    alt="tag"
                                                    src={mapTagOn8}
                                                />
                                                <Image
                                                    width= {72}
                                                    height= {27}
                                                    alt="tag"
                                                    src={mapTagOn9}
                                                />
                                                <Image
                                                    width= {72}
                                                    height= {27}
                                                    alt="tag"
                                                    src={mapTagOn9}
                                                />
                                                </Stack>
                                            </Grid>
                                        </CardContent>
                                    </Grid>
                                    <Grid style={{marginTop:'15px'}}>
                                        <Image
                                        width= {98} height= {98}
                                        alt={item.name} 
                                        src={food}/>
                                    </Grid>
                                </Grid>
                                </Link>
                            </li>
                    )): null}
                    </ul>
                    </div>
                </Card>
            </Container> 
            </div>
        </Layout>
    </ThemeProvider>
    )
}