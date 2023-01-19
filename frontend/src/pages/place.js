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

const PlacePage = () => {

  // 1) place , 가게 정보 (place API)
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

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [place_id, setPlaceId] = useState('');


  useEffect(() => {
      dispatch(load_places());
  }, [dispatch]);


  const handleOpen = (id) => {
    setPlaceId(id);
    setIsCardVisible(true);
    if (cardRef.current) {
      cardRef.current.addEventListener("touchmove", handleTouchMove);
  }
  }
  

  const handleClose = () => {
    setIsCardVisible(false);
    if (cardRef.current) {
      cardRef.current.removeEventListener("touchmove", handleTouchMove);
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

  const places = useSelector(state => state.place.place);
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        title='스꾸친 | Place'
        content='Place page'
      >
        { places.map((place, index) => (
          <div className='p-3' key={index} onClick={() => handleOpen(place.id)}>
            <h4>{place.name}</h4>
          </div>
        ))}
        <Map style={{ position: 'relative'}} latitude={37.58622450673971} longitude={126.99709024757782} />
{/*         
        <Container fixed style={{ padding: '0'}}>
          {isCardVisible && (
            <Card
              style={{
                borderRadius: '30px 30px 0 0',
                position: 'fixed',
                bottom: '0px',
                width: '100%',
                height: height,
                overflowX: 'x',
                zIndex: '1',
                boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
              }}
              ref={cardRef}
            >
            <div 이 영역을 스크롤 하면 사이즈를 확장시켜>

              <div style={{ textAlign: 'center' }}>
                <Image width={60} height={4} src={line} /> 
              </div>

              <ul style={{listStyleType: "none", padding: '0px 15px', margin: '0px'}} >
                      {places.filter(item => item.id === place_id).map(item => (
                        <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}}>
                            <>
                                <Grid container>
                                    <Grid>
                                        <CardContent style={{padding:'15px'}}>
                                            <Grid container >
                                                <Grid xm >
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
                                                    스꾸 리뷰
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
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
                                            <Grid container style={{marginTop: '6px'}}>
                                                <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    학생 할인 : {(item.discount_content != null) ? 'O' : 'X'}   
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#a1a1a1" component="div">
                                                    {(item.discount_content != null) ? '('+item.discount_content+')' : ''}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginTop: '6px', flexDirection: 'column'}}>
                                                <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    영업시간 
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    매일 : {item.service_time}
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    브레이크 타임 : {item.break_time}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardContent>
                                          메뉴
                                        </CardContent>
                                    </Grid>

                                </Grid>
                            </>
                        </li> 
                      ))}
                      
                    </ul>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <button onClick={handleClose}>닫기</button>
                    </div>
            </Card>

            )}
        </Container> */}
                <Slide direction="up" in={open.bool} >
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
                                <Image src={mapIcon} width={37} height={36} name='map' />
                            </Grid>
                            <Grid>
                            {places.filter(item => item.id === place_id).map(item => (
                          
                                <Grid xm >
                                    <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="div" >
                                        {item.detail_category}
                                    </Typography>
                                </Grid>
                         
                            ))}
                            </Grid>
                            <Grid>
                            <Image src={closeIcon} width={36} height={36} name='close'/>
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
                {places.filter(item => item.id === place_id).map(item => (
                        <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}}>
                            <>
                                <Grid container>
                                    <Grid>
                                        <CardContent style={{padding:'15px'}}>
                                            <Grid container >
                                                <Grid xm >
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
                                                    스꾸 리뷰
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
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
                                            <Grid container style={{marginTop: '6px'}}>
                                                <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    학생 할인 : {(item.discount_content != null) ? 'O' : 'X'}   
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#a1a1a1" component="div">
                                                    {(item.discount_content != null) ? '('+item.discount_content+')' : ''}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container style={{marginTop: '6px', flexDirection: 'column'}}>
                                                <Grid style={{margin:'0px 3px 0px 0px'}}>
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    영업시간 
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    매일 : {item.service_time}
                                                    </Typography>
                                                </Grid>
                                                <Grid >
                                                    <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
                                                    브레이크 타임 : {item.break_time}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardContent>
                                          메뉴
                                        </CardContent>
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
);
};
export default PlacePage;


// // // ver1
// import { CssBaseline, Box, ThemeProvider,Slider, Card, CardContent, Typography, Grid, Container, Stack } from '@mui/material';
// import Map from '../components/Map';
// import Layout from "../hocs/Layout";
// import theme from '../theme/theme';

// import { useDispatch, useSelector } from "react-redux"
// import { useEffect, useState, useRef } from "react";
// import { load_places, load_place } from "../actions/place/place";
// import Image from 'next/image'
// import line from '../image/Line1.png';
// import food from '../image/food.png';
// import tag16 from '../image/tag16.png';
// import tag17 from '../image/tag17.png';
// import star from '../image/Star-1.png';

// const PlacePage = () => {

//   // 1) place , 가게 정보 (place API)
//   const dispatch = useDispatch();
//   const [isCardVisible, setIsCardVisible] = useState(false);
//   const [place_id, setPlaceId] = useState('');
//   const [height, setHeight] = useState('286px');
//   const cardRef = useRef(null);

//   useEffect(() => {
//       dispatch(load_places());
//   }, [dispatch]);


//   const handleOpen = (id) => {
//     setPlaceId(id);
//     setIsCardVisible(true);
//     if (cardRef.current) {
//       cardRef.current.addEventListener("touchmove", handleTouchMove);
//   }
//   }
  

//   const handleClose = () => {
//     setIsCardVisible(false);
//     if (cardRef.current) {
//       cardRef.current.removeEventListener("touchmove", handleTouchMove);
//   }
//   }

//   useEffect(() => {
//     if (cardRef.current) {
//         cardRef.current.addEventListener("touchmove", handleTouchMove);
//     }
//     return () => {
//         if (cardRef.current) {
//             cardRef.current.removeEventListener("touchmove", handleTouchMove);
//         }
//     };
//   }, [cardRef]);

//   const places = useSelector(state => state.place.place);

//   const MinHeight = '286px';

//   const handleTouchMove = (event) => {
//     if (cardRef.current) {
//         const newHeight = window.innerHeight - event.touches[0].clientY;
//         if (newHeight > MinHeight && event.touches[0].clientY > 0) {
//             cardRef.current.style.height = newHeight + "px";
//           }
//     }
//   }


//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Layout
//         title='스꾸친 | Place'
//         content='Place page'
//       >
//         { places.map((place, index) => (
//           <div className='p-3' key={index} onClick={() => handleOpen(place.id)}>
//             <h4>{place.name}</h4>
//           </div>
//         ))}
//         <Map style={{ position: 'relative'}} latitude={37.58622450673971} longitude={126.99709024757782} />
        
//         <Container fixed style={{ padding: '0'}}>
//           {isCardVisible && (
//             <Card
//               style={{
//                 borderRadius: '30px 30px 0 0',
//                 position: 'fixed',
//                 bottom: '0px',
//                 width: '100%',
//                 height: height,
//                 overflowX: 'x',
//                 zIndex: '1',
//                 boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
//               }}
//               ref={cardRef}
//             >
//             <div 이 영역을 스크롤 하면 사이즈를 확장시켜>

//               <div style={{ textAlign: 'center' }}>
//                 <Image width={60} height={4} src={line} /> 
//               </div>

//               <ul style={{listStyleType: "none", padding: '0px 15px', margin: '0px'}} >
//                       {places.filter(item => item.id === place_id).map(item => (
//                         <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}}>
//                             <>
//                                 <Grid container>
//                                     <Grid>
//                                         <CardContent style={{padding:'15px'}}>
//                                             <Grid container >
//                                                 <Grid xm >
//                                                     <Typography sx={{fontSize: '20px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
//                                                         {item.name}
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid style={{padding:'2px 4px'}}>
//                                                     <Typography sx={{fontSize: '15px', fontWeight: '500'}} color="#a1a1a1" component="div" >
//                                                         {item.detail_category}
//                                                     </Typography>
//                                                 </Grid>
//                                             </Grid>
//                                             <Grid container style={{marginTop: '10px'}}>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'2px'}}  color="#505050" component="div">
//                                                     스꾸친 평점 :
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid style={{margin:'0px 7px 0px 7px'}}>
//                                                     <Image width={15} height={14} src={star}/>
//                                                 </Grid>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
//                                                     {item.rate}
//                                                     </Typography>
//                                                 </Grid >
//                                                 <Grid style={{margin:'0px 7px 0px 0px'}}>
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color="#A1A1A1" component="div">
//                                                     /5
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid style={{margin:'0px 7px 0px 0px'}}>
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color="#505050" component="div">
//                                                     |
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid style={{margin:'0px 3px 0px 0px'}}>
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'3px'}} color="#505050" component="div">
//                                                     스꾸 리뷰
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'700', marginTop:'3px'}} color="#505050" component="div">
//                                                     {item.review_count}
//                                                     </Typography>
//                                                 </Grid>
                                                
