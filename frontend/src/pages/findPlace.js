import { useState, useEffect } from "react";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, mainLogo } from '../image/recommend';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Map = dynamic(() => import('../components/Map'));

const findPlace = () => {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleClose = () => {
        router.push('/requestPlace');
    }
    const handleSubmit = () => {

    }

    return(
        // <ThemeProvider theme={theme}>
        <div>
            <div style={{ margin: "0 24px" }}>
                <div style={{ margin: "24px 0", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <input 
                        placeholder="위치를 검색해주세요."
                        style={{width: '85%', height: '42px', padding: '2px 12px', backgroundColor: '#F2F2F2', borderRadius: '8px', border: 'none', outline: 'none',}} />
                <div style={{padding: '10px 0 0 10px'}}>
                    <Image
                        src={closeIcon}
                        name='back'
                        onClick={handleClose}
                        layout='fixed'
                        width={24}
                        height={24}
                        style={{ cursor: 'pointer', alignSelf: 'center' }}
                    />
                </div>
                </div>
            </div>
            <Map/>
            <div style={{display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
                {name !== '' ?
                            <Button variant="contained" onClick={handleSubmit} style={{margin: '24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                                확인
                            </Button>
                        :
                            <Button variant="contained" disabled style={{margin: '24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                                확인
                            </Button>
                    }
                </div>
        {/* </ThemeProvider> */}
        </div>
    )
}

export default dynamic(() => Promise.resolve(findPlace), {
    ssr: false,
});