import { createTheme } from '@mui/material/styles';

const NanumSquareRoundExtraBold = "../font/NanumSquareRoundOTFEB.otf";
const NanumSquareRoundBold = "../font/NanumSquareRoundOTFB.otf";
const NanumSquareRound = "../font/NanumSquareRoundOTFR.otf";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffce00',
        },
        fontColor: {
            main: '#BABABA', 
            light: '#A1A1A1',
            dark: '#505050' //가장 어두운 색
        }
    },
    typography: {
        fontFamily: 'NanumSquareRound, sans-serif',
        fontStyle: 'normal',
        h1: {
            fontWeight: 800,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 400,
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'NanumSquareRound';
                    font-weight: 800;
                    font-style: normal;
                    src: url(${NanumSquareRoundExtraBold}) format('otf');
                },
                @font-face {
                    font-family: 'NanumSquareRound';
                    font-weight: 700;
                    font-style: normal;
                    src: url(${NanumSquareRoundBold}) format('otf');
                },
                @font-face {
                    font-family: 'NanumSquareRound';
                    font-weight: 400;
                    font-style: normal;
                    src: url(${NanumSquareRound}) format('otf');
                },
            `,
        },
    },
});

export default theme;
