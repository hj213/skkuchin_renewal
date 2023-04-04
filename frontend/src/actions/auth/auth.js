import Cookies from 'js-cookie'
import { API_URL } from '../../config';
import { load_favorite } from '../favorite/favorite';
import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    CHECK_USERNAME_SUCCESS,
    CHECK_USERNAME_FAIL,
    CHECK_NICKNAME_SUCCESS,
    CHECK_NICKNAME_FAIL,
    CHANGE_USER_SUCCESS,
    CHANGE_USER_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    CHANGE_TOGGLE_SUCCESS,
    CHANGE_TOGGLE_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    FIND_USERNAME_SUCCESS,
    FIND_USERNAME_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CHANGE_TOGGLE_NOT_FOR_USER_SUCCESS,
    CHANGE_TOGGLE_NOT_FOR_USER_FAIL
} 
    from './types';
import { clear_search_results } from '../place/place';

export const register = (registerData, callback) => async dispatch => {
    const body = JSON.stringify(registerData);

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch(`${API_URL}/api/user/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });

        const apiRes = await res.json();

        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        
        if (res.status === 201) {
            dispatch({
                type: REGISTER_SUCCESS
            })
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: REGISTER_FAIL
            })
            if (callback) callback([false, apiRes.message]);
            
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: REGISTER_FAIL
        })
        if (callback) callback([false, error]);
        
    }
};

export const login = (username, password, callback) => async dispatch => {
    const body = JSON.stringify({
        username,
        password
    });

    dispatch({
        type: SET_AUTH_LOADING
    });

    try {
        const res = await fetch(`${API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        if (res.status === 200) {
            await dispatch({
                type: LOGIN_SUCCESS,
                payload: apiRes.data
            })
            await dispatch(load_user());
            if (callback) callback([true, apiRes.message]);

        } else {
            dispatch({
                type: LOGIN_FAIL
            })
            if (callback) callback([false, apiRes.message]);
            
        }
    } catch(error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL
        })
        if (callback) callback([false, error]);
    }
};

export const logout = () => async dispatch => {
    try {
        await dispatch(change_toggle_for_not_user('명륜'));
        dispatch({
            type: LOGOUT_SUCCESS
        });

        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((subscription) => {
                    subscription
                    .unsubscribe()
                    .then((successful) => {
                    // You've successfully unsubscribed
                    })
                    .catch((e) => {
                        console.log(e)
                    });
                });
            });
        }
        
    } catch(error){
        console.log(error);
        dispatch({
            type: LOGOUT_FAIL
        });
    }
}

export const load_user_callback = (callback) => async dispatch => {
    await dispatch(request_refresh());

    const access = Cookies.get('access') ?? null;

    if (access === null) {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
        if (callback) callback([false, 'authenticated_fail']);
        return;
    }

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
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: apiRes.data
            });
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_USER_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const load_user = (callback) => async dispatch => {
    await dispatch(request_refresh());

    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

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
            if (callback) callback([true, apiRes.message]);
        } else {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: apiRes.data
            });
            if (callback) callback([false, apiRes.message]);
        }

    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_USER_FAIL
        });
        if (callback) callback([false, error]);
    }
}


export const request_verify = () => async dispatch => {
    await dispatch(request_refresh());

    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
        const res = await fetch(`${API_URL}/api/user/token/verify`,{
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${access}`
            }
        });

        if (res.status === 200) {
            dispatch({
                type: AUTHENTICATED_SUCCESS
            });
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const request_refresh = () => async dispatch => {
    const refresh = Cookies.get('refresh') ?? null;

    if (refresh === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    try {
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

export const check_username = (username, callback) => async dispatch => {
    const body = JSON.stringify({
        username
    });

    try {
        const res = await fetch(`${API_URL}/api/user/check/username`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHECK_USERNAME_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
            
        } else{
            dispatch({
                type: CHECK_USERNAME_FAIL,
                payload: apiRes.data
            })
            if (callback) callback([false, apiRes.message]);
            
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHECK_USERNAME_FAIL
        })
        if (callback) callback([false, error]);
        
    }
}

export const check_nickname = (nickname, callback) => async dispatch => {
    const body = JSON.stringify({
        nickname
    });

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

        if(res.status === 200){
            dispatch({
                type: CHECK_NICKNAME_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
            
        } else{
            dispatch({
                type: CHECK_NICKNAME_FAIL,
                payload: apiRes.data
            })
            if (callback) callback([false, apiRes.message]);
            
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHECK_NICKNAME_FAIL
        })
        if (callback) callback([false, error]);
        
    }
}

export const change_user = (nickname, major, image, student_id, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        nickname, major, image, student_id
    });

    try {
        const res = await fetch(`${API_URL}/api/user/me`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if(res.status === 200){
            await dispatch({
                type: CHANGE_USER_SUCCESS
            });
            await dispatch(load_user());
            if (callback) callback([true, apiRes.message]);
            
        } else{
            dispatch({
                type: CHANGE_USER_FAIL,
                payload: apiRes.data
            })
            if (callback) callback([false, apiRes.message]);
            
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_USER_FAIL
        });
        if (callback) callback([false, error]);
    }
}

export const change_password = (password, new_password, new_re_password, callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        password,
        new_password,
        new_re_password
    });

    try {
        const res = await fetch(`${API_URL}/api/user/password`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        const apiRes = await res.json();

        if(res.status === 200){
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
                payload: apiRes.data
            })
            if (callback) callback([true, apiRes.message]);
            
        } else{
            dispatch({
                type: CHANGE_PASSWORD_FAIL,
                payload: apiRes.data
            })
            if (callback) callback([false, apiRes.message]);
            
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_PASSWORD_FAIL
        })
        if (callback) callback([false, error]);
        
    }
}

export const change_toggle = (campus) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

    const body = JSON.stringify({
        campus
    });

    try {
        const res = await fetch(`${API_URL}/api/user/toggle`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${access}`
            },
            body: body
        });

        if(res.status === 200){
            await dispatch(clear_search_results());
            await dispatch({
                type: CHANGE_TOGGLE_SUCCESS
            });
            dispatch(load_user());
        } else{
            dispatch({
                type: CHANGE_TOGGLE_FAIL
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: CHANGE_TOGGLE_FAIL
        });
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

export const delete_user = (callback) => async dispatch => {
    await dispatch(request_refresh());
    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

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
            dispatch({
                type: DELETE_USER_FAIL,
                payload: apiRes.data
            })
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_USER_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const find_username = (email, callback) => async dispatch => {
    const body = JSON.stringify({
        email
    });

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
                type: FIND_USERNAME_FAIL,
                payload: apiRes.data
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

export const reset_password = (email, new_password, new_re_password, callback) => async dispatch => {
    const body = JSON.stringify({
        email,
        new_password,
        new_re_password
    });

    try {
        const res = await fetch(`${API_URL}/api/user/password/reset`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const apiRes = await res.json();

        if (res.status === 200) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: apiRes.data
            })
            
            if (callback) callback([true, apiRes.message]);
            
            
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: apiRes.data
            })
            if (callback) callback([false, apiRes.message]);
            
            
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: RESET_PASSWORD_FAIL
        })
        
        if (callback) callback([false, error]);
        
        
    }
}

export const check_admin = (callback) => async dispatch => {
    await dispatch(request_refresh());

    const access = Cookies.get('access') ?? null;

    if (access === null) {
        return dispatch({
            type: AUTHENTICATED_FAIL
        });
    }

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