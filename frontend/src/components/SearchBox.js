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

export default function SearchBox({openID, handleFocus}){

    const dispatch = useDispatch();
    const router = useRouter();
    const [value, setValue] = useState('');
    const [filteredPlace, setFilteredPlace] =useState([]);
    const [auto, setAuto] = useState([]);
    
    const place = useSelector(state => state.place.place);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_places());
            dispatch(load_user());
        }
    }, [dispatch]);
    
    //캠퍼스 필터링
    useEffect(() => {
        if (place) {
            setFilteredPlace(place.filter((item) => item.campus === user.toggle));
        } else {
            setFilteredPlace([]);
        }
    }, [place, user]);

    const handleValue = (e) => {
        setValue(e.target.value);

        if(e.target.value == ''){setAuto([]);}
        const newAuto = filteredPlace.filter((item) => item.name.includes(e.target.value));
        setAuto(newAuto);
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
            query: {keyword: auto}
        });
        setValue('');
        setAuto([]);
    }

    //드로워, 검색창 활성화되었을 때 true값 index.js로 전송
    const handleOnFocus = () => {
        handleFocus(true);
    }

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
            <div style={{marginTop:'5px'}} >
                <Grid container style={{position:'absolute', zIndex:'3', alignItems: 'center'}} onFocus={handleOnFocus}>
                    <Grid item style={{marginTop:'4%', marginLeft: '5%'}} >
                        <MapDrawer open={openID} />
                    </Grid>
                    <Grid item style={{marginTop:'3.3%', marginLeft: '2%'}}>
                
                        <InputBase
                            sx={{ ml: 1, width:'420%'}}
                            placeholder="오늘은 라멘 어때요?"
                            value={value}
                            onChange={handleValue}
                            onKeyDown={handleKeyDown}
                        />
                      
                    </Grid>
                </Grid>
                <div style={{position: 'relative'}}>
                    <Image src={searchBox} />
                </div>
                {auto.length > 0 && (
                <div style={{margin:'-10px 0px 0px 7px', position:'relative'}}>
                    <Paper style={{height:'150px', width:'97%', overflowY:'scroll', position:'absolute', zIndex:'5'}}>
                        <Container style={{padding:'0px'}}>
                            <ul style={{paddingTop:'3px', listStyleType: "none",}}>
                                {auto.map((autoList) => (
                                    <li
                                        key={autoList.id}
                                        // onClick={handleAutoOnClick(autoList.name)}
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