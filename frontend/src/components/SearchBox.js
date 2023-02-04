import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MapDrawer from "./MapDrawer";
import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, CssBaseline, InputBase, ThemeProvider} from '@mui/material';
import searchBox from '../image/검색창.png';

export default function SearchBox(openID){

    const router = useRouter();
    const [value, setValue] = useState('');
    
    const handleValue = (e) => {
        setValue(e.target.value);
        
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

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{marginTop:'5px'}}>
                <Grid container style={{position:'absolute', zIndex:'2', alignItems: 'center'}}>
                    <Grid item style={{marginTop:'4%', marginLeft: '5%'}}>
                        <MapDrawer open={openID} />
                    </Grid>
                    <Grid item style={{marginTop:'3.5%', marginLeft: '2%'}}>
                        <InputBase
                            sx={{ ml: 1, width:'180%'}}
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
            </div>
        </ThemeProvider>
    )
}