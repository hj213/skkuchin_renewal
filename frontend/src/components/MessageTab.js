import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, CssBaseline, Box, CircularProgress , Typography, Grid, Stack,  Avatar, } from '@mui/material';

import notiOff from '../image/chat/notifications_off.png';
import Image from 'next/image';
import character from '../image/skkuchinFind.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { clear_room_list, get_chat_room_info, get_realtime_chat_room, get_chat_room_for_not_user } from '../actions/chat/chatRoom';
import { get_chat_request_info, get_realtime_chat_request, get_chat_request_for_not_user } from '../actions/chat/chatRequest';
import { request_refresh } from '../actions/auth/auth';
import { clear_matching } from '../actions/matchingUser/matchingUser';
import { displayProfile } from './MyPage/ProfileList';

import dynamic from 'next/dynamic';

const NewPromise = dynamic(() => import('./Chat/NewPromise'));

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
  const [value, setValue] = React.useState(0);
  const user = useSelector(state => state.auth.user);
  const chatRooms = useSelector(state => state.chatRoom.chatRooms);
  const chatRequests = useSelector(state => state.chatRequest.chatRequest);
  const stompClient = useSelector(state => state.stompClient.stompClient);

  const subscriptions = {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const get_info = async () => {
    dispatch(request_refresh()).then(() => {
      subscriptions.chatRooms = dispatch(get_realtime_chat_room(user.username, stompClient));
      subscriptions.chatRequests = dispatch(get_realtime_chat_request(user.username, stompClient));
    
      Promise.all(Object.values(subscriptions)).then(() => {
        dispatch(get_chat_room_info(stompClient));
        dispatch(get_chat_request_info(stompClient));
      });
    });
  };

  useEffect(() => {
    if (stompClient && user && user.username) {
      get_info();
    } else {
      dispatch(get_chat_room_for_not_user());
      dispatch(get_chat_request_for_not_user());
    }
    return () => {
      dispatch(clear_room_list());
      if (subscriptions) {
          Object.values(subscriptions).forEach(subscription => {
              subscription.unsubscribe();
          });
      }
    }
  }, [stompClient, user]);

  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpen = (request) => {
    setOpen(true);
    setSelectedRequest(request);
    setSelectedUser(request.user1_id);
  }
  const handleClose = () => {
    dispatch(clear_matching());
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'transparent',  backgroundColor:'white'}}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example" sx={{position: 'fixed',width:'100%', mt: '15px', backgroundColor:'white', maxWidth: '420px', zIndex: '10'}}>
          <Tab style={{color:value===0? '#565656':'#BABABA', fontWeight:value===0? '700':'500', fontSize:"15px"}} label="채팅방" {...a11yProps(0)} />
          <Tab style={{color:value===1? '#565656':'#BABABA', fontWeight:value===1? '700':'500', fontSize:"15px"}} label="대화 요청" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {
          chatRooms ?
          
          <>
            { chatRooms.length > 0 ?
              <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
                { chatRooms.map((chatRoom, index)=>(
                    <li key={index}>
                      <Link href={{
                        pathname: '/chat',
                        query: {
                          room_id: chatRoom.room_id,
                          user_number: chatRoom.user1_id == user.id ? 'user1' : 'user2'
                        }
                      }}>
                        <Grid container style={{width:"100%",padding:"13px 0 13px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}}>
                            <Grid xs={2} sx={{pt: '5px'}}>
                                {displayProfile(chatRoom.image, 55, 55)}
                            </Grid>
                            <Grid xs={8} style={{paddingLeft:'8px'}}>
                                <Stack direction="column" spacing={1} sx={{margin:"11px 0 0 7px"}}>
                                    <div style={{display:'flex', }}>
                                      <Typography sx={{fontSize: '14px', fontWeight:'700', lineHeight: '100%', verticalAlign: 'top', paddingTop:'3px'}} align="left">
                                        {chatRoom.nickname}
                                      </Typography>
                                      <Typography sx={{color:"#BABABA",paddingLeft:'5px',fontSize: '9px', fontWeight:'500', lineHeight: '200%', verticalAlign: 'top', }} align="left">
                                        {chatRoom.major}
                                      </Typography>
                                      {/* 알림끄기 연결 시 조건문으로 수정 */}
                                      <Box sx={{paddingLeft:'5px', lineHeight: '120%'}}>
                                      {
                                        chatRoom.user1_id === user.id
                                          ? !chatRoom.user1_alarm && 
                                          <Image
                                            src={notiOff}
                                            width="12px"
                                            height="12px"
                                          />
                                          : !chatRoom.user2_alarm &&
                                          <Image
                                            src={notiOff}
                                            width="12px"
                                            height="12px"
                                          />
                                      }
                                      </Box>
                                    </div>
                                    <Typography sx={{paddingTop:"5px",fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                                        {/* 텍스트 불러올 때 slice 활용해서 number of letters 제한해야 됨 */}
                                        {chatRoom.message.length > 15 ? (
                                          `${chatRoom.message.slice(0, 15)}...`
                                        ) : (
                                          chatRoom.message
                                        )}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid xs={2}>
                            <Stack direction="column" spacing={1} sx={{margin:"7px 0 7px 7px"}}>
                              <Typography sx={{paddingRight:"2px",fontSize: '9px', fontWeight:'500', lineHeight: '250%', color:"#A1A1A1", }} align="right">
                                {chatRoom.display_time}
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
                                  chatRoom.message_count === 0 
                                  ? 
                                    chatRoom.message === "새로운 채팅방이 개설되었습니다"
                                    ? 
                                    <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                                      NEW
                                    </Typography>
                                    :
                                    null
                                  :
                                  <Typography style={{padding:"2px 10px 0px 10px",fontSize: '9px', fontWeight: '700', lineHeight: '100%', color: 'white'}}>
                                    {chatRoom.message_count}
                                  </Typography>
                                }
                              </div>
                            </Stack>
                            </Grid>
                        </Grid>
                      </Link>
                    </li>
                ))}
              </ul>
            :
            <Grid container style={{marginTop:'16px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Grid item>
                  <Image src={character} width={138} height={110}/>
              </Grid>
              <Grid item>
                <Typography style={{ color: '#A1A1A1', fontSize: '14px', textAlign: 'center' }}>
                참여 중인 대화가 아직 없네요!
                </Typography>
                <Typography style={{ color: '#A1A1A1', fontSize: '14px', textAlign: 'center' }}>
                '스꾸챗' 탭에서 새로운 대화에 참여해보세요.
                </Typography>
              </Grid>
            </Grid> 
            }
          </>
          : (
            <div style={{position:'fixed', zIndex:'4', height:'100%', width:'100%',textAlign:'center', marginLeft:'-20px', paddingTop: window.innerHeight/3,color:"#FFE885", maxWidth: '420px'}}>
              <CircularProgress color="inherit" size={60}/>
            </div>
          )
        }
      </TabPanel>


      <TabPanel value={value} index={1}>
        { 
          chatRequests &&
          <>
            {
              chatRequests.length > 0 ?
              <ul style={{listStyle:'none', paddingLeft:'0', paddingTop:'50px'}}>
                { chatRequests.map((chatRequest, index)=>(
                  <li >
                    <Grid onClick={()=>handleOpen(chatRequest)} container style={{width:"100%",padding:"13.5px 0 13.5px 0", justifyContent:'left', borderBottom:"1px solid #F0F0F0"}} on>
                        <Grid xs={2}>
                            <Avatar alt="" style={{ width: '55px', height: '55px' }}/>
                        </Grid>
                        <Grid xs={8}>
                            <Stack direction="column" spacing={1} sx={{margin:"4px 0 0 8px"}}>
                                <div style={{display:'flex'}}>
                                  <Typography sx={{fontSize: '14px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                                      새로운 대화 요청이 있습니다!
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
                                  {chatRequest.display_time}
                              </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                      {
                        open && <NewPromise open={open} onClose={handleClose} request={selectedRequest} selectedUser={selectedUser}/> 
                      }
                  </li>
                ))}
              </ul>
              :
              <Grid container style={{marginTop:'16px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item>
                    <Image src={character} width={138} height={110} />
                </Grid>
                <Grid item>
                    <Typography style={{ color: '#A1A1A1', fontSize: '14px', textAlign: 'center' }}>
                    요청받은 대화가 아직 없네요!
                    </Typography>
                    <Typography style={{ color: '#A1A1A1', fontSize: '14px', textAlign: 'center' }}>
                    '스꾸챗' 탭에서 새로운 대화에 참여해보세요.
                    </Typography>
                </Grid>
              </Grid>
            }
          </>
        }
      </TabPanel>
    </Box>
  );
}