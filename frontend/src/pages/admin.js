import { load_places, clear_search_results, get_no_review_places, get_no_image_places, get_no_menu_places } from '../actions/place/place';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react"; 
import Link from 'next/link';
import { check_admin } from '../actions/auth/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AdminPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const places = useSelector(state => state.place.allplaces);
    const [loading, setLoading] = useState(false);
    const [pageName, setPageName] = useState("전체 장소");

    useEffect(() => {
        setLoading(true);
        dispatch(check_admin(([result, message]) => {
            if (result) {
                dispatch(load_places(([result, message]) => {
                    setLoading(false);
                }));
            } else {
                router.push('/');
            }
        }));

        return (() => {
            dispatch(clear_search_results());
        })
    }, []);

    const getAllPlaces = () => {
        setLoading(true);
        dispatch(load_places(() => {
            setPageName("전체 장소");
            setLoading(false);
        }));
    };

    const getNoReviewPlaces = () => {
        setLoading(true);
        dispatch(get_no_review_places(() => {
            setPageName("리뷰 없는 장소");
            setLoading(false);
        }));
    };

    const getNoImagePlaces = () => {
        setLoading(true);
        dispatch(get_no_image_places(() => {
            setPageName("이미지 없는 장소");
            setLoading(false);
        }));
    };

    const getNoMenuPlaces = () => {
        setLoading(true);
        dispatch(get_no_menu_places(() => {
            setPageName("메뉴 없는 장소");
            setLoading(false);
        }));
    };

    return (
        <div>
            {loading && 
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    zIndex: 9999, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    <div style={{ 
                        backgroundColor: '#fff', 
                        borderRadius: '4px', 
                        padding: '16px 24px', 
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' 
                    }}>
                        <p>로딩중...</p>
                    </div>
                </div>
            }
            <h1>
                {pageName}
            </h1>
            <div>
                {
                    places &&
                    <>
                        총 {places.length}개
                    </>
                }
            </div>
            <button onClick={() => getAllPlaces()}>
                전체 장소 불러오기
            </button>
            <button onClick={() => getNoReviewPlaces()}>
                리뷰 없는 장소 불러오기
            </button>
            <button onClick={() => getNoImagePlaces()}>
                이미지 없는 장소 불러오기
            </button>
            <button onClick={() => getNoMenuPlaces()}>
                메뉴 없는 장소 불러오기
            </button>
            <button onClick={()=>router.push('/allReview')}>
                전체 리뷰 보기
            </button>
            <Link href='/enrollPlace'>
                <button>
                    장소 추가하기
                </button>
            </Link>
            <ul style={{listStyle: 'none'}}>
                {places && places.slice().reverse().map((place, index) => (
                    <li key={index}>
                            <h2>
                                {place.name}
                            </h2>
                            <p>
                            카테고리: {place.category}
                            </p>
                            <p>
                            캠퍼스: {place.campus}
                            </p>
                            <Link href={{
                                pathname: '/detailPlace',
                                query: {
                                    place_id: place.id
                                }
                            }}>
                                <button>
                                    자세히 보기
                                </button>
                            </Link>
                            <Link href={{
                                pathname: '/placeMenu',
                                query: {
                                    place_id: place.id,
                                    place_name: place.name
                                }
                            }}>
                                <button>
                                    메뉴 관리
                                </button>
                            </Link>
                            <Link href={{
                                pathname: '/modifyPlace',
                                query: {
                                    place_id: place.id
                                }
                            }}>
                                <button>
                                    수정
                                </button>
                            </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminPage), {
    ssr: false,
});