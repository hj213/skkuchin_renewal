import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { load_places } from "../actions/place/place";
import Layout from "../hocs/Layout";
import Map from "../components/Map";
import Image from 'next/image';
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
        visibility: 'hidden'
    });
    const cardRef = useRef(null);

    // api에서 데이터 불러오기
    useEffect(()=>{
        dispatch(load_places());
    }, [dispatch]);

    // 사용자 터치에 따라 카드 사이즈 변화
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

    // 장소 정보 불러오기
    const place = useSelector(state => state.place.place);

    // *수정해야할 부분* li 개수를 반환: (li 개수 * 높이)를 계산하여, 리스트 개수가 적을 경우 계속 스크롤 하여 여백이 생기지 않도록 설정하기 위함
    useEffect(() => {
        setNumOfLi(place.length);
    }, [place]);

    // 카드 터치 했을 때 변화
    const handleTouchMove = (event) => {
        const MinHeight = window.innerHeight * 0.32;
        const cardHeight = 140 * numOfLi;
        const newHeight = window.innerHeight - event.touches[0].clientY;
        const TARGET_HEIGHT = window.innerHeight * 0.9;
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

    return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <Layout>
            <Map style={{ position: 'relative'}} latitude={37.58622450673971} longitude={126.99709024757782} />
            <Slide direction="up" in={open.bool} timeout={1}>
                <Container fixed style={{padding: '0px 16px 0px 0px', }}>
                    <Card style={{
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                    height: '98px',
                    overflowX: 'x',
                    zIndex: '2',
                    boxShadow: '0px 10px 20px -10px rgb(0,0,0, 0.16)',
                    visibility: setOpen.visibility,
                    }}>
                        <Grid container style={{padding:'50px 15px 0px 15px'}}>
                            <Grid style={{padding: '0px 10px 0px 0px'}}>
                            <Image src={mapIcon} width={37} height={36} onClick={handleOnclick} name='map' />
                            </Grid>
                            <Grid>
                            <Image src={tag14} width={64} height={40} />
                            </Grid>
                            <Grid xs>
                            <Image src={tag14} width={64} height={40} />
                            </Grid>
                            <Grid>
                            <Image src={closeIcon} width={36} height={36} onClick={handleOnclick} name='close'/>
                            </Grid>
                        </Grid>
                    </Card>
                </Container>
            </Slide>
            <Container fixed style={{padding: '0px 16px 0px 0px'}}>
                <Card style={{
                borderRadius: cardStyle.radius,
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                height: height,
                overflowX: 'x',
                zIndex: '1',
                boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
                visibility: cardStyle.cardVisibility,
                }} 
                ref = {cardRef}
                >
                <div>
                <div style={{textAlign:'center', visibility:cardStyle.iconVisibility}}>
                    <Image width={60} height={4} src={line} /> 
                </div>
                
               
                <ul style={{listStyleType: "none", padding: '0px 18px 0px 18px', margin: '0px'}} >
                    {place.map((item) => (
                        <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}}>
                            <>
                                <Grid container style={{margin: '10px 0px 0px 0px'}}>
                                    <Grid xs >
                                        <CardContent style={{padding:'0px'}}>
                                            <Grid container spacing={2} style={{margin:'0px'}}>
                                                <Grid xm style={{marginTop:'15px'}}>
                                                    <Typography sx={{fontSize: '18px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
                                                        {item.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs style={{padding:'0px 0px 0px 8px'}}>
                                                    <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop: '22px'}} color="#a1a1a1" component="div" >
                                                        {item.detail_category}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginTop: '10px'}}>
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
                                                    4.5
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
                                                <Grid xs>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
                                                    33개
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
                            </>
                        </li>
                    ))}
                    </ul>
                    </div>
                </Card>
                
            </Container>

        </Layout>
    </ThemeProvider>
    )
}