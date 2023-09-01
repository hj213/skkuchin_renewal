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

export const register = async (registerData, callback) => {
    const body = JSON.stringify({ registerData });

    try {
        const res = await fetch(`${API_URL}/api/user/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        });

        const apiRes = await res.json();

        if (res.status === 201) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch(error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
};

export const login = (username, password, callback) => async dispatch => {
    const body = JSON.stringify({ username, password });

    try {
        const res = await fetch(`${API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
        });

        const apiRes = await res.json();
        
        if (res.status === 200) {
            await dispatch({
                type: LOGIN_SUCCESS,
                payload: apiRes.data
            })
            dispatch(load_user());
            if (callback) callback([true, apiRes.message]);

        } else {
            if (callback) callback([false, apiRes.message]);
        }

    } catch(error) {
        console.log(error);
        if (callback) callback([false, error]);
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

export const load_user = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/user/me`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            await dispatch({
                type: LOAD_USER_SUCCESS,
                payload: apiRes.data
            });
            dispatch(load_favorite());
            dispatch(load_token());
            if (callback) callback([true, apiRes.message]);
        } else {
            await dispatch({
                type: LOAD_USER_FAIL
            });
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        await dispatch({
            type: LOAD_USER_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const request_refresh = () => async dispatch => {
    try {
        const refresh = dispatch(getToken('refresh'));

        const res = await fetch(`${API_URL}/api/user/token/refresh`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${refresh}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: REFRESH_SUCCESS,
                payload: apiRes.data
            });
        } else {
            dispatch({
                type: REFRESH_FAIL
            });
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const check_username = async (username, callback) => {
    const body = JSON.stringify({ username });

    try {
        const res = await fetch(`${API_URL}/api/user/check/username`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }
    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
}

export const check_nickname = async (nickname, callback) => {
    const body = JSON.stringify({ nickname });

    try {
        const res = await fetch(`${API_URL}/api/user/check/nickname`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);

        } else {
            if (callback) callback([false, apiRes.message]);

        }

    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);  
    }
}

export const change_user = (nickname, major, image, student_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({ nickname, major, image, student_id });

    try {
        const res = await fetch(`${API_URL}/api/user/me`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body,
        });

        const apiRes = await res.json();

        if(res.status === 200){
            await dispatch(load_user());
            if (callback) callback([true, apiRes.message]);

        } else{
            if (callback) callback([false, apiRes.message]);

        }

    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
}

export const change_password = async (password, new_password, new_re_password, callback) => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({ password, new_password, new_re_password });

    try {
        const res = await fetch(`${API_URL}/api/user/password`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body,
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);

        } else {
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
}

export const change_toggle = (campus) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({ campus });

    try {
        const res = await fetch(`${API_URL}/api/user/toggle`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body,
        });

        if (res.status === 200) {
            await dispatch(clear_search_results());
            dispatch(load_user());
        }
        
    } catch (error) {
        console.log(error);
    }
}

export const change_toggle_for_not_user = (campus) => async dispatch => {
    try {
        await dispatch(clear_search_results());
        dispatch({
            type: CHANGE_TOGGLE_NOT_FOR_USER_SUCCESS,
            payload: campus
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_TOGGLE_NOT_FOR_USER_FAIL
        });
    }
}

export const update_last_accessed_time = (last) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    const body = JSON.stringify({ last });

    try {
        await fetch(`${API_URL}/api/user/access`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body,
        });

    } catch (error) {
        console.log(error);
    }
}

export const delete_user = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/user/me`, {
            method: 'DELETE',
            headers: {
                'Authorization' : `Bearer ${access}`
            },
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
}

export const find_username = (email, callback) => async dispatch => {
    const body = JSON.stringify({ email });

    try {
        const res = await fetch(`${API_URL}/api/user/find/username`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: FIND_USERNAME_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: FIND_USERNAME_FAIL
            })
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: FIND_USERNAME_FAIL
        })
        if (callback) callback([false, error]);
    }
}

export const reset_password = async (email, new_password, new_re_password, callback) => {
    const body = JSON.stringify({ email, new_password, new_re_password });

    try {
        const res = await fetch(`${API_URL}/api/user/password/reset`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);
    }
}

export const check_admin = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = dispatch(getToken('access'));

    try {
        const res = await fetch(`${API_URL}/api/user/check/admin`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            if (callback) callback([true, apiRes.message]);
        } else {
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        if (callback) callback([false, error]);

    }
}
