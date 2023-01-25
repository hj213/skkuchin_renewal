import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { enroll_favorite, delete_favorite, load_favorite } from "../actions/favorite/favorite";
import { Typography, Grid } from '@mui/material';

import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";

const FavoritePage = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    const router = useRouter();
    const dispatch = useDispatch();

    const [place_id, setPlaceId] = useState('');
    const [favorite_id, setFavoriteId] = useState('');
    const user = useSelector(state => state.auth.user);
    const favorites = useSelector(state => state.favorite.favorite);

    if(typeof window !== 'undefined' && !isAuthenticated){
        router.push('/login');
    }

    useEffect( () => {
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(load_favorite());
    }, [dispatch]);

    const onChangePId = e => setPlaceId(e.target.value);
    const onChangeFId = e => setFavoriteId(e.target.value);

    // const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const addBtnClick = e => {
        e.preventDefault();
        alert('add button clicked! ' + place_id);
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(enroll_favorite(place_id));
    };

    const delBtnClick = e => {
        e.preventDefault();
        alert('delete button clicked! ' + favorite_id);
        if(dispatch && dispatch !== null && dispatch !== undefined)
            // dispatch(delete_favorite(favorite_id));
            dispatch(delete_favorite(favorite_id));

    };
    const getBtnClick = e => {
        e.preventDefault();
        alert('get button clicked!');
        if(dispatch && dispatch !== null && dispatch !== undefined)
            dispatch(load_favorite());
    };


    return (
        <Layout title= '스꾸친 | Favorite' content='Favorite page'>
            <h1 className='display-4'>Favorite Page</h1>
            <p className="fs-4 mt-3">Hello {user !== null && user.nickname}! It's your favorite place</p>
            <form className='bg-light p-5 mt-5 mb-5'>
                <h3>*추가할 Favorite Place의 id를 입력해주세요</h3>
                <div className='form-group'>
                    <label className='form-label mt-3' htmlFor='place_id'>
                        <strong>PLACE_ID</strong>
                    </label>
                    <input 
                        className='form-control' type = 'text' name='place_id' 
                        placeholder ='PLACE ID' onChange={onChangePId} value={place_id}
                        required />
                </div>
                
                <div>
                    <button className='btn btn-primary m-5' id="delBtn"  type='submit' style={{backgroundColor: "green", border: 0}} onClick={addBtnClick}>
                            ADD
                    </button>
                </div>
            </form>
            <form className='bg-light p-5 mt-5 mb-5'>
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

                <div>
                    <button className='btn btn-primary m-5' id="delBtn"  type='submit' style={{backgroundColor: "red", border: 0}} onClick={delBtnClick}>
                        DELETE
                    </button>
                </div>
            </form>
            <div className='bg-light p-5 mt-5 mb-5'>
                <h3>*Favorite Place 목록</h3>
                <button className='btn btn-primary m-5' id="getBtn"  type='submit' style={{backgroundColor: "orange", border: 0}} onClick={getBtnClick}>
                    목록 표시
                </button>
                { favorites.map((favorite, index) => (
                    <Grid container style={{marginTop: '6px',borderBottom: '0.5px solid gray'}}>
                            <Grid style={{margin:'0'}}>
                                    <Typography sx={{fontSize: '15px', fontWeight:'400'}} color="#505050" component="div">
                                        {favorite.name}  
                                    </Typography>
                            </Grid>
                    </Grid>
                ))}
            </div>
        </Layout>
    );
};

export default FavoritePage;
