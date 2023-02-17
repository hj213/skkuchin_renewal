import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import MapDrawer from "./MapDrawer";
import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, CssBaseline, InputBase,TextField, Paper, styled, ThemeProvider, Container} from '@mui/material';
import searchBox from '../image/검색창.png';
import { load_places } from "../actions/place/place";
import { load_user } from "../actions/auth/auth";

export default function SearchBox({openID, handleFocus, handleClick}){

    const dispatch = useDispatch();
    const router = useRouter();
    const [value, setValue] = useState('');
    const [filteredPlace, setFilteredPlace] =useState([]);
    const [auto, setAuto] = useState([]);
    const [notChanged, setNotchanged] = useState(false);
    
    const allPlaces = useSelector(state => state.place.allplaces);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_user());
        }
    }, [dispatch]);

    useEffect(()=>{
        if(!notChanged){
            dispatch(load_places());
            setNotchanged(true);
        }
    }, [notChanged]);
    
    //캠퍼스 필터링
    useEffect(() => {
        if (allPlaces) {
            setFilteredPlace(allPlaces.filter((item) => item.campus === user.toggle));
        } else {
            setFilteredPlace([]);
        }
    }, [allPlaces, user]);
   
    const handleValue = (e) => {
        setValue(e.target.value);

        if(e.target.value == ''){
            setAuto([]);
        } else{
            const newAuto = filteredPlace.filter((item) => item.name.includes(e.target.value));
            setAuto(newAuto);
            
        }
        
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            setValue(e.target.value);
            router.push({
                pathname: '/searchList',
                query: { keyword: value}
              });
            setValue('');
        }
    }

    const handleAutoOnClick = (autoValue) => {
        setValue(autoValue);
        setAuto(autoValue);
        router.push({
            pathname:'/searchList',
            query: {keyword: autoValue}
        });
        setValue('')
        setAuto([]);
    }

    //드로워, 검색창 활성화되었을 때 true값 index.js로 전송
    const handleOnFocus = () => {
        handleFocus(true);
    }

    // const handleOnClick = () => {
    //     handleClick(true);
    // }

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: 'transparent',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'transparent',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },
        },
      });

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <div style={{marginTop:'5px'}} >
                    <Grid container style={{position:'absolute', top:'33%', left:'10%', zIndex:'3', alignItems: 'center'}} onFocus={handleOnFocus}>
                        <Grid item >
                            <MapDrawer open={openID} />
                        </Grid>
                        <Grid item  style={{marginTop:'-2px'}}>
                    
                            <InputBase
                                sx={{ ml: 1, width:'155%'}}
                                placeholder="오늘은 라멘 어때요?"
                                value={value}
                                onChange={handleValue}
                                onKeyDown={handleKeyDown}
                            />
                        
                        </Grid>
                    </Grid>
                    <div style={{position: 'relative'}}>
                        <Image src={searchBox} layout="responsive" />
                    </div>
                </div>
                {auto.length > 0 && (
                <div style={{margin:'-10px 0px 0px 7px',position:'absolute', top:'100%'}}>
                    <Paper style={{height:'150px', width:'220%', overflowY:'scroll'}}> {/* 이미지 크기에 따라 수정해야합니다 */}
                        <Container style={{padding:'0px'}}>
                            <ul style={{paddingTop:'3px', listStyleType: "none",}}>
                                {auto.map((autoList) => (
                                    <li
                                        key={autoList.id}
                                        onClick={()=>handleAutoOnClick(autoList.name)}
                                        style={{padding:'5px'}}
                                    >
                                        {autoList.name}
                                    </li>
                                ))}
                            </ul>
                        </Container>
                    </Paper>
                </div>
                )}
            </div>
        </ThemeProvider>
    )
}