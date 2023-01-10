import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { login, reset_register_success } from "../actions/auth/auth";
import { enroll_favorite, delete_favorite, load_favorite } from "../actions/favorite/favorite";

import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";

const FavoritePage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.favorite.loading);

    const [formData, setFormData] = useState({
        place_id: '',
        // review test 지우기
        // rate: '5.0',
        // content: '내용',
        // image: '아무거나 입력',
        // tags: ['맛집','분위기 좋은']
    });

    const {
        place_id,
        // 지우기
        // rate,
        // content,
        // image,
        // tags,
    } = formData;
    // const [place_id, setPlaceId] = useState('');

    const user = useSelector(state => state.auth.user);

    useEffect( () => {
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(load_favorite());
    }, [dispatch]);

    // const onChange = e => setPlaceId(e.target.value);
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const addBtnClick = e => {
        e.preventDefault();
        alert('add button clicked! ' + place_id);
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(enroll_favorite(place_id));
            // 지우기
            // dispatch(enroll_favorite(place_id, rate, content, image, tags));

    };

    const delBtnClick = e => {
        e.preventDefault();
        alert('delete button clicked! ' + place_id);
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(delete_favorite(place_id));

    };
    const getBtnClick = e => {
        e.preventDefault();
        alert('get button clicked!');
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(load_favorite());
    };


    // if (typeof window !== 'undefined' && isAuthenticated){
    //     router.push('/favorite');
    // }

    return (
        <Layout title= '스꾸친 | Favorite' content='Favorite page'>
            <h1 className='display-4'>Favorite Page</h1>
            <p className="fs-4 mt-3">Hello {user !== null && user.nickname}! It's your favorite place</p>
            <form className='bg-light p-5 mt-5 mb-5'>
                <h3>*추가/삭제할 Favorite Place의 id를 입력해주세요</h3>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>PLACE_ID</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='PLACE ID' onChange={onChange} value={place_id}
                        required />
                    
                </div>
                {/* review test 지우기 */}
                {/* <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='rate'>
                        <strong>RATE</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='rate' 
                        placeholder ='RATE' onChange={onChange} value={rate}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='content'>
                        <strong>Content</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='content' 
                        placeholder ='CONTENT' onChange={onChange} value={content}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='image'>
                        <strong>Image</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='image' 
                        placeholder ='IMAGE' onChange={onChange} value={image}
                        required />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='image'>
                        <strong>TAGS</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='tags' 
                        placeholder ='IMAGE' onChange={onChange} value={tags}
                        required />
                </div> */}
                {/* 여기까지 지우기 */}
                {
                    loading ? (
                        <div className="d-flex justify-content-center align-items-center mt-5">
                            <Loader type = 'Oval' color = '#00bfff' width={50} height={50}></Loader>
                        </div>
                    ) : (
                        <div>
                            <button className='btn btn-primary m-5' id="addBtn" type='submit' style={{border: 0}} onClick={addBtnClick}>
                                ADD
                            </button>
                            <button className='btn btn-primary m-5' id="delBtn"  type='submit' style={{backgroundColor: "red", border: 0}} onClick={delBtnClick}>
                                DELETE
                            </button>
                        </div>
                    )
                }
            </form>
            <div className='bg-light p-5 mt-5 mb-5'>
                <h3>*Favorite Place 목록</h3>
                <button className='btn btn-primary m-5' id="getBtn"  type='submit' style={{backgroundColor: "green", border: 0}} onClick={getBtnClick}>
                    목록 표시
                </button>
            </div>
        </Layout>
    );
};

export default FavoritePage;
