import { useState } from 'react';
import { useRouter } from "next/router";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import theme from '../theme/theme';
import { backArrow, closeIcon, mainLogo } from '../image/recommend';
import { useToggle } from '../components/Recommend/useToggle';
import styled from '@emotion/styled';

const Recommend = () => {
    const { Toggle, isOn } = useToggle();
    const router = useRouter();

    const [firstButton, setFirstButton] = useState("ALL");
    const [secondButton, setSecondButton] = useState("ALL");

    const firstButtons = [
        ["ALL", "한식", "중식", "양식", "일식"],
        ["아시안음식", "카페/디저트", "술집", "기타"]
    ];

    const secondButtons = ["ALL", "정문", "쪽문", "철문", "대학로"];

    const handleBack = (e) => {
        router.back();
    }

    const handleClose = (e) => {
        router.push('/');
    }

    const OptionContainer = styled.div`
        padding: 8px 0;
        border-top: 1px solid #E2E2E2;
        border-bottom: 1px solid #E2E2E2;
    `

    const Options = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        &:nth-child(2) {
            margin-top: 4px
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

    const mainText = "뭘 먹고 싶은 지 모르겠어쩌고\n스꾸친과 함께 스꾸친스꾸친";

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
                        #성대 메뉴 추천 룰렛
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
                        오늘 뭐 먹지?
                    </h1>
                    <Toggle />
                </div>
                <OptionContainer style={{ marginBottom: "16px" }}>
                    {firstButtons.map((buttons) => (
                        <Options>
                            {buttons.map((button) => (
                                <Button
                                    isActive={firstButton === button}
                                    onClick={() => setFirstButton(button)}
                                    key={button}
                                >
                                    {button}
                                </Button>
                            ))}
                        </Options>
                    ))}
                </OptionContainer>
                <OptionContainer>
                    <Options>
                        {secondButtons.map((button) => (
                            <Button
                                isActive={secondButton === button}
                                onClick={() => setSecondButton(button)}
                                key={button}
                            >
                                {button}
                            </Button>
                        ))}
                    </Options>
                </OptionContainer>
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
                            marginBottom: 0,
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
                    오늘 뭐 먹지?
                </button>
            </div>
        </ThemeProvider>
    );
};

export default Recommend;