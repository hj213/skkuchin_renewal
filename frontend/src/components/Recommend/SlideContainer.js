import { useCallback, useRef, useState } from 'react';
import { food, starFilled } from '../../image/recommend';
import Image from 'next/image';
import Popup from './Popup';

const OpacityWrapper = ({ display, onClick }) => {
    return (
        <div
            style={{
                display: display,
                flexDirection: "column",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
            onClick={onClick}
        >
            <div style={{ width: "100%", height: "100%", maxWidth: "420px", backgroundColor: "rgba(34, 40, 48, 0.60)" }} />
        </div>
    );
};

const Restaurant = ({ selectedPlace, places, setPopup }) => {

    const clickPlace = useCallback((place) => {
        selectedPlace.current = place;
        setPopup(true);
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", marginBottom: "72%" }}>
            {places?.map((place, index) => (
                <div
                    key={index}
                    style={{ 
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "16px 24px",
                        width: "100%",
                        borderBottom: "1px solid #F2F2F2",
                        cursor: "pointer",
                    }}
                    onClick={() => clickPlace(place)}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                        <div style={{ margin: "auto 0" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <h3
                                    style={{
                                        margin: "0 8px 0 0",
                                        fontSize: "18px",
                                        fontWeight: 700,
                                        letterSpacing: "-1px",
                                    }}
                                >
                                    {place.name}
                                </h3>
                                <h4 
                                    style={{
                                        margin: 0,
                                        color: "#9E9E9E",
                                        fontSize: "12px",
                                    }}
                                >
                                    {place.detailCategory}
                                </h4>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div style={{ marginRight: "3px", paddingTop: "4px" }}>
                                        <Image src={starFilled} height={16} width={16} layout='fixed' />
                                </div>
                                <h4
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        fontWeight: 700,
                                    }}
                                >
                                    {place.rate === 0 ? '5.0' : place.rate.toFixed(1)}
                                </h4>
                                <div style={{ width: "1px", height: "12px", backgroundColor: "#E2E2E2", margin: "0 12px" }} />
                                <h4
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        lineHeight: "17px",
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    {place.gate ?? '정문'}에서 <span style={{ fontWeight: 700 }}>5분</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <Image src={place.images[0] ?? food} height={80} width={80} layout='fixed' />
                </div>
            ))}
            <div style={{ width: '100%', height: '50%' }} />
        </div>
    );
};

const SlideContainer = ({ filteredPlaces }) => {
    const moving = useRef(false);
    const topPosition = useRef(0);
    const cardRef = useRef(null);
    const transition = useRef("none");
    const selectedPlace = useRef(null);

    const [slideTop, setSlideTop] = useState("88%");
    const [display, setDisplay] = useState("none");
    const [popup, setPopup] = useState(false);

    const handleStart = useCallback(() => {
        moving.current = true;
        transition.current = "none";
        topPosition.current = cardRef.current.offsetTop;
    }, []);

    const handleMove = useCallback((event) => {
        if (moving.current) {
            setDisplay("flex");
            setSlideTop(`${event.clientY || event.touches[0].clientY}px`);
        }
    }, []);

    const handleEnd = useCallback(() => {
        moving.current = false;
        transition.current = "top 0.2s ease";

        if (cardRef.current.offsetTop < topPosition.current) {
            setSlideTop("28%");
        } else if (cardRef.current.offsetTop > topPosition.current) {
            setSlideTop("88%");
            setDisplay("none");
        }
    }, []);

    const disableFocus = useCallback(() => {
        setSlideTop("88%");
        setDisplay("none");
    }, []);

    return (
        <>
            <div onMouseMove={handleMove} onTouchMove={handleMove} onMouseUp={handleEnd} onTouchEnd={handleEnd}>
                <OpacityWrapper display={display} onClick={() => disableFocus()} />
                <div
                    style={{
                        position: "fixed",
                        top: slideTop,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        transition: transition.current,
                    }}
                    ref={cardRef}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            maxWidth: "420px",
                            backgroundColor: "#FFF",
                            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                            borderRadius: "20px 20px 0 0",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                cursor: "pointer",
                                paddingBottom: "16px",
                                borderBottom: "1px solid #F2F2F2",
                            }}
                            onMouseDown={handleStart}
                            onTouchStart={handleStart
                        }>
                            <div
                                style={{
                                    width: "32px",
                                    height: "2px",
                                    borderRadius: "2px",
                                    background: "#E2E2E2",
                                    margin: "10px 0 16px",
                                }}
                            />
                            <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700 }}>
                                다른 맛집 더 보실래요?
                            </h3>
                        </div>
                        <div style={{ height: "100%", overflowY: "scroll", display: display }}>
                            <Restaurant selectedPlace={selectedPlace} places={filteredPlaces} setPopup={setPopup} />
                        </div>
                    </div>
                </div>
            </div>
            {popup && <Popup selectedPlace={selectedPlace} setPopup={setPopup} />}
        </>
    );
};

export default SlideContainer;