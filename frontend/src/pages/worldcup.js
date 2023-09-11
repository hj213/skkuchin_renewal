import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, mainLogo } from '../image/recommend';
import { useToggle } from '../components/Recommend/useToggle';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { dostacos, salady } from '../image/worldcup';

const SubTitle = () => (
    <div style={{ margin: "52px 0 8px" }}>
        <span style={{ 
            color: "#9E9E9E",
            fontSize: "16px",
            letterSpacing: "-0.32px",
        }}>
            #오늘은 이거다
        </span>
    </div>
);

const MainTitle = () => (
    <h1 style={{
        margin: 0,
        fontSize: "32px",
        fontWeight: 800,
        letterSpacing: "-1.28px",
    }}>
        오늘 뭐 먹지?
    </h1>
);

const Header = () => {
    const router = useRouter();

    const handleBack = useCallback((e) => {
        router.back();
    }, [])

    const handleClose = useCallback((e) => {
        router.push('/');
    }, [])

    return (
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
    );
};



const StageSelect = ({ round, setRound, setStart }) => {
    const stages = [16, 8, 4, 2];

    const mainText = "스꾸친과 함께 취향의 음식점을 알아봐요\n스꾸친스꾸친스꾸친";

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "52px 0 16px",
                    padding: "79px 16px 21px",
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
                        margin: "36px 0 76px",
                        fontSize: "14px",
                        lineHeight: "17px",
                        letterSpacing: "-0.5px",
                        whiteSpace: "pre-wrap",
                        textAlign: "center",
                    }}
                >
                    {mainText}
                </p>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {stages.map((stage, index) => (
                        <StageButton
                            isActive={round === stage}
                            onClick={() => setRound(stage)}
                            key={index}
                        >
                            {stage}강
                        </StageButton>
                    ))}
                </div>
            </div>
            <button
                onClick={() => setStart(true)}
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
        </>
    );
};

const MainStage = ({ round, setFinish }) => {
    const places = [
        {
            name: "샐러디",
            img: salady,
        },
        {
            name: "도스타코스",
            img: dostacos,
        },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "36px",
                    background: "#3C3C3C",
                    borderRadius: "10px 10px 0 0",
                    color: "#FFF",
                    textAlign: "center",
                    lineHeight: "36px",
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "-1px",
                }}
            >
                32강&nbsp;&nbsp;&nbsp;1/16
            </div>
            <div onClick={() => setFinish(true)} style={{ position: "relative", width: "100%" , height: "200px", cursor: "pointer" }}>
                <Image src={places[0].img} layout="fill" style={{ width: "100%", height: "100%" }} />
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "34px",
                        background: "rgba(34, 40, 48, 0.60)",
                        color: "#FFF",
                        textAlign: "center",
                        lineHeight: "34px",
                        fontSize: "16px",
                        fontWeight: 700,
                        letterSpacing: "-1px",
                    }}
                >
                    {places[0].name}
                </div>
            </div>
            <div onClick={() => setFinish(true)} style={{ position: "relative", width: "100%" , height: "200px", cursor: "pointer" }}>
                <Image src={places[1].img} layout="fill" style={{ width: "100%", height: "100%" }} />
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "34px",
                        background: "rgba(34, 40, 48, 0.60)",
                        color: "#FFF",
                        textAlign: "center",
                        lineHeight: "34px",
                        fontSize: "16px",
                        fontWeight: 700,
                        letterSpacing: "-1px",
                    }}
                >
                    {places[1].name}
                </div>
            </div>
        </div>
    );
};

const Finish = () => {
    const mainText = "스꾸친과 함께 취향의 음식점을 알아봐요\n스꾸친스꾸친스꾸친";


    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "52px 0 16px",
                    padding: "79px 16px 21px",
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
                        margin: "36px 0 76px",
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
                onClick={() => setStart(true)}
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
        </>
    );
};

const WorldCup = () => {
    const { Toggle, isOn } = useToggle();

    const [round, setRound] = useState(16);
    const [start, setStart] = useState(false);
    const [finish, setFinish] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{ margin: "0 24px" }}>
                <Header />
                <SubTitle />
                <div
                    style={{ 
                        marginBottom: "52px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <MainTitle />
                    {!start && <Toggle />}
                </div>
                {start ? 
                    (finish ? 
                        <Finish />
                        : <MainStage round={round} setFinish={setFinish}/>
                    ) : <StageSelect round={round} setRound={setRound} setStart={setStart} />}
            </div>
        </ThemeProvider>
    );
};

export default WorldCup;

const StageButton = styled.div`
    height: 88px;
    line-height: 88px;
    width: 22%;
    text-align: center;
    margin: 0 auto;
    border-radius: 8px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.96px;
    border: none;
    cursor: pointer;
    background: ${props => (props.isActive ? '#FFCE00' : '#E2E2E2')};
    color: ${props => (props.isActive ? '#FFF' : '#BABABA')};
`