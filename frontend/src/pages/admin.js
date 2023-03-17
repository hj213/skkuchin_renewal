import { load_places } from '../actions/place/place';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react"; 
import Link from 'next/link';

const AdminPage = () => {
    const dispatch = useDispatch();

    const places = useSelector(state => state.place.allplaces);

    useEffect(() => {
        dispatch(load_places());
    }, []);

    return (
        <div>
            <div>
                {
                    places &&
                    <>
                        총 {places.length}개
                    </>
                }
            </div>
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

export default AdminPage;