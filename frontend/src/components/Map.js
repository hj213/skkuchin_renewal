import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { KAKAOMAP_APPKEY } from '../config';

const Map = ({latitude, longitude, places, selectedId}) => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.auth.toggle_for_not_user);
    const height = window.innerHeight - 90;
    const mapContainerRef = useRef(null);

    const [selectedLevel, setSelectedLevel] = useState(5);
    const [mapCenter, setMapCenter] = useState(null);
    const [mapObject, setMapObject] = useState(null);
    const [markersArray, setMarkersArray] = useState(null);

    useEffect(() => {
        const mapScriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_APPKEY}&autoload=false`;

        const existingScript = document.querySelector(`script[src="${mapScriptSrc}"]`);
        if (existingScript) {
            existingScript.remove();
        }

        const mapScript = document.createElement("script");
        
        mapScript.async = true;
        mapScript.src = mapScriptSrc;

        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = mapContainerRef.current;

                if (container) {
                    let selectedPlace;
                    if (selectedId) {
                        selectedPlace = places && places.find(p => p.id == selectedId);
                    }

                    let options;
                    if (user && user.toggle == '율전' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.2965, 126.9717),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    } 
                    else if (user && user.toggle == '명륜' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.58622450673971, 126.99709024757782),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    }
                    else if (toggle && toggle === '율전' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.2965, 126.9717),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    } 
                    else if (toggle && toggle === '명륜' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.58622450673971, 126.99709024757782),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    }
                    else if (selectedPlace && mapCenter) {
                        options = {
                            center: mapCenter,
                            level: selectedLevel
                        };
                    } 
                    else {
                        options = {
                            center : new window.kakao.maps.LatLng(latitude, longitude),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true,
                        };
                    }

                    let map = null;

                    if (mapObject) {
                        map = mapObject;
                        map.setCenter(options.center);
                        map.setLevel(options.level);
                    } else {
                        map = new window.kakao.maps.Map(container, options);
                        setMapObject(map);
                    }
            
                    let maxMarker = 30; // maximum number of markers to show

                    if (markersArray) {
                        markersArray.forEach(marker => {
                            if (marker.getMap()) {
                                marker.setMap(null);
                            }
                        });
                    }

                    const markers = [];

                    { places  &&
                    places.forEach((place,index) => {
                        let marker;
                        if (place.id == selectedId) {
                            const selectedImageSrc = `/markers/${place.marker}_red.png`,
                            imageSize = new window.kakao.maps.Size(27,33),
                            selectedImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: selectedImage,
                                zIndex: 10
                            });
                            marker.setMap(map);
                        } else if (place.id != selectedId) {
                            const imageSrc = `/markers/${place.marker}_yellow.png`,
                            imageSize = new window.kakao.maps.Size(27,33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                            if (index < maxMarker) {
                                marker.setMap(map);
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

                        window.kakao.maps.event.addListener(marker, "click", function() {
                            setMapCenter(map.getCenter());
                            setSelectedLevel(map.getLevel());
                            router.push(`/place?id=${place.id}`);
                        });
                    });
                    
                    setMarkersArray(markers);
                    
                    // window.kakao.maps.event.addListener(map, 'zoom_changed', function() {
                    //     const level = map.getLevel();
                    //     if (level == 1) {
                    //         maxMarker = 1000;
                    //     } else if (level == 2) {
                    //         maxMarker = 50;
                    //     } else if (level == 3) {
                    //         maxMarker = 30;
                    //     } else {
                    //         maxMarker = 15;
                    //     }

                    //     console.log(markers)

                    //     markers.forEach(marker => {
                    //         if (marker.getMap()) {
                    //             console.log(marker)
                    //             marker.setMap(null);
                    //         }
                    //     });

                    //     for (let i = 0; i < maxMarker && i < markers.length; i++) {
                    //         markers[i].setMap(map);
                    //     }
                    // });
                }
                }
            });
            
        };        
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, places, selectedId, user, selectedLevel, mapCenter, toggle]);

    return (
        <MapContainer ref={mapContainerRef} style={{width: '100%', height: height}}>
        </MapContainer>
    );
}

const MapContainer = styled.div`
    weight: 100%;
`;

export default Map;
