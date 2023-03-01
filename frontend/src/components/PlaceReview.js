import { useEffect, useState, useRef } from "react"; 
import { IconButton, MenuItem, Menu,Select, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import more from '../image/more_vert.png';
import { displayReviewTag, reviewsTags } from "./TagList";

import * as React from 'react';
import { styled } from '@mui/material/styles';



// ReviewItem 컴포넌트 추출
const PlaceReview = ({ index, review, user, handleEdit, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMoreClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: 3,
          top: 33,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '1px 3px 0',
          backgroundColor:'#FFCE00',
          color:'white',
          fontSize:'10px',
          fontWeight:'700',
          marginRight:'2px'
        },
      }));

    return (
        <Grid container key={index} style={{margin:"-10px 0 30px 0"}}>
            <Grid container style={{margin:'0px 0px 0px', justifyContent:'left'}}>
                <Grid item xs={2} style={{marginTop:'3px'}}>
                    { review && review.user_id === user.id ?
                        <StyledBadge badgeContent={"나"}>
                            <Avatar alt="" src={ user.image} />
                        </StyledBadge> : <Avatar alt="" src={user.image} />}
                </Grid>
                <Grid item xs={10}>
                <Stack direction="column" spacing={1}>
                    <Grid container alignItems='center'>
                        <Grid item xs>
                        <Typography
                            sx={{
                            fontSize: '12px',
                            fontWeight: '700',
                            lineHeight: '200%',
                            verticalAlign: 'top',
                            }}
                            align='left'
                        >
                            {review.nickname}
                        </Typography>
                        </Grid>
                        { review.user_id === user.id && handleEdit!=undefined?
                        <Grid item style={{marginTop:'-10px'}}>
                            <IconButton onClick={handleMoreClick} style={{top:5}}>
                                <Image src={more} width={5} height={17.33} placeholder="blur" layout='fixed' />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    style: {
                                    boxShadow: "0px 0px 2px 2px rgba(0,0,0,0.02)",
                                    },
                                }}
                                >
                                <MenuItem sx={{fontSize: '15px', color: '#FFCE00'}} onClick={()=>handleEdit(review.id)}>
                                    수정 {review.id}
                                </MenuItem>
                                <MenuItem sx={{fontSize: '15px'}} onClick={()=> {handleDelete(review.id); handleMenuClose();}}>
                                    삭제 {review.id} {index}
                                </MenuItem>
                            </Menu>
                        </Grid>
                        : null}
                    </Grid>
                        <Stack direction="row" alignItems="center">
                            <Typography
                            sx={{ fontSize: '12px', fontWeight: '500', lineHeight: '0%', verticalAlign: 'top' }}
                            align="left"
                            >
                            {review.major} {review.student_id}학번
                            </Typography>
                            <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: '500',
                                lineHeight: '0%',
                                paddingLeft: '5px',
                                color: '#a1a1a1',
                            }}
                            component="div"
                            align="left"
                            >
                            | {review.create_date.slice(0, 10)}
                            </Typography>
                        </Stack>
                        <Grid style={{margin:'10px 0 0 -3px'}}>
                        <Rating name="read-only" size="small" value={review.rate} readOnly precision={1} />
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>

            <Grid container style={{margin:'5px 0px 0px', justifyContent:'left'}}>
                <Card elevation={0} style={{
                    borderRadius: '0px 15px 15px 15px',
                    backgroundColor:'#FFE885',
                }}
                >
                    <Typography
                        style={{
                            padding:'10px 10px 8px 10px',
                            fontSize: '12px'
                        }}>
                        {review.content}
                    </Typography>
                </Card>

            </Grid>

            <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                {review.tags.map((tag, index)=>(
                    <Grid key={index}>
                        <Stack direction="column" style={{marginRight:"6px", marginBottom:"6px"}} >
                            {reviewsTags(tag)}
                        </Stack>
                    </Grid>
                ))}
            </Grid>
      </Grid>
    );
  }
  

export default PlaceReview;