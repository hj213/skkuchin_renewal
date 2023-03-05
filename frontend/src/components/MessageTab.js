import * as React from 'react';
import PropTypes from 'prop-types';
import { Profile, Tabs, Tab, CssBaseline, Box, Rating, ThemeProvider, Slide,Button,IconButton, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';

import profile from '../image/profile.png';
import notiOff from '../image/chat/notifications_off.png';
import Image from 'next/image';

import Link from 'next/link';
import { get_realtime_chat_room } from '../actions/chat/chatRoom';
import { get_realtime_chat_request } from '../actions/chat/chatRequest';
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
  const user = useSelector(state => state.auth.user);
  const chatRoom = useSelector(state => state.chatRoom.chatRoom);
  const chatRequest = useSelector(state => state.chatRequest.chatRequest);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(get_realtime_chat_room(user.username));
    dispatch(get_realtime_chat_request(user.username));
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position:'fixed', width:'100%', backgroundColor:'white',maxWidth:'600px'}}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{color:value===0? '#565656':'#BABABA', fontWeight:value===0? '700':'500', fontSize:"15px"}} label="채팅방" {...a11yProps(0)} />
          <Tab style={{color:value===1? '#565656':'#BABABA', fontWeight:value===1? '700':'500', fontSize:"15px"}} label="밥약 신청" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
          
          <li>
          <Link href='/chat'>
          <Grid container style={{width:"100%",padding:"13px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
              <Grid xs={2}>
                  <Avatar alt="" src={profile} style={{ width: '55px', height: '55px' }}/>
              </Grid>
              <Grid xs={8}>
                  <Stack direction="column" spacing={1} sx={{margin:"11px 0 0 7px"}}>
                      <div style={{display:'flex'}}>
                        <Typography sx={{fontSize: '14px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="left">
                            진메르
                        </Typography>
                        <Typography sx={{color:"#BABABA",paddingLeft:'5px',fontSize: '9px', fontWeight:'500', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                            컬쳐엔테크놀로지학과
                        </Typography>
                        {/* 알림끄기 연결 시 조건문으로 수정 */}
                        <Box sx={{paddingLeft:'5px', lineHeight: '120%'}}>
                          <Image src={notiOff} width="12px" height="12px"/>
                        </Box>
                      </div>
                      <Typography sx={{paddingTop:"5px",fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                          {/* 텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨 */}
                          나는야 상금 사냥꾼
                      </Typography>
                  </Stack>
              </Grid>
              <Grid xs={2}>
              <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                  <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                      10분전
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
          </li>
          <li >
          <Grid container style={{width:"100%",padding:"13px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
              <Grid xs={2}>
                  <Avatar alt="" src={profile} style={{ width: '55px', height: '55px' }}/>
              </Grid>
              <Grid xs={8}>
                  <Stack direction="column" spacing={1} sx={{margin:"11px 0 0 7px"}}>
                      <div style={{display:'flex'}}>
                        <Typography sx={{fontSize: '14px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top',}} align="left">
                            김아무개
                        </Typography>
                        <Typography sx={{color:"#BABABA",paddingLeft:'5px',fontSize: '9px', fontWeight:'500', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                            유학동양학과
                        </Typography>
                        {/* 알림끄기 연결 시 조건문으로 수정 */}
                        <Box sx={{paddingLeft:'5px', lineHeight: '120%'}}>
                          {/* <Image src={notiOff} width="12px" height="12px"/> */}
                        </Box>
                      </div>
                      <Typography sx={{paddingTop:"5px",fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                          {/* 텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨 */}
                          새로운 채팅방이 개설되었습니다! ㅁㄴㅇㅁ
                      </Typography>
                  </Stack>
              </Grid>
              <Grid xs={2}>
              <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                  <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                      10분전
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
                      2
                    </Typography>
                  </div>
                  </Stack>
              </Grid>
          </Grid>
          </li>
          
        </ul>
      </TabPanel>


      <TabPanel value={value} index={1}>
        <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
          <li >
            <Grid container style={{width:"100%",padding:"13.5px 0 13.5px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                <Grid xs={2}>
                    <Avatar alt="" src={profile} style={{ width: '55px', height: '55px' }}/>
                </Grid>
                <Grid xs={8}>
                    <Stack direction="column" spacing={1} sx={{margin:"4px 0 0 8px"}}>
                        <div style={{display:'flex'}}>
                          <Typography sx={{fontSize: '14px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                              새로운 밥약 신청이 있습니다!
                          </Typography>
                        </div>
                        <Typography sx={{paddingTop:"3px",fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                            클릭해서 확인해보세요!
                        </Typography>
                    </Stack>
                </Grid>
                <Grid xs={2}>
                  <Stack direction="column" spacing={1} sx={{margin:"5px 0 7px 7px",height:'20px',}}>
                      <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                          10분전
                      </Typography>
                    </Stack>
                </Grid>
            </Grid>
          </li>
          <li >
            <Grid container style={{width:"100%",padding:"13.5px 0 13.5px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                <Grid xs={2}>
                    <Avatar alt="" src={profile} style={{ width: '55px', height: '55px' }}/>
                </Grid>
                <Grid xs={8}>
                    <Stack direction="column" spacing={1} sx={{margin:"4px 0 0 8px"}}>
                        <div style={{display:'flex'}}>
                          <Typography sx={{fontSize: '14px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                              새로운 밥약 신청이 있습니다!
                          </Typography>
                        </div>
                        <Typography sx={{paddingTop:"3px",fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                            클릭해서 확인해보세요!
                        </Typography>
                    </Stack>
                </Grid>
                <Grid xs={2}>
                  <Stack direction="column" spacing={1} sx={{margin:"5px 0 7px 7px",height:'20px',}}>
                      <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1"}} align="right">
                          10분전
                      </Typography>
                    </Stack>
                </Grid>
            </Grid>
          </li>
        </ul>
      </TabPanel>
    </Box>
  );
}