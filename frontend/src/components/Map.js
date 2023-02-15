import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { KAKAOMAP_APPKEY } from '../config';
import { Button } from "@mui/material";

const Map = ({latitude, longitude, places, selectedId}) => {

    const router = useRouter();
    // const [limit, setLimit] = useState(30); // 더보기 기능
    const user = useSelector(state => state.auth.user); 


    useEffect(()=> {
    }, [user])

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
                
                const markers = [];
                let count = 0;
                let limit = 20;

                { places  &&
                places.forEach(place => {
                    if (count >= limit) {
                        return;
                    }
                    let marker;
                    if (place.id == selectedId) {
                        // 음식점
                        if(place.marker == '음식점') {
                            const selectedImageSrc = "/selectedFoodMarker.png",
                            imageSize = new window.kakao.maps.Size(34, 41),
                            selectedImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: selectedImage,
                                zIndex: 10
                            });
                        }
                        // 기본
                        else {
                            const selectedImageSrc = "/selectedMarker.png",
                            imageSize = new window.kakao.maps.Size(34, 47),
                            markerImage = new window.kakao.maps.MarkerImage(selectedImageSrc, imageSize);
                            
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage,
                                zIndex: 10
                            });
                        }
                    } else if(place.id != selectedId){
                        if(place.marker == '음식점') {
                            const imageSrc = "/foodMarker.png",
                            imageSize = new window.kakao.maps.Size(27, 33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        }
                        else if(place.marker == '술집') {
                            const imageSrc = "/alcoholMarker.png",
                            imageSize = new window.kakao.maps.Size(27, 33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        } else if(place.marker == '카페') {
                            const imageSrc = "/cafeMarker.png",
                            imageSize = new window.kakao.maps.Size(27, 33),
                            markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
                            marker = new window.kakao.maps.Marker({
                                position: new window.kakao.maps.LatLng(place.ycoordinate, place.xcoordinate),
                                image: markerImage
                            });
                        } else {
                            const imageSrc = "/marker.png",
                            imageSize = new window.kakao.maps.Size(24, 35),
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
                    count++;
                });
                }

            });
        };
        mapScript.addEventListener("load", onLoadKakaoMap);

        return () => mapScript.removeEventListener("load", onLoadKakaoMap);
    }, [latitude, longitude, places, selectedId, user]);

     // '더보기' 버튼을 누르면 limit 값을 증가시킴
    // const handleLoadMore = () => {
    //     setLimit(limit + 30);
    // };

    return (
        <>
        <MapContainer id="map" style={{width:'100%', height:'65vh'}}>
            {/* {places && places.length > limit &&
                <Button onClick={handleLoadMore} sx={{position: 'absolute', zIndex: '6', top: '50px', backgroundColor: 'yellow'}}>더보기</Button>
            } */}
        </MapContainer>
        </>
    );
}

const MapContainer = styled.div`
    weight: 100%;
    height: 100vh;
`;

export default Map;
