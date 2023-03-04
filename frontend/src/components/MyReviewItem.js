import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { Button, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,IconButton, MenuItem, Menu,Select, CssBaseline, Box, Rating, ThemeProvider, Slide, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import more from '../image/more_vert.png';
import { displayReviewTag, reviewsTags } from "./TagList";
import Link from 'next/link';

// MyReviewItem 컴포넌트 추출
const MyReviewItem = ({ index, review, handleEdit, handleDelete }) => {
    const allPlaces = useSelector(state => state.place.allplaces);

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMoreClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
      // 밥약 신청하기 버튼
    const [open, setOpen] = useState(false);
    const handleSubmit = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
  
  
    return (
        <Container key={index} sx={{listStyle: 'none', pl: '35px'}}>
            <Grid container>
                <Grid container style={{margin:'12.5px 0px 17.5px'}}>
                    <Grid item xs={12}>
                        <Stack direction="column" spacing={1}>
                            <Grid sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Link href={`/place?id=${review.place_id}`} key={review.place_id}>
                                <Typography sx={{fontSize: '17px', fontWeight:'700', lineHeight: '200%', verticalAlign: 'top',}} align="left">
                                        {allPlaces && allPlaces.find(place => place.id === review.place_id)?.name || `unknown place (place_id=${review.place_id})`}
                                    </Typography>
                                </Link>
                                <Grid item>
                                    <IconButton onClick={(event) => handleMoreClick(event, review.id)}>
                                        <Image src={more} width={4.33} height={17.33} placeholder="blur" layout='fixed' />
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
                            </Grid>
                            <Grid style={{display:'flex'}}>
                                <Rating name="read-only" size="small" value={review.rate} readOnly precision={1} />
                                <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '180%', paddingLeft:'5px'}} color="#a1a1a1" component="div" align="center">
                                    | {review.create_date.slice(0,10)}
                                </Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid container style={{margin:'10px 0px 0px', justifyContent:'left'}}>
                        <Card style={{
                            borderRadius: '0px 15px 15px 15px',
                            backgroundColor:'#FFE885'
                        }}>
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
                placeholder="blur" 
                blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='
                layout='fixed'
            />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </Grid>
                </Grid>
            </Grid>
        </Container>  
    );
  }
  

export default MyReviewItem;