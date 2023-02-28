import {profile, Avatar, CssBaseline, Box, ThemeProvider, Rating, Slide, Card, CardContent, Typography, Grid, Container, Stack, useScrollTrigger, Button } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import React from 'react';

import UpperBar from '../components/UpperBar';

import example from '../image/magazine/example.jpg'

import markerY from '../image/marker.png'
import booked from '../image/bookmark-1.png'


const Magazine = () => {

    return(
        <ThemeProvider theme={theme}>
        <CssBaseline />
            <UpperBar />
            <Grid style={{marginTop:'20px'}} align="center">
                <div style={{
                    backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5) ), url(https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka.jpg)`, 
                    backgroundSize: 'cover',
                    backgroundPosition:'50% 70%',
                    width:'90%', 
                    height:'190px', 
                    borderRadius:'20px',
                    marginBottom:'10px',
                    zIndex:-1,
                    boxShadow: "2px 2px 5px gray"
                    }}>
                    <Grid container>
                        <Grid xs={10}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={markerY} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="left">
                                    명륜 맛집
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={2}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={booked} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="right">
                                    20
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Box component="fieldset" borderColor="transparent" sx={{paddingBottom:'0px'}}>
                        <Rating name="read-only" size="medium" value={5} readOnly precision={0.1} />
                    </Box>
                    <Typography style={{color:'white', fontSize:'25px', fontWeight:'700', marginBottom:'25px'}}>
                        "COMING SOON"
                    </Typography>
                    <Avatar alt="" src={profile} style={{ width: '30px', height: '30px' }}/>
                    <Typography style={{color:'white', fontSize:'10px', fontWeight:'700',marginTop:'5px'}}>
                        김명륜/경영17
                    </Typography>
                </div>

                <div style={{
                    backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8) ), url(https://www.foodiesfeed.com/wp-content/uploads/2022/07/haloumi-burger-with-french-fries.jpg)`, 
                    backgroundSize: 'cover',
                    backgroundPosition:'50% 40%',
                    width:'90%', 
                    height:'190px', 
                    borderRadius:'20px',
                    marginBottom:'10px',
                    boxShadow: "2px 2px 5px gray"
                    }}>
                    <Grid container>
                        <Grid xs={10}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={markerY} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="left">
                                    율전 맛집
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={2}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={booked} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="right">
                                    20
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Box component="fieldset" borderColor="transparent" sx={{paddingBottom:'0px'}}>
                        <Rating name="read-only" size="medium" value={5} readOnly precision={0.1} />
                    </Box>
                    <Typography style={{color:'white', fontSize:'25px', fontWeight:'700', marginBottom:'25px'}}>
                        "COMING SOON"
                    </Typography>
                    <Avatar alt="" src={profile} style={{ width: '30px', height: '30px' }}/>
                    <Typography style={{color:'white', fontSize:'10px', fontWeight:'700',marginTop:'5px'}}>
                        이율전/소프트17
                    </Typography>
                </div>

                <div style={{
                    backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8) ), url(https://www.foodiesfeed.com/wp-content/uploads/2015/05/korean-bibimbap-in-yamyam-berlin-3.jpg)`, 
                    backgroundSize: 'cover',
                    backgroundPosition:'50% 50%',
                    width:'90%', 
                    height:'190px', 
                    borderRadius:'20px',
                    marginBottom:'10px',
                    boxShadow: "2px 2px 5px gray"
                    }}>
                    <Grid container>
                        <Grid xs={10}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={markerY} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="left">
                                    명륜 맛집
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={2}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={booked} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="right">
                                    20
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Box component="fieldset" borderColor="transparent" sx={{paddingBottom:'0px'}}>
                        <Rating name="read-only" size="medium" value={5} readOnly precision={0.1} />
                    </Box>
                    <Typography style={{color:'white', fontSize:'25px', fontWeight:'700', marginBottom:'25px'}}>
                        "COMING SOON"
                    </Typography>
                    <Avatar alt="" src={profile} style={{ width: '30px', height: '30px' }}/>
                    <Typography style={{color:'white', fontSize:'10px', fontWeight:'700',marginTop:'5px'}}>
                        김명륜/경영17
                    </Typography>
                </div>

                <div style={{
                    backgroundImage:`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8) ), url(https://www.foodiesfeed.com/wp-content/uploads/2022/11/korean-barbecue-restaurant.jpg)`, 
                    backgroundSize: 'cover',
                    backgroundPosition:'50% 40%',
                    width:'90%', 
                    height:'190px', 
                    borderRadius:'20px',
                    marginBottom:'10px',
                    boxShadow: "2px 2px 5px gray"
                    }}>
                    <Grid container>
                        <Grid xs={10}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={markerY} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="left">
                                    율전 맛집
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={2}>
                            <div style={{display:'flex',margin:"11px 0 0 11px"}}>
                                <Image src={booked} width={16} height={20}/>
                                <Typography sx={{color:"white",paddingLeft:'6px', marginTop:'5px',fontSize: '12px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="right">
                                    20
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Box component="fieldset" borderColor="transparent" sx={{paddingBottom:'0px'}}>
                        <Rating name="read-only" size="medium" value={5} readOnly precision={0.1} />
                    </Box>
                    <Typography style={{color:'white', fontSize:'25px', fontWeight:'700', marginBottom:'25px'}}>
                        "COMING SOON"
                    </Typography>
                    <Avatar alt="" src={profile} style={{ width: '30px', height: '30px' }}/>
                    <Typography style={{color:'white', fontSize:'10px', fontWeight:'700',marginTop:'5px'}}>
                        이율전/소프트17
                    </Typography>
                </div>
            </Grid>
       </ThemeProvider>
    )
} 

export default Magazine;