//                                             </Grid>

//                                             <Grid container style={{margin: '4px 0px 11px 0px'}}>
//                                                 <Stack direction="row" spacing={2}>
//                                                 <Image
//                                                     width= {72}
//                                                     height= {27}
//                                                     alt="tag"
//                                                     src={tag16}
//                                                 />
//                                                 <Image
//                                                     width= {72}
//                                                     height= {27}
//                                                     alt="tag"
//                                                     src={tag17}
//                                                 />
//                                                 <Image
//                                                     width= {72}
//                                                     height= {27}
//                                                     alt="tag"
//                                                     src={tag17}
//                                                 />
//                                                 </Stack>
//                                             </Grid>
//                                             <Grid container style={{marginTop: '6px'}}>
//                                                 <Grid style={{margin:'0px 3px 0px 0px'}}>
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
//                                                     위치 : {item.gate}   
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#a1a1a1" component="div">
//                                                     ({item.address})
//                                                     </Typography>
//                                                 </Grid>
//                                             </Grid>
//                                             <Grid container style={{marginTop: '6px'}}>
//                                                 <Grid style={{margin:'0px 3px 0px 0px'}}>
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
//                                                     학생 할인 : {(item.discount_content != null) ? 'O' : 'X'}   
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#a1a1a1" component="div">
//                                                     {(item.discount_content != null) ? '('+item.discount_content+')' : ''}
//                                                     </Typography>
//                                                 </Grid>
//                                             </Grid>
//                                             <Grid container style={{marginTop: '6px', flexDirection: 'column'}}>
//                                                 <Grid style={{margin:'0px 3px 0px 0px'}}>
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
//                                                     영업시간 
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
//                                                     매일 : {item.service_time}
//                                                     </Typography>
//                                                 </Grid>
//                                                 <Grid >
//                                                     <Typography  sx={{fontSize: '10px', fontWeight:'400'}} color="#505050" component="div">
//                                                     브레이크 타임 : {item.break_time}
//                                                     </Typography>
//                                                 </Grid>
//                                             </Grid>
//                                         </CardContent>
//                                         <CardContent>
//                                           메뉴
//                                         </CardContent>
//                                     </Grid>

//                                 </Grid>
//                             </>
//                         </li> 
//                       ))}
                      
//                     </ul>
//                     </div>
//                     <div style={{ textAlign: 'center' }}>
//                       <button onClick={handleClose}>닫기</button>
//                     </div>
//             </Card>

//             )}
//         </Container>
//       </Layout>
//     </ThemeProvider>
// );
// };
// export default PlacePage;

