import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { load_places } from "../actions/place/place";
import { load_favorite } from "../actions/favorite/favorite";
import Layout from "../hocs/Layout";
import Map from "../components/Map";
import Image from 'next/image';
import Link from 'next/link';
import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack } from '@mui/material';
import theme from '../theme/theme';
import line from '../image/Line1.png';
import food from '../image/food.png';
import tag16 from '../image/tag16.png';
import tag17 from '../image/tag17.png';
import tag14 from '../image/tag14.png';
import star from '../image/Star-1.png';
import mapIcon from '../image/map-1.png'
import closeIcon from '../image/close.png'
import bookmarkOn from '../image/bookmark-1.png'

export default function list(){

    const dispatch = useDispatch();
    const [height, setHeight] = useState('32%');
    const [cardStyle, setCardStyle] = useState({
        radius: '30px 30px 0px 0px',
        cardVisibility: 'visible',
        iconVisibility: 'visible',
    });
    const [numOfLi, setNumOfLi] = useState(0);
    const [open, setOpen] = useState({
        bool:false,
        visibility: 'hidden',
    });
    const cardRef = useRef(null);
    const animationDuration = '0.3s';
    const animationTimingFunction = 'ease-out';
    const mouseClicked = false;

    // api에서 데이터 불러오기
    useEffect(()=>{
        dispatch(load_places());
        dispatch(load_favorite());
    }, [dispatch]);

    // 사용자 터치에 따라 카드 사이즈 변화
    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.addEventListener("touchmove", handleTouchMove);
            // cardRef.current.addEventListener("click", handleClickMove);
            setHeight(cardRef.current.getBoundingClientRect().height);
        }
        return () => {
            if (cardRef.current) {
                cardRef.current.removeEventListener("touchmove", handleTouchMove);
                // cardRef.current.removeEventListener("click", handleClickMove);

            }
        };
      }, [cardRef]);
    // 장소 정보 불러오기
    const place = useSelector(state => state.place.place);
    const favorites = useSelector(state => state.favorite.favorite);

    //li 개수를 반환: (li 개수 * 높이)를 계산하여, 리스트 개수가 적을 경우 계속 스크롤 하여 여백이 생기지 않도록 설정하기 위함
    useEffect(() => {
        setNumOfLi(place.length);
    }, [place]);

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
          } else {
            setOpen({
                bool: false,
                visibility: 'hidden',
            });
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility:'visible'
            });
        }
    };

    // 웹 페이지에서 카드를 마우스로 클릭했을 때+스크롤
    // const handleClickMove = (event) => {
    //     event.preventDefault();

    //     const WINDOW_HEIGHT = window.innerHeight;
    //     const TARGET_HEIGHT = WINDOW_HEIGHT * 0.55;
    //     if(WINDOW_HEIGHT > 1000){
    //         TARGET_HEIGHT = WINDOW_HEIGHT*0.58;
    //     }

    //     mouseClicked = !mouseClicked;
    //     if(mouseClicked == false){
    //         setHeight('32%');
            
    //         setOpen({
    //             bool: false,
    //             visibility: 'hidden'
    //         });
    //         setCardStyle({
    //             radius:'30px 30px 0px 0px',
    //             iconVisibility:'visible'
    //         });
            
    //     } else if(mouseClicked == true){
    //         setHeight(`${TARGET_HEIGHT}px`);
    //         setOpen({
    //             bool: true,
    //             visibility: 'visible'
    //         });
    //         setCardStyle({
    //             radius:'0px',
    //             iconVisibility:'hidden'
    //         });
            
    //     }
    // }

    // 아이콘 클릭했을 때 이벤트
    const handleOnclick = (event) =>{
        if(event.target.name == 'map' ){
            setOpen({ bool:false,
                Visibility:'hidden'});
            setHeight('32%');
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility: 'visible'
            })
        } else{
            setCardStyle({cardVisibility:'hidden'});
            setOpen({ bool:false,
                Visibility:'hidden'});
            setHeight('32%');
        }
    };

    //북마크 기능
    const isFavorite = (placeId) => {
        if(favorites.some(favorite => favorite.place_id === placeId)){
            return <Image width={15} height={15} src={bookmarkOn}/>
        }
        return null;
    };

    //place 페이지로 넘어가는
    const handleLiClick = (e) => {
        e.preventDefault();
        console.log("clicked");
      }

    return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <Layout>
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  
            <Map latitude={37.58622450673971} longitude={126.99709024757782} />
            
            <Slide direction="up" in={open.bool} timeout={1} >
                <Container fixed style={{padding: '0px 16px 0px 0px',}}>
                    <Card style={{
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                    height: '98px',
                    zIndex: '2',
                    boxShadow: '0px 10px 20px -10px rgb(0,0,0, 0.16)',
                    visibility: open.visibility,
                    }}>
                        <Grid container style={{padding:'50px 15px 0px 15px'}}>
                            <Grid item style={{padding: '0px 10px 0px 0px'}}>
                            <Image src={mapIcon} width={37} height={36} onClick={handleOnclick} name='map' />
                            </Grid>
                            <Grid item >
                            <Image src={tag14} width={64} height={40} />
                            </Grid>
                            <Grid item xs>
                            <Image src={tag14} width={64} height={40} />
                            </Grid>
                            <Grid item >
                            <Image src={closeIcon} width={36} height={36} onClick={handleOnclick} name='close'/>
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
                overflowY:'scroll',
                zIndex: '1',
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
                    {place.map((item) => (
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
                                        </CardContent>
                                    </Grid>
                                    <Grid style={{marginTop:'15px'}}>
                                        <Image
                                        width= {98} height= {98}
                                        alt="img" 
                                        src={food}/>
                                    </Grid>
                                </Grid>
                                </Link>
                            </li>
                    ))}
                    </ul>
                    </div>
                </Card>
            </Container>
            </div>
        </Layout>
    </ThemeProvider>
    )
}