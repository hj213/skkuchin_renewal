import Cookies from 'js-cookie';
import { API_URL } from '../../config';
import { AUTHENTICATED_FAIL } from '../auth/types';
import { request_refresh } from '../auth/auth';
import {
    LOAD_REVIEWS_FAIL,
    LOAD_REVIEWS_SUCCESS,
    LOAD_REVIEW_FAIL,
    LOAD_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_SUCCESS,
    MODIFY_REVIEW_FAIL,
    MODIFY_REVIEW_SUCCESS,
    ENROLL_REVIEW_FAIL,
    ENROLL_REVIEW_SUCCESS
} from './types'

export const load_reviews = (place_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/review/place/${place_id}`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_REVIEWS_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: LOAD_REVIEWS_FAIL
            })
            
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        dispatch({
            type: LOAD_REVIEWS_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const load_review = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/review/user/me`, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: LOAD_REVIEW_SUCCESS,
                payload: apiRes.data
            })
            .then(() => {
                if (callback) callback([true, apiRes.message]);
            });
            
        }else{
            dispatch({
                type: LOAD_REVIEW_FAIL
            })
            .then(() => {
                if (callback) callback([false, apiRes.message]);
            });
            
        }
    } catch (error) {
        dispatch({
            type: LOAD_REVIEW_FAIL
        });
        if (callback) callback([false, error]);
    }
}

// enroll review
export const enroll_review = (place_id, rate, content, images, tags, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const formData = new FormData();
    formData.append('place_id', place_id);
    formData.append('rate', rate);
    formData.append('content', content);

    if (images && images.length > 0) {
        for (const image of images) {
            formData.append('images', image);
        }
    } else {
        formData.append('images', new File([""], { type: 'image/png' }));
    }

    if (tags && tags.length > 0) {
        for (const tag of tags) {
            formData.append('tags', tag);
        }
    }

    try {
        const res = await fetch(`${API_URL}/api/review`, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
            body: formData
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            dispatch({
                type: ENROLL_REVIEW_SUCCESS
            })
            .then(() => {
                if (callback) callback([true, apiRes.message]);
            });
            
        } else {
            dispatch({
                type: ENROLL_REVIEW_FAIL
            })
            .then(() => {
                if (callback) callback([false, apiRes.message]);
            });
            
        }
    } catch(error) {
        console.log(error)
        dispatch({
            type: ENROLL_REVIEW_FAIL
        })
        .then(() => {
            if (callback) callback([false, error]);
        });
        
    }
};

// modify review
export const modify_review = (review_id, rate, content, images, urls, tags, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    
    const formData = new FormData();
    formData.append('rate', rate);
    formData.append('content', content);

    if (images && images.length > 0) {
        for (const image of images) {
            formData.append('images', image);
        }
    } else {
        formData.append('images', new File([""], { type: 'image/png' }));
    }

    if (urls && urls.length > 0) {
        for (const url of urls) {
            formData.append('urls', url);
        }
    } else {
        formData.append('urls', '');
    }
    
    if (tags && tags.length > 0) {
        for (const tag of tags) {
            formData.append('tags', tag);
        }
    }

    try {
        const res = await fetch(`${API_URL}/api/review/${review_id}`, {
            method: 'PUT',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
            body: formData
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: MODIFY_REVIEW_SUCCESS
            })
            .then(() => {
                if (callback) callback([true, apiRes.message]);
            });
            
        } else {
            dispatch({
                type: MODIFY_REVIEW_FAIL
            })
            .then(() => {
                if (callback) callback([false, apiRes.message]);
            });
            
        }
    } catch(error) {
        dispatch({
            type: MODIFY_REVIEW_FAIL
        })
        .then(() => {
            if (callback) callback([false, error]);
        });
        
    }
};

// delete review
export const delete_review = (review_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        console.log('access 토큰이 존재하지 않습니다')
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/review/${review_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_REVIEW_SUCCESS
            })
            .then(() => {
                if (callback) callback([true, apiRes.message]);
            });
            
        } else {
            dispatch({
                type: DELETE_REVIEW_FAIL
            })
            .then(() => {
                if (callback) callback([false, apiRes.message]);
            });
            
        }
    } catch(error) {
        dispatch({
            type: DELETE_REVIEW_FAIL
        })
        .then(() => {
            if (callback) callback([false, error]);
        });
        
    }
};

