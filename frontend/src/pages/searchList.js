import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 
import { search_places_keyword, load_places, clear_search_results } from "../actions/place/place";
import Image from 'next/image';
import Link from 'next/link';
import theme from "../theme/theme";
import {CssBaseline, Box,InputBase, CircularProgress, ThemeProvider, useMediaQuery, Paper,  Card, CardContent, Typography, Grid, Container, Stack, stepConnectorClasses} from '@mui/material';
import bookmarkOn from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import food from '../image/food.png';
import mapIcon from '../image/map-1.png';
import searchBox from '../image/searchHolder2.png';
import closeIcon from '../image/close.png';
import {  displayReviewTag } from "../components/TagList";
import noAuto from '../image/noinfo_enheng.png';
import Hangul from "hangul-js";
import marker from '../image/location.png';
import styled from "@emotion/styled";
import dynamic from 'next/dynamic';

const UpperBar = dynamic(() => import("../components/UpperBar"));

const searchList = () => {
    const isSmallScreen = useMediaQuery('(max-width: 420px)');

    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.auth.toggle_for_not_user);

    const searchplace = useSelector(state => state.place.searchplace);
    const allplaces = useSelector(state => state.place.allplaces);
    const favorites = useSelector(state => state.favorite.favorite);

    //user의 input값 받아오기
    const { keyword } = router.query;

    const [value, setValue] = useState('');
    const [placeholderValue, setPlaceholderValue] = useState(keyword);
    const [passValue, setPassValue] = useState(keyword);
    const [filteredPlace, setFilteredPlace] =useState([]);
    const [filteredAllPlace, setFilteredAllPlace] = useState([]);
    const [auto, setAuto] = useState([]);
    const [autoBox, setAutoBox] = useState(false);

    //api 받아오기
    useEffect(() => {
        dispatch(clear_search_results());
        dispatch(search_places_keyword(keyword));
    }, [keyword]);

    useEffect(() => {
        if (!allplaces || allplaces.length === 0) {
          dispatch(load_places());
        }
      }, [allplaces]);

    //캠퍼스 필터링
    useEffect(() => {
        if (searchplace && allplaces && user) {
            setFilteredPlace(searchplace.filter((item) => item.campus === user.toggle));
            setFilteredAllPlace(allplaces.filter((item)=> item.campus === user.toggle));
        } else if (searchplace && allplaces && toggle) {
            setFilteredPlace(searchplace.filter((item) => item.campus === toggle));
            setFilteredAllPlace(allplaces.filter((item)=> item.campus === toggle));
        } else {
            setFilteredPlace([]);
            setFilteredAllPlace([]);
        }
    }, [searchplace, user, allplaces, toggle]);
  
    const handleValue = (e) => {
        setValue(e.target.value);

        if(e.target.value == ''){
            setAuto([]);
        } else{
            const regex = new RegExp(e.target.value, 'i');
            const newAuto = filteredAllPlace.filter((item) => regex.test(Hangul.assemble(item.name)));
            setAuto(newAuto);
        }
    }

    //place 페이지로 넘어가는
    const handleLiClick = (e) => {
        e.preventDefault();
    };

        // 북마크 기능
    const isFavorite = (placeId) => {
        const favorite = favorites || []; // favorites가 null 또는 undefined인 경우 빈 배열([])로 초기화
        const isFavorited = favorite.some(favorite => favorite.place_id === placeId);
        if (isFavorited) {
        return <Image width={15} height={15} src={bookmarkOn} layout='fixed' />;
        } else {
            return null;
        }
    };

    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.id == 'map' ){
            // 0-2 [검색 결과 목록] -> 1 [목록보기]로 이동
            
            dispatch(clear_search_results());
            router.push(`/?keyword=${passValue}`);
            
        } else{
            setPassValue('')
            dispatch(clear_search_results()); //초기화위해서
            router.push('/');
        }
    };

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            setPassValue(value);
            setPlaceholderValue(value);
            dispatch(clear_search_results());
            dispatch(search_places_keyword(value));
            setValue('');
        }
    }

    const handleContainerMouseDown = (e) => {
        e.preventDefault();
    }

    const handleAutoOnClick = (autoValue) => {
        
        setValue(autoValue);
        setAuto(autoValue);
        dispatch(clear_search_results());
        dispatch(search_places_keyword(autoValue));
        setPlaceholderValue(autoValue);
        setValue('')
        setAuto([]);
    }
    const autoRef= useRef(null);
    const handleInputOnFocus = (e) => {
        setAutoBox(true);

    }

    const handleInputOnBlur = (e) => { 
        setAutoBox(false);
    }
    const NoScroll = styled.div`
    /* 모바일에서 스크롤 바를 숨김 */
    *::-webkit-scrollbar {
        display: none;
    }
    `
    // useEffect(()=>{
    //     if(autoBox && autoRef.current){
    //         autoRef.current.scrollTo({top:0});
    //         console.log(autoRef.current.scrollTop)
    //     }
    // },[autoBox, autoRef.current])

    return(
        <ThemeProvider theme={theme} >
            <CssBaseline/>
            <div style={{position:'absolute', zIndex:'9'}}>
                <UpperBar/>
            </div>

            <div style={{position:'relative', width:'100%', height:'100%', marginTop:'80px', }}>
                <div style={{position: 'absolute',}}>
                    <Container style={{ position:'fixed', zIndex:'4', padding:'0px', overflow: "hidden", maxWidth:'620px', height: '85px'}}>
                        <Card style={{
                                    position: 'absolute',
                                    top: '0px',
                                    width: '100%',
                                    height: '120%',
                                    zIndex: '4',
                                    border: "1px solid transparent",
                                    boxShadow: 'none',
                                    
                                }}>
                            <Grid container style={{position:'relative', marginTop:'20px',}}>
                                <Grid item onClick={handleIconOnclick} style={{position:'absolute', zIndex:'2',  marginLeft:'3%', marginTop:'3%'}}><Image src={mapIcon} width={37} height={36} layout='fixed' id='map'/></Grid>
                                <Grid item style={{position:'absolute', zIndex:'2', marginLeft:'16%', marginTop:'3.5%'}}>
                                    <InputBase 
                                    sx={{ ml: 1, width:'150%'}}
                                    value={value}
                                    placeholder={placeholderValue}
                                    onChange={handleValue}
                                    onKeyDown={handleKeyDown}
                                    onFocus={handleInputOnFocus}
                                    />   
                                </Grid>
                                <Grid item onClick={handleIconOnclick} style={{position:'absolute', zIndex:'2', marginLeft:'88%', marginTop:'3%'}}><Image src={closeIcon} width={37} height={36} layout='fixed' id='close'/></Grid>
                                <Grid item  ><Image src={searchBox}/></Grid>
                            </Grid>
                        </Card>
                    </Container>
                </div>
                { autoBox && value ? (
                <div onMouseDown={handleContainerMouseDown} style={{height:'100%'}} >
                    <Paper style={{position:'relative',height:'100vh', width:'100%', top:'60px', overflowY:'scroll', border: '1px solid transparent',
                    borderRadius: '0px', zIndex:'2'}}> 
                        <Container style={{padding:'0px', marginTop:'0px'}} >
                            {auto.length > 0 ?
                            <ul style={{padding:'0px 20px 0px 20px', listStyleType: "none",}}>
                                {auto.map((autoList) => (
                                    <li
                                        key={autoList.id}
                                        onClick={()=>handleAutoOnClick(autoList.name)}
                                        style={{ padding:'15px 10px 7px 0px',borderBottom: '1px solid #D9D9D9'}}
                                    >   
                                        <Grid container>
                                            <Grid item style={{margin:'10px 0px 0px 0px'}}>
                                                <Image src={marker} width={16} height={21} layout='fixed' />
                                            </Grid>
                                            <Grid item style={{margin:'0px 0px 0px 12px'}}>
                                                <div style={{fontSize:'16px'}}>
                                                {autoList.name}
                                                </div>
                                                <div style={{fontSize:'12px', color:'#a1a1a1'}}>
                                                    {autoList.address.substr(2)}
                                                </div>
                                            </Grid>
                                            
                                        </Grid>
                                        
                                    </li>
                                ))}
                            </ul>
                        : (
                            <div style={{textAlign:'center', paddingTop:'110px'}}>        
                                    <Image src={noAuto} width={129} height={108} placeholder="blur" layout='fixed' />
                                    <Typography color={theme.palette.fontColor.light} fontWeight={theme.typography.h2} style={{fontSize:'14px'}} >검색결과가 없습니다.</Typography>
                                </div>
                        )}
                        </Container>
                    </Paper>
                </div>
                ) :
                <Container style={{padding:'0px', marginTop:'0px', overflowY:'scroll', zIndex:'0', }} >
                    <Card style={{overflowY:'auto', marginTop:'80px', border: "0px solid transparent", boxShadow:'none', borderRadius: '0px'}}>
                        <ul style={{listStyleType: "none", padding: '0px 18px 0px 18px', margin: '0px'}} >
                            {searchplace ? filteredPlace.length > 0 ? filteredPlace.map((item) => (
                                    <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}} onClick={handleLiClick}>
                                        <Link 
                                            href={{
                                                pathname: '/place',
                                                query: {
                                                    id: item.id
                                                }
                                            }}
                                            key={item.id}
                                        >
                                        <Grid container style={{margin: '10px 0px 0px 0px'}}>
                                            <Grid item xs >
                                                <CardContent style={{padding:'0px'}}>
                                                    <Grid container spacing={2} style={{margin:'0px',}}>
                                                        <Grid item style={{marginTop:'15px',  padding:'0px 8px 0px 0px'}}>
                                                            <Typography sx={{fontSize: '18px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{padding:'0px 8px 0px 0px', whiteSpace: "normal", display: 'flex' }}>
                                                            {isSmallScreen && (item.name.length >=13)?
                                                                <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop:'5px'}} color="#a1a1a1" component="div" >
                                                                    {item.detail_category}
                                                                </Typography>
                                                                : 
                                                                <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop:'22px'}} color="#a1a1a1" component="div" >
                                                                    {item.detail_category}
                                                                </Typography>
                                                            }
                                                            <Grid item sx={{mt: isSmallScreen && (item.name.length >=13) ? '2px' : '19px', p: '0px 5px'}}>{isFavorite(item.id)}</Grid>
                                                        </Grid>
                                                        {/* 화면 너비에 따라 detail_category 이미지 뒤로 씹히거나, 줄바꿈이 필요한 경우를 처리하기 위해 위처럼 수정했습니다 */}
                                                        {/* <Grid item style={{padding:'0px 0px 0px 8px'}}>
                                                            <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop: '22px'}} color="#a1a1a1" component="div" >
                                                                {item.detail_category}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item style={{padding:'0px 0px 0px 8px', marginTop:'19px'}}>
                                                            {isFavorite(item.id)}
                                                        </Grid> */}
                                                    </Grid>
                                                    <Grid item container style={{marginTop: '10px'}}>
                                                        <Grid >
                                                            <Typography  sx={{fontSize: '10px', fontWeight:'400', marginTop:'2px'}}  color="#505050" component="div">
                                                            스꾸친 평점 :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid style={{margin:'0px 7px 0px 7px'}}>
                                                            <Image width={15} height={14} src={star} layout='fixed' />
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
                                                    <Grid container>
                                                    {/* 태그 받아오기 */}
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
                                                    alt={ item.name } 
                                                    src={ item.images && item.images.length > 0 ? item.images[0] : food }
                                                    style={{borderRadius: '10px'}}
                                                    placeholder="blur"
                                                    blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                                    layout='fixed'
                                                />
                                            </Grid>
                                        </Grid>
                                        </Link>
                                    </li>
                            )):  (
                                <div style={{textAlign:'center', paddingTop:'110px'}}>        
                                    <Image src={noAuto} width={129} height={108} placeholder="blur" layout='fixed' />
                                    <Typography color={theme.palette.fontColor.light} fontWeight={theme.typography.h2} style={{fontSize:'14px'}} >검색결과가 없습니다.</Typography>
                                </div>
                            )
                        :(
                            <div style={{textAlign:'center', marginTop: '25%', color:"#FFE885"}}>
                                <CircularProgress color="inherit"/>
                            </div>
                            
                        )}
                        </ul>
                    </Card>
                </Container> }
            </div> 

        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(searchList), {
    ssr: false,
});