import * as React from 'react';
import PropTypes from 'prop-types';
import { Profile, Tabs, Tab, CssBaseline, Box, Rating, ThemeProvider, Slide,Button,IconButton, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';

import profile from '../image/profile.png'

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
        <Box sx={{ p: 3 }}>
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab style={{color:"black", fontWeight:"700", fontSize:"15px"}} label="채팅방" {...a11yProps(0)} />
          <Tab style={{color:"black", fontWeight:"700", fontSize:"15px"}} label="밥약 신청" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container style={{width:"100%",padding:"0 0 20px 0", justifyContent:'left', borderBottom:"1px solid #A1A1A1"}}>
            <Grid xs={2}>
                <Avatar alt="" src={profile} />
            </Grid>
            <Grid xs={9}>
                <Stack direction="column" spacing={1}>
                    <Typography sx={{fontSize: '12px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                        김아무개
                    </Typography>
                    <Typography sx={{fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                        안녕하세요!
                    </Typography>
                    <Box style={{margin:"0", padding:"5px 0 0 0"}} component="fieldset" borderColor="transparent">

                    </Box>
                </Stack>
            </Grid>
            <Grid xs={1}>
                <Typography sx={{fontSize: '9px', fontWeight:'500', lineHeight: '200%', color:"#A1A1A1"}} align="right">
                    10분전
                </Typography>
            </Grid>
        </Grid>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container style={{width:"100%",padding:"0 0 20px 0", justifyContent:'left', borderBottom:"1px solid #A1A1A1"}}>
            <Grid xs={2}>
                <Avatar alt="" src={profile} />
            </Grid>
            <Grid xs={9}>
                <Stack direction="column" spacing={1}>
                    <Typography sx={{fontSize: '12px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                        새로운 밥약 신청이 있습니다
                    </Typography>
                    <Typography sx={{fontSize: '12px', fontWeight:'500', lineHeight: '0%', verticalAlign: 'top',}} align="left">
                        클릭해서 확인해보세요!
                    </Typography>
                    <Box style={{margin:"0", padding:"5px 0 0 0"}} component="fieldset" borderColor="transparent">

                    </Box>
                </Stack>
            </Grid>
            <Grid xs={1}>
                <Typography sx={{fontSize: '9px', fontWeight:'500', lineHeight: '200%', color:"#A1A1A1"}} align="right">
                    19분전
                </Typography>
            </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}