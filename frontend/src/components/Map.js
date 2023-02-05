
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import marker from "../image/marker.png"
const Map = ({latitude, longitude, places, selectedId}) => {

    const router = useRouter();
    useEffect(() => {
        const mapScript = document.createElement("script");
        
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById("map");

                let selectedPlace;
                if (selectedId) {
                    selectedPlace = places.find(p => p.id == selectedId);
                }
                let options;
                if (selectedPlace) {
                    options = {
                        center: new window.kakao.maps.LatLng(selectedPlace.ycoordinate, selectedPlace.xcoordinate),
                        level: 1
                    };
                } else if (places && places.length > 0) {
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
                    let marker;
                    if (place.id == selectedId) {
                        const selectedImageSrc = "/selectedMarker.png",
                        imageSize = new window.kakao.maps.Size(34, 47),
                        markerImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                        
                        marker = new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                            image: markerImage
                        });
                    } else if(place.id != selectedId){
                        const imageSrc = "/marker.png",
                        imageSize = new window.kakao.maps.Size(24, 35),
                        markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                        marker = new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                            image: markerImage
                        });
                    }
                    markers.push(marker);
                    marker.setMap(map);

                    window.kakao.maps.event.addListener(marker, "click", function() {
                        map.setCenter(new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate));
                        router.push(`/place?id=${place.id}`);
                    });
                });
                }
            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, places, selectedId]);
    return (
        <MapContainer id="map" style={{width:'100%', height:'65vh'}}>
        </MapContainer>
    );
}

const MapContainer = styled.div`
    weight: 100%;
    height: 100vh;
`;

export default Map;

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import styled from "@emotion/styled";
// import Image from 'next/image';
// import marker from '../image/지도/marker.png'

// const Map = ({latitude, longitude, places, selectedId}) => {

//     const router = useRouter();
//     useEffect(() => {
//         const mapScript = document.createElement("script");
        
//         mapScript.async = true;
//         mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

//         document.head.appendChild(mapScript);

//         const onLoadKakaoMap = () => {
//             window.kakao.maps.load(() => {
//                 const container = document.getElementById("map");

//                 let options;
//                 if (places && places.length > 0) {
//                     options = {
//                         center: new window.kakao.maps.LatLng(places[0].ycoordinate, places[0].xcoordinate),
//                         level: 1
//                     };
//                 } else {
//                     options = {
//                         center : new window.kakao.maps.LatLng(latitude, longitude),
//                         level: 1
//                     };
//                 }

//                 const map = new window.kakao.maps.Map(container, options);

//                 const markers = [];
                
//                 { places  &&
//                 places.forEach(place => {
//                     const marker = new window.kakao.maps.Marker({
//                         position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
//                     });
//                     markers.push(marker);
//                     marker.setMap(map);

//                     window.kakao.maps.event.addListener(marker, "click", function() {
//                         alert(`id: ${place.id} name: ${place.name}`);
//                         map.setCenter(new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate));
//                         router.push(`/place?id=${place.id}`);
//                     });
//                 });
//                 }
//             });
//         };
//         mapScript.addEventListener("load", onLoadKakaoMap);

//         return () => mapScript.removeEventListener("load", onLoadKakaoMap);
//     }, [latitude, longitude, places]);
//     return (
//         <MapContainer id="map" style={{width:'100%', height:'65vh'}}>
//         </MapContainer>
//     );
// }

// const MapContainer = styled.div`
//     weight: 100%;
//     height: 100vh;
// `;

// export default Map;
