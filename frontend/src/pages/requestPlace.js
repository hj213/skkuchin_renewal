import { useState, useEffect } from "react";
import { CssBaseline, Box, ThemeProvider, Grid,Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, mainLogo } from '../image/recommend';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const requestPlace = () => {
    const router = useRouter();
    const [campus, setCampus] = useState('명륜');
    const [name, setName] = useState('');

    const handleClose = () => {
        router.push('/myPage');
    }
    const handleCampus = (e) => {
        let cur = e.target.innerText;
        if (cur == '명륜') setCampus('율전')
        else setCampus('명륜')
    }

    const handleInputClick = () => {
        router.push('/findPlace');
    }

    const handleSubmit = (e) => {

    }
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{ margin: "0 24px" }}>
                <div style={{ margin: "24px 0", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    {/* <Image
                        src={backArrow}
                        onClick={handleBack}
                        layout="fixed"
                        width={24}
                        height={24}
                        style={{ cursor: 'pointer' }}
                    /> */}
                    <div></div>
                    <Typography style={{ height: '24px', fontSize: '20px', fontWeight: '700', color: '#3C3C3C'}}>식당 추가 요청</Typography>
                    <Image
                        src={closeIcon}
                        name='back'
                        onClick={handleClose}
                        layout='fixed'
                        width={24}
                        height={24}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>

            <Box
            sx={{
            margin: '24px 24px 31px 24px',
            display: 'flex',
            flexDirection: 'column',
            //alignItems: 'center',
            }}
            >
                <Typography style={{margin: '24px 0', fontSize: '18px', fontWeight: '900', color: '#3C3C3C'}}>무슨 식당을 추가할까요?</Typography>
                <Grid container>
                    <Typography style={{height: '21px', padding: '5px 0', marginRight: '10px', fontWeight: '700', fontSize: '14px', color: '#777777'}}>캠퍼스 종류</Typography>
                    <Button 
                        style={{maxWidth: '33px', minWidth: '33px', fontWeight: '700', fontSize: '12px', marginRight: '10px', padding: '5px', borderRadius: '10px', backgroundColor: '#FFFCE4'}}
                        onClick={handleCampus}>
                    {campus}
                    </Button>
                    <Typography style={{height: '21px', padding: '6px 0', fontSize: '12px', color: '#777777'}}>클릭하여 변경</Typography>
                </Grid>

                <Box sx={{margin: '24px 0', width: '100%'}}>
                    <Typography style={{height: '21px', padding: '5px 0', fontWeight: '700', fontSize: '14px', color: '#777777'}}>식당 위치</Typography>
                    <input 
                        onClick={handleInputClick}
                        placeholder="위치를 검색해주세요."
                        style={{width: '100%', padding: '12px', backgroundColor: '#F2F2F2', borderRadius: '8px', border: 'none', outline: 'none', marginTop: '20px'}} />
                </Box>

                <Box style={{width: '100%'}}>
                <Typography style={{height: '21px', padding: '5px 0', fontWeight: '700', fontSize: '14px', color: '#777777', marginBottom: '10px'}}>요청 이유 <span style={{color: '#BABABA'}}>(선택)</span></Typography>
                <textarea 
                    placeholder="내용을 입력해주세요."
                    style={{width: '100%', height: '230px', padding: '16px', border: '1px solid #E2E2E2', borderRadius: '12px', outline: 'none'}}
                />
                </Box>

                <div style={{position: 'fixed', left: '0', right: '0', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff'}}>
                {name !== '' ?
                            <Button variant="contained" onClick={handleSubmit} style={{margin: '24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                                요청하기
                            </Button>
                        :
                            <Button variant="contained" disabled style={{margin: '24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                                요청하기
                            </Button>
                    }
                </div>
            </Box>
        </ThemeProvider>
    )
}

export default dynamic(() => Promise.resolve(requestPlace), {
    ssr: false,
});