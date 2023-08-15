import axios from 'axios';
import Cookies from 'js-cookie'
import { API_URL } from '../../config';
import { load_favorite } from '../favorite/favorite';
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    DELETE_USER_SUCCESS,
    FIND_USERNAME_SUCCESS,
    FIND_USERNAME_FAIL,
    CHANGE_TOGGLE_NOT_FOR_USER_SUCCESS,
    CHANGE_TOGGLE_NOT_FOR_USER_FAIL,
} 
    from './types';
import { clear_search_results } from '../place/place';
import { load_token } from '../pushToken/pushToken';

const skkuchinAuthUrl = `${API_URL}/api/user`;

export const getToken = (tokenName) => dispatch => {
    const tokenDic = {
        access: Cookies.get('access') ?? null,
        refresh: Cookies.get('refresh') ?? null,
    }

    if (tokenDic[tokenName] === null) {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
        throw new Error('Access token not available');
    }

    return tokenDic[tokenName];
};

export const register = async (registerData) => {
    const body = { registerData };

    try {
        const res = await axios.post(`${skkuchinAuthUrl}/save`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const apiRes = res.data;
        return Promise.resolve(apiRes.message);

    } catch(error) {
        console.log(error);
        return Promise.reject(error.response.data.message);
    }
};

export const login = (username, password) => async dispatch => {
    const body = { username, password };

    try {
        const res = await axios.post(`${skkuchinAuthUrl}/login`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        
        const apiRes = res.data;
        await dispatch({
            type: LOGIN_SUCCESS,
            payload: apiRes.data
        })
        await dispatch(load_user());
        return Promise.resolve(apiRes.message);

    } catch(error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);
    }
};

export const logout = () => dispatch => {
    try {
        dispatch({
            type: LOGOUT_SUCCESS
        });

        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((subscription) => {
                    if (subscription) {
                        subscription
                        .unsubscribe()
                        .then(() => {
                            console.log("You've successfully unsubscribed");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                });
            });
        }
        
    } catch(error) {
        console.log(error);
    }
}

export const load_user = () => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await axios.get(`${skkuchinAuthUrl}/me`,{
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = res.data;

        await dispatch({
            type: LOAD_USER_SUCCESS,
            payload: apiRes.data
        });
        dispatch(load_favorite());
        dispatch(load_token());
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;

        dispatch({
            type: LOAD_USER_FAIL
        });
        return Promise.reject(errRes.message);
    }
}

export const request_refresh = () => async dispatch => {
    try {
        const refresh = dispatch(getToken('refresh'));

        const res = await axios.get(`${skkuchinAuthUrl}/token/refresh`, {
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${refresh}`
            }
        });

        const apiRes = res.data;

        dispatch({
            type: REFRESH_SUCCESS,
            payload: apiRes.data
        });

    } catch (error) {
        console.log(error);
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const check_username = async (username) => {
    const body = { username };

    try {
        const res = await axios.post(`${skkuchinAuthUrl}/check/username`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const apiRes = res.data;
        return apiRes.message;

    } catch (error) {
        console.log(error);
    }
}

export const check_nickname = async (nickname) => {
    const body = {
        nickname
    };

    try {
        const res = await axios.post(`${skkuchinAuthUrl}/check/nickname`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const apiRes = res.data;
        return apiRes.message;

    } catch (error) {
        console.log(error);      
    }
}

export const change_user = (nickname, major, image, student_id) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = { nickname, major, image, student_id };

    try {
        const res = await axios.put(`${skkuchinAuthUrl}/me`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = res.data;

        await dispatch(load_user());
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);
    }
}

export const change_password = async (password, new_password, new_re_password) => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = { password, new_password, new_re_password };

    try {
        const res = await axios.put(`${skkuchinAuthUrl}/password`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = res.data;
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);
    }
}

export const change_toggle = (campus) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = { campus };

    try {
        await axios.put(`${skkuchinAuthUrl}/toggle`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });
        dispatch(load_user());
        dispatch(clear_search_results());
        return Promise.resolve();
        
    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);
    }
}

export const change_toggle_for_not_user = (campus) => async dispatch => {
    try {
        await dispatch(clear_search_results());
        dispatch({
            type: CHANGE_TOGGLE_NOT_FOR_USER_SUCCESS,
            payload: campus
        });
        return Promise.resolve();
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_TOGGLE_NOT_FOR_USER_FAIL
        });
        return Promise.reject(error);
    }
}

export const update_last_accessed_time = (last) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = { last };

    try {
        const res = await axios.put(`${skkuchinAuthUrl}/access`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = res.data;
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);
    }
}

export const delete_user = () => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await axios.delete(`${skkuchinAuthUrl}/me`, {
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = res.data;
        dispatch({
            type: DELETE_USER_SUCCESS,
        })
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);       
    }
}

export const find_username = (email) => async dispatch => {
    const body = { email };

    try {
        const res = await axios.post(`${skkuchinAuthUrl}/find/username`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const apiRes = res.data;

        dispatch({
            type: FIND_USERNAME_SUCCESS,
            payload: apiRes.data
        })
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        
        dispatch({
            type: FIND_USERNAME_FAIL
        })
        return Promise.reject(errRes.message);
    }
}

export const reset_password = async (email, new_password, new_re_password) => {
    const body = { email, new_password, new_re_password };

    try {
        const res = await axios.put(`${skkuchinAuthUrl}/password/reset`, body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const apiRes = res.data;
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);      
    }
}

export const check_admin = () => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await axios.get(`${skkuchinAuthUrl}/check/admin`, {
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = res.data;
        return Promise.resolve(apiRes.message);

    } catch (error) {
        console.log(error);
        const errRes = error.response.data;
        return Promise.reject(errRes.message);
    }
}
