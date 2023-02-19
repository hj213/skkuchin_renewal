import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import MapDrawer from "./MapDrawer";
import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, CssBaseline, InputBase,TextField, Paper, styled, ThemeProvider, Container, Typography} from '@mui/material';
import searchBox from '../image/검색창.png';
import { load_places } from "../actions/place/place";
import { load_user } from "../actions/auth/auth";
import marker from '../image/marker.png';
import noAuto from '../image/noinfo_enheng.png';

export default function SearchBox({openID, handleFocus, handleClick}){

    const dispatch = useDispatch();
    const router = useRouter();
    const [value, setValue] = useState('');
    const [filteredPlace, setFilteredPlace] =useState([]);
    const [auto, setAuto] = useState([]);
    const [autoBox, setAutoBox] = useState(false);
    
    const allPlaces = useSelector(state => state.place.allplaces);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(load_user());
            dispatch(load_places());

        }
    }, [dispatch]);
    
    //캠퍼스 필터링
    useEffect(() => {
        if (allPlaces && user) {
            setFilteredPlace(allPlaces.filter((item) => item.campus === user.toggle));
        } else {
            setFilteredPlace([]);
        }
    }, [allPlaces, user]);
   
    const handleValue = (e) => {
        setValue(e.target.value);

        if(e.target.value === ''){
            setAuto([]);
        } else{
            const newAuto = filteredPlace.filter((item) => item.name.includes(e.target.value));
            setAuto(newAuto);
            
        }
    }

    const handleKeyDown = (e) => {
        e.preventDefault();
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

    const handleInputOnFocus = () => {
        setAutoBox(true);
    }

    // const handleInputOnBlur = (e) => {
    //     e.preventDefault();
    //     setAutoBox(false);
    // }
    
    // const handleOnClick = () => {
    //     handleClick(true);
    // }    

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div>
                <div style={{marginTop:'5px'}} >
                    <Grid container style={{position:'absolute', top:'53%', left:'60%', transform: 'translate(-50%, -50%)', zIndex:'3', alignItems: 'center'}} onFocus={handleOnFocus}>
                        <Grid item name="mapdrawer">
                            <MapDrawer open={openID} />
                        </Grid>
                        <Grid item name='input' style={{marginTop:'-2px'}}>
                    
                            <InputBase
                                sx={{ ml: 1, width:'155%'}}
                                placeholder="오늘은 라멘 어때요?"
                                value={value}
                                onChange={handleValue}
                                onKeyDown={handleKeyDown}
                                onFocus={handleInputOnFocus}
                                // onBlur={handleInputOnBlur}
                            />
                        
                        </Grid>
                    </Grid>
                    <div style={{position: 'relative', padding:'0px 16px', zIndex:'2'}}>
                        <Image src={searchBox} layout="responsive"/>
                    </div>
                </div>
                {autoBox && (
                // <div style={{margin:'0px 0px 0px 7px',position:'absolute', top:'100%'}}>
                    <Paper style={{position:'absolute',height:'100vh', width:'100%', top:'0px', overflowY:'scroll', border: '1px solid transparent',
                    borderRadius: '0px'}}> 
                        <Container style={{padding:'0px', marginTop:'110px'}}>
                            {auto.length > 0 ?
                            <ul style={{padding:'0px 25px 0px 25px', listStyleType: "none",}}>
                                {auto.map((autoList) => (
                                    <li
                                        key={autoList.id}
                                        onClick={()=>handleAutoOnClick(autoList.name)}
                                        style={{ padding:'15px 10px 7px 10px',borderBottom: '1px solid #D9D9D9'}}
                                    >   
                                        <Grid container>
                                            <Grid item style={{margin:'10px 0px 0px 0px'}}>
                                                <Image src={marker} width={17} height={23}/>
                                            </Grid>
                                            <Grid item style={{margin:'0px 0px 0px 12px'}}>
                                                <div style={{fontSize:'16px'}}>
                                                {autoList.name}
                                                </div>
                                                <div style={{fontSize:'12px', color:'#a1a1a1'}}>
                                                    {autoList.address.substr(2)}
                                                </div>
                                            </Grid>
                                            
                                        </Grid>
                                        
                                    </li>
                                ))}
                            </ul>
                            : (
                                <div style={{textAlign:'center', paddingTop:'110px'}}>
                                    <Image src={noAuto} width={129} height={108}/>
                                    <Typography color={theme.palette.fontColor.light} fontWeight={theme.typography.h2} style={{fontSize:'14px'}} >검색결과가 없습니다.</Typography>
                                </div>
                            )}
                        </Container>
                    </Paper>
                // </div>
                )}
            </div>
        </ThemeProvider>
    )
}