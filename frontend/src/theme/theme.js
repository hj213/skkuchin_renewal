import { createTheme } from '@mui/material/styles';

const NotoSansKRBold = "../font/NotoSansKR-Bold.otf"
const NotoSansKRMedium = "../font/NotoSansKR-Medium.otf"
const NotoSansKRRegular = "../font/NotoSansKR-Regular.otf"

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
        fontFamily: 'Noto Sans KR, sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 500,
        },
        h3: {
            fontWeight: 400,
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Noto Sans KR';
                    font-weight: 700;
                    src: local('NotoSansKR-Bold'), url(${NotoSansKRBold}) format('otf');
                },
                @font-face {
                    font-family: 'Noto Sans KR';
                    font-weight: 500;
                    src: local('NotoSansKR-Medium'), url(${NotoSansKRMedium}) format('otf');
                },
                @font-face {
                    font-family: 'Noto Sans KR';
                    font-weight: 400;
                    src: local('NotoSansKR-Regular'), url(${NotoSansKRRegular}) format('otf');
                },
            `,
        },
    },
});

export default theme;
