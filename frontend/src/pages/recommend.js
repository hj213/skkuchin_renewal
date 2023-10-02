import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, mainLogo } from '../image/recommend';
import { useToggle } from '../components/Recommend/useToggle';
import styled from '@emotion/styled';
import SlideContainer from '../components/Recommend/SlideContainer';
import { useDispatch, useSelector } from 'react-redux';
import { load_places } from '../actions/place/place';
import { useLoadingLottie } from '../components/Recommend/useLoadingLottie';

const SubTitle = () => (
    <div style={{ margin: "52px 0 8px" }}>
        <span style={{ 
            color: "#9E9E9E",
            fontSize: "16px",
            letterSpacing: "-0.32px",
        }}>
            #성대 메뉴 추천 룰렛
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

const Recommend = () => {
    const dispatch = useDispatch();
    const { LottieView, getNextLottie, setSpeed, duration } = useLoadingLottie();
    const { Toggle, isOn } = useToggle();
    const places = useSelector(state => state.place.allplaces);

    const [retry, setRetry] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [categoryButton, setCategoryButton] = useState("ALL");
    const [gateButton, setGateButton] = useState("ALL");
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [randomPlace, setRandomPlace] = useState(null);

    const categoryButtons = [
        ["ALL", "한식", "중식", "양식"],
        ["일식", "카페", "술집", "기타"]
    ];
    const gateButtons = ["ALL", "정문", "쪽문", "철문", "대학로"];
    
    const mainText = "뭘 먹고 싶은 지 모르겠어쩌고\n스꾸친과 함께 스꾸친스꾸친";

    const clickStart = useCallback(() => {
        if (filteredPlaces.length === 0) {
            alert("존재하는 식당이 없습니다!");
            return;
        }
        if (!retry) {
            setRetry(true);
        }
        if (!isRunning) {
            setIsRunning(true);
        }
    }, [retry, isRunning, filteredPlaces]);

    const getRandomPlace = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * filteredPlaces.length);
        setRandomPlace(filteredPlaces[randomIndex]);
    }, [filteredPlaces]);

    useEffect(() => {
        dispatch(load_places());
    }, [])
        
    useEffect(() => {
        if (places) {
            let tempPlaces = places;
            tempPlaces = tempPlaces.filter(place => isOn ? place.campus === "명륜" : place.campus === "율전");

            if (categoryButton !== "ALL") {
                tempPlaces = tempPlaces.filter(place => place.category === categoryButton);
            }
            if (gateButton !== "ALL") {
                tempPlaces = tempPlaces.filter(place => place.gate === gateButton);
            }
            setFilteredPlaces(tempPlaces);
        }
    }, [isOn, categoryButton, gateButton, places])

    useEffect(() => {
        let timeoutId;

        if (isRunning) {
            setSpeed();
            timeoutId = setTimeout(() => {
                getRandomPlace();
                setIsRunning(false);
                getNextLottie();
            }, duration);
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [isRunning])

    return (
        <RecommendWrapper>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div style={{ margin: "0 24px", position: "relative", overflow: "hidden" }}>
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
                        <Toggle />
                    </div>
                    <OptionContainer style={{ marginBottom: "16px" }}>
                        {categoryButtons.map((buttons, index) => (
                            <Options key={index}>
                                {buttons.map((button, index) => (
                                    <Button
                                        isActive={categoryButton === button}
                                        onClick={() => setCategoryButton(button)}
                                        key={index}
                                    >
                                        {button}
                                    </Button>
                                ))}
                            </Options>
                        ))}
                    </OptionContainer>
                    <OptionContainer>
                        <Options>
                            {gateButtons.map((button, index) => (
                                <Button
                                    isActive={gateButton === button}
                                    onClick={() => setGateButton(button)}
                                    key={index}
                                >
                                    {button}
                                </Button>
                            ))}
                        </Options>
                    </OptionContainer>
                    {isRunning ?
                        <div
                            style={{
                                width: '100%',
                                height: '197px',
                                margin: "28px 0 8px",
                            }}
                        >
                            {LottieView}
                        </div>
                    :
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "28px 0 8px",
                                padding: "44px 0 40px",
                                borderRadius: "8px",
                                background: "#F2F2F2",
                            }}
                        >
                            <Image
                                src={mainLogo}
                                width={87}
                                height={61}
                                layout='fixed'
                            />
                            <p
                                style={{
                                    marginTop: "16px",
                                    marginBottom: 0,
                                    fontSize: retry ? "32px" : "14px",
                                    lineHeight: retry ? "normal" : "17px",
                                    letterSpacing: retry ? "-3px" : "-0.5px",
                                    whiteSpace: "pre-wrap",
                                    textAlign: "center",
                                    fontWeight: retry ? 800 : 400,
                                }}
                            >
                                {retry ? randomPlace.name : mainText}
                            </p>
                        </div>
                    }
                    <button
                        style={{
                            width: "100%",
                            padding: "16px 0",
                            borderRadius: "8px",
                            background: isRunning ? "#E2E2E2" : "#FFCE00",
                            border: "none",
                            color: "#FFF",
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: 800,
                            cursor: isRunning ? undefined : "pointer",
                        }}
                        disabled={isRunning}
                        onClick={clickStart}
                    >
                        {retry ? '다시하기' : '오늘 뭐 먹지?'}
                    </button>
                </div>
                {retry && !isRunning &&
                    <SlideContainer filteredPlaces={filteredPlaces} />
                }
            </ThemeProvider>
        </RecommendWrapper>
    );
};

export default Recommend;

const RecommendWrapper = styled.div`
    /* 데스크톱에서 스크롤 바를 숨김 */
    ::-webkit-scrollbar {
        display: none;
    }
    /* 모바일에서 스크롤 바를 숨김 */
    *::-webkit-scrollbar {
        display: none;
    }
`;

const OptionContainer = styled.div`
    padding: 8px 0;
    border-top: 1px solid #E2E2E2;
    border-bottom: 1px solid #E2E2E2;
`

const Options = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    :nth-of-type(2) {
        margin-top: 4px;
    }
`

const Button = styled.div`
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.28px;
    padding: 5px 16px 4px;
    text-align: center;
    border-radius: 8px;
    background: #FFF;
    border: none;
    cursor: pointer;
    background: ${props => (props.isActive ? '#FFDF56' : 'transparent')};
`