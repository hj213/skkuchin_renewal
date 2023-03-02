import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { IconButton, MenuItem, Menu,Select, CssBaseline, Box, Rating, ThemeProvider, Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden, Avatar, Badge, ImageList, ImageListItem } from '@mui/material';
import theme from '../theme/theme';
import Image from 'next/image';
import more from '../image/more_vert.png';
import { displayReviewTag, reviewsTags } from "./TagList";
import Link from 'next/link';

// MyReviewItem 컴포넌트 추출
const MyReviewItem = ({ index, review, handleEdit, handleDelete }) => {
    const dispatch = useDispatch();
    const allPlaces = useSelector(state => state.place.allplaces);

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMoreClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
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
                                            수정 {review.id} 
                                        </MenuItem>
                                        <MenuItem sx={{fontSize: '15px'}} onClick={()=> {handleDelete(review.id); handleMenuClose();}}>삭제{review.id}</MenuItem>
                                    </Menu>
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