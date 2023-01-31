import { useDispatch, useSelector} from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react"; 

import { load_places } from "../actions/place/place";
import { load_favorite } from "../actions/favorite/favorite";
import { load_menu }  from "../actions/menu/menu";

import { CssBaseline, Box, ThemeProvider,Slide, Card, CardContent, Typography, Grid, Container, Stack, Hidden } from '@mui/material';
import Layout from '../hocs/Layout';
import theme from '../theme/theme';
import Image from 'next/image';
import back from '../image/arrow_back_ios.png'
import close from '../image/close.png'
import tag16 from '../image/tag16.png'
import tag17 from '../image/tag17.png'
import tag14 from '../image/tag14.png'
import image from '../image/사진 더보기-1.png'

import emptyStar from '../image/Star border-1.png';
import filledStar from '../image/Star-1.png';
import character from '../image/character.png';

import TextField from '@mui/material/TextField';
import ReviewStar from "../components/ReviewStar";


const reviewWrite = () => {

    // 전체화면 시, 헤더영역 아이콘 클릭 이벤트
    const handleOnclick = (event) =>{
        if(event.target.name == 'back' ){
            setOpen({ bool:false,
                Visibility:'hidden'});
            setHeight('32%');
            setCardStyle({
                radius:'30px 30px 0px 0px',
                iconVisibility: 'visible'
            })
        } 
    };  

    const router = useRouter();
    const { id } = router.query;

    // Part 1) place, 가게 정보 (place API)
    const dispatch = useDispatch();
    const [place_id, setPlaceId] = id != null ? useState(id) : useState('');
    const places = useSelector(state => state.place.place);

    // rating
    const [rating, setRating] = useState(0);

    const handleTouch = (index) => {
        // setRating(index);
        if (index + 1 === rating) {
            setRating(0);
        } else {
            setRating(index + 1);
        }
    };

    const user = useSelector(state => state.auth.user);


    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
            {/* 전체 틀 */}
            <div style={{ position: 'relative', width:'100%', height:'100%'}}>  

            {/* 상단 헤더 */}
            <Container fixed style={{padding: '0px 16px 0px 0px', overflow: "hidden"}}>
                <Card style={{
                            position: 'absolute',
                            top: '0px',
                            width: '100%',
                            height: '98px',
                            zIndex: '4',
                            }}>
                    <Grid container style={{padding:'50px 15px 0px 15px', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Grid style={{padding: '0px 0px 0px 0px'}}>
                            <Image src={close} width={37} height={37} name='back' onClick={handleOnclick}/>
                        </Grid>
                    
                        <Grid onClick={()=> handleFavClick()}>
                            <Typography sx={{fontSize:'18px', fontWeight:'700'}} color="#FFCE00">
                                등록
                            </Typography>
                        </Grid> 
                    </Grid>
                </Card>
            </Container>
            
            {/* Content */}
            <Container component="main" maxWidth="xs" style={{listStyleType: "none"}}>
                <Grid container style={{padding: '10px 15px'}}>
                    <Grid style={{width:'100%'}}>
                        <CardContent>
                            <Grid container sx={{mt:0, pt:11}} style={{ justifyContent:'center'}}>
                                <Grid>
                                <Typography sx={{fontSize: '23px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                    기꾸스시
                                </Typography>
                                </Grid>
                                <Grid>
                                    <Typography sx={{fontSize: '12px', fontWeight: '500', lineHeight: '250%', paddingLeft: '4px'}} color="#a1a1a1" component="div" align="center">
                                        초밥, 롤
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid sx={{width: '100%'}}>
                                <Grid>
                                <div style={{ textAlign: "center", margin: '-5px -40px', padding: '13px 0px 5px 0px', borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
                                    {[1, 2, 3, 4, 5].map((item, index) => {
                                        let starImage = emptyStar;
                                        if (index + 1 <= rating) {
                                        starImage = filledStar;
                                        }
                                        return (
                                            <Image key={index} width={40} height={40} src={starImage} onTouchStart={() => handleTouch(index)} alt='star' />
                                        );
                                    })}
                                    <Typography sx={{fontSize: '18px', fontWeight: '700', color: '#FFCE00'}}>{`${rating}점`}</Typography>
                                </div>
                                </Grid>
                            </Grid>

                            <Grid container style={{margin:'30px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                <Typography xs={6} sx={{fontSize: '17px', fontWeight:'500', lineHeight: '97%', verticalAlign: 'top'}} color="#000000" align="center">
                                    어떤 점이 좋았나요?
                                </Typography>
                                </Grid>
                                <Grid>
                                    <Typography xs={6} sx={{fontSize: '13px', fontWeight: '500', lineHeight: '150%', paddingLeft: '4px'}} color="#a1a1a1" component="div" align="center">
                                        (최대 3개)
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid sx={{width: '100%'}}>
                                <div style={{textAlign: "center", margin: '-20px -20px 0', padding: '13px 0px 10px 0px',borderBottom: '2px solid rgba(217, 217, 217, 0.54)'}}>
                                <Grid container style={{margin: '13px 0px 11px 0px',  justifyContent: 'center'}}>
                                    <Stack direction="row" spacing={5}>
                                    <Image
                                        width= {131}
                                        height= {45}
                                        alt="tag"
                                        src={tag16}
                                    />
                                    <Image
                                        width= {128}
                                        height= {27}
                                        alt="tag"
                                        src={tag17}
                                    />
                                    </Stack>
                                    <Stack direction="row" spacing={5}>
                                    <Image
                                        width= {131}
                                        height= {45}
                                        alt="tag"
                                        src={tag16}
                                    />
                                    <Image
                                        width= {128}
                                        height= {27}
                                        alt="tag"
                                        src={tag17}
                                    />
                                    </Stack>
                                    <Stack direction="row" spacing={5}>
                                    <Image
                                        width= {131}
                                        height= {45}
                                        alt="tag"
                                        src={tag16}
                                    />
                                    <Image
                                        width= {128}
                                        height= {27}
                                        alt="tag"
                                        src={tag17}
                                    />
                                    </Stack>
                                </Grid>
                                </div>
                            </Grid>

                            <Grid container style={{margin:'10px auto 0px', justifyContent:'center'}}>
                                <Grid>
                                    <Box
                                    component="form"
                                    noValidate
                                    autoCompelet="off"
                                    sx={{'& .MuiTextField-root': { m: 1, width: '34ch' }, justifyContent:'center', alignItems:'center'}}>
                                        <TextField
                                        id="outlined-multiline-statiic"
                                        multiline
                                        rows={7}
                                        label="솔직한 리뷰를 써주세요 :)"
                                        />
                                </Box>
                                </Grid>
                            </Grid>



                        </CardContent>
                    </Grid>
                </Grid>
            </Container>






        </div>
        </Layout>
        </ThemeProvider>
        
    )
}

export default reviewWrite;