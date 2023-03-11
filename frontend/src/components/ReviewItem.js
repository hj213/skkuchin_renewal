import { useEffect, useState, useRef } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,IconButton, MenuItem, Menu,Select, CssBaseline, Box, Rating, ThemeProvider, Slide, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import { useRouter } from "next/router";
import Image from 'next/image';
import more from '../image/more_vert.png';
import { displayReviewTag, reviewsTags } from "./TagList";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { displayProfile } from '../components/MyPage/ProfileList';

// ReviewItem 컴포넌트 추출
const ReviewItem = ({ index, review, user, handleEdit, handleDelete }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleReport = (id) => {
        router.push({
            pathname: '/reportReivew',
            query: { reviewId : id }
        })
    }

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

      // 밥약 신청하기 버튼
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }


    return (
        <Grid container key={index} style={{margin:"-10px 0 40px 0"}}>
            <Grid container style={{margin:'0px 0px 0px', justifyContent:'left'}}>
                <Grid item xs={2} style={{marginTop:'3px'}}>
                    { review && review.user_id === user.id ?
                        <StyledBadge badgeContent={"나"}>
                            {displayProfile(user.image, 40, 40)}
                        </StyledBadge> : <Grid>
                            {displayProfile(review.user_image, 40, 40)}
                        </Grid>
                            }
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
                                    수정 
                                </MenuItem>
                                <MenuItem sx={{fontSize: '15px'}} onClick={handleSubmit}>
                                    삭제 
                                </MenuItem>
                            </Menu>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: { 
                                    borderRadius: '10px', 
                                    boxShadow: 'none', 
                                    maxWidth: '100vw', 
                                    maxHeight: '100vh'
                                    }
                                }}
                                BackdropProps={{
                                    sx: {
                                    backgroundColor: 'rgba(50, 50, 50, 0.25)',
                                    maxWidth: '100vw',
                                    maxHeight: '100vh'
                                    }
                                }}
                            >
                                <DialogContent sx={{p: '20px 24px 13px'}}>
                                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                                        <DialogTitle component="span" sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>{"삭제하시겠습니까?"}</DialogTitle>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{p:'0'}}>
                                    <div style={{width: '100%', paddingBottom: '16px'}}>
                                        <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleClose}>취소</Button>
                                        <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={()=> {handleDelete(review.id); handleClose(); handleMenuClose();}}>삭제</Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        : <Grid item style={{marginTop:'-10px'}}>
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
                                <MenuItem sx={{fontSize: '15px'}} onClick={handleSubmit}>
                                    신고
                                </MenuItem>
                            </Menu>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: { 
                                    borderRadius: '10px', 
                                    boxShadow: 'none', 
                                    maxWidth: '100vw', 
                                    maxHeight: '100vh'
                                    }
                                }}
                                BackdropProps={{
                                    sx: {
                                    backgroundColor: 'rgba(50, 50, 50, 0.25)',
                                    maxWidth: '100vw',
                                    maxHeight: '100vh'
                                    }
                                }}
                            >
                                <DialogContent sx={{p: '20px 24px 13px'}}>
                                    <DialogContentText sx={{textAlign: 'center', fontWeight: '500px'}}>
                                        <DialogTitle component="span" sx={{color: '#000', fontSize: '15px', p: '11px 23px 5px', m: '0'}}>{"신고하시겠습니까?"}</DialogTitle>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions sx={{p:'0'}}>
                                    <div style={{width: '100%', paddingBottom: '16px'}}>
                                        <Button sx={{width: '50%', p: '0', m: '0', color: '#000', borderRadius: '0',borderRight: '0.25px solid #A1A1A1'}} onClick={handleClose}>취소</Button>
                                        <Button sx={{width: '50%', p: '0', m: '0', color: '#D72D2D', borderRadius: '0', borderLeft: '0.25px solid #A1A1A1'}} onClick={()=> {handleReport(review.id); handleClose(); handleMenuClose();}}>신고</Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                        </Grid>}
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

            <Grid container style={{margin:'3px 0px 0px', justifyContent:'left'}}>
                {review.images && review.images.length > 0 ? (
                    <div style={{ display: 'flex', overflow: 'auto' }}>
                        {review.images.map((image, index) => (
                            <div key={index} style={{ marginRight: '10px'}}>
                                <Image
                                    width={150}
                                    height={150}
                                    src={image}
                                    alt={`image-${index}`}
                                    placeholder="blur" 
                                    blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                                    layout='fixed'
                                    objectFit='cover'
                                    style={{borderRadius:'10px'}}
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