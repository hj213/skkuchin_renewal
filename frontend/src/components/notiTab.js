import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, CssBaseline, Box, Rating, ThemeProvider, Slide,Button,IconButton, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';

import Image from 'next/image';
import bell from '../image/noti/bell.png';
import hurray from '../image/noti/hurray.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { load_notices, read_notice } from '../actions/notice/notice';

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
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [filteredNotices, setFilteredNotices] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState(null);
    const user = useSelector(state => state.auth.user);
    const notices = useSelector(state => state.notice.notice);

    useEffect(() => {
        dispatch(load_notices(([result, message]) => {
            if (result && user) {
                dispatch(read_notice());
            }
        }));
    }, [])

    useEffect(() => {
        if (notices) {
            setFilteredNotices(notices.filter(notice => notice.type === '공지'));
            setFilteredEvents(notices.filter(notice => notice.type === '이벤트'));
        }
    }, [notices])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', position:'fixed', width:'100%', backgroundColor:'white',maxWidth:'420px'}}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab style={{color:value===0? '#565656':'#BABABA', fontWeight:value===0? '700':'500', fontSize:"15px"}} label="공지" {...a11yProps(0)} />
                    <Tab style={{color:value===1? '#565656':'#BABABA', fontWeight:value===1? '700':'500', fontSize:"15px"}} label="이벤트" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
                    {filteredNotices?.slice().reverse().map((notice, index) => (
                        <li key={index}>
                            <Grid container style={{width:"100%",padding:"8px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}} onClick={() => notice.url.trim().length !== 0 && window.open(notice.url, '_blank')} >
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
                                            {notice.title}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid xs={2}>
                                    <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                                        <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                                            {notice.create_date}
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
                                        {
                                            user && index===0 && !notice.read_users?.includes(user.username) &&
                                                <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                                                    NEW
                                                </Typography>
                                        }
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </li>
                    ))}
                </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
                    {filteredEvents?.slice().reverse().map((event, index) => (
                        <li key={index}>
                            <Grid container style={{width:"100%",padding:"8px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}} onClick={() => event.url.trim().length !== 0 && window.open(event.url, '_blank')} >
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
                                            {event.title}
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid xs={2}>
                                    <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                                        <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                                            {event.create_date}
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
                                        {
                                            user && index===0 && !event.read_users?.includes(user.username) &&
                                                <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                                                    NEW
                                                </Typography>
                                        }
                                        </div>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </li>
                    ))}
                </ul>
            </TabPanel>
        </Box>
    );
}