import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffce00',
        },
        fontColor: {
            main: '#BABABA', 
            light: '#A1A1A1',
            dark: '#505050'
        }
    },
    typography: {
        fontFamily: 'NanumSquareRound, sans-serif',
    },
});

export default theme;
