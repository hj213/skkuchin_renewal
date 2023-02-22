import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { KAKAOMAP_APPKEY } from '../config';

const Map = ({latitude, longitude, places, selectedId}) => {

    const router = useRouter();
    const user = useSelector(state => state.auth.user); 
    const height = window.innerHeight - 90;

    useEffect(() => {
        const mapScript = document.createElement("script");
        
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_APPKEY}&autoload=false`;

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
                } else if(user && user.toggle == '율전') {
                    options = {
                        center : new window.kakao.maps.LatLng(37.2965, 126.9717),
                        level: 4
                    };
                }
                else{
                    options = {
                        center : new window.kakao.maps.LatLng(latitude, longitude),
                        level: 4
                    };
                }

                const map = new window.kakao.maps.Map(container, options);
                
                let maxMarker = 30; // maximum number of markers to show
                const markers = [];

                { places  &&
                places.forEach((place,index) => {
                    if (index < maxMarker) {
                    let marker;
                    if (place.id == selectedId) {
                        // 음식점
                        if(place.marker == '음식점') {
                            const selectedImageSrc = "/markers/식당_red.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            selectedImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: selectedImage,
                                zIndex: 10
                            });
                        } else if(place.marker == '술집') {
                            const selectedImageSrc = "/markers/술집_red.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            selectedImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: selectedImage,
                                zIndex: 10
                            });
                        } else if(place.marker == '카페') {
                            const selectedImageSrc = "/markers/카페_red.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            selectedImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: selectedImage,
                                zIndex: 10
                            });
                        }
                        // 기본
                        else {
                            const selectedImageSrc = "/markers/기본_red.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            markerImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage,
                                zIndex: 10
                            });
                        }
                    } else if(place.id != selectedId){
                        if(place.marker == '음식점') {
                            const imageSrc = "/markers/식당_yellow.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        }
                        else if(place.marker == '술집') {
                            const imageSrc = "/markers/술집_yellow.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        } else if(place.marker == '카페') {
                            const imageSrc = "/markers/카페_yellow.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        } else {
                            const imageSrc = "/markers/기본_yellow.png",
                            imageSize = new window.kakao.maps.Size(27,33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        }
                    }
                    
                    // 중첩 마커 제거 및 가장 id가 작은 장소만 마커로 표시
                    var placesAtSameLocation = places.filter(p => p.xcoordinate === place.xcoordinate && p.ycoordinate === place.ycoordinate);
                    
                    if (placesAtSameLocation.length > 0) {
                    
                        var smallestIdPlace = placesAtSameLocation.reduce((acc, cur) => acc.id < cur.id ? acc : cur);
                        if (place.id !== smallestIdPlace.id && place.id != selectedId) {
                            // 현재 마커와 가장 id가 작은 장소의 id가 다르면 중복 마커를 생성하지 않습니다.
                            return;
                        }
                    }

                    markers.push(marker);
                    marker.setMap(map);

                    window.kakao.maps.event.addListener(marker, "click", function() {
                        router.push(`/place?id=${place.id}`);
                    });
                }
                });
                window.kakao.maps.event.addListener(map, 'zoom_changed', function() {
                    const level = map.getLevel();
                    if (level == 1) {
                        maxMarker = 1000;
                    } else if (level == 2) {
                        maxMarker = 50;
                    } else if (level == 3) {
                        maxMarker = 30;
                    } else {
                        maxMarker = 15;
                    }

                    markers.forEach(marker => {
                        if (marker.getMap()) {
                            marker.setMap(null);
                        }
                    });

                    for (let i = 0; i < maxMarker && i < markers.length; i++) {
                        markers[i].setMap(map);
                    }
                });
                }
            });
        };
        
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, places, selectedId, user]);


    return (
        <MapContainer id="map" style={{width:'100%', height:height, }}>
        </MapContainer>
    );
}

const MapContainer = styled.div`
    weight: 100%;

`;

export default Map;
