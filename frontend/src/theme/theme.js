import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffce00',
        },
        fontColor: {
            main: '#BABABA', 
            light: '#A1A1A1',
            dark: '#505050' //가장 어두운 색
        },
        wrong: {
            main:'#FF3B3B', //wrong
        },
        correct: {
            main:"#12A054" //correct
        },
        none: {
            main:"#c4c4c4"
        }
    },
    typography: {
        fontFamily: 'NanumSquareRound, sans-serif',
    },
    shape: {
        borderRadius: 10
    }
});

export default theme;
