import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { enroll_review, delete_review, modify_review, load_review, load_reviews } from "../actions/review/review";

import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";

const ReviewPage = () =>{

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    const [images, setImages] = useState([]);
    const [reviewData, setReviewData] = useState({
        place_id: null,
        rate: null,
        content: null,
        tags: null
    });

    const user = useSelector(state => state.auth.user);

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login');
    }

    // useEffect( () => {
    //     if(dispatch && dispatch !== null && dispatch !== undefined)
    //         dispatch(load_reviews());
    // }, [dispatch]);

    const { place_id, rate, content, tags } = reviewData;

    const onChangeImages = (e) => {
        setImages(Array.from(e.target.files));
    };

    const onChange = e => setReviewData({...reviewData, [e.target.name]: e.target.value});

    const addBtnClick = e => {
        e.preventDefault();
        alert('add button clicked! ' + place_id + "\n" + rate + "\n" + content + "\n" + images + "\n" + tags);

        if (dispatch && dispatch !== null && dispatch !== undefined) {
            dispatch(enroll_review(place_id, rate, content, images, tags));

        }

    };

    // const delBtnClick = e => {
    //     e.preventDefault();
    //     alert('delete button clicked! ' + review_id);
    //     if(dispatch && dispatch !== null && dispatch !== undefined)
    //         dispatch(delete_review(review_id));

    // };
    // const getBtnClick = e => {
    //     e.preventDefault();
    //     alert('get button clicked!');
    //     if(dispatch && dispatch !== null && dispatch !== undefined)
    //         dispatch(load_review());
    // };

    return (
        <Layout title= '스꾸친 | Review' content='Review page'>
            <h1 className='display-4'>Favorite Page</h1>
            <p className="fs-4 mt-3">Hello {user !== null && user.nickname}! It's your favorite place</p>
            <form className='bg-light p-5 mt-5 mb-5'>
                <h3>*리뷰를 작성할 Place의 id를 입력해주세요</h3>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>PLACE_ID</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='PLACE ID' onChange={e => onChange(e)} value={place_id}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='rate'>
                        <strong>RATE</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='rate' 
                        placeholder ='RATE' onChange={e => onChange(e)} value={rate}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='content'>
                        <strong>Content</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='content' 
                        placeholder ='Content' onChange={e => onChange(e)} value={content}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='image'>
                        <strong>Image</strong>
                    </label>
                    <input 
                        className='form-control' type = 'file' name='images' accept='image/*' multiple
                        placeholder ='Image' onChange={e => onChangeImages(e)}
                        />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='tags'>
                        <strong>tags</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='tags' 
                        placeholder ='tags' onChange={e => onChange(e)} value={tags}
                        />
                </div>
                
                {
                    loading ? (
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <Loader type = 'Oval' color = '#00bfff' width={50} height={50}></Loader>
                        </div>
                    ) : (
                        <div>
                            <button className='btn btn-primary m-5' id="addBtn"  type='submit' style={{backgroundColor: "green", border: 0}} onClick={addBtnClick}>
                                ADD
                            </button>
                        </div>
                    )
                }
            </form>
        </Layout>
    );
}

export default ReviewPage;