import styled from '@emotion/styled';
import { useCallback } from 'react';

const Popup = ({ selectedPlace, setPopup }) => {

    const goToUrl = useCallback(() => {
        window.location.href = selectedPlace.current.url;
    }, []);

    return (
        <PopupContainer onClick={() => setPopup(false)}>
            <PopupSubContainer>
                <PopupWrapper>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "96px",
                            marginBottom: "16px",
                        }}
                    >
                        <span
                            style={{
                                color: "#3C3C3C",
                                textAlign: "center",
                                fontSize: "16px",
                                fontWeight: 800,
                                letterSpacing: "-0.32px",
                            }}
                        >
                            네이버 지도로 바로가기 할까요?
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <button
                            style={{
                                width: "100%",
                                marginRight: "3%",
                                padding: "16px 0px",
                                borderRadius: "10px",
                                backgroundColor: "#F2F2F2",
                                border: "none",
                            }}
                        >
                            <span
                                style={{
                                    color: "#BABABA",
                                    fontSize: "16px",
                                    fontWeight: 700,
                                    letterSpacing: "-0.32px",
                                }}
                            >
                                아니요
                            </span>
                        </button>
                        <button
                            style={{
                                width: "100%",
                                padding: "16px 0px",
                                borderRadius: "10px",
                                backgroundColor: "#FFCE00",
                                border: "none",
                            }}
                            onClick={() => setPopup(false)}
                        >
                            <span
                                style={{
                                    color: "#FFF",
                                    fontSize: "16px",
                                    fontWeight: 800,
                                    letterSpacing: "-0.32px",
                                }}
                                onClick={goToUrl}
                            >
                                바로가기
                            </span>
                        </button>
                    </div>
                </PopupWrapper>
            </PopupSubContainer>
        </PopupContainer>
    );
};

export default Popup;

const PopupContainer = styled`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const PopupSubContainer = styled`
    display: flex;
    height: 100%;
    width: 100%;
    max-width: 420px;
    background-color: rgba(34, 40, 48, 0.60);
    padding: 0 24px;
`;

const PopupWrapper = styled`
    margin: auto 0;
    height: 210px;
    width: 100%;
    padding: 32px 16px 16px;
    border-radius: 10px;
    background-color: #FFF;
`;
