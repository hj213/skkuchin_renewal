import { useEffect } from "react";
import styled from "@emotion/styled";

const Map = ({latitude, longitude}) => {
    useEffect(() => {
        console.log(latitude, longitude);
        const mapScript = document.createElement("script");
        
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");
                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                    level: 1
                };
                const map = new window.kakao.maps.Map(container, options);
            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude]);

    return (
        <MapContainer id="map" />
    );
}

const MapContainer = styled.div`
    weight: 100%;
    height: 100vh;
`;

export default Map;