import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState,  } from "react"; 
import { search_places } from "../actions/place/place";
import Image from 'next/image';
import Link from 'next/link';
import theme from "../theme/theme";
import {CssBaseline, Box,InputBase, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack} from '@mui/material';
import bookmarkOn from '../image/bookmark-1.png';
import star from '../image/Star-1.png';
import tag16 from '../image/tag16.png';
import food from '../image/food.png';
import tag17 from '../image/tag17.png';
import mapIcon from '../image/map-1.png';
import searchBox from '../image/검색창2.png';
import closeIcon from '../image/close.png';

export default function searchList(){
    const router = useRouter();
    const dispatch = useDispatch();

    //user의 input값 받아오기
    const { keyword } = router.query;

    const [value, setValue] = useState('');
    const [passValue, setPassValue] = useState(value);

    const place = useSelector(state => state.place.place);
    const favorites = useSelector(state => state.favorite.favorite);

    //api 받아오기
    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(search_places(keyword));
        }
    }, [dispatch]);

    //place 페이지로 넘어가는
    const handleLiClick = (e) => {
        e.preventDefault();
      };

    //북마크 기능
    const isFavorite = (placeId) => {
        const favorite = favorites.some(favorite => favorite.place_id === placeId)
        if(favorite){
            return <Image width={15} height={15} src={bookmarkOn}/>
        }
        return null;
    };

    //아이콘 클릭시
    const handleIconOnclick = (event) =>{
        if(event.target.name == 'map' ){
            router.push({
                pathname: '/',
                query: passValue
              });
            //추가해야할 부분
        } else{
            router.push('/');
        }
    };

    const handleValue = (e) => {
        setValue(e.target.value);
        
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            dispatch(search_places(value));
            setPassValue(value);
            setValue('');
        }
    }

    return(
        <ThemeProvider theme={theme} >
            <CssBaseline/>
            <Container style={{padding:'0px',}}>
            <Grid container style={{position:'relative', marginTop:'10px',}}>
                <Grid item name='map' onClick={handleIconOnclick} style={{position:'absolute', zIndex:'2',  marginLeft:'3%', marginTop:'3%'}}><Image src={mapIcon} width={37} height={36}/></Grid>
                <Grid item name='close' style={{position:'absolute', zIndex:'2', marginLeft:'16%', marginTop:'3.5%'}}>
                    <InputBase 
                    sx={{ ml: 1, width:'150%'}}
                    value={value}
                    onChange={handleValue}
                    onKeyDown={handleKeyDown}
                    />   
                </Grid>
                <Grid item name='close' onClick={handleIconOnclick} style={{position:'absolute', zIndex:'2', marginLeft:'88%', marginTop:'3%'}}><Image src={closeIcon} width={37} height={36}/></Grid>
                <Grid item ><Image src={searchBox} /></Grid>
            </Grid>
            </Container>
            
            <ul style={{listStyleType: "none", padding: '0px 18px 0px 18px', margin: '0px'}} >
                        {place? place.map((item) => (
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
                                            alt={item.name} 
                                            src={food}/>
                                        </Grid>
                                    </Grid>
                                    </Link>
                                </li>
                        )): null}
                        </ul>
        </ThemeProvider>
    )
}