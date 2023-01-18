import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { load_places } from "../actions/place/place";
import Layout from "../hocs/Layout";
import Map from "../components/Map";
import Image from 'next/image'
import { CssBaseline, Box, ThemeProvider,Slider, Card, CardContent, Typography, Grid, Container, Stack } from '@mui/material';
import theme from '../theme/theme';
import line from '../image/Line1.png';
import food from '../image/food.png';
import tag16 from '../image/tag16.png';
import tag17 from '../image/tag17.png';
import star from '../image/Star-1.png';


export default function entireList(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(load_places());
    }, [dispatch]);

    const place = useSelector(state => state.place.place);
    const user = useSelector(state => state.auth.user);

    return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <Layout>
            <Container fixed style={{padding: '0px 16px 0px 0px'}}>
                <Card style={{
                borderRadius: '30px 30px 0 0' ,
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                height: '95%',
                overflowX: 'x',
                zIndex: '1',
                boxShadow: '0px -10px 20px -5px rgb(0,0,0, 0.16)',
                
                }} 
                >
                <div 이 영역을 스크롤 하면 사이즈를 확장시켜>
                <div style={{textAlign:'center'}}>
                    <Image width={60} height={4} src={line} /> 
                </div>
                
               
                <ul style={{listStyleType: "none", padding: '0px 18px 0px 18px', margin: '0px'}} >
                    {place.map((item) => (
                        <li key={item.id} data={item} style={{borderBottom: '1px solid #D9D9D9'}}>
                            <>
                                <Grid container style={{margin: '20px 0px 0px 0px'}}>
                                    <Grid xs >
                                        <CardContent style={{padding:'0px'}}>
                                            <Grid container spacing={2} style={{margin:'0px'}}>
                                                <Grid xm style={{marginTop:'9px'}}>
                                                    <Typography sx={{fontSize: '18px', fontWeight:'500', lineHeight: '28px'}} color="#000000">
                                                        {item.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid xs style={{padding:'0px 0px 0px 8px'}}>
                                                    <Typography sx={{fontSize: '10px', fontWeight: '500'}} style={{marginTop: '16px'}} color="#a1a1a1" component="div" >
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
                                    <Grid>
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