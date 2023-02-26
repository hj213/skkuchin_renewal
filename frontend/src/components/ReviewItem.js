import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_reviews, delete_review, modify_review } from "../actions/review/review";
import { load_review} from "../actions/review/review"
import { load_favorite } from "../actions/favorite/favorite";
import { load_menu }  from "../actions/menu/menu";

import {BadgeProps} from '@mui/material/Badge'
import {styled} from '@mui/material/styles';
import { IconButton, MenuItem, Menu,Select, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png';
import close from '../image/close.png';
import profile from '../image/profile.png';
import more from '../image/more_vert.png';
import { displayReviewTag, reviewsTags } from "./TagList";
import ReviewStar from "./ReviewStar";
import Link from 'next/link';

// ReviewItem 컴포넌트 추출
const ReviewItem = ({ index, review, user, handleEdit, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMoreClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <Grid container key={index} style={{margin:"0 0 20px 0"}}>
            <Grid container style={{margin:'20px 0px 0px', justifyContent:'left'}}>
                <Grid item xs={2}>
                    { review && review.user_id === user.id ?
                        <Badge badgeContent={"나"} color="secondary">
                            <Avatar alt="" src={ user.image} />
                        </Badge> : <Avatar alt="" src={user.image} />}

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
                        { review.user_id === user.id ?
                        <Grid item>
                            <IconButton onClick={handleMoreClick}>
                                <Image src={more} width={4.33} height={17.33} />
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
                                <MenuItem sx={{fontSize: '15px'}} onClick={()=> {handleDelete(review.id); handleMenuClose();}}>삭제{review.id} {index}</MenuItem>
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
                <Card style={{
                    borderRadius: '0px 15px 15px 15px',
                    backgroundColor:'#FFE885'
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
                    <Grid>
                    <Stack direction="column" style={{marginRight:"6px", marginBottom:"6px"}} key={index}>
                        {reviewsTags(tag)}
                    </Stack>
                </Grid>
                ))}
            </Grid>

            <Grid container style={{margin:'15px 0px 0px', justifyContent:'left'}}>
                {review.images && review.images.length > 0 ? (
                    <div style={{ display: 'flex', overflow: 'auto' }}>
                        {review.images.map((image, index) => (
                            <div key={index} style={{ marginRight: '10px' }}>
                                <Image
                                    width={150}
                                    height={150}
                                    src={image}
                                    alt={`image-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </Grid>
      </Grid>
    );
  }
  

export default ReviewItem;