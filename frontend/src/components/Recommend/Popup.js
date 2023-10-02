import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';

const Popup = ({ selectedPlace, setPopup }) => {
    const popupRef = useRef();

    // const handleClickOutside = useCallback((event) => {
    //     if (popupRef.current && !event.composedPath().includes(popupRef.current)) {
    //         setPopup(false);
    //     }
    // }, []);

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);

    return (
        <PopupContainer>
            <PopupSubContainer>
                <PopupWrapper ref={popupRef}>
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
                                cursor: 'pointer',
                            }}
                            onClick={() => setPopup(false)}
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
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setPopup(false);
                                window.open("https://naver.me/535B8MZU", '_blank');
                                // window.open(selectedPlace.current.url, '_blank');
                            }}
                        >
                            <span
                                style={{
                                    color: "#FFF",
                                    fontSize: "16px",
                                    fontWeight: 800,
                                    letterSpacing: "-0.32px",
                                }}
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

const PopupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const PopupSubContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    max-width: 420px;
    background-color: rgba(34, 40, 48, 0.60);
    padding: 0 24px;
`;

const PopupWrapper = styled.div`
    margin: auto 0;
    height: 210px;
    width: 100%;
    padding: 32px 16px 16px;
    border-radius: 10px;
    background-color: #FFF;
`;
