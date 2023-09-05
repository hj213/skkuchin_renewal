import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, mainLogo } from '../image/recommend';
import { useToggle } from '../components/Recommend/useToggle';

const WorldCup = () => {
    const { Toggle, isOn } = useToggle();
    const router = useRouter();

    const handleBack = (e) => {
        router.back();
    }

    const handleClose = (e) => {
        router.push('/');
    }

    const mainText = "스꾸친과 함께 취향의 음식점을 알아봐요\n스꾸친스꾸친스꾸친";

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{ margin: "0 24px" }}>
                <div style={{ margin: "15px 0", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Image
                        src={backArrow}
                        onClick={handleBack}
                        layout="fixed"
                        width={24}
                        height={24}
                        style={{ cursor: 'pointer' }}
                    />
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
                <div style={{ margin: "52px 0 8px" }}>
                    <span style={{ 
                        color: "#9E9E9E",
                        fontSize: "16px",
                        letterSpacing: "-0.32px",
                    }}>
                        #오늘은 이거다
                    </span>
                </div>
                <div 
                    style={{ 
                        marginBottom: "52px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h1 style={{
                        margin: 0,
                        fontSize: "32px",
                        fontWeight: 800,
                        letterSpacing: "-1.28px",
                    }}>
                        음식점 월드컵
                    </h1>
                    <Toggle />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "52px 0 16px",
                        padding: "117px 0 137px",
                        borderRadius: "8px",
                        background: "#F2F2F2",
                    }}
                >
                    <Image
                        src={mainLogo}
                        width={152}
                        height={107}
                        layout='fixed'
                    />
                    <p
                        style={{
                            margin: "36px 0 0",
                            fontSize: "14px",
                            lineHeight: "17px",
                            letterSpacing: "-0.5px",
                            whiteSpace: "pre-wrap",
                            textAlign: "center",
                        }}
                    >
                        {mainText}
                    </p>
                </div>
                <button
                    style={{
                        width: "100%",
                        padding: "16px 0",
                        borderRadius: "8px",
                        background: "#FFCE00",
                        border: "none",
                        color: "#FFF",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 800,
                        cursor: "pointer",
                    }}
                >
                    시작하기
                </button>
            </div>
        </ThemeProvider>
    );
};

export default WorldCup;