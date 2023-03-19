import { KAKAOMAP_APIKEY } from '../config';

export const getCoordinate = async (address) => {
    const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
    const headers = {
        Authorization: `KakaoAK ${KAKAOMAP_APIKEY}`,
    };
    
    try {
        const response = await fetch(apiUrl, { headers });
        const data = await response.json();

        if (data && data.errorType) {
            console.log(data.errorType)
            return null;
        }
    
        if (data && data.documents && data.documents.length === 0) {
            console.log('No address found');
            alert("주소를 찾지 못했습니다")
            return null;
        }
    
        const coordinate = data.documents[0].address;
    
        return coordinate;

    } catch (error) {
        console.error(error);
    }
};