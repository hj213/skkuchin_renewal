import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react"; 
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { KAKAOMAP_APPKEY } from '../config';

let markers = [];

const Map = ({latitude, longitude, level, places, selectedId}) => {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const toggle = useSelector(state => state.auth.toggle_for_not_user);
    const selectedPlace = useSelector(state => state.place.place);
    const height = window.innerHeight - 90;
    const mapContainerRef = useRef(null);
    const [mapObject, setMapObject] = useState(null);
    
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
                    else if (level) {
                        options = {
                            center: new window.kakao.maps.LatLng(latitude, longitude),
                            level: level
                        };
                    } 
                    else if (places) {
                        options = {
                            center : new window.kakao.maps.LatLng(selectedPlace.ycoordinate, selectedPlace.xcoordinate),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true,
                        };
                    } else if (selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(selectedPlace.ycoordinate, selectedPlace.xcoordinate),
                            level: 2,
                            preventDraggable: true,
                            zoomControl: true,
                        };
                    } else {
                        options = {
                            center : new window.kakao.maps.LatLng(37.58622450673971, 126.99709024757782),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true,
                        };
                    }

                    let map = null;

                    if (mapObject) {
                        map = mapObject;
                        map.setLevel(options.level);
                        map.panTo(options.center);
                    } else {
                        map = new window.kakao.maps.Map(container, options);
                        setMapObject(map);
                    }
            
                    let maxMarker = 30; // maximum number of markers to show

                    removeMarkers();

                    if (places) {
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
                                markers.push(marker);
                            } else if (place.id != selectedId) {
                                const imageSrc = `/markers/${place.marker}_yellow.png`,
                                imageSize = new window.kakao.maps.Size(27,33),
                                markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                                marker = new window.kakao.maps.Marker({
                                    position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                    image: markerImage
                                });
                                // 중첩 마커 제거 및 가장 id가 작은 장소만 마커로 표시
                                var placesAtSameLocation = places.filter(p => p.xcoordinate === place.xcoordinate && p.ycoordinate === place.ycoordinate);
                                
                                if (placesAtSameLocation.length > 0) {
                                
                                    var smallestIdPlace = placesAtSameLocation.reduce((acc, cur) => acc.id < cur.id ? acc : cur);
                                    if (place.id !== smallestIdPlace.id && place.id != selectedId) {
                                        // 현재 마커와 가장 id가 작은 장소의 id가 다르면 중복 마커를 생성하지 않습니다.
                                        return;
                                    }
                                }
                                if (index < maxMarker) {
                                    marker.setMap(map);
                                    markers.push(marker);
                                }
                            }
    
                            window.kakao.maps.event.addListener(marker, "click", function() {
                                router.push({
                                    pathname: '/place',
                                    query: { 
                                        id: place.id,
                                        xcoordinate: map.getCenter().getLng(),
                                        ycoordinate: map.getCenter().getLat(),
                                        level: map.getLevel(),
                                    }
                                });
                            });
                        });
                    } else if (selectedPlace) {
                        let marker;
                        const selectedImageSrc = `/markers/${selectedPlace.marker}_red.png`,
                        imageSize = new window.kakao.maps.Size(27,33),
                        selectedImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                        marker = new window.kakao.maps.Marker({
                            position: new window.kakao.maps.LatLng(selectedPlace.ycoordinate, selectedPlace.xcoordinate),
                            image: selectedImage,
                            zIndex: 10
                        });
                        marker.setMap(map);
                        markers.push(marker);
                    }
                    
                    // window.kakao.maps.event.addListener(map, 'zoom_changed', function() {
                    //     const level = map.getLevel();
                    //     if (level == 1) {
                    //         maxMarker = 1000;
                    //     } else if (level == 2) {
                    //         maxMarker = 50;
                    //     } else if (level == 3) {
                    //         maxMarker = 40;
                    //     } else if (level > 3 && level < 6) {
                    //         maxMarker = 30;
                    //     } else {
                    //         maxMarker = 15;
                    //     }

                    //     markers.forEach(marker => {
                    //         if (marker.getMap()) {
                    //             marker.setMap(null);
                    //         }
                    //     });

                    //     for (let i = 0; i < maxMarker && i < markers.length; i++) {
                    //         markers[i].setMap(map);
                    //     }
                    // });
                }
            });
            
        };        
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, level, places, selectedId, user, toggle]);

    const removeMarkers = () => {
        markers.forEach((marker, index) => {
            if (marker.getMap()) {
                marker.setMap(null);
                markers = markers.slice(index, 1);
            }
        });
    }

    return (
        <MapContainer ref={mapContainerRef} style={{width: '100%', height: height}}>
        </MapContainer>
    );
}

const MapContainer = styled.div`
    weight: 100%;
`;

export default Map;
