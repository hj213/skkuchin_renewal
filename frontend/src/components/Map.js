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

    // ver1 잔상 해결
    // const removePreviousMap = () => {
    //     const container = mapContainerRef.current;
    //     while (container.hasChildNodes()) {
    //       container.removeChild(container.firstChild);
    //     }
    // };
    // ver2 번쩍 해결
    function removePreviousMap() {
        const mapContainer = document.getElementById("map-container");
        if (mapContainer) {
          // 기존 지도의 마커와 이벤트 리스너를 모두 삭제합니다.
          markers.forEach(marker => {
            window.kakao.maps.event.removeListener(marker, "click");
            marker.setMap(null);
        });
          // 기존 지도의 내용을 삭제합니다.
        mapContainer.innerHTML = "";
        }
      }

    useEffect(() => {
        const mapScript = document.createElement("script");
        
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_APPKEY}&autoload=false`;

        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                removePreviousMap(); 
                const container = mapContainerRef.current;
                if (container) {
                    let selectedPlace;
                    if (selectedId) {
                        selectedPlace = places && places.find(p => p.id == selectedId);
                    }

                    let options;
                    if(user && user.toggle == '율전' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.2965, 126.9717),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    } 
                    else if(user && user.toggle == '명륜' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.58622450673971, 126.99709024757782),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    }
                    else if(toggle && toggle === '율전' && !selectedPlace) {
                        options = {
                            center : new window.kakao.maps.LatLng(37.2965, 126.9717),
                            level: 5,
                            preventDraggable: true,
                            zoomControl: true
                        };
                    } 
                    else if(toggle && toggle === '명륜' && !selectedPlace) {
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

                    const map = new window.kakao.maps.Map(container, options);

                    map.setZoomable(false);
                    map.setZoomable(true);
                  
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
                            setMapCenter(map.getCenter());
                            setSelectedLevel(map.getLevel());
                            router.push(`/place?id=${place.id}`);
                            // map.panTo(map.getCenter());
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
                }
            });
            
        };        
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, places, selectedId, user, selectedLevel, mapCenter, toggle]);


    return (
        <MapContainer ref={mapContainerRef} style={{width:'100%', height:height, }}>
        </MapContainer>
    );
}

const MapContainer = styled.div`
    weight: 100%;
    
`;

export default Map;
