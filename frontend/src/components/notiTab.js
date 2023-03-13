import * as React from 'react';
import PropTypes from 'prop-types';
import { Profile, Tabs, Tab, CssBaseline, Box, Rating, ThemeProvider, Slide,Button,IconButton, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';

import profile from '../image/profile.png';
import notiOff from '../image/chat/notifications_off.png';
import Image from 'next/image';
import character from '../image/mainCharacterY.png';

import Link from 'next/link';
import bell from '../image/noti/bell.png';
import hurray from '../image/noti/hurray.png'
import { textAlign } from '@mui/system';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
            <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ padding:"0 20px 0 20px" }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    export default function MessageTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position:'fixed', width:'100%', backgroundColor:'white',maxWidth:'600px'}}>
            <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab style={{color:value===0? '#565656':'#BABABA', fontWeight:value===0? '700':'500', fontSize:"15px"}} label="공지" {...a11yProps(0)} />
                <Tab style={{color:value===1? '#565656':'#BABABA', fontWeight:value===1? '700':'500', fontSize:"15px"}} label="이벤트" {...a11yProps(1)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
            <li>
            <Grid container style={{width:"100%",padding:"8px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                <Grid xs={1} style={{marginTop:'11px', paddingLeft:'5px'}}>
                    <Image src={bell} width={15} height={15} />
                </Grid>
                <Grid xs={9}>
                    <Stack direction="column" spacing={1} sx={{margin:"15px 0 0 7px"}}>
                        <div style={{display:'flex'}}>
                            <Typography sx={{fontSize: '11px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top', color:'#878787'}} align="left">
                                공지
                            </Typography>
                        </div>
                    
                        <Typography sx={{padding:"10px 0px 10px 0px",fontSize: '13px', fontWeight:'700', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                            {/* 텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨 */}
                                스꾸친이 새로이 출시되었습니다!
                        </Typography>
                            
                           
                        
                    </Stack>
                </Grid>
                <Grid xs={2}>
                <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                    <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                    3월 7일
                    </Typography>
                    <div
                        style={{
                        margin:'0 0 0 auto',
                        width:'fit-content',
                        height:'20px',
                        backgroundColor: '#FFCE00',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                        NEW
                        </Typography>
                    </div>
                            
                    </Stack>
                </Grid>
            </Grid>
            </li>
            {/* <li>
            <Link href='/chat'>
            <Grid container style={{width:"100%",padding:"8px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                    <Grid xs={1} style={{marginTop:'13px', paddingLeft:'5px'}}>
                    <Image src={bell} width={15} height={15} />
                </Grid>
                <Grid xs={9}>
                    <Stack direction="column" spacing={1} sx={{margin:"15px 0 0 7px"}}>
                        <div style={{display:'flex'}}>
                            <Typography sx={{fontSize: '11px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top', color:'#878787'}} align="left">
                                공지
                            </Typography>
                        </div>
                        <Typography sx={{paddingTop:"10px",fontSize: '13px', fontWeight:'700', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                            텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨
                                스꾸친 이용 가이드 및 주의사항
                        </Typography>
                    </Stack>
                </Grid>
                <Grid xs={2}>
                <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                    <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                        23분전
                    </Typography>
                    <div
                        style={{
                        margin:'0 0 0 auto',
                        width:'fit-content',
                        height:'20px',
                        backgroundColor: '#FFCE00',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                        NEW
                        </Typography>
                    </div>
                    </Stack>
                </Grid>
            </Grid>
            </Link>
            </li> */}
            
            </ul>
        </TabPanel>


        <TabPanel value={value} index={1}>
            <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
            <li>
            <Grid container style={{width:"100%",padding:"8px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                <Grid xs={1} style={{marginTop:'11px', paddingLeft:'5px'}}>
                    <Image src={hurray} width={15} height={17} />
                </Grid>
                <Grid xs={9}>
                    <Stack direction="column" spacing={1} sx={{margin:"15px 0 0 7px"}}>
                        <div style={{display:'flex'}}>
                            <Typography sx={{fontSize: '11px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top', color:'#878787'}} align="left">
                                이벤트
                            </Typography>
                        </div>
                        <Typography sx={{paddingTop:"10px",fontSize: '13px', fontWeight:'700', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                            {/* 텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨 */}
                                스꾸친 이벤트가 곧 시작됩니다!
                        </Typography>
                    </Stack>
                </Grid>
                <Grid xs={2}>
                <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                    <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                        3월 7일
                    </Typography>
                    <div
                        style={{
                        margin:'0 0 0 auto',
                        width:'fit-content',
                        height:'20px',
                        backgroundColor: '#FFCE00',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                        NEW
                        </Typography>
                    </div>
                    </Stack>
                </Grid>
            </Grid>
            </li>
            {/* <li>
            <Link href='/chat'>
            <Grid container style={{width:"100%",padding:"8px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                <Grid xs={1} style={{marginTop:'13px', paddingLeft:'5px'}}>
                    <Image src={hurray} width={15} height={17} />
                </Grid>
                <Grid xs={9}>
                    <Stack direction="column" spacing={1} sx={{margin:"15px 0 0 7px"}}>
                        <div style={{display:'flex'}}>
                            <Typography sx={{fontSize: '11px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top', color:'#878787'}} align="left">
                                이벤트
                            </Typography>
                        </div>
                        <Typography sx={{paddingTop:"10px",fontSize: '13px', fontWeight:'700', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                            텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨
                                스꾸친 회원가입 이벤트 안내
                        </Typography>
                    </Stack>
                </Grid>
                <Grid xs={2}>
                <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                    <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                        23분전
                    </Typography>
                    <div
                        style={{
                        margin:'0 0 0 auto',
                        width:'fit-content',
                        height:'20px',
                        backgroundColor: '#FFCE00',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                        NEW
                        </Typography>
                    </div>
                    </Stack>
                </Grid>
            </Grid>
            </Link>
            </li> */}
            </ul>
        </TabPanel>
        </Box>
    );
    }