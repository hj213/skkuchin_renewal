import { load_all_reviews } from '../actions/review/review';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { check_admin } from '../actions/auth/auth';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AllReview = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const reviews = useSelector(state => state.review.allReview);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        setLoading(true);
        dispatch(check_admin(([result, message]) => {
            if (result) {
                dispatch(load_all_reviews());
                setLoading(false);
            } else {
                router.push('/');
            }
        }))
    }, []);

    const toggleImages = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    }

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
                전체 리뷰
            </h1>
            <div>
                {
                    reviews &&
                    <>
                        총 {reviews.length}개
                    </>
                }
            </div>
            <ul style={{listStyle: 'none'}}>
                {reviews && reviews.slice().reverse().map((review, index) => (
                    <li key={index}>
                        <p>
                            작성자: {review.nickname}
                        </p>
                        <p>
                            전공: {review.major}
                        </p>
                        <p>
                            학번: {review.student_id}
                        </p>
                        <p>
                            장소: {review.place}
                        </p>
                        <p>
                            평점: {review.rate}
                        </p>
                        <p style={{whiteSpace: 'pre-wrap'}}>
                            내용: {review.content}
                        </p>
                        <p>
                            태그: {review.tags.join(', ')}
                        </p>
                        <p>
                            작성일: {review.create_date}
                        </p>
                        <button onClick={() => toggleImages(index)}>
                            {activeIndex === index ? '이미지 숨기기' : '이미지 보기'}
                        </button>
                        <div style={{width: '100%', height: '200px', overflowX: 'auto', whiteSpace: 'nowrap'}}>
                            {review && review.images && review.images.length > 0 && activeIndex === index && (
                            <div style={{display: 'inline-block', verticalAlign: 'middle', whiteSpace: 'nowrap'}}>
                                {review.images.map((image, index) => (
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
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AllReview), {
    ssr: false,
});