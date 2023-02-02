import { useEffect } from "react";
import styled from "@emotion/styled";
// import Marker from './Marker';
const Map = ({latitude, longitude, places}) => {
    useEffect(() => {
        const mapScript = document.createElement("script");
        
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");

                let options;
                if (places && places.length > 0) {
                    options = {
                        center: new window.kakao.maps.LatLng(places[0].ycoordinate, places[0].xcoordinate),
                        level: 1
                    };
                } else {
                    options = {
                        center : new window.kakao.maps.LatLng(latitude, longitude),
                        level: 1
                    };
                }

                const map = new window.kakao.maps.Map(container, options);

                const markers = [];
                { places  &&
                places.forEach(place => {
                    const marker = new window.kakao.maps.Marker({
                        position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                    });
                    markers.push(marker);
                    marker.setMap(map);
                });
                }
            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, places]);
    return (
        <MapContainer id="map" style={{width:'100%', height:'65vh'}}>
            {/* {places && (
                places.map((place, i) => {
                const lat = place.ycoordinate;
                const lng = place.xcoordinate;
                return (
                    <Marker key={i} lat={lat} lng={lng} />
                );
                })
            )} */}
        </MapContainer>
    );
}

const MapContainer = styled.div`
    weight: 100%;
    height: 100vh;
`;

export default Map;

// import { useEffect } from "react";
// import styled from "@emotion/styled";

// const Map = ({latitude, longitude}) => {
//     useEffect(() => {
//         const mapScript = document.createElement("script");
        
//         mapScript.async = true;
//         mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

//         document.head.appendChild(mapScript);

//         const onLoadKakaoMap = () => {
//             window.kakao.maps.load(() => {
//                 const container = document.getElementById("map");
//                 const options = {
//                     center: new window.kakao.maps.LatLng(latitude, longitude),
//                     level: 1
//                 };
//                 const map = new window.kakao.maps.Map(container, options);
//             });
//         };
//         mapScript.addEventListener("load", onLoadKakaoMap);

//         return () => mapScript.removeEventListener("load", onLoadKakaoMap);
//     }, [latitude, longitude]);
//     return (
//         <MapContainer id="map" style={{width:'100%', height:'65vh'}}/>
//     );
// }

// const MapContainer = styled.div`
//     weight: 100%;
//     height: 100vh;
// `;

// export default Map;