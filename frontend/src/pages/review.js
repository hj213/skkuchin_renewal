import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { enroll_review, delete_review, modify_review, load_review, load_reviews } from "../actions/review/review";

import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";

const ReviewPage = () =>{
    const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    const [place_id, setPlaceId] = useState('');
    const [rate, setRate] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');

    const user = useSelector(state => state.auth.user);

    useEffect( () => {
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(load_reviews());
    }, [dispatch]);

    const onChangePId = e => setPlaceId(e.target.value);
    const onChangeRate = e => setRate(e.target.value);
    const onChangeContent = e => setContent(e.target.value);
    const onChangeImage = e => setImage(e.target.value);
    const onChangeTags = e => setTags(e.target.value);

    const addBtnClick = e => {
        e.preventDefault();
        alert('add button clicked! ' + place_id + "\n" + rate + "\n" + content + "\n" + image + "\n" + tags);
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(enroll_review(place_id, rate, content, image, tags));
    };

    const delBtnClick = e => {
        e.preventDefault();
        alert('delete button clicked! ' + review_id);
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(delete_review(review_id));

    };
    const getBtnClick = e => {
        e.preventDefault();
        alert('get button clicked!');
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(load_review());
    };

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
                        placeholder ='PLACE ID' onChange={onChangePId} value={place_id}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>RATE</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='RATE' onChange={onChangeRate} value={rate}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>Content</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='Content' onChange={onChangeContent} value={content}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>Image</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='Image' onChange={onChangeImage} value={image}
                        />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>tags</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='tags' onChange={onChangeTags} value={tags}
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
            {/* <form className='bg-light p-5 mt-5 mb-5'>
                <h3>*삭제할 Favorite Place의 favorite_id를 입력해주세요</h3>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='favorite_id'>
                        <strong>FAVORITE_ID</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='favorite_id' 
                        placeholder ='FAVORITE ID' onChange={onChangeFId} value={favorite_id}
                        required />
                </div>
                {
                    loading ? (
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <Loader type = 'Oval' color = '#00bfff' width={50} height={50}></Loader>
                        </div>
                    ) : (
                        <div>
                            <button className='btn btn-primary m-5' id="delBtn"  type='submit' style={{backgroundColor: "red", border: 0}} onClick={delBtnClick}>
                                DELETE
                            </button>
                        </div>
                    )
                }
            </form>
            <div className='bg-light p-5 mt-5 mb-5'>
                <h3>*Favorite Place 목록</h3>
                <button className='btn btn-primary m-5' id="getBtn"  type='submit' style={{backgroundColor: "orange", border: 0}} onClick={getBtnClick}>
                    목록 표시
                </button>
            </div> */}
        </Layout>
    );
}

export default ReviewPage;