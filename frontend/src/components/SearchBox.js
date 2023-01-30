import { useState } from "react";
import MapDrawer from "./MapDrawer";
import theme from "../theme/theme";
import Image from 'next/image';
import {Grid, InputBase, ThemeProvider} from '@mui/material';
import searchBox from '../image/검색창.png';

export default function SearchBox(){

    const [value, setValue] = useState('');

    const handleValue = (e) => {
        setValue(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13){
            setValue('');
        }
    }

    return(
        <ThemeProvider theme={theme}>
            <div style={{marginTop:'5px'}}>
                <Grid container style={{position:'absolute', zIndex:'2', alignItems: 'center'}}>
                    <Grid item style={{margin:'17px 0px 0px 20px'}}>
                        <MapDrawer/>
                    </Grid>
                    <Grid item style={{margin:'15px 0px 0px 4px'}}>
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
                    <Image src={searchBox}/>
                </div>
            </div>
        </ThemeProvider>
    )
}