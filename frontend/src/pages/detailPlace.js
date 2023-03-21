import { load_place } from '../actions/place/place';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react"; 
import Link from 'next/link';
import { useRouter } from 'next/router';
import { load_menu } from '../actions/menu/menu';
import Image from 'next/image';
import { clear_search_results } from '../actions/place/place';
import { check_admin } from '../actions/auth/auth';

const DetailPlace = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const place = useSelector(state => state.place.place);
    const place_id = router.query.place_id;

    useEffect(() => {
        dispatch(check_admin());
        return (() => {
            dispatch(clear_search_results());
        })
    }, []);

    useEffect(() => {
        if (place_id) {
            dispatch(load_place(place_id, ([result, message]) => {
                dispatch(load_menu(place_id));
            }));
        }
    }, [place_id]);

    return (
        <div>
            <Link href='/enrollPlace'>
                <button>
                    장소 추가하기
                </button>
            </Link>
            <h2>
                이름: {place && place.name}
            </h2>
            <p>
                카테고리: {place && place.category}
            </p>
            <p>
                세부 카테고리: {place && place.detail_category ? place.detail_category : "미 기입"}
            </p>
            <p>
                캠퍼스: {place && place.campus}
            </p>
            <p>
                위치: {place && place.gate ? place.gate : "미 기입"}
            </p>
            <p>
                주소: {place && place.address}
            </p>
            <p>
                위도: {place && place.xcoordinate}
            </p>
            <p>
                경도: {place && place.ycoordinate}
            </p>
            <p style={{whiteSpace: 'pre-wrap'}}>
                영업시간: {place && place.service_time ? place.service_time : "미 기입"}
            </p>
            <p>
                휴식시간: {place && place.break_time ? place.break_time : "미 기입"}
            </p>
            <p>
                학생 할인: {place && place.discount_availability ? "O" : "X"}
            </p>
            <p>
                할인 내용: {place && place.discount_content ? place.discount_content : "미 기입"}
            </p>
            <div style={{width: '100%', height: '200px', overflowX: 'auto', whiteSpace: 'nowrap'}}>
                {place && place.images && place.images.length > 0 && (
                <div style={{display: 'inline-block', verticalAlign: 'middle', whiteSpace: 'nowrap'}}>
                    {place.images.map((image, index) => (
                    <Image 
                        key={index} 
                        src={image} 
                        alt={`Image ${index}`}
                        width={150}
                        height={150}
                        layout='fixed'
                        objectFit='cover'
                        placeholder='blur'
                        blurDataURL='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII='                    
                    />
                    ))}
                </div>
                )}
            </div>
            <Link href={{
                pathname: '/modifyPlace',
                query: {
                    place_id: place?.id
                }
            }}>
                <button>
                    수정
                </button>
            </Link>
        </div>
    );
}

export default DetailPlace;